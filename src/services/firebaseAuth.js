//  import firebase from '@react-native-firebase/app';
 import firebase from'../global/libs/firebase'


const errorCatch = (error) => {

  let errorMessage = error

  if (error.code === 'auth/user-not-found') {
    errorMessage = 'Usuario de email não cadastrado, por vafor cadastre-se antes de logar!'
  }
  else if (error.code === 'auth/network-request-failed') {
    errorMessage = 'Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!'
  }
  else if (error.code === 'auth/invalid-email') {
    errorMessage = 'Endereço de e-mail mal formatado.'
  }
  else if (error.code === 'auth/email-already-in-use') {
    errorMessage = 'O endereço de email já esta cadastrado!'
  } 
  else if (error.code === 'auth/network-request-failed') {
    errorMessage = 'Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!'
  } 
  else if (error.code === 'auth/wrong-password') {
    errorMessage = 'Senha incorreta. Por favor, tente novamente.'
  } 
  else if (error.code === 'auth/too-many-requests') {
    errorMessage = 'O Acesso a essa conta está temporariamente desabilitado devido ao grande números de requisoções ao servidor. Por favor, tente novamente mais tarde'
  } 
  else if (error.code === 'auth/invalid-credential') {
    errorMessage = 'Credencial de acesso fornecida expirada ou com formatação inválida.'
  } 
  else if (error.code === 'auth/no-auth-event') {
    errorMessage = 'Houve um erro interno do servidor, por favor, tente novamente mais tarde.'
  } 
  else if (error.code === 'auth/user-cancelled') {
    errorMessage = 'Operação cancelada por usuário.'
  } 
  else if (error.code === 'user-disabled') {
    errorMessage = 'Essa conta de usuário foi desabilitada pelo administrador.'
  } 
  else if (error.code === 'weak-password') {
    errorMessage = 'Sua senha deve ser maior que 6 caracteres.'
  } 
  else {
    errorMessage = error.message
  }

  console.log('error',error)
  console.log('error code',error.code)

  return errorMessage
}

export function CheckEmailExists(email,checkSuccess,checkError) {
    firebase.auth().fetchSignInMethodsForEmail(email).then(response=>{
        checkSuccess(response);
    }).catch(error=>{      
      checkError(errorCatch(error));
    })
  }

export function CreateEmail(email,password,checkSuccess,checkError) {
  firebase.auth().createUserWithEmailAndPassword(email,password)
  .then((loggedUser) => {
      checkSuccess(loggedUser)
    }).catch(error=>{
      checkError(errorCatch(error))
    })
  }

export function SignInEmail(email,password,checkSuccess,checkError) {
  firebase.auth().signInWithEmailAndPassword(email,password)
  .then((loggedUser) =>{
    checkSuccess(loggedUser)
  })
  .catch(error=>{
    checkError(errorCatch(error))
  })
}

export function RecoveryPass(email,checkSuccess,checkError) {
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    checkSuccess()
  }).catch(function(error) {
    checkError(errorCatch(error))
  });
}

export function SendEmailVerification(checkSuccess,checkError) {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    checkSuccess()
  }).catch(function(error) {
    checkError(errorCatch(error))
  });
}

export function ChangePassword(oldPassword,password,checkSuccess,checkError) {
  
  var user = firebase.auth().currentUser;
  var credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    oldPassword
  );
  
  user.reauthenticateWithCredential(credentials).then(function() {
    user.updatePassword(password).then(function() {
      checkSuccess()
    }).catch(function(error) {
      checkError(errorCatch(error))
    });
  }).catch(function(error) {
    checkError(errorCatch(error))
  });

}

export function getCurrentUserReload(checkSuccess,checkError) {
  
  var user = firebase.auth().currentUser;

  user.reload().then(function() {
    checkSuccess()
  }).catch(function(error) {
    checkError(errorCatch(error))
  });

}

export function getCurrentUserEmailVerify() {
  var user = firebase.auth().currentUser;
  if (user!==null) {
   return  (user.emailVerified)
  } else {
    return false
  }
}

export function LogOut(checkSuccess,checkError) {
  firebase.auth()
  .signOut()
  .then(() => {
    if (checkSuccess) checkSuccess()
    console.log('success')
  })
  .catch(error=>{
    if (checkError) checkError(errorCatch(error))
    console.log('error')
    console.log(error)
  });
}