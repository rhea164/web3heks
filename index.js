import 'react-native-get-random-values';
import { Buffer } from 'buffer';
import process from 'process';
import './shims';
import 'react-native-crypto';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { registerRootComponent } from 'expo';
import 'node-libs-react-native/globals';  // Add this line
import crypto from 'crypto';

global.Buffer = Buffer;
global.process = process;

if (typeof global.crypto !== 'object') {
  global.crypto = {
    getRandomValues: (arr) => crypto.randomBytes(arr.length)
  };
}

registerRootComponent(App);


AppRegistry.registerComponent(appName, () => App);

