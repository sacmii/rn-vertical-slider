import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import VerticalSlider from 'rn-vertical-slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// heart, heart-broken

const App = () => {
  const [value, setValue] = useState(1);
  return (
    <View style={styles.container}>
      <VerticalSlider
        min={0}
        max={100}
        step={1}
        height={350}
        width={50}
        value={value}
        onChange={val => setValue(val)}
        showBackgroundShadow
      />
      {/* 

      EXAMPLE 1 : CUSTOM SLIDER INDICATOR

      <VerticalSlider
        min={0}
        max={100}
        step={1}
        height={350}
        width={50}
        value={value}
        onChange={val => setValue(val)}
        showBackgroundShadow
        maximumTrackTintColor="black"
        minimumTrackTintColor="#120056"
        showBallIndicator
        ballIndicatorPosition={0}
        renderIndicator={prop => <Icon name={prop > 50 ? 'heart' : 'heart-broken'} color={prop > 50 ? "#FF1313" : "#FBFBFB"} size={30} />}
      /> */}
      {/* 

      EXAMPLE 2 :SLIDER WITH DEFAULT INDICATOR

      <VerticalSlider
        min={0}
        max={100}
        step={1}
        height={350}
        width={50}
        value={value}
        onChange={val => setValue(val)}
        showBackgroundShadow
        maximumTrackTintColor="#008AC8"
        minimumTrackTintColor="#00BCD8"
        ballIndicatorColor="#00BCD8"
        ballIndicatorTextColor="#FFF"
        showBallIndicator
        shadowProps={{
          shadowColor: '#DDD'
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#FBFBFB'
  },
});

export default App;