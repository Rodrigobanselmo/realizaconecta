import React, { useContext } from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
// import Entypo from 'react-native-vector-icons/Entypo';
import { Text,StyleSheet,View,TouchableOpacity } from 'react-native';
import styled, {ThemeContext} from "styled-components/native";
import { getBottomSpace } from 'react-native-iphone-x-helper';

console.log(getBottomSpace())

const ContainerTabArea = styled.View`
    padding-bottom:${({theme})=>parseInt(theme.bottomHeight)>0?25:15}px;
    padding-top:15px;
    background-color: ${({theme})=>theme.colors.background.paper};
    flex-direction:row;
    /* margin:10px; */
    /* margin-bottom:${({theme})=>theme.bottomHeight-5}px; */
    /* border-radius: 60px; */
    /* border-top-left-radius:15px; */
    /* border-top-right-radius:15px; */

`;

export default ({ state, navigation }) => {


  const themeContext = useContext(ThemeContext);
  
  const goTo = (screenName) => {
      navigation.navigate(screenName);
  }

  return (
    <ContainerTabArea style={styles.TabArea}>  
      <TouchableOpacity onPress={()=>goTo('Home')} style={styles.TabItem} >
          <Ionicons name="ios-home" color={themeContext.colors.primary.main} size={23} style={{opacity: state.index===0? 1 : 0.5}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>goTo('Profile')} style={styles.TabItem} >
        <Ionicons name="ios-person" color={themeContext.colors.primary.main} size={23} style={{opacity: state.index===1? 1 : 0.5}} />
      </TouchableOpacity>
    </ContainerTabArea>
  );
}
const styles = StyleSheet.create({
  TabArea: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.28,
    shadowRadius: 2.00,
    elevation:12,
  },
  TabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  TabItemCenter: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e2e2e2',
    borderRadius: 35,
    borderColor: '#d2d2d2',
    borderWidth: 1,
    elevation:26,
    borderStyle: 'solid',	
  },
  TextTab: {
    fontSize:12,
    color: '#fff',
  },
  AvatarIcon: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
});
