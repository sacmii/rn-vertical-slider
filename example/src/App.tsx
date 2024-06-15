import Ionicons from '@expo/vector-icons/Ionicons';
import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import RnVerticalSlider, { RNVSliderRef } from 'rn-vertical-slider';

const App: React.FC = () => {
  const [value, setValue] = React.useState(1);
  const ref = React.useRef<RNVSliderRef>(null);
  // Icon render
  const renderIcon = () => {
    return (
      <View style={styles.renderContainer}>
        <Animated.Text>
          <Ionicons
            name={value > 50 ? 'happy' : 'sad'}
            size={24}
            color="#fff"
          />
        </Animated.Text>
      </View>
    );
  };
  // Calculating color change based on value
  const calculateColors = () => {
    let minimumTrackTintColor = '#f3636b';
    let maximumTrackTintColor = '#18122B';
    if (value > 66) {
      minimumTrackTintColor = '#48cbae';
    } else if (value > 33) {
      minimumTrackTintColor = '#f7d033';
    }
    return { minimumTrackTintColor, maximumTrackTintColor };
  };
  // Helper functions
  const onChangeValue = (newValue: number) => {
    console.log('🚀 ~ file: App.tsx:51 ~ onChangeValue ~ value:', value);
    setValue(newValue);
  };
  const { maximumTrackTintColor, minimumTrackTintColor } = React.useMemo(
    calculateColors,
    [value]
  );
  const onManualChange = (newValue: number) => () => {
    ref.current?.setValue(newValue);
  };
  return (
    <GestureHandlerRootView style={styles.flexOne}>
      <SafeAreaView style={styles.flexOne}>
        <View style={styles.container}>
          <RnVerticalSlider
            ref={ref}
            value={value}
            disabled={false}
            min={0}
            max={100}
            step={10}
            onChange={onChangeValue}
            onComplete={(newValue: number) => {
              console.log('COMPLETE', newValue);
            }}
            showIndicator
            renderIndicatorHeight={40}
            width={50}
            height={300}
            borderRadius={5}
            maximumTrackTintColor={maximumTrackTintColor}
            minimumTrackTintColor={minimumTrackTintColor}
            renderIndicator={renderIcon}
          />
        </View>
        <View style={styles.contentBox}>
          <Text onPress={onManualChange(70)}>Set to 70</Text>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    height: 40,
    width: 50,
  },
  contentBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
});
