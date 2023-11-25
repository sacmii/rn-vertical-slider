import * as React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  useSharedValue,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import type { SliderProps } from './slider.types';

const calculateValue = (
  position: number,
  min: number,
  max: number,
  step: number,
  height: number
): number => {
  'worklet';
  let sliderPosition = height - position;
  sliderPosition = Math.min(Math.max(sliderPosition, 0), height);
  let value = (sliderPosition / height) * (max - min) + min;
  value = Math.round(value / step) * step;
  value = Math.min(Math.max(value, min), max);
  return value;
};

const VerticalSlider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  width = 350,
  height = 30,
  borderRadius = 5,
  maximumTrackTintColor = '#3F2DA5',
  minimumTrackTintColor = '#77ADE6',
  disabled = false,
  onChange = () => {},
  onComplete = () => {},
  value: currentValue = 0,
  showIndicator = false,
  renderIndicatorHeight = 40,
  renderIndicator = () => null,
  containerStyle = {},
  sliderStyle = {},
}: SliderProps) => {
  let point = useSharedValue<number>(currentValue);
  // Gesture event handler
  const gestureEvent = useAnimatedGestureHandler({
    onStart: (evt, _ctx) => {
      if (disabled) return;
      let value = calculateValue(evt.y, min, max, step, height);
      point.value = withSpring(value, {
        damping: 13,
      });
    },
    onActive: (evt, _ctx) => {
      if (disabled) return;
      let value = calculateValue(evt.y, min, max, step, height);
      point.value = withTiming(value, { duration: 50 });
      runOnJS(onChange)(value);
    },
    onFinish: (evt, _ctx) => {
      if (disabled) return;
      runOnJS(onComplete)(calculateValue(evt.y, min, max, step, height));
    },
  });
  // All the dynamic style calculations
  const baseViewStyle = useAnimatedStyle<ViewStyle>(
    () => ({
      width,
      height,
      borderRadius,
      backgroundColor: maximumTrackTintColor,
    }),
    [point.value, maximumTrackTintColor, width, height, borderRadius]
  );
  // slider style
  const sliderBaseStyle = useAnimatedStyle<ViewStyle>(
    () => ({
      // Convert the value to height in number
      height: `${(point.value / max) * 100}%`,
      backgroundColor: minimumTrackTintColor,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      // if percentage > 97 , then show border top right anf left radius
      ...((point.value / max) * 100 > 97
        ? {
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
          }
        : {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }),
    }),
    [point.value, minimumTrackTintColor, borderRadius, height, max]
  );
  // indicator style
  const indicatorStyle = useAnimatedStyle<ViewStyle>(() => {
    if (!showIndicator) return {};
    let bottom = (point.value / max) * height;
    // Adjust the bottom value not to go beyond the height or less than 0
    bottom = Math.min(Math.max(bottom, 0), height - renderIndicatorHeight);
    return {
      bottom,
    };
  }, [showIndicator, point.value, sliderBaseStyle]);
  return (
    <PanGestureHandler onGestureEvent={gestureEvent}>
      <Animated.View style={[baseViewStyle, containerStyle]}>
        <Animated.View style={[styles.slider, sliderBaseStyle, sliderStyle]} />
        <Animated.View style={[styles.slider, indicatorStyle]}>
          {renderIndicator(point.value)}
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  slider: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 0,
    width: '100%',
  },
});

export default VerticalSlider;
