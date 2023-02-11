import type { Animated, PanResponderInstance } from 'react-native';

export type SliderProps = {
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
  ballIndicatorHeight?: number;
  ballIndicatorPosition?: number;
  ballIndicatorTextColor?: string;
  animationDuration?: number;
  showBackgroundShadow?: boolean;
  shadowProps?: {
    shadowOffsetWidth?: number;
    shadowOffsetHeight?: number;
    shadowOpacity?: number;
    shadowRadius?: number;
    elevation?: number;
    shadowColor?: string;
  };
  renderIndicator?: (value: number) => JSX.Element;
};

export type SliderState = {
  value: number;
  sliderHeight: Animated.Value;
  ballHeight: Animated.Value;
  panResponder: PanResponderInstance;
};
