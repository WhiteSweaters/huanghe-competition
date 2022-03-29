/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';


LogBox.ignoreLogs([
    'Warning: BackAndroid is deprecated. Please use BackHandler instead.',
    'source.uri should not be an empty string',
    'Invalid props.style key'
])

LogBox.ignoreAllLogs(true)//关闭全部黄色警告

AppRegistry.registerComponent(appName, () => App);
