import React, {memo, useState,useEffect} from 'react';
import {View,Text,ActivityIndicator,TouchableOpacity, Dimensions,TextInput,Platform,StyleSheet,ScrollView,Animated,Easing, Keyboard,Modal,KeyboardAvoidingView,TouchableWithoutFeedback} from 'react-native';
import { useSelector } from 'react-redux';
// import * as Animatable from 'react-native-animatable';
import {ThemeContext} from "styled-components";



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Loader = () => {
  const loader = useSelector(state => state.loader);
  const theme = React.useContext(ThemeContext)
  
  if (loader !== false && !loader) return null

  return (
    <Modal visible={loader} transparent>
      <View style={{flex:1,backgroundColor: 'rgba(10, 10, 10, 0.8)',justifyContent:`center`,alignItems:"center"}}>
        <ActivityIndicator
          color={theme.colors.primary.main}
          size="large"
        />
      </View>
    </Modal>
  );
}

// import LottieView from 'lottie-react-native';
// <LottieView style={{height:400,width:400}} source={require('../../../assets/animations/loader4.json')} speed={0.9} autoPlay loop />
