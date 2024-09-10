import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from "react";
import api from "../api";
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

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
 setUser: User | null;
 token: string;
 signIn({ email, password }: ISignIn): Promise<void>;
 register({ email, password }: ISignIn): Promise<void>;
 logout(): Promise<void>;
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
    setUser(JSON.parse(storageUser))
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
   Alert.alert('Error', 'Por favor, insira o email e a senha.')
  }
  return Promise.resolve();
 }

 const signIn = async ({ email, password }: ISignIn): Promise<void> => {
  if (email === '' || password === '') {
   Alert.alert('Error', 'Por favor, insira o email e a senha.');
  } else {
   try {
    const storageUser = await AsyncStorage.getItem('@RNAuth:user');
    if (storageUser) {
     const parsedUser = JSON.parse(storageUser);

     console.log('Stored User:', parsedUser);
     console.log('Input Email:', email);
     console.log('Input Password:', password);

     if (email === parsedUser.email && password === parsedUser.password) {
      setUser({
       email: parsedUser.email,
       password: parsedUser.password
      });
     } else {
      Alert.alert('Error', 'Por favor, Email ou senha inválido!');
     }
    } else {
     Alert.alert('Error', 'Nenhum usuário encontrado!');
    }
   } catch (error) {
    console.error('Error during sign in:', error);
    Alert.alert('Error', 'Ocorreu um erro ao tentar realizar o login.');
   }
  }
 };


 const logout = async (): Promise<void> => {
  setUser(null);
  navigation.navigate('Login');
 };

 return (
  <AuthContext.Provider
   value={{
    signed: !!user,
    user,
    logout,
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
