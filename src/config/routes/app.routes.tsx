import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../screens/Home";
import { Text, TouchableOpacity } from "react-native";
import { HStack } from "@gluestack-ui/themed";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Stack = createStackNavigator<any>();

// header: 181832

export default function AppRoutes() {
 return (
  <Stack.Navigator>
   <Stack.Screen name="Home" component={Home}
    options={({ navigation }: any) => ({
     headerShown: true,
     title: '',
     headerStyle: {
      backgroundColor: '#181832',
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
        TodoList
       </Text>
      </HStack>
     ),
    })}
   />
  </Stack.Navigator>
 );
}
