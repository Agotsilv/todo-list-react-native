import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../screens/Home";
import { Text, TouchableOpacity } from "react-native";
import { HStack } from "@gluestack-ui/themed";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../auth";
const Stack = createStackNavigator<any>();

export default function AppRoutes() {
 const { logout } = useContext(AuthContext);


 return (
  <Stack.Navigator>
   <Stack.Screen name="Home" component={Home}
    options={({ navigation }: any) => ({
     headerShown: true,
     title: '',
     headerStyle: {
      backgroundColor: '#181832',
      height: 100,
      elevation: 0, // Remove elevação em Android
      shadowOpacity: 0, // Remove sombra em iOS
     },
     headerTitleStyle: {
      color: 'white',
      fontFamily: 'JostMedium',
      fontSize: 20,
     },
     headerTitleAlign: 'center',
     headerTintColor: 'white',
     headerLeft: () => (
      <HStack marginLeft={25} marginTop={5}>
       <FontAwesome name="check" size={30} color="white" style={{ marginTop: 2 }} />
       <Text style={{ color: 'white', fontFamily: 'JostMedium', fontSize: 24, marginLeft: 5, }}>
        MyTasks
       </Text>
      </HStack>
     ),
     headerRight: () => (
      <HStack marginLeft={25} marginTop={5}>
       <TouchableOpacity onPress={logout}>
        <Text style={{ color: 'white', fontFamily: 'JostMedium', fontSize: 18, marginRight: 15 }}>
         Sair
        </Text>
       </TouchableOpacity>
      </HStack>
     )
    })}
   />
  </Stack.Navigator>
 );
}
