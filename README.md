# bwh: bruins with holdings
A mobile application that is a stock investment simulator and social platform. View other user’s stock portfolios, save specific stocks, and invest with fake currency into real stocks.


## Install

First, clone the bwh repository
```
git clone https://github.com/clairezhang03/bwh
```

bwh is run on Expo. To run the app locally, install the Expo command line interface:

```
npm install -g expo-cli
```
and run `npm install` in the (inner) bwh directory.

The app uses `react-native-wagmi-charts` to generate the stock charts. Install the package and the necessary react native libraries:
```
npm install react-native-wagmi-charts
```
```
npm install react-native-reanimated react-native-gesture-handler react-native-haptic-feedback
```

React native reanimated has a couple bugs at the moment, and you may need to manually configure `babel.config.js` to reflect the following:
```jsx
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

Also, install a few other libraries:
```
npm install expo-app-loading
npm install @react-navigation/bottom-tabs
```
## Firebase
The app uses Firebase to store user data. Generate the necessary keys from the Firebase website. Create a `keys.js` file in the `core` folder containing the following:
```jsx
const firebaseConfig = {
   [insert config keys here]
 };
 
 export default firebaseConfig;
```

## Running app on Windows
Download Expo Go on your IOS/Android device and run the following command in your terminal inside the (inner) bwh directory:

```
expo start --tunnel
```
This will generate a QR code for you to scan which will open bwh in the Expo Go app.

## Running app on MacOS
Alternatively, on an MacOS device, the simulated devices can be ran on your device using XCode using options after start. Run the following command in your terminal inside the (inner) bwh directory.

```
expo start
```

If "command not found: expo" error occurs, run `npx expo start` instead.
