import {checkValidUser} from './valid'
import {CheckEmailExists,CreateEmail,RecoveryPass,SignInEmail,LogOut} from '../../services/firebaseAuth'
// import {infoNet} from '../../helpers/infoNet'

export function onCheckEmail({email, setExpanded, dispatch, setError, LayoutAnimation, Toast}) {
    //LogOut()
    function checkSuccess(response) {

      LayoutAnimation.configureNext(
        LayoutAnimation.create(
            500,
            LayoutAnimation.Types.easeInEaseOut,
            LayoutAnimation.Properties.opacity
          )        
      );

      if (response.length == 0) {
        Toast.show({
          text1: 'Seja bem vindo!',
        });
        setExpanded('register')
        dispatch({type: 'LOADER_HIDE'})
      }
      else {
        Toast.show({
          text1: 'Bem vindo de volta!',
        });
        setExpanded(true)
        dispatch({type: 'LOADER_HIDE'})
      }
    }
  
    function checkError(error) {
      Toast.show({
        type: 'error',
        text1: 'Algo aconteceu!',
        text2: error,
      });
      dispatch({type: 'LOADER_HIDE'})
    }

    if (checkValidUser(email)) {
      dispatch({type: 'LOADER_SHOW'})
      setError('email',{})
      CheckEmailExists(email,checkSuccess,checkError)
    } else setError('email',{message:'Email com formatação inválida.'})
}

export function onLoginUser({data, Toast, dispatch}) {

  function checkSuccess() {
    dispatch({type: 'LOADER_HIDE'})
  }

  function checkError(error) {
    Toast.show({
      type:'error',
      text1: 'Erro de Login',
      text2: error,
    });
    dispatch({type: 'LOADER_HIDE'})
  }

  
  setTimeout(() => {
    dispatch({type: 'LOADER_SHOW'})
    SignInEmail(data.email,data.pass,checkSuccess,checkError)
  }, 1000);

}

export function onCreateAccount({data,dispatch}) {

  function checkSuccess() {
    dispatch({type: 'LOADER_HIDE'})
  }
  
  function checkError(error) {
    dispatch({type: 'LOADER_HIDE'})
    dispatch({type: 'MODAL', payload:{title:'Erro de Login',text:error}})
  }

  setTimeout(() => {
    dispatch({type: 'LOADER_SHOW'})
    CreateEmail(data.email,data.pass,checkSuccess,checkError)
  }, 1000);
}

 export function onRecoveryPass({email,Toast,setModalVisible,dispatch}) {

      function checkSuccess() {
        setModalVisible(false)
        setTimeout(() => {
          dispatch({type: 'LOADER_HIDE'})
          dispatch({type: 'MODAL', payload:{title:'Email Enviado',text:'Email enviado com sucesso, verifique em sua caixa de entrada e/ou span'}})
        }, 1000);
    }

    function checkError(error) {
        dispatch({type: 'MODAL', payload:{title:'Erro',text:error,warn:false}})
        dispatch({type: 'LOADER_HIDE'})
        setModalVisible(false)
    }

    if (email) {
        dispatch({type: 'LOADER_SHOW'})
        RecoveryPass(email,checkSuccess,checkError)
    } else {
      Toast.show({
        type:'error',
        text1: 'Não foi possivel identificar seu endereço de email',
      });
    }
} 