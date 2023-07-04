import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
    <View style={styles.renderContainer}>
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
    <GestureHandlerRootView style={styles.flexOne}>
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
          showIndicator
          renderIndicatorHeight={40}
          width={50}
          height={300}
          step={1}
          borderRadius={5}
          maximumTrackTintColor="#18122B"
          minimumTrackTintColor="#635985"
          renderIndicator={renderIcon}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  container: {
    flex: 1,
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
});
