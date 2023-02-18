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

**rn-vertical-slider** requires [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) to be installed, which is a peer dependency. This is a breaking change from version 2 to version 3.


## :bulb: Usage

```bash
import VerticalSlider from 'rn-vertical-slider';

function App() {
  const [value, setValue] = useState(0);
  return (
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
      showBallIndicator
      ballIndicatorColor="#2979FF"
      ballIndicatorTextColor="#fff"
      ballIndicatorWidth={80}
      ballIndicatorHeight={40}
    />
  );
}
```

<img src="https://user-images.githubusercontent.com/12546974/219865670-04781857-d2eb-48b5-a14d-104d73bdc928.gif" alt="Alt text" width="250">

## :book: Props

| Property               | Type     | Default   | Description                                                                                   |
|:-----------------------|:---------|:----------|:----------------------------------------------------------------------------------------------|
| value                  | number   | 0         | Value of the slider.                                                                          |
| disabled               | bool     | false     | Enable or disable slider.                                                                     |
| min                    | number   | 0         | Minimum value for slider.                                                                     |
| max                    | number   | 0         | Maximum value for slider.                                                                     |
| onChange               | function | null      | Callback continuously called while the user is dragging the slider.                           |
| onComplete             | function | null      | Callback called when the user finishes changing the value (e.g. when the slider is released). |
| width                  | number   | 0         | Width of the slider.                                                                          |
| height                 | number   | 0         | Height of the slider.                                                                         |
| borderRadius           | number   | 0         | The border radius of component.                                                               |
| maximumTrackTintColor  | string   | '#eee'    | The top color.                                                                                |
| minimumTrackTintColor  | string   | '#fff'    | The bottom color.                                                                             |
| showBallIndicator      | bool     | false     | To show or hide indicator.                                                                    |
| step                   | number   | 0         | This value describes number of steps to skip.                                                 |
| ballIndicatorColor     | string   | '#fff'    | Background color for Indicator                                                                |
| ballIndicatorWidth     | number   | 48        | Diameter of Indicator. [Height of Indicator : If renderIndicator present]                     |
| ballIndicatorHeight    | number   | 48        | Diameter of Indicator. [Width of Indicator : If renderIndicator present]                      |
| ballIndicatorPosition  | number   | -50       | Horizontal position of Indicator with respect to current selected value.                      |
| ballIndicatorTextColor | string   | '#fff'    | Indicator text color.                                                                         |
| showBackgroundShadow   | boolean  | 0         | Display shadow on Indicator (If available) and Slider                                         |
| shadowProps            | object   | see below | Shadow Configuration for Slider                                                               |
| renderIndicator        | boolean  | 0         | Render a custom slider indicator      

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
