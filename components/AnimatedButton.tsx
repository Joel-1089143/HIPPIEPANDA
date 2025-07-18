import React, { useRef } from 'react';
import { TouchableOpacity, Animated, ViewStyle, TextStyle, Platform, Vibration } from 'react-native';

interface AnimatedButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  scaleValue?: number;
  hapticFeedback?: boolean;
  animationType?: 'scale' | 'opacity' | 'both' | 'bounce';
  duration?: number;
}

export default function AnimatedButton({
  onPress,
  children,
  style,
  textStyle,
  disabled = false,
  scaleValue = 0.96,
  hapticFeedback = true,
  animationType = 'bounce',
  duration = 150,
}: AnimatedButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;

    const animations = [];

    if (animationType === 'scale' || animationType === 'both' || animationType === 'bounce') {
      animations.push(
        Animated.timing(scaleAnim, {
          toValue: scaleValue,
          duration: duration * 0.6,
          useNativeDriver: true,
        })
      );
    }

    if (animationType === 'opacity' || animationType === 'both' || animationType === 'bounce') {
      animations.push(
        Animated.timing(opacityAnim, {
          toValue: 0.8,
          duration: duration * 0.6,
          useNativeDriver: true,
        })
      );
    }

    if (animationType === 'bounce') {
      animations.push(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 0.95,
            duration: duration * 0.3,
            useNativeDriver: true,
          }),
          Animated.spring(bounceAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 400,
            friction: 8,
          }),
        ])
      );
    }
    Animated.parallel(animations).start();
  };

  const handlePressOut = () => {
    if (disabled) return;

    const animations = [];

    if (animationType === 'scale' || animationType === 'both' || animationType === 'bounce') {
      animations.push(
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 400,
          friction: 8,
        })
      );
    }

    if (animationType === 'opacity' || animationType === 'both' || animationType === 'bounce') {
      animations.push(
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        })
      );
    }

    Animated.parallel(animations).start();
  };

  const handlePress = () => {
    if (disabled || !onPress) return;

    // Add haptic feedback
    if (hapticFeedback) {
      if (Platform.OS === 'ios') {
        // Note: In a real app, you'd import and use Haptics from expo-haptics
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else if (Platform.OS === 'android') {
        Vibration.vibrate(10);
      }
    }

    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={1}
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      <Animated.View
        style={[
          style,
          {
            transform: [
              { scale: animationType === 'bounce' ? bounceAnim : scaleAnim }
            ],
            opacity: opacityAnim,
          },
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}