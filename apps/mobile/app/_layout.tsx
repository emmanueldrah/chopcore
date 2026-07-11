import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useFonts, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import '../global.css';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'Fraunces-Bold': Fraunces_700Bold,
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
