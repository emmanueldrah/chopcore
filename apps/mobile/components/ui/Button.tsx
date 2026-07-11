import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  onPress,
  title,
  variant = 'primary',
  isLoading,
  disabled,
  className = ''
}: ButtonProps) => {
  const variantStyles: Record<string, string> = {
    primary: 'bg-marketClay',
    secondary: 'bg-beverageTeal',
    outline: 'border-2 border-marketClay',
    ghost: '',
    danger: 'bg-ripePepper',
  };

  const textStyles: Record<string, string> = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-marketClay',
    ghost: 'text-charcoalInk',
    danger: 'text-white',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      className={`h-14 px-6 rounded-2xl flex-row items-center justify-center ${variantStyles[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? '#C6602E' : 'white'} />
      ) : (
        <Text className={`text-lg font-semibold ${textStyles[variant]}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
