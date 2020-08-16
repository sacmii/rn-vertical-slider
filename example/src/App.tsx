import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import RnVerticalSlider from 'rn-vertical-slider';

export default function App() {
  return (
    <View style={styles.container}>
      <RnVerticalSlider
        value={1}
        disabled={false}
        min={0}
        max={100}
        onChange={(value: number) => {
          console.log('CHANGE', value);
        }}
        onComplete={(value: number) => {
          console.log('COMPLETE', value);
        }}
        width={50}
        height={300}
        step={1}
        borderRadius={5}
        minimumTrackTintColor={'gray'}
        maximumTrackTintColor={'tomato'}
        showBallIndicator
        ballIndicatorColor={'gray'}
        ballIndicatorTextColor={'white'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
