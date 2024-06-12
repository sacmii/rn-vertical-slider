# :control_knobs: rn-vertical-slider

A highly customizable vertical slider component for React Native using React Native Gesture Handler and Reanimated. Support this project with a ★ on [**Github**](https://github.com/sacmii/rn-vertical-slider).

<img src="https://user-images.githubusercontent.com/12546974/219866420-4796142d-396f-4b31-996a-89f570f7a863.gif" alt="Alt text" width="250">

## :inbox_tray: Installation

You can install this package using either Yarn or NPM.

### <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/1200px-Npm-logo.svg.png" alt="Alt text" width="50">

```bash
npm install rn-vertical-slider
```

### <img src="https://raw.githubusercontent.com/yarnpkg/assets/master/yarn-kitten-full.png" alt="Alt text" width="50">

```bash
yarn add rn-vertical-slider
```

**rn-vertical-slider** requires [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) and [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/) to be installed, which are peer dependencies.

## :bulb: Usage

```jsx
import React, { useState } from 'react';
import { View } from 'react-native';
import VerticalSlider from 'rn-vertical-slider';

function App() {
  const [value, setValue] = useState(0);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <VerticalSlider
        value={value}
        onChange={(value) => setValue(value)}
        height={200}
        width={40}
        step={1}
        min={0}
        max={100}
        borderRadius={5}
        minimumTrackTintColor="#2979FF"
        maximumTrackTintColor="#D1D1D6"
        showIndicator
        renderIndicator={() => (
          <View
            style={{
              height: 40,
              width: 80,
              backgroundColor: '#2979FF',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff' }}>{value}</Text>
          </View>
        )}
        containerStyle={{ backgroundColor: '#e0e0e0', borderRadius: 10 }}
        sliderStyle={{ backgroundColor: '#fff', borderRadius: 5 }}
      />
    </View>
  );
}
```

<img src="https://user-images.githubusercontent.com/12546974/219865670-04781857-d2eb-48b5-a14d-104d73bdc928.gif" alt="Alt text" width="250">

## :book: Props

| Property              | Type     | Default    | Description                                                       |
| :-------------------- | :------- | :--------- | :---------------------------------------------------------------- |
| min                   | number   | 0          | Minimum value of the slider                                       |
| max                   | number   | 100        | Maximum value of the slider                                       |
| step                  | number   | 1          | Step value for the slider                                         |
| width                 | number   | 350        | Width of the slider                                               |
| height                | number   | 30         | Height of the slider                                              |
| borderRadius          | number   | 5          | Border radius of the slider                                       |
| maximumTrackTintColor | string   | '#3F2DA5'  | Color of the track for the maximum value                          |
| minimumTrackTintColor | string   | '#77ADE6'  | Color of the track for the minimum value                          |
| disabled              | boolean  | false      | Whether the slider is disabled                                    |
| onChange              | function | () => {}   | Callback function called when the slider value changes            |
| onComplete            | function | () => {}   | Callback function called when the slider value change is complete |
| value                 | number   | 0          | Current value of the slider                                       |
| showIndicator         | boolean  | false      | Whether to show the value indicator                               |
| renderIndicatorHeight | number   | 40         | Height of the custom indicator                                    |
| renderIndicator       | function | () => null | Function to render a custom indicator                             |
| containerStyle        | object   | {}         | Custom styles for the slider container                            |
| sliderStyle           | object   | {}         | Custom styles for the slider                                      |

## :art: Demo

You can try the [example app](https://github.com/sacmii/rn-vertical-slider/tree/master/example) by cloning this repo and running the following commands:

```sh
cd example
yarn install
npx expo start
```

## :handshake: Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you find a bug or have a feature request. See the [contributing guide](https://github.com/sacmii/rn-vertical-slider/blob/master/CONTRIBUTING) to learn how to contribute to the repository and the development workflow.

## :scroll: License

This project is licensed under the [MIT License](https://github.com/sacmii/rn-vertical-slider/blob/master/LICENSE).
