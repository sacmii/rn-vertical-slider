import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

function calculateValue(
  position: number,
  min: number,
  max: number,
  step: number,
  height: number
): number {
  'worklet';
  let sliderPosition = height - position;
  sliderPosition = Math.min(Math.max(sliderPosition, min), height);
  let value = (sliderPosition / height) * (max - min) + min;
  value = Math.round(value / step) * step;
  value = Math.min(Math.max(value, min), max);
  return value;
}

const RNVerticalSlider = React.forwardRef<TSliderRef, TSliderProps>(
  (
    {
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
    },
    ref
  ) => {
    let point = useSharedValue<number>(currentValue);
    let disabledProp = useSharedValue<boolean>(disabled);
    // Memoized BaseView styles
    const calculateBaseView = () => ({
      height,
      width,
      borderRadius,
      backgroundColor: maximumTrackTintColor,
    });
    const baseViewStyle = React.useMemo(calculateBaseView, [
      borderRadius,
      height,
      maximumTrackTintColor,
      width,
    ]);
    // Gesture handler
    const handleGesture = (
      props:
        | GestureStateChangeEvent<PanGestureHandlerEventPayload>
        | GestureUpdateEvent<
            PanGestureHandlerEventPayload & PanGestureChangeEventPayload
          >
    ) => {
      if (disabledProp.value) return;
      let value = calculateValue(props.y, min, max, step, height);
      point.value = withSpring(value, { damping: 15 });
      runOnJS(onChange)(value);
    };
    const handleGestureEnd = (
      props: GestureStateChangeEvent<PanGestureHandlerEventPayload>
    ) => {
      if (disabledProp.value) return;
      runOnJS(onComplete)(calculateValue(props.y, min, max, step, height));
    };
    const panGesture = Gesture.Pan()
      .onBegin(handleGesture)
      .onChange(handleGesture)
      .onEnd(handleGestureEnd);
    // Ref methods
    React.useImperativeHandle(ref, () => ({
      setValue: (value: number) => {
        point.value = withSpring(value, { damping: 15 });
        onChange(value);
      },
      setState: (state: boolean) => {
        disabledProp.value = state;
      },
    }));
    // slider styles
    const slider = useAnimatedStyle(() => {
      let heightPercentage = (point.value / max) * 100;
      const style: ViewStyle = {
        backgroundColor: minimumTrackTintColor,
        height: `${heightPercentage}%`,
      };
      return style;
    }, [point.value, minimumTrackTintColor, borderRadius, height, max]);
    // indicator styles
    const indicator = useAnimatedStyle(() => {
      const style: ViewStyle = {};
      if (showIndicator) {
        let bottom = (point.value / max) * height;
        style.bottom = Math.min(
          Math.max(bottom, 0),
          height - renderIndicatorHeight
        );
      }
      return style;
    }, [showIndicator, point.value]);
    return (
      <GestureDetector gesture={panGesture}>
        <View style={[baseViewStyle, containerStyle]}>
          <View style={[baseViewStyle, styles.box, sliderStyle]}>
            <Animated.View style={[styles.box, slider]} />
          </View>
          <Animated.View style={[styles.indicator, indicator]}>
            {renderIndicator(point.value)}
          </Animated.View>
        </View>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  box: {
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  indicator: {
    position: 'absolute',
  },
});

export default RNVerticalSlider;
