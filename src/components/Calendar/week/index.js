import React, {useRef,useState,useEffect} from 'react'
import { View, Text,useWindowDimensions } from 'react-native'
// import useCalendar from '../../../hooks/useCalendar'
import styled, {css} from "styled-components/native";
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

const YearText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.primary.contrastText};
  opacity:0.7;
  padding-right:${RFValue(25)}px;
  text-align: right;
  font-size:  ${RFValue(10)}px;
`;


const WeekNamesText = styled.Text`
  text-align: center;
  /* flex: 1; */
  margin-bottom:13px;
  font-size:  ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.primary.contrastText};
  opacity:0.6;

  ${props => props.swipe && css`
    font-family: ${({ theme }) => theme.fonts.bold};
  `}

`;


const DayText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.primary.contrastText};
  
  ${props => props.isOtherMonth && css`
    opacity:0.3;
  `}

  
`;

const CircleView = styled.View`
  flex-direction: column;
  border-radius: 30px;
  height: ${RFValue(32)}px;
  width: ${RFValue(32)}px;
  align-items: center;
  justify-content:center;
  background-color: #00000000;
  position:relative;

  ${props => props.swipe && props.isSelected && css`
    background-color: #4ba8b6;
  `}

  ${props => props.isToday && css`
    background-color: #4ba8b6;
    ${props => props.swipe && css`
      border-radius: 10px;
    `}
  `}

`;

const SmallCircle = styled.View`
  position:absolute;
  bottom:${RFValue(3)}px;
  right:${RFValue(14.5)}px;
  background-color: #4ba8b6;

  border-radius: 5px;
  height: ${RFValue(4)}px;
  width: ${RFValue(4)}px;


  ${props => props.isToday && css`
    background-color:  ${({ theme }) => theme.colors.primary.contrastText};
  `}

  ${props => props.isSelected && css`
    background-color:  ${({ theme }) => theme.colors.primary.contrastText};
  `}
 
`;

const DayButton = styled.TouchableOpacity`
  margin: ${RFValue(8)}px 2px ${RFValue(8)}px 2px;
  border-radius:30px;
  flex-direction:column;
  z-index:1;
  background-color: #00000000;

  ${props => props.isSelected && css`
    margin: 0;
    padding: ${RFValue(8)}px 2px ${RFValue(8)}px 2px;
    background-color: #4ba8b6;
  `}

  ${props => props.swipe && css`
    padding: 0;
    margin: 0;
    background-color: transparent;
  `}

`;

const AnimatedView = styled(Animated.View)`
  border-radius:30px;
  
  ${props => props.isSelected && css`
    /* background-color: #4ba8b6; */
  `}
`;

const ContainerDay = styled.View`
  flex: 1;
  margin-top: ${RFValue(12)}px;
  align-items: center;
  /* transform:translateY(-${RFValue(38)}px); */
  z-index:1;

  ${props => props.swipe && css`
    /* transform:translateY(0px); */
  `}
`;

const MonthButton = styled.TouchableOpacity`
`;

const MonthText = styled.Text`
  /* background-color: ${({ theme }) => theme.colors.primary.main}; */
  width:${({ width }) => RFValue(width)}px;
  color: ${({ theme }) => theme.colors.primary.contrastText};
	font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
	margin-right: ${RFValue(10)}px;
	margin-left: ${RFValue(10)}px;
  opacity:0.5;
  ${props => props.month && css`
    opacity:1;
  `}
`;

const Container = styled.View`
  flex-direction:row;
  position:relative;
  /* flex: 1; */
  justify-content:space-between;
  align-items: center;
  /* background-color: ${({ theme }) => theme.colors.primary.main}; */
`;

const MonthList = styled.FlatList`
  /* margin-top:${RFValue(0)}px; */
`;

const IconButton = styled(BorderlessButton)`
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(26)}px;
`;

export default function Week({selected,swipe,monthRef, setSelected, calendarRows, selectedDate, daysShort, monthNames, getNextMonth, getPrevMonth, todayFormatted}) {

  const window = useWindowDimensions();
  
  const X = useSharedValue(0);
  // const COLOR = useSharedValue(1);

  useEffect(() => {
    setTimeout(() => {
      monthRef.current.scrollToIndex({index:selectedDate.getMonth(),animated:true})
    }, 1000);
  }, [])

  const getNextWeek = () => {

    if (swipe) {
      const month = parseInt(calendarRows[3][0].date.split('-')[1])
      function getMonth() {
        if (month+1 > 12) return 1
        return (month+1)
      }
      getNextMonth()
      setSelected('1-'+getMonth()+'-'+selected.split('-')[2])
      return monthRef.current.scrollToIndex({index:getMonth(),animated:true,viewOffset:RFValue(50)})
    }

    Object.keys(calendarRows).map(key=>{

      if (calendarRows[key].findIndex( i=>i.date== selected) != -1 && parseInt(key) == 5 && calendarRows[6] && calendarRows[6].findIndex( i=>i.classes== '') == -1) {
        const month = parseInt(calendarRows[3][0].date.split('-')[1])
        const year = parseInt(calendarRows[3][0].date.split('-')[2])

        function getDay() {
          if (calendarRows[5][6].classes != '') return (calendarRows[5][6].value+1)
          return 1
        }
        function getMonth() {
          if (month+1 > 12) return 1
          return (month+1)
        }
        function getYear() {
          if (month+1 > 12) return year+1
          return year
        }
        setSelected(`${getDay()}-${getMonth()}-${getYear()}`)
        getNextMonth()
        monthRef.current.scrollToIndex({index:getMonth()-1,animated:true,viewOffset:RFValue(50)})
      }


        if (calendarRows[key].findIndex( i=>i.date== selected) != -1 && calendarRows[parseInt(key)+1]) {
        setSelected(calendarRows[parseInt(key)+1][0].date)
      } else if (calendarRows[key].findIndex( i=>i.date== selected) != -1 && !calendarRows[parseInt(key)+1]) {
        const month = parseInt(calendarRows[3][0].date.split('-')[1])
        const year = parseInt(calendarRows[3][0].date.split('-')[2])

        function getDay() {
          if (calendarRows[6][6].classes != '') return (calendarRows[6][6].value+1)
          return 1
        }
        function getMonth() {
          if (month+1 > 12) return 1
          return (month+1)
        }
        function getYear() {
          if (month+1 > 12) return year+1
          return year
        }
        setSelected(`${getDay()}-${getMonth()}-${getYear()}`)
        getNextMonth()
        monthRef.current.scrollToIndex({index:getMonth()-1,animated:true,viewOffset:RFValue(50)})
      }
    })
  }

  const getPrevWeek = () => {
    
    if (swipe) {
      const month = parseInt(calendarRows[3][0].date.split('-')[1])
      getPrevMonth()
      function getMonth() {
        if (month-1 == 0) return 12
        return (month-1)
      }
      setSelected('1-'+getMonth()+'-'+selected.split('-')[2])
      return  monthRef.current.scrollToIndex({index:getMonth(),animated:true,viewOffset:RFValue(50)})
    }
    
    Object.keys(calendarRows).map(key=>{

      if (calendarRows[key].findIndex( i=>i.date== selected) != -1 && calendarRows[parseInt(key)-1]) {
        const prevWeek = calendarRows[parseInt(key)-1][0].date
        const firstDayPrevWeek = parseInt(prevWeek.split('-')[0])
        const actualDay = parseInt(selected.split('-')[0])

        setSelected(
          firstDayPrevWeek>actualDay?
            '1-'+selected.split('-').slice(1,3).join('-')
          :
            prevWeek
        )
        // COLOR.value = withTiming(0, {duration: 600})

      } else if (calendarRows[key].findIndex( i=>i.date== selected) != -1 && !calendarRows[parseInt(key)-1]) {

        const month = parseInt(calendarRows[3][0].date.split('-')[1])
        const year = parseInt(calendarRows[3][0].date.split('-')[2])

        function getDay(day) {
          if (calendarRows[1][0].classes != '') return (calendarRows[1][0].value-7)
          if (day>selected.split('-')[0]) return 1
          return false
        }
        function getMonth() {
          if (month-1 == 0) return 12
          return (month-1)
        }
        function getYear() {
          if (month-1 == 0) return year-1
          return year
        }

        function onGetLastDay(day) {
          const actual = getDay(day);
          setSelected(`${actual?actual:day}-${getMonth()}-${getYear()}`)
          // COLOR.value = withTiming(0, {duration: 600})
        }

        getPrevMonth({week:onGetLastDay})
        monthRef.current.scrollToIndex({index:getMonth()-1,animated:true,viewOffset:RFValue(50)})
      }
    })
  }

  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.completed = e.absoluteX;
    },
    onActive: (e, ctx) => {
      X.value = e.translationX
    },
    onEnd: (e, ctx) => {
      if (Math.abs(ctx.completed-e.absoluteX) < 100) {
        X.value = withSpring(0);

      } else if (ctx.completed-e.absoluteX > 0) { //left
        runOnJS(getNextWeek)();
        X.value = 300;
        X.value = withTiming(0, {duration: 500});

      } else if (ctx.completed-e.absoluteX < 0) { //right

        runOnJS(getPrevWeek)();
        X.value = -300;
        X.value = withTiming(0, {duration: 500});
        
        // X.value = withSpring(H_SWIPE_RANGE);
        // withTiming(width.value, {
        //   duration: 500,
        //   easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        // }),
      }

      // console.log(ctx.completed-e.absoluteX)
    },
  });

  const AnimatedStyles = {
    weekSwipe: useAnimatedStyle(() => {
      return {
        transform: [{translateX: X.value}],
        // height:100+X.value,
        opacity: interpolate(X.value, [-600,0,600], [0,1,0], Extrapolate.CLAMP,),
        
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
  const width = [80,110,135,85,70,70,85,80,100,125,110,145,140,80]

  function widthArray() {

    const value = width.map((item,index)=>{
      var element = 0;
      for (let i = 0; i <= index; i++) {
        element = element +  RFValue(width[i] + 20)
      }
      return element
    })
    return value
  }

  const renderItem = ({ item,index }) => {

    function newMonth() {
      getNextMonth({num:index-1})
      if (index ==13) {
        monthRef.current.scrollToIndex({index:1,animated:true,viewOffset:RFValue(50)})
        return setSelected(`1-1-${parseInt(selected.split('-')[2])+1}`)
      } 
      if (index ==0) {
        monthRef.current.scrollToIndex({index:12,animated:true,viewOffset:RFValue(50)})
        return setSelected(`1-12-${parseInt(selected.split('-')[2])-1}`)
      } 
      
      setSelected(`1-${index}-${selected.split('-')[2]}`)
      monthRef.current.scrollToIndex({index,animated:true,viewOffset:RFValue(50)})
    }

    return (
      <MonthButton onPress={newMonth}>
        <MonthText 
        numberOfLines={1}
        adjustsFontSizeToFit 
        width={width[index]} 
        month={monthNames[selectedDate.getMonth()]===item}
        >
          {item}
        </MonthText>
        {monthNames[selectedDate.getMonth()]===item&&<YearText>{selected.split('-')[2]}</YearText>}
      </MonthButton>
  )};

  return (
    <View>
      <MonthList
        ref={monthRef}
        data={[parseInt(selected.split('-')[2])-1,...monthNames,parseInt(selected.split('-')[2])+1]}
        renderItem={renderItem}
        keyExtractor={item => String(item)}
        showsHorizontalScrollIndicator={false}
        snapToOffsets={widthArray()}
        decelerationRate={'fast'}
        contentContainerStyle={{paddingLeft:50, paddingRight:0}}
        // snapToStart={false}
        // snapToEnd={false}
        snapToAlignment="center"
        // snapToInterval={150}
        // pagingEnabled
        horizontal
      />
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View style={[AnimatedStyles.weekSwipe]}>
          {Object.values(calendarRows).map((cols,index) => {
            if (cols.findIndex( i=>i.date== selected) == -1 && !swipe) return null
            if (cols[0].classes === 'in-next-month') return null
            
            if (swipe) return (
              <Container key={cols[0].date}>
                {cols.map((col,indexCol) => {
                    if (col.classes === 'in-next-month' ) return <ContainerDay swipe={swipe} key={col.date}/>
                    const isToday = col.date === todayFormatted;
                    const isSelected = col.date === selected;
                    const isOtherMonth = col.classes !== '';
                    const isOldDay = (parseInt(col.date.split('-')[0])/10+parseInt(col.date.split('-')[1])*10+parseInt(col.date.split('-')[1])*1000) < (parseInt(todayFormatted.split('-')[0])/10+parseInt(todayFormatted.split('-')[1])*10+parseInt(todayFormatted.split('-')[1])*1000)
                    
                    function handleDaySelected() {
                      if (isOtherMonth) {
                        getNextMonth({num:parseInt(col.date.split('-')[1]-1)})
                        monthRef.current.scrollToIndex({index:parseInt(col.date.split('-')[1]-1),animated:true,viewOffset:RFValue(50)})
                      }
                      setSelected(col.date)
                    }

                    return (  
                      <ContainerDay swipe={swipe} key={col.date}>
                        <DayButton swipe={swipe} onPress={handleDaySelected} activeOpacity={0.7} isToday={isToday} >
                            {index==0 && <WeekNamesText swipe={swipe}>
                              {daysShort[indexCol]}
                            </WeekNamesText>}
                            <CircleView swipe={swipe} isSelected={isSelected} isToday={isToday}>
                              <DayText isOtherMonth={isOtherMonth}>{col.value}</DayText>
                              {/* {Math.random()>0.50 && <SmallCircle isSelected={isSelected} isToday={isToday}/>} */}
                            </CircleView>
                          </DayButton>
                      </ContainerDay>
                    )
                  })}
              </Container>
            )
            
            return (
                <Container key={cols[0].date}>
                  {!swipe &&<View style={{position:'absolute',flexDirection:'row',alignItems:'center',top:0,right:window.width,width:window.width}}>
                    {calendarRows[index]&&calendarRows[index].map((col,indexCol) => {
                      // if (col.classes === 'in-next-month' && swipe) return <ContainerDay swipe={swipe} key={col.date}/>
                      const isToday = col.date === todayFormatted;
                      const isSelected = col.date === selected;
                      const isOtherMonth = col.classes !== '';
                      const isOldDay = (parseInt(col.date.split('-')[0])/10+parseInt(col.date.split('-')[1])*10+parseInt(col.date.split('-')[1])*1000) < (parseInt(todayFormatted.split('-')[0])/10+parseInt(todayFormatted.split('-')[1])*10+parseInt(todayFormatted.split('-')[1])*1000)

                      return (  
                        <ContainerDay swipe={swipe} key={col.date}>
                          <DayButton swipe={swipe} isMarked={Math.random()>0.99} activeOpacity={0.7} isToday={isToday} isSelected={isSelected}>
                            <WeekNamesText swipe={swipe}>
                              {daysShort[indexCol]}
                            </WeekNamesText>
                            <CircleView swipe={swipe} isToday={isToday}>
                              <DayText isOtherMonth={isOtherMonth}>{col.value}</DayText>
                            </CircleView>
                          </DayButton>
                        </ContainerDay>
                      )
                    })}
                  </View>}
                  {cols.map((col,indexCol) => {
                    if (col.classes === 'in-next-month' && swipe) return <ContainerDay swipe={swipe} key={col.date}/>
                    const isToday = col.date === todayFormatted;
                    const isSelected = col.date === selected;
                    const isOtherMonth = col.classes !== '';
                    const isOldDay = (parseInt(col.date.split('-')[0])/10+parseInt(col.date.split('-')[1])*10+parseInt(col.date.split('-')[1])*1000) < (parseInt(todayFormatted.split('-')[0])/10+parseInt(todayFormatted.split('-')[1])*10+parseInt(todayFormatted.split('-')[1])*1000)
                    
                    function handleDaySelected() {
                      if (isOtherMonth) {
                        getNextMonth({num:parseInt(col.date.split('-')[1]-1)})
                        monthRef.current.scrollToIndex({index:parseInt(col.date.split('-')[1]-1),animated:true,viewOffset:RFValue(50)})
                      }
                      setSelected(col.date)
                    }

                    return (  
                      <ContainerDay swipe={swipe} key={col.date}>
                        {/* <AnimatedView style={[AnimatedStyles.selectedColor]}> */}
                        <DayButton swipe={swipe} onPress={handleDaySelected} activeOpacity={0.7} isToday={isToday} isSelected={isSelected}>
                            {(index==0 || !swipe) &&<WeekNamesText swipe={swipe}>
                              {daysShort[indexCol]}
                            </WeekNamesText>}
                            <CircleView swipe={swipe} isToday={isToday}>
                              <DayText isOtherMonth={isOtherMonth}>{col.value}</DayText>
                              {Math.random()>0.80 && <SmallCircle isSelected={isSelected} isToday={isToday}/>}
                            </CircleView>
                          </DayButton>
                      </ContainerDay>
                    )
                  })}
                  {!swipe && <View style={{position:'absolute',flexDirection:'row',alignItems:'center',top:0,right:-window.width,width:window.width}}>
                    {calendarRows[index+2]&&calendarRows[index+2].map((col,indexCol) => {
                      // if (col.classes === 'in-next-month' && swipe) return <ContainerDay swipe={swipe} key={col.date}/>
                      const isToday = col.date === todayFormatted;
                      const isSelected = col.date === selected;
                      const isOtherMonth = col.classes !== '';
                      const isOldDay = (parseInt(col.date.split('-')[0])/10+parseInt(col.date.split('-')[1])*10+parseInt(col.date.split('-')[1])*1000) < (parseInt(todayFormatted.split('-')[0])/10+parseInt(todayFormatted.split('-')[1])*10+parseInt(todayFormatted.split('-')[1])*1000)

                      return (  
                        <ContainerDay swipe={swipe} key={col.date}>
                          <DayButton swipe={swipe} isMarked={Math.random()>0} activeOpacity={0.7} isToday={isToday} isSelected={isSelected}>
                            <WeekNamesText >
                              {daysShort[indexCol]}
                            </WeekNamesText>
                            <CircleView swipe={swipe} isToday={isToday}>
                              <DayText isOtherMonth={isOtherMonth}>{col.value}</DayText>
                            </CircleView>
                          </DayButton>
                        </ContainerDay>
                      )
                    })}
                  </View>}
                </Container>
            )
            })
          }
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}
