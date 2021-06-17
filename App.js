import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import theme from './src/global/styles/theme';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Routes } from './src/routes';
import {store, persistor } from './store';
// import  Auth from './src/hooks/useAuthChange';
import Auth from './src/components/Main/Auth';


export default function App() {
	
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  return (
    <>
    <StatusBar style='auto'/>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Auth fontsLoaded={fontsLoaded}>
          <ThemeProvider theme={theme}>
            <Routes/>
          </ThemeProvider>
        </Auth>
      </PersistGate>
    </Provider>
    </>
  );
}