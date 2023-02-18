import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import RnVerticalSlider from 'rn-vertical-slider';
import { Ionicons } from '@expo/vector-icons';

const renderIcon = (newVal: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const iconProps = React.useMemo(() => {
    let styles = {
      name: '',
      size: 30,
      color: '#FFFBF5',
    };
    if (newVal > 75) {
      styles.name = 'heart-circle-outline';
    } else if (newVal > 50) {
      styles.name = 'help-circle-outline';
    } else {
      styles.name = 'heart-dislike-circle-outline';
    }
    return styles;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVal]);
  return (
    <View>
      <Animated.Text>
        {/* @ts-ignore */}
        <Ionicons {...iconProps} />
      </Animated.Text>
    </View>
  );
};

const App: React.FC = () => {
  const [value, setValue] = React.useState(1);
  return (
    <View style={styles.container}>
      <RnVerticalSlider
        value={value}
        disabled={false}
        min={0}
        max={100}
        onChange={setValue}
        onComplete={(newValue: number) => {
          console.log('COMPLETE', newValue);
        }}
        width={50}
        height={300}
        step={1}
        showBackgroundShadow={false}
        borderRadius={5}
        maximumTrackTintColor="#18122B"
        minimumTrackTintColor="#635985"
        showBallIndicator
        renderIndicator={renderIcon}
        ballIndicatorWidth={50}
        ballIndicatorHeight={50}
        ballIndicatorPosition={0}
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
