import { View, StyleSheet } from 'react-native';

export const WovenBackground = ({ opacity = 0.05 }: { opacity?: number }) => {
  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { opacity }]}
      className="bg-harmattanSand"
    >
      {/* In a real environment, we'd use a small pattern image or SVG here */}
    </View>
  );
};
