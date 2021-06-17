import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Splash from '../../screens/Splash';
import Auth from '../../screens/Auth';

const AuthStack = createStackNavigator();

const Stack = ({navigation}) => (
    <AuthStack.Navigator headerMode='none' initialRouteName={"Splash"}>
        <AuthStack.Screen name="Splash" component={Splash} options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}/>
        <AuthStack.Screen name="Auth" component={Auth} options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}/>
    </AuthStack.Navigator>
);

export default Stack;
