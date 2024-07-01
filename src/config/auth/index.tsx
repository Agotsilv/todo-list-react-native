import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from "react";
import Toast from 'react-native-toast-message';
import api from "../api";
import React from 'react';

type IProps = {
 children: React.ReactElement;
}

type User = {
 token: string;
 nome: string;
}

type AuthContextData = {
 signed: boolean;
 user: User | null;
 token: string;
 signIn: ({ email, password }: ISignIn) => Promise<void>;
 AlertSignOut: () => void;
 loading: boolean;
}

interface ISignIn {
 email: string;
 password: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FunctionComponent<IProps> = ({ children }: IProps) => {
 const [user, setUser] = useState<User | null>(null);
 const [token, setToken] = useState('');
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  async function loadStorageData() {
   const storageUser = await AsyncStorage.getItem('@RNAuth:user');
   const storageToken = await AsyncStorage.getItem('@RNAuth:token');

   if (storageUser && storageToken) {
    setUser(JSON.parse(storageUser));
    setToken(storageToken);
   }

   setLoading(false);
  }

  loadStorageData();
 }, []);

 const signIn = async ({ email, password }: ISignIn) => {
  if (email === '' && password === '') {
   Toast.show({
    type: 'error',
    text1: 'Atenção!',
    text2: 'Por favor, preencha os campos.',
    text2Style: { fontSize: 14 },
    text1Style: { fontSize: 14 }
   });
  } else {
   try {
    const response = await api.post('/auth', { email, password });
    if (response.data) {
     console.log(response.data)

     const { token, user } = response.data;

     setToken(token);
     setUser(user);

     // Salva o usuário atualizado no AsyncStorage
     await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(user));

     // Salva o token de acesso
     await AsyncStorage.setItem('@RNAuth:token', token);
    }
   } catch (error) {
    console.log(error);
   }
  }
 };

 const AlertSignOut = () => {
  // Implementar lógica de logout
 };

 return (
  <AuthContext.Provider
   value={{
    signed: !!user,
    user,
    token,
    signIn,
    AlertSignOut,
    loading,
   }}
  >
   {children}
   <Toast />
  </AuthContext.Provider>
 );
};

export default AuthContext;
