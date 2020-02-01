/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  PanResponder,
  StyleSheet,
  Easing
} from "react-native";

type Props = {
  value: number,
  disabled: boolean,
  min: number,
  max: number,
  onChange: (value: number) => void,
  onComplete: (value: number) => void,
  width: number,
  height: number,
  borderRadius: number,
  maximumTrackTintColor: string,
  minimumTrackTintColor: string,
  showBallIndicator: boolean,
  step?: number,
  ballIndicatorColor?: string,
  ballIndicatorWidth?: number,
  ballIndicatorPosition?: number,
  ballIndicatorTextColor?: string,
  animationDuration?: number,
};

type State = {
  value: number,
  preValue: number,
  sliderHeight: any,
  ballHeight: any,
  panResponder: any
};

export default class VerticalSlider extends Component<Props, State> {
  _moveStartValue = null;

  constructor(props: Props) {
    super(props);

    let panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderGrant: () => {
        this._moveStartValue = this.state.value;
      },
      onPanResponderMove: (event, gestureState) => {
        if (this.props.disabled) {
          return;
        }
        const value = this._fetchNewValueFromGesture(gestureState);
        this._changeState(value);
        if (this.props.onChange) {
          this.props.onChange(value);
        }
      },
      onPanResponderRelease: (event, gestureState) => {
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
      onPanResponderTerminate: (event, gestureState) => {
        if (this.props.disabled) {
          return;
        }
        const value = this._fetchNewValueFromGesture(gestureState);
        this._changeState(value);
        if (this.props.onComplete) {
          this.props.onComplete(value);
        }
      }
    });

    this.state = {
      value: props.value,
      preValue: props.value,
      sliderHeight: new Animated.Value(0),
      ballHeight: new Animated.Value(0),
      panResponder
    };
  }

  _fetchNewValueFromGesture(gestureState: any): number {
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
  }

  _getSliderHeight(value: number): number {
    const { min, max, height } = this.props;
    return ((value - min) * height) / (max - min);
  }

  _changeState(value: number): void {
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
      }),
      Animated.timing(this.state.ballHeight, {
        toValue: ballPosition,
        easing: Easing.linear,
        duration: animationDuration || 0
      })
    ]).start();
    this.setState({ value });
  }

  componentDidMount() {
    const { value } = this.props;
    if (value) {
      this._changeState(value);
    }
  }

  render() {
    const {
      width,
      height,
      borderRadius,
      maximumTrackTintColor,
      minimumTrackTintColor,
      showBallIndicator,
      ballIndicatorColor,
      ballIndicatorWidth,
      ballIndicatorPosition,
      ballIndicatorTextColor
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
              backgroundColor: maximumTrackTintColor
                ? maximumTrackTintColor
                : "#ECECEC"
            }
          ]}
          {...this.state.panResponder.panHandlers}
        >
          <Animated.View
            style={[
              styles.slider,
              {
                height: this.state.sliderHeight,
                width,
                backgroundColor: minimumTrackTintColor
                  ? minimumTrackTintColor
                  : "#ECECEC"
              }
            ]}
          />
        </View>
        {this.props.showBallIndicator ? (
          <Animated.View
            style={[
              styles.ball,
              styles.shadow,
              {
                width: ballIndicatorWidth ? ballIndicatorWidth : 48,
                height: ballIndicatorWidth ? ballIndicatorWidth : 48,
                borderRadius: ballIndicatorWidth ? ballIndicatorWidth / 2 : 24,
                bottom: this.state.ballHeight,
                left: ballIndicatorPosition ? ballIndicatorPosition : -60,
                backgroundColor: ballIndicatorColor
                  ? ballIndicatorColor
                  : "#ECECEC"
              }
            ]}
          >
            <Text
              style={[
                styles.ballText,
                {
                  color: ballIndicatorTextColor
                    ? ballIndicatorTextColor
                    : "#000000"
                }
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  ball: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  ballText: {
    fontWeight: "900"
  },
  container: {
    overflow: "hidden"
  },
  slider: {
    position: "absolute",
    bottom: 0
  }
});
