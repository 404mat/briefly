import '../global.css';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { InstrumentSerif_400Regular, InstrumentSerif_400Regular_Italic } from '@expo-google-fonts/instrument-serif';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Uniwind } from 'uniwind';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    InstrumentSerif_400Regular,
    InstrumentSerif_400Regular_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaListener
      onChange={({ insets }) => {
        Uniwind.updateInsets(insets);
      }}
    >
      <View className="flex-1 bg-background">
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <StatusBar style="auto" />
          <NativeTabs minimizeBehavior="onScrollDown">
            <NativeTabs.Trigger name="index">
              <Label>Feed</Label>
              <Icon sf="newspaper" drawable="custom_android_drawable" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="profile">
              <Icon sf="person" drawable="custom_profile_drawable" />
              <Label>Profile</Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="search" role="search">
              <Label>Search</Label>
            </NativeTabs.Trigger>
          </NativeTabs>
        </ThemeProvider>
      </View>
    </SafeAreaListener>
  );
}
