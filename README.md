# rn-vertical-slider

_A vertical Slider for React Native written entirely in javascript_

## Getting Started

![Example](https://github.com/sacmii/rn-vertical-slider/blob/master/.github/example.gif)

- To add this slider to your project :

```
npm install rn-vertical-slider
```

## Usage

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

## Props

| Property               | Type     | Default | Description                                                                                   |
| :--------------------- | :------- | :------ | :-------------------------------------------------------------------------------------------- |
| value                  | number   | 0       | Value of the slider.                                                                          |
| disabled               | bool     | false   | Enable or disable slider.                                                                     |
| min                    | number   | 0       | Minimum value for slider.                                                                     |
| max                    | number   | 0       | Maximum value for slider.                                                                     |
| step                   | number   | 0       | This value describes number of stepsto skip.                                                  |
| minimumTrackTintColor  | string   | '#fff'  | The bottom color.                                                                             |
| maximumTrackTintColor  | string   | '#eee'  | The top color.                                                                                |
| onChange               | function | null    | Callback continuously called while the user is dragging the slider.                           |
| onComplete             | function | null    | Callback called when the user finishes changing the value (e.g. when the slider is released). |
| borderRadius           | number   | 0       | The border radius of component.                                                               |
| width                  | number   | 0       | Width of the slider.                                                                          |
| height                 | number   | 0       | Height of the slider.                                                                         |
| showBallIndicator      | bool     | false   | To show or hide indicator.                                                                    |
| ballIndicatorColor     | string   | '#fff'  | Background color for Indicator                                                                |
| ballIndicatorWidth     | number   | 48      | Diameter of Indicator.                                                                        |
| ballIndicatorPosition  | number   | -50     | Horizontal position of Indicator with respect to current selected value.                      |
| ballIndicatorTextColor | string   | '#fff'  | Indicator text color.                                                                         |
| animationDuration      | number   | 0       | Animation Duration                                                                            |

## Extras

- _[Gradient Slider](https://github.com/sacmii/rn-vertical-slider-gradient)_ Slider with linear gradient

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
