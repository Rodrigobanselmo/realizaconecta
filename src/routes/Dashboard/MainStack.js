import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import DashStack from './Stacks/DashStack';
import TabStack from './Stacks/TabStack';

const MainStack = createStackNavigator();


export default () => {
  
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  
  return (
      
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name="TabStack" component={TabStack} options={{ cardStyleInterpolator: forFade }} />
      <MainStack.Screen name="DashStack" component={DashStack} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid }} />
    </MainStack.Navigator>
  );

}