// import firestore from '@react-native-firebase/firestore';
// import firebase from '@react-native-firebase/app';  
 import {firestore} from'../global/libs/firebase'
//  import firebase from'../global/libs/firebase'
 /* firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
}) */

export const errorCatch = (error) => {

  let errorMessage = error

  if (error.code === 'storage/unknown') {
    errorMessage = 'Ocorreu um erro desconhecido.'
  }
  else if (error.code === 'storage/object-not-found') {
    errorMessage = 'Não é possivel encontrar este arquivo em nosso banco de dados!'
  }
  else if (error.code === 'permission-denied') {
    errorMessage = 'Você não possui permisão para realizar essa ação!'
  }
  else {
    errorMessage = error.message
  }

  console.log('error',error)
  console.log('error code',error.code)

  return errorMessage
}

export function AddUserData(data,uid,checkSuccess,checkError) {

  var userRef = firestore().collection("users").doc(uid);

  userRef.update({
    ...data
  })
  .then(() => {
    checkSuccess("Document successfully updated!");
  })
  .catch((error) => {
    checkError(errorCatch(error))
    console.error("Error updating document: ", error);
  });  

} 

export function GetUserData(userLogin,checkSuccess,checkError) {
  var usersRef = firestore.collection("users").doc(userLogin.uid);
  const date = new Date();

  function checkPendingUser() {
    let usersEmailRef = firestore.collection("users").doc(userLogin.email.toLowerCase().trim())
    usersEmailRef.get().then((docSnapshots) => {
      if (docSnapshots.exists) {
        const docSnapshot = docSnapshots.data()
        let data = {
          ...docSnapshot,
          uid: userLogin.uid,
          email: userLogin.email,
          creation: { start: date - 1, end: 0 },
          status: 'Ativo',
          name: '',
        }
        firestore.collection("users").doc(userLogin.uid).set(data)
        .then(()=>{
          checkSuccess(data,userLogin,);
          usersEmailRef.delete().then(()=>console.log('user deleted'))
        }).catch((err)=>{
          checkError(errorCatch(err))
        })
      } else {
        let data = {
          email:userLogin.email,
          creation: { start: date - 1, end: 0 },
          uid:userLogin.uid,
          photoURL:userLogin?.photoURL?userLogin.photoURL:null,
          name:userLogin?.displayName?userLogin.displayName:'',
        }
        usersRef.set({...data}).then(()=>{
          checkSuccess({...data},userLogin)
        }).catch((err)=>{
          checkError(errorCatch(err))
        })
      }
    }).catch((err)=>{
      checkError(errorCatch(err))
    })
  }

  try {

    usersRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        checkSuccess(docSnapshot.data(),userLogin)
      } else {
        checkPendingUser()
      }
    }).catch((error) => {
      console.log('3')
      checkError(errorCatch(error))
    });
  } catch {
    
  }
}