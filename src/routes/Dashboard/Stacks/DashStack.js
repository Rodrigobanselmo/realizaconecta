import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Calendar from '../../../screens/Calendar';

const DashStack = createStackNavigator();

const Stack = ({navigation}) => (
    <DashStack.Navigator headerMode='none' initialRouteName={"Splash"}>
        <DashStack.Screen name="Calendar" component={Calendar} options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}/>
    </DashStack.Navigator>
);

export default Stack;
