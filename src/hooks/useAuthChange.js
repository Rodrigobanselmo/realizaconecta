import React, { useEffect } from 'react';
import { auth } from '../global/libs/firebase'
import { useSelector, useDispatch } from 'react-redux';
import {GetUserData} from '../services/firestoreUser'

function useAuthChange(userStorageLoading, setUserStorageLoading, Toast) {

	const dispatch = useDispatch();
  const user = useSelector(state => state.user);

	function checkSuccess(doc,userLogin) {
    console.log({email:userLogin.email,emailVerified:userLogin.emailVerified,uid:userLogin.uid,...doc})
		dispatch({type: 'LOGIN_USER',payload:{email:userLogin.email,emailVerified:userLogin.emailVerified,uid:userLogin.uid,...doc}})
		dispatch({type: 'LOADER_HIDE'})
		if (userStorageLoading) setUserStorageLoading(false);
  }

  function checkError(error) {
    Toast&&Toast.show({
      type: 'error',
      text1: 'Algo aconteceu!',
      text2: error,
    });
    if (setUserStorageLoading) setUserStorageLoading(false);
    dispatch({type: 'LOADER_HIDE'})
  }


  function AuthStateChanged(userLogin) {
    // console.log('user',user)
    // console.log('userLogin',userLogin)

    if(!userLogin && user) {
			dispatch({type: 'LOGOUT_USER',});
      if (setUserStorageLoading) setUserStorageLoading(false);

		} else if (userLogin && !user) {
    	GetUserData(userLogin,checkSuccess,checkError)
			// dispatch({type: 'LOADER_SHOW'})
			// checkSuccess(userLogin,userLogin)
			
    } else {
      if (setUserStorageLoading) setUserStorageLoading(false);
    }
  }

	useEffect(() => {
    const subscriber = auth.onAuthStateChanged(AuthStateChanged);
    return subscriber // unsubscribe on unmount
  }, []);

	return user
}

export default useAuthChange
