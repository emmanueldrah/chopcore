import { View } from 'react-native';

export const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <View className={`bg-white rounded-3xl p-4 shadow-sm border-2 border-harmattanSand ${className}`}>
      {children}
    </View>
  );
};
