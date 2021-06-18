import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../../../components/TabBar';
import Home from '../../../screens/Home';
import Profile from '../../../screens/Profile';


const Tab = createBottomTabNavigator();


export default () => {
    
    return (
    <Tab.Navigator initialRouteName={'Home'} tabBar={props=> <CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
        {/* <Tab.Screen name="Tab_5" component={Tab_5} /> */}
    </Tab.Navigator>
)};