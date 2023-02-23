import { useEffect } from 'react';
import { SafeAreaView, StatusBar, ToastAndroid } from 'react-native';
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

import Storage from './src/services/Storage';

export default function App() {
  const start = async () => {
    let response = await Storage.startStorage()

    if (response === 'error') {
      ToastAndroid.show('Ocorreu um erro!', ToastAndroid.SHORT);
    }
  }

  useEffect(() => {
    start()
  }, [])

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