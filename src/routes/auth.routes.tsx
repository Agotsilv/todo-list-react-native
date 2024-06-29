import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import CreateUser from "../screens/CreateUser";
const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <AuthStack.Screen
        name="createUser"
        component={CreateUser}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
