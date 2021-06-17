import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashStack from './Stacks/DashStack';

const MainStack = createStackNavigator();


export default () => {
  
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  
  return (
      
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name="DashStack" component={DashStack} options={{ cardStyleInterpolator: forFade }} />
    </MainStack.Navigator>
  );

}