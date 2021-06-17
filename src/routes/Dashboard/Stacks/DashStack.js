import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from '../../../screens/Home';

const DashStack = createStackNavigator();

const Stack = ({navigation}) => (
    <DashStack.Navigator headerMode='none' initialRouteName={"Splash"}>
        <DashStack.Screen name="Home" component={Home} options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}/>
    </DashStack.Navigator>
);

export default Stack;
