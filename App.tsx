import 'react-native-gesture-handler';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';
import { AuthProvider } from './src/config/auth';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/config/routes';
import React from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({
    JostBlack: require('./src/assets/fonts/Jost-Black.ttf'),
    JostBold: require('./src/assets/fonts/Jost-Bold.ttf'),
    JostMedium: require('./src/assets/fonts/Jost-Medium.ttf'),
    JostRegular: require('./src/assets/fonts/Jost-Regular.ttf'),
  });

  if (!fontsLoaded) return <ActivityIndicator />;

  return (
    <NavigationContainer>
      <AuthProvider>
        <GluestackUIProvider config={config}>
          <AppNavigator />
        </GluestackUIProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

