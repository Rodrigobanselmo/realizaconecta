import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Keyboard, ScrollView, UIManager, LayoutAnimation, Platform, StyleSheet } from 'react-native';
import styled, {css} from "styled-components/native";
import Toast from 'react-native-toast-message';
import { Button } from '../../components/Form/Button';
import {CheckEmailExists,CreateEmail,RecoveryPass,SignInEmail,LogOut} from '../../services/firebaseAuth'
import { useSelector, useDispatch } from 'react-redux';
import Week from '../../components/Calendar/week';
import Month from '../../components/Calendar/month';
import useCalendar from '../../hooks/useCalendar'
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { Header } from '../../components/Main/Header';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';

export const ScreenView = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.paper};
`;

export const HandleButton = styled.TouchableOpacity`
  flex: 1;
`;

export const AnimatedView = styled(Animated.View)`
  flex: 1;
  border-radius:5px;
  padding:20px;
  padding-top: ${RFValue(5)}px;
  padding-bottom: ${RFValue(5)}px;
  max-height: ${RFValue(30)}px;
  min-height: ${RFValue(30)}px;
  margin-left:20px;
  margin-right:20px;
`;

export const HandleView = styled.View`
	align-self: center;
  height:${RFValue(6)}px;
  width:45px;
  margin-top: ${RFValue(5)}px;
  border-radius:5px;
  background-color: ${({ theme }) => theme.colors.background.line};
`;

const IconButton = styled(BorderlessButton)`
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(26)}px;
  color: ${({ theme }) => theme.colors.text.light};
  opacity:0.8;
`;
export const HeaderText = styled.Text`
	font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text.light};
  opacity:0.5;
  padding-left:20px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const TodayButton = styled.TouchableOpacity`
  flex-direction:row;
	align-items: center;
  flex:1;
  justify-content:flex-end;
  padding-right:10px;
`;

export const TodayText = styled.Text`
	font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text.light};
  opacity:0.5;
  padding-right:10px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;
export const TodayIcon = styled(Feather)`
	font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text.light};
  opacity:0.8;
`;


const BottomView = styled(Animated.View)`
  flex:1;
  /* background-color: #fff; */
  margin-top:${RFValue(-80)}px;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-top-left-radius:30px;
  border-top-right-radius:30px;
  transform: translateY(0);
  /* min-height:60px; */
`;


const SafeContainer = styled(LinearGradient)`
  flex: 1;
  padding-top: ${({theme})=>theme.statusHeight}px;
  padding-bottom: ${({theme})=>theme.bottomHeight}px;
`;
const Container = styled(LinearGradient)`
  padding-top: ${({theme})=>theme.statusHeight}px;
  /* flex: 1; */
  padding-bottom:${RFValue(95)}px;
  ${props => props.swipe && css`
    /* height: ${RFValue(450)}px; */
  `}
  /* padding: 0 18px; */
`;
export const HeaderView = styled.View`
	width: 100%;
	align-items: center;
	/* justify-content: center; */
	flex-direction:row;
  padding: ${RFValue(5)}px ${RFValue(7)}px ${RFValue(15)}px ${RFValue(7)}px;
  
  /* padding: ${RFValue(5)}px ${RFValue(7)}px ${RFValue(10)}px ${RFValue(7)}px;
  margin-bottom:${RFValue(10)}px;
  border-bottom-color:#ffffff33;
  border-bottom-width:1px; */

`;

export default function Splash({navigation}) {

  const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getTodayMonth, getNextMonth, getPrevMonth } = useCalendar();
  const [selected, setSelected] = React.useState(todayFormatted)
  const [swipe, setSwipe] = React.useState(false)
  const monthRef = React.useRef(null)

  const X = useSharedValue(0);

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  function handleContinue() {
    navigation.navigate('Auth')
  }
  const user = useSelector(state => state.user);
  // console.log('userw',user)
  const dispatch = useDispatch();
  //         onPress={}

  function name() {
    LogOut(()=>dispatch({type: 'LOGOUT_USER'}))
    dispatch({type: 'LOGOUT_USER'})
  }

  function handleTodayButton() {
    getTodayMonth()
    setSelected(todayFormatted)
    monthRef.current.scrollToIndex({index:parseInt(todayFormatted.split('-')[1])-1,animated:true,viewOffset:RFValue(50)})
  }

  function handleHandleBar() {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
          500,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity
        )        
    );
    setSwipe(swipe=>!swipe)
  }

  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.completed = false;
      ctx.swipe = swipe;
    },
    onActive: (e, ctx) => {
      console.log(e)
      if (!ctx.swipe && e.translationY >= 0 && !ctx.completed ) {
        console.log(e.translationY)
        if (e.translationY>40) { 
          runOnJS(handleHandleBar)();
          ctx.completed =true
        }
        if (e.translationY<=40)  X.value = e.translationY
      }
      
      if (ctx.swipe && e.translationY <= 0 && !ctx.completed) {
        console.log(e.translationY)
        if (e.translationY < -40) { 
          runOnJS(handleHandleBar)();
          ctx.completed =true
        }
        if (e.translationY >= -40 )  X.value = e.translationY
      }
    },
    onEnd: (e, ctx) => {
      ctx.completed =false
      X.value = withTiming(0)

      // if (Math.abs(ctx.completed-e.absoluteX) < 100) {
        // X.value = withTiming(0);

      // } else if (ctx.completed-e.absoluteX > 0) { //left
      //   // runOnJS(getNextWeek)();
      //   X.value = 300;
      //   X.value = withTiming(0, {duration: 500});

      // } else if (ctx.completed-e.absoluteX < 0) { //right

      //   // runOnJS(getPrevWeek)();
      //   X.value = -300;
      //   X.value = withTiming(0, {duration: 500});
        
      //   // X.value = withSpring(H_SWIPE_RANGE);
      //   // withTiming(width.value, {
      //   //   duration: 500,
      //   //   easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      //   // }),
      // }

      // console.log(ctx.completed-e.absoluteX)
    },
  });

  const AnimatedStyles = {
    weekSwipe: useAnimatedStyle(() => {
      return {
        transform: [{translateY: X.value}],
        // height:100+X.value,
        // opacity: interpolate(X.value, [-600,0,600], [0,1,0], Extrapolate.CLAMP,),
        
      };
    }),
    // selectedColor: useAnimatedStyle(() => {
    //   return {
    //     backgroundColor: interpolateColor(
    //       COLOR.value,
    //       [0, 1],
    //       ['#4ba8b6','#4ba8b600'],
    //     ),
    //   };
    // }),
  }

  return (
    <ScreenView contentContainerStyle={{paddingBottom: 20,flex:1}} bounces={false} >
    <Container swipe={swipe} colors={['#387b85', '#22474c']}>
      <HeaderView>
        <IconButton onPress={()=>navigation.goBack()}>
          <Icon name='chevron-left'/>
        </IconButton>
        <HeaderText>Agendamento</HeaderText>
        <TodayButton onPress={handleTodayButton}> 
          <TodayText>Hoje</TodayText>
          <TodayIcon name='calendar'/>
        </TodayButton>
      </HeaderView>
      <Week selected={selected} monthRef={monthRef} swipe={swipe} setSelected={setSelected} todayFormatted={todayFormatted} calendarRows={calendarRows} selectedDate={selectedDate} daysShort={daysShort} monthNames={monthNames} getNextMonth={getNextMonth} getPrevMonth={getPrevMonth}/>
      {/* <Month selected={selected} setSelected={setSelected} calendarRows={calendarRows} selectedDate={selectedDate} daysShort={daysShort} monthNames={monthNames} getNextMonth={getNextMonth} getPrevMonth={getPrevMonth}/> */}
      {/* <Button
        text='LOGOUT'
        onPress={name}
        /> */}
    </Container>
    <BottomView style={[AnimatedStyles.weekSwipe]}>
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <AnimatedView >
          <HandleButton onPress={handleHandleBar}>
              <HandleView/>
          </HandleButton>
        </AnimatedView>
      </PanGestureHandler>
    </BottomView>
    </ScreenView>
    // <SafeContainer colors={['#4c669f', '#3b5998', '#192f6a']}>
    //   { user &&
    //   }
    // </SafeContainer>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.98,
    shadowRadius: 16.00,

    elevation: 8,
  },
});

// {/* <LinearGradient
// // Button Linear Gradient

// style={styles.button}>
// <Text style={styles.text}>Sign in with Facebook</Text>
// </LinearGradient> */}