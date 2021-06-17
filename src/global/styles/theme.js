import { Platform } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

export default {
  colors: {
    primary: {
      main: '#387b85',
      mainBlue: '#38568a',
      mainGreen: '#387b85',
      mainPurple: '#9ea1c7',
      mainOrange: '#dc8035',
      mainLight: '#ddd8d2',
      contrastText: '#fff',
    },
    background: {
      paper: '#fff',
      paperModal: '#fafafa',
      default: '#e4dfdb',
      line: '#A8A8B355',
      transparent: 'rgba(10, 10, 10, 0.8)',
    },
    text:{
      primary: '#363F5F',
      secondary:  '#969CB2',
      grey: '#999b9d',
      dark:  '#000000',
      light:  '#fff',
    },
    status: {
      inactive:'#b0b3b5',
      attention: '#eb3b33',
      attentionHover: '#bf2407',
      success: '#5cb85c',
      fail: '#bb2011',
      warn: '#cfd220',
      info: '#5bc0de',
      orange: '#F37735',
      successDarker: '#1fb913',
      failDarker: '#880000',
      warnDarker: '#b59c0e',
      infoDarker: '#4e91d4',
    },
  },
  fonts: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    bold: 'Poppins_700Bold',
  },
  statusHeight: getStatusBarHeight()+10,
  bottomHeight: getBottomSpace()+5,
  // statusHeight: Platform.OS === 'android' ? getStatusBarHeight()+ 5 : 0,
};
