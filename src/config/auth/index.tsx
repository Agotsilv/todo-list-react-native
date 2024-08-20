import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from "react";
import api from "../api";
import { useNavigation } from '@react-navigation/native';

type IProps = {
 children: React.ReactElement;
}

type User = {
 email: string;
 password: string;
}

type AuthContextData = {
 signed: boolean;
 user: User | null;
 token: string;
 signIn({ email, password }: ISignIn): Promise<void>;
 register({ email, password }: ISignIn): Promise<void>;
}

interface ISignIn {
 email: string;
 password: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FunctionComponent<IProps> = ({
 children,
}: IProps) => {
 const navigation: any = useNavigation();

 const [user, setUser] = useState<User | null>(null);
 const [token, setToken] = useState('');

 useEffect(() => {
  async function loadStorageData() {
   const storageUser: any = await AsyncStorage.getItem('@RNAuth:user');

   if (storageUser) {
    setUser(storageUser)
   }
  }

  loadStorageData()
 }, [])

 const register = async ({ email, password }: ISignIn): Promise<void> => {
  if (email && password) {

   AsyncStorage.setItem('@RNAuth:user', JSON.stringify({ email, password }));

   setUser({
    email: email,
    password: password
   })

   navigation.navigate('Login')

  } else {
   console.log('error')
  }
  return Promise.resolve();
 }

 const signIn = async ({ email, password }: ISignIn) => {
  if (email === '' && password === '') {

   console.log('Error');
  } else {
   const storageUser: any = await AsyncStorage.getItem('@RNAuth:user');

   console.log("storageUser", storageUser)

   setUser({
    email: storageUser.email,
    password: storageUser.password
   })

   // Lógica de autenticação pode ser implementada aqui
  }
 }

 return (
  <AuthContext.Provider
   value={{
    signed: !!user,
    user,
    token,
    signIn,
    register,
   }}
  >
   {children}
  </AuthContext.Provider>
 );
}

export default AuthContext;
