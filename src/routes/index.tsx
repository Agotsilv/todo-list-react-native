import React, { useContext } from 'react';
import AuthContext from '../config/auth'
import Tasks from '../screens/Tasks'
import AuthRoutes from '../routes/auth.routes'
import { StyleSheet } from 'react-native';


const AppNavigator: React.FC = () => {
 const { token } = useContext(AuthContext);
 console.log(token)

 return token ? <Tasks /> : <AuthRoutes />;
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 100,
 },
});

export default AppNavigator;