import { SafeAreaView, StatusBar } from 'react-native';
import {
  useFonts,
  Inter_200ExtraLight,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter'
import * as NavigationBar from 'expo-navigation-bar';
import Colors from './src/assets/Colors';

import Routes from './src/routes';

export default function App() {

  NavigationBar.setBackgroundColorAsync(Colors.primary);
  NavigationBar.setBorderColorAsync(Colors.secondary);

  const [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_800ExtraBold
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <StatusBar barStyle='light-content' backgroundColor={Colors.primary} />
      <Routes />
    </SafeAreaView>
  );
}