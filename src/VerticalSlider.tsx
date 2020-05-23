import React from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  StyleSheet,
  Easing,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

interface props {
  value?: number;
  disabled?: boolean;
  min: number;
  max: number;
  onChange: (value: number) => void;
  onComplete?: (value: number) => void;
  width: number;
  height: number;
  borderRadius?: number;
  maximumTrackTintColor?: string;
  minimumTrackTintColor?: string;
  showBallIndicator?: boolean;
  step?: number;
  ballIndicatorColor?: string;
  ballIndicatorWidth?: number;
  ballIndicatorPosition?: number;
  ballIndicatorTextColor?: string;
  animationDuration?: number;
}

interface state {
  value: number;
  sliderHeight: Animated.Value;
  ballHeight: Animated.Value;
  panResponder: PanResponderInstance;
}

export default class VerticalSlider extends React.Component<props, state> {
  _moveStartValue: number = 0;

  constructor(props: props) {
    super(props);

    let panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderGrant: () => {
        this._moveStartValue = this.state.value;
      },
      onPanResponderMove: (
        _event: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        if (this.props.disabled) {
          return;
        }
        const value = this._fetchNewValueFromGesture(gestureState);
        this._changeState(value);
        if (this.props.onChange) {
          this.props.onChange(value);
        }
      },
      onPanResponderRelease: (
        _event: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        if (this.props.disabled) {
          return;
        }
        const value = this._fetchNewValueFromGesture(gestureState);
        this._changeState(value);
        if (this.props.onComplete) {
          this.props.onComplete(value);
        }
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: (
        _event: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        if (this.props.disabled) {
          return;
        }
        const value = this._fetchNewValueFromGesture(gestureState);
        this._changeState(value);
        if (this.props.onComplete) {
          this.props.onComplete(value);
        }
      },
    });

    this.state = {
      value: props.value || props.min,
      sliderHeight: new Animated.Value(0),
      ballHeight: new Animated.Value(0),
      panResponder,
    };
  }

  _fetchNewValueFromGesture = (gestureState: any): number => {
    const { min, max, step, height } = this.props;
    const ratio = -gestureState.dy / height;
    const diff = max - min;
    if (step) {
      return Math.max(
        min,
        Math.min(
          max,
          this._moveStartValue + Math.round((ratio * diff) / step) * step
        )
      );
    }
    let value = Math.max(min, this._moveStartValue + ratio * diff);
    return Math.floor(value * 100) / 100;
  };

  _getSliderHeight = (value: number): number => {
    const { min, max, height } = this.props;
    return ((value - min) * height) / (max - min);
  };

  _changeState = (value: number): void => {
    const { height, ballIndicatorWidth, animationDuration } = this.props;
    const sliderHeight = this._getSliderHeight(value);
    let ballPosition = sliderHeight;
    const ballHeight = ballIndicatorWidth ? ballIndicatorWidth : 48;
    if (ballPosition + ballHeight >= height) {
      ballPosition = height - ballHeight;
    } else if (ballPosition - ballHeight <= 0) {
      ballPosition = 0;
    } else {
      ballPosition = ballPosition - ballHeight / 2;
    }
    Animated.parallel([
      Animated.timing(this.state.sliderHeight, {
        toValue: sliderHeight,
        easing: Easing.linear,
        duration: animationDuration || 0,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.ballHeight, {
        toValue: ballPosition,
        easing: Easing.linear,
        duration: animationDuration || 0,
        useNativeDriver: false,
      }),
    ]).start();
    this.setState({ value });
  };

  componentDidMount() {
    const { value } = this.props;
    if (value) {
      this._changeState(value);
    }
  }

  render() {
    const {
      width = 350,
      height = 30,
      borderRadius = 5,
      maximumTrackTintColor = '#3F2DA5',
      minimumTrackTintColor = '#77ADE6',
      showBallIndicator = false,
      ballIndicatorColor = '#ECECEC',
      ballIndicatorWidth = 48,
      ballIndicatorPosition = -60,
      ballIndicatorTextColor = '#000000',
    } = this.props;
    const { value } = this.state;
    return (
      <View style={[{ height, width, borderRadius }]}>
        <View
          style={[
            styles.container,
            styles.shadow,
            {
              height,
              width,
              borderRadius,
              backgroundColor: maximumTrackTintColor,
            },
          ]}
          {...this.state.panResponder.panHandlers}
        >
          <Animated.View
            style={[
              styles.slider,
              {
                height: this.state.sliderHeight,
                width,
                backgroundColor: minimumTrackTintColor,
              },
            ]}
          />
        </View>
        {showBallIndicator ? (
          <Animated.View
            style={[
              styles.ball,
              styles.shadow,
              {
                width: ballIndicatorWidth,
                height: ballIndicatorWidth,
                borderRadius: ballIndicatorWidth,
                bottom: this.state.ballHeight,
                left: ballIndicatorPosition,
                backgroundColor: ballIndicatorColor,
              },
            ]}
          >
            <Text
              style={[
                styles.ballText,
                {
                  color: ballIndicatorTextColor,
                },
              ]}
            >
              {Math.round(value * 100) / 100}
            </Text>
          </Animated.View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
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
  },
});
