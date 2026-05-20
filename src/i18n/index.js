import {NativeModules, Platform} from 'react-native';
import id from './id';
import en from './en';

const deviceLanguage =
  Platform.OS === 'android'
    ? NativeModules.I18nManager?.localeIdentifier
    : null;

const isIndonesian =
  deviceLanguage && deviceLanguage.startsWith('id');

const strings = isIndonesian ? id : en;

export default strings;
export {id, en};
