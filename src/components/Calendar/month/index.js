import React from 'react'
import { View, Text } from 'react-native'
// import useCalendar from '../../../hooks/useCalendar'
import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
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

const Container = styled.View`
  flex-direction:row;
  /* flex: 1; */
  justify-content:space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary.main};
`;


const IconButton = styled(BorderlessButton)`
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(26)}px;
`;

export default function Month({selected, setSelected,calendarRows, selectedDate, daysShort, monthNames, getNextMonth, getPrevMonth,}) {
  //// const [swipe, setSwipe] = React.useState(0)
  const X = useSharedValue(0);

  React.useEffect(() => {
    getNextWeek()
  }, [])

  const getNextWeek = () => {
    const month = parseInt(calendarRows[3][0].date.split('-')[1])
    const year = parseInt(calendarRows[3][0].date.split('-')[2])
    function getMonth() {
      if (month+1 > 12) return 1
      return (month+1)
    }
    function getYear() {
      if (month+1 > 12) return year+1
      return year
    }
    setSelected(`1-${getMonth()}-${getYear()}`)
    getNextMonth()
  }

  const getPrevWeek = () => {
    const month = parseInt(calendarRows[3][0].date.split('-')[1])
    const year = parseInt(calendarRows[3][0].date.split('-')[2])
    function getMonth() {
      if (month-1 == 0) return 12
      return (month-1)
    }
    function getYear() {
      if (month-1 == 0) return year-1
      return year
    }

    function onGetLastDay(day) {
      setSelected(`${day}-${getMonth()}-${getYear()}`)
    }

    getPrevMonth({week:onGetLastDay})
  }

  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      // console.log(e.absoluteX)
      ctx.completed = e.absoluteX;
    },
    onActive: (e, ctx) => {
      // console.log(e.translationX)
      // let newValue;
      // newValue = ctx.completed-e.absoluteX
      X.value = e.translationX
    },
    onEnd: (e, ctx) => {
      if (Math.abs(ctx.completed-e.absoluteX) < 100) {
        X.value = withSpring(0);
        // runOnJS(handleComplete)(false);
      } else if (ctx.completed-e.absoluteX > 0) { //left
        runOnJS(getNextWeek)();
        X.value = 200;
        X.value = withTiming(0, {duration: 500});

      } else if (ctx.completed-e.absoluteX < 0) { //right
        // X.value = withSpring(-100);
        runOnJS(getPrevWeek)();
        X.value = -200;
        X.value = withTiming(0, {duration: 500});
        // X.value = withSpring(H_SWIPE_RANGE);
        // withTiming(width.value, {
        //   duration: 500,
        //   easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        // }),
      }

      console.log(ctx.completed-e.absoluteX)
    },
  });

  const AnimatedStyles = {
    weekSwipe: useAnimatedStyle(() => {
      return {
        transform: [{translateX: X.value}],
        opacity: interpolate(X.value, [-200,0,200], [0,1,0], Extrapolate.CLAMP,),
        
      };
    }),
  }

  return (
    <View style={{flex:1,backgroundColor:'#aaa'}}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <IconButton onPress={getPrevWeek}>
          <Icon name='chevron-left'/>
        </IconButton>
        <Text style={{marginRight:10}}>{`${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}</Text>
        <IconButton onPress={getNextWeek}>
          <Icon name='chevron-right'/>
        </IconButton>
      </View>
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View style={[AnimatedStyles.weekSwipe]}>
          {Object.values(calendarRows).map((cols,index) => {
            return (
                <Container key={cols[0].date}>
                  {cols.map((col,indexCol) => {
                    return (
                      <View key={col.date} style={{flexDirection:'column',alignItems:'center'}}>
                        {index == 0 && <Text style={{textAlign:'center',fontSize:14,fontWeight:'bold'}} >
                          {daysShort[index]}
                        </Text>}
                        <Text >{col.value}</Text>
                      </View>
                    )
                  })}
                </Container>
            )
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}
