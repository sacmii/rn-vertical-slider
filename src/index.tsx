import * as React from 'react';
import {
  View,
  Animated,
  PanResponder,
  StyleSheet,
  GestureResponderEvent,
  PanResponderGestureState,
  Easing,
} from 'react-native';
import type { SliderProps } from './slider.types';

const VerticalSlider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  width = 350,
  height = 30,
  borderRadius = 5,
  maximumTrackTintColor = '#3F2DA5',
  minimumTrackTintColor = '#77ADE6',
  showBallIndicator = false,
  ballIndicatorColor = '#ECECEC',
  ballIndicatorWidth = 48,
  ballIndicatorHeight = 48,
  ballIndicatorPosition = -60,
  ballIndicatorTextColor = '#000000',
  showBackgroundShadow = true,
  shadowProps = {},
  renderIndicator = null,
  disabled = false,
  onChange = () => {},
  onComplete = () => {},
  animationDuration = 100,
  value: currentValue = 0,
}) => {
  const {
    shadowOffsetWidth = 0,
    shadowOffsetHeight = 1,
    shadowOpacity = 0.22,
    shadowRadius = 2.22,
    elevation = 3,
    shadowColor = '#000',
  } = shadowProps || {};

  // Calculating Shadow Styles
  const calculateShadowStyles = () => {
    if (showBackgroundShadow) {
      return {
        shadowOffset: {
          width: shadowOffsetWidth,
          height: shadowOffsetHeight,
        },
        shadowOpacity,
        shadowRadius,
        elevation,
        shadowColor,
      };
    }
    return {};
  };
  const shadowStyles = React.useMemo(calculateShadowStyles, [
    elevation,
    shadowColor,
    shadowOffsetHeight,
    shadowOffsetWidth,
    shadowOpacity,
    shadowRadius,
    showBackgroundShadow,
  ]);
  // End Calculating Shadow Styles

  // Slider base styles
  const calculateBaseStyles = () => ({
    width,
    height,
    borderRadius,
  });
  const sliderBaseStyles = React.useMemo(calculateBaseStyles, [
    width,
    height,
    borderRadius,
  ]);
  // End Slider base styles

  // Helper Variables
  let _moveStartValue = React.useRef<number>(0).current;
  const value = React.useRef(new Animated.Value(currentValue)).current;
  const sliderHeight = React.useRef(new Animated.Value(0)).current;
  const ballHeight = React.useRef(new Animated.Value(0)).current;

  const getSliderHeight = (newValue: number) => {
    return ((newValue - min) * height) / (max - min);
  };

  // Calculating Values from props.value
  const calculateValues = () => {
    updateNewValue(currentValue);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(calculateValues, [currentValue]);

  // Initializing when component mounts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(calculateValues, []);
  // Initializing when component mounts

  const _calculateValue = (gestureState: PanResponderGestureState) => {
    const ratio = -gestureState.dy / height;
    const diff = max - min;
    return step
      ? Math.max(
          min,
          Math.min(
            max,
            _moveStartValue.valueOf() + Math.round((ratio * diff) / step) * step
          )
        )
      : Math.floor(
          Math.max(min, _moveStartValue.valueOf() + ratio * diff) * 100
        ) / 100;
  };

  // Make values stable stand in between min and max
  const _clamp = (newValue: number, minValue: number, maxValue: number) => {
    return Math.min(Math.max(newValue, minValue), maxValue);
  };

  const updateNewValue = (newValue: number) => {
    let valueToUpdate = _clamp(newValue, min, max);
    value.setValue(valueToUpdate);
    const _sliderHeight = getSliderHeight(valueToUpdate);
    let _ballPosition = _sliderHeight;
    const _ballHeight = renderIndicator
      ? ballIndicatorHeight
      : ballIndicatorWidth;
    if (_ballPosition + _ballHeight >= height) {
      _ballPosition = height - _ballHeight;
    } else if (_ballPosition - _ballHeight <= 0) {
      _ballPosition = 0;
    } else {
      _ballPosition = _ballPosition - _ballHeight / 2;
    }
    Animated.parallel([
      Animated.timing(sliderHeight, {
        toValue: _sliderHeight,
        easing: Easing.linear,
        duration: animationDuration || 0,
        useNativeDriver: false,
      }),
      Animated.timing(ballHeight, {
        toValue: _ballPosition,
        easing: Easing.linear,
        duration: animationDuration || 0,
        useNativeDriver: false,
      }),
    ]).start();
  };
  // End Helper Variables

  // PanResponder handlers
  const onStartShouldSetPanResponder = () => true;
  const onMoveShouldSetPanResponder = () => false;
  const onPanResponderTerminationRequest = () => false;
  const onPanResponderGrant = () => {
    // @ts-ignore
    _moveStartValue = value._value;
  };
  const onPanResponderMove = (
    _event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (disabled) {
      return;
    }
    onChange(_calculateValue(gestureState));
  };
  const onPanResponderRelease = (
    _event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (disabled) {
      return;
    }
    onChange(_calculateValue(gestureState));
  };
  const onPanResponderTerminate = (
    _event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (disabled) {
      return;
    }
    onComplete(_calculateValue(gestureState));
  };
  // End PanResponder handlers
  // Value connected to state, slider height Animated Value, ballHeight Animated Value, panResponder
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder,
      onMoveShouldSetPanResponder,
      onPanResponderTerminationRequest,
      onPanResponderGrant,
      onPanResponderMove,
      onPanResponderRelease,
      onPanResponderTerminate,
    })
  ).current;
  // End Value connected to state, slider height Animated Value, ballHeight Animated Value, panResponder

  return (
    <View style={[shadowStyles, sliderBaseStyles]}>
      <View
        style={[
          styles.container,
          sliderBaseStyles,
          { backgroundColor: maximumTrackTintColor },
        ]}
        {...panResponder.panHandlers}
      >
        <Animated.View
          style={[
            sliderBaseStyles,
            styles.slider,
            { backgroundColor: minimumTrackTintColor, height: sliderHeight },
          ]}
        />
      </View>
      {showBallIndicator && (
        <Animated.View
          style={[
            styles.ball,
            shadowStyles,
            {
              height: renderIndicator
                ? ballIndicatorHeight
                : ballIndicatorWidth,
              bottom: ballHeight,
              left: ballIndicatorPosition,
              width: ballIndicatorWidth,
            },
            renderIndicator
              ? {}
              : {
                  backgroundColor: ballIndicatorColor,
                  borderRadius: ballIndicatorWidth,
                },
          ]}
        >
          {renderIndicator ? (
            // @ts-ignore
            renderIndicator(value._value)
          ) : (
            <Animated.Text
              style={[styles.ballText, { color: ballIndicatorTextColor }]}
            >
              {value}
            </Animated.Text>
          )}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ballText: {
    fontWeight: '900',
  },
  container: {
    overflow: 'hidden',
  },
  slider: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 0,
  },
});

export default VerticalSlider;
