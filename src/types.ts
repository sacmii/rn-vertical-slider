import { StyleProp, ViewStyle } from 'react-native';
import { SpringConfig } from 'react-native-reanimated/lib/typescript/reanimated2/animation/springUtils';

export type TSliderProps = {
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
  animationConfig?: SpringConfig;
};

export type TSliderRef = {
  setValue: (value: number) => void;
  setState: (state: boolean) => void;
};
