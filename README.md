# bwh: bruins with holdings
A mobile application that is a stock investment simulator and social platform. View other user’s stock portfolios, save specific stocks, and invest with fake currency into real stocks.


## Install
bwh is run through npm and Expo. 
To run the app locally, you will first need to install both:

```
npm install
npx expo install
```
The app uses `react-native-wagmi-charts` to generate the stock charts. Install the package and the neccessary react native libraries:
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

Also, install a few other dependencies:
```
npm i expo-app-loading
npm i @react-navigation/bottom-tabs
```
## Firebase
The app uses Firebase to store user data. After cloning this directory, create a `keys.js` file in the `core` folder containing the following:
```jsx
const firebaseConfig = {
   apiKey: "AIzaSyC6XJlx_CSjGIboYs74VZ1eORm3a-bPVpE",
   authDomain: "lbwh-4f21c.firebaseapp.com",
   projectId: "lbwh-4f21c",
   storageBucket: "lbwh-4f21c.appspot.com",
   messagingSenderId: "50578554285",
   appId: "1:50578554285:web:c8f9b101d429f6ffa57524"
 };
 
 export default firebaseConfig;
```

## Running app on Windows
Download Expo Go on your IOS/Android device and run the following command in your terminal inside the bwh directory:

```
expo start --tunnel
```
This will generate a QR code for you to scan which will open bwh in the Expo Go app.

## Running app on MacOS
Alternatively, on an MacOS device, the simulated devices can be ran on your device directly using options after start. 

```
expo start
```
