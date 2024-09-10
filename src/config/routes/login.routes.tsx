import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/Login";
import RegisterUser from "../../screens/RegisterUser";
import React from 'react';


const Stack = createStackNavigator<any>();

export default function AuthStack() {
 return (
  <Stack.Navigator>
   <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
   <Stack.Screen name="RegisterUser" component={RegisterUser} options={{ headerShown: false }} />
  </Stack.Navigator>
 );
}
