import { config } from '@gluestack-ui/config';
import 'react-native-gesture-handler';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { useFonts } from 'expo-font';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './src/config/auth';
import AuthRoutes from './src/routes/auth.routes';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [fontsLoaded] = useFonts({
    JostBlack: require('./src/assets/fonts/Jost-Black.ttf'),
    JostBold: require('./src/assets/fonts/Jost-Bold.ttf'),
    JostMedium: require('./src/assets/fonts/Jost-Medium.ttf'),
    JostRegular: require('./src/assets/fonts/Jost-Regular.ttf'),
  });

  if (!fontsLoaded) return <ActivityIndicator />;

  return (
    <AuthProvider>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <AuthRoutes />
        </NavigationContainer>
      </GluestackUIProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
