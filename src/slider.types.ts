import type { StyleProp, ViewStyle } from 'react-native';

export type SliderProps = {
  min: number;
  max: number;
  step?: number;
  width: number;
  height: number;
  borderRadius?: number;
  maximumTrackTintColor?: string;
  minimumTrackTintColor?: string;
  disabled?: boolean;
  onChange: (value: number) => void;
  onComplete?: (value: number) => void;
  value?: number;
  showIndicator?: boolean;
  renderIndicator?: (value: number) => JSX.Element | null;
  containerStyle?: StyleProp<ViewStyle>;
  sliderStyle?: StyleProp<ViewStyle>;
  renderIndicatorHeight?: number;
};
