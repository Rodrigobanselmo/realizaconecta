import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AuthRoutes from './Auth/AuthStack';
import AppRoutes from './Dashboard/MainStack';
import Toast from 'react-native-toast-message';
import { Loader } from '../components/Main/Loader';
import { ModalAlert } from '../components/Main/Modal/alert';
import { useSelector } from 'react-redux';
// import { useAuth } from '../hooks/auth';

export function Routes() {
	// const { user } = useAuth();
  const user = useSelector(state => state.user);
	// console.log(user)

	return(
		<NavigationContainer>
			{/* <AppRoutes /> */}
			{user ? <AppRoutes /> : <AuthRoutes/>}
			<Toast topOffset={45} ref={(ref) => Toast.setRef(ref)} />
			<ModalAlert/>
			<Loader/>
		</NavigationContainer>
	)
}
// {false ? <AppRoutes /> : <AuthRoutes/>}
