/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import AppRoutes from './app.routes';
import AuthStack from './login.routes';
import AuthContext from '../auth';

const AppNavigator: React.FC = () => {
 const { user } = useContext(AuthContext);
 return user ? <AppRoutes /> : <AuthStack />;
};

export default AppNavigator;
