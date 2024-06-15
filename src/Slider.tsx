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
import { TSliderProps, TSliderRef } from './types';

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
      animationConfig = { damping: 15 },
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
    const handleGesture =
      (type: 'BEGIN' | 'CHANGE' | 'END') => (eventY: number) => {
        if (disabledProp.value) return;
        let value = calculateValue(eventY, min, max, step, height);
        point.value = withSpring(value, animationConfig);
        runOnJS(type === 'BEGIN' || type === 'CHANGE' ? onChange : onComplete)(
          value
        );
      };
    const onGestureStart = (
      event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
    ) => handleGesture('BEGIN')(event.y);
    const onGestureChange = (
      event: GestureUpdateEvent<
        PanGestureHandlerEventPayload & PanGestureChangeEventPayload
      >
    ) => handleGesture('CHANGE')(event.y);
    const onGestureEnd = (
      event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
    ) => handleGesture('END')(event.y);
    const panGesture = Gesture.Pan()
      .onBegin(onGestureStart)
      .onChange(onGestureChange)
      .onEnd(onGestureEnd)
      .onFinalize(onGestureEnd)
      .runOnJS(true);
    // Ref methods
    React.useImperativeHandle(ref, () => ({
      setValue: (value: number) => {
        point.value = withSpring(value, animationConfig);
        onChange(value);
      },
      setState: (state: boolean) => {
        disabledProp.value = state;
      },
    }));
    // slider styles
    const slider = useAnimatedStyle(() => {
      let heightPercentage = ((point.value - min) / (max - min)) * 100;
      const style: ViewStyle = {
        backgroundColor: minimumTrackTintColor,
        height: `${heightPercentage}%`,
      };
      return style;
    }, [point.value]);
    // indicator styles
    const indicator = useAnimatedStyle(() => {
      const style: ViewStyle = {};
      if (showIndicator) {
        let bottom = ((point.value - min) / (max - min)) * height;
        bottom = Math.min(Math.max(bottom, 0), height - renderIndicatorHeight);
        style.bottom = bottom;
      }
      return style;
    }, [point.value]);
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
