import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { useFonts } from 'expo-font';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import { AuthProvider } from './src/config/auth';

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
        <Login />
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
