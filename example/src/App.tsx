import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import RnVerticalSlider from 'rn-vertical-slider';

const App: React.FC = () => {
  const [value, setValue] = React.useState(0);
  return (
    <View style={styles.container}>
      <RnVerticalSlider
        value={value}
        disabled={false}
        min={0}
        max={100}
        onChange={setValue}
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
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
