import { View, Text, SafeAreaView } from 'react-native';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { WovenBackground } from '../components/shared/WovenBackground';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-harmattanSand">
      <WovenBackground />
      <View className="flex-1 px-6 justify-center">
        <View className="mb-12">
          <Text className="text-5xl text-deepPalm mb-2 font-bold" style={{ fontFamily: 'Fraunces-Bold' }}>
            Ferako
          </Text>
          <Text className="text-xl text-marketClay font-semibold" style={{ fontFamily: 'Inter-SemiBold' }}>
            Africa's Digital Commerce OS
          </Text>
        </View>

        <Card className="mb-8">
          <Text className="text-lg text-charcoalInk mb-4" style={{ fontFamily: 'Inter-Regular' }}>
            A unified commerce platform for trusted businesses and local delivery.
          </Text>
          <View className="flex-row items-center gap-3">
            <View className="h-2 w-2 rounded-full bg-beverageTeal" />
            <Text className="text-xs text-charcoalInk/60 uppercase tracking-widest font-medium">Ho • Volta Region</Text>
          </View>
        </Card>

        <View className="gap-4">
          <Button
            title="Start Shopping"
            onPress={() => console.log('Shop')}
          />
          <Button
            title="I want to sell"
            variant="outline"
            onPress={() => console.log('Sell')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
