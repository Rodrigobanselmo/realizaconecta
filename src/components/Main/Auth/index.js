import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import useAuthChange from '../../../hooks/useAuthChange'

function AuthLoad({ userStorageLoading, setUserStorageLoading }) {

	useAuthChange(userStorageLoading, setUserStorageLoading)

	return <AppLoading />
}

function AuthProvider({ children, fontsLoaded, ...rest }) {

	const [ userStorageLoading, setUserStorageLoading ] = useState(true);
	
	if (!fontsLoaded || userStorageLoading) {
    return <AuthLoad userStorageLoading={userStorageLoading} setUserStorageLoading={setUserStorageLoading}/>;
  }

	return(
		<>
			{ children }
		</>
	)
}

export default AuthProvider
