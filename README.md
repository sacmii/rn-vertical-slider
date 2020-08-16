# 🆕 React Native Vertical Slider 🎚

#### **(rn-vertical-slider)**

###### A vertical Slider for React Native written entirely in javascript. Support this project with a ★ on [**Github**](https://github.com/sacmii/rn-vertical-slider).

## ✨Features

- 📝 Completely written in Typescript
- 🔗 No Native linking required

![Example1](https://user-images.githubusercontent.com/12546974/82729464-63a73d00-9d15-11ea-99dc-e432e61d8398.gif) ![Example2](https://user-images.githubusercontent.com/12546974/82730380-b0dadd00-9d1c-11ea-889d-03249c6b5f76.gif)

## 🏁 Getting Started

- To add this slider to your project :

```
npm install rn-vertical-slider
```

## 🎨 Usage

- A basic example of slider

```
<VerticalSlider
          value={1}
          disabled={false}
          min={0}
          max={100}
          onChange={(value: number) => {
            console.log("CHANGE", value);
          }}
          onComplete={(value: number) => {
            console.log("COMPLETE", value);
          }}
          width={50}
          height={300}
          step={1}
          borderRadius={5}
          minimumTrackTintColor={"gray"}
          maximumTrackTintColor={"tomato"}
          showBallIndicator
          ballIndicatorColor={"gray"}
          ballIndicatorTextColor={"white"}
        />
```

## 🎛 Props

| Property               | Type     | Default   | Description                                                                                   |
| :--------------------- | :------- | :-------- | :-------------------------------------------------------------------------------------------- |
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
| animationDuration      | number   | 0         | Animation Duration                                                                            |
| showBackgroundShadow   | boolean  | 0         | Display shadow on Indicator (If available) and Slider                                         |
| shadowProps            | object   | see below | Shadow Configuration for Slider                                                               |
| renderIndicator        | boolean  | 0         | Render a custom slider indicator                                                              |

- #### shadowProps

shadowProps define the shadow properties for slider (Indicator Component if shown)
Default Props :

```
  {
      shadowOffsetWidth = 0,
      shadowOffsetHeight = 1,
      shadowOpacity = 0.22,
      shadowRadius = 2.22,
      elevation = 3,
      shadowColor = '#000',
 }
```

- #### renderIndicator

renderIndicator is used when you want to use custom indicator for the slider. _ballIndicatorHeight_, _ballIndicatorWidth_ will define the height and width of the component.

- ##### Custom renderIndicator

  ![Custom Indicator](https://user-images.githubusercontent.com/12546974/82730062-89831080-9d1a-11ea-8f41-b37d02b79a69.gif)

## 📌 Extras

- _[Gradient Slider](https://github.com/sacmii/rn-vertical-slider-gradient)_ Slider with linear gradient
- **Github** ★'s are more additcting than Coffee 🤩

## ☀️ License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 🚧 Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
