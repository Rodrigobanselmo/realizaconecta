import React, {useRef,useEffect,useState} from 'react'
import { View, Text, Alert, TextInput, UIManager, LayoutAnimation,Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import styled from "styled-components/native";
import Toast from 'react-native-toast-message';
import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Main/Header';
import { RFValue } from 'react-native-responsive-fontsize';
import { InputForm } from '../../components/Form/InputForm';
import { useForm,useController,useWatch } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {onCheckEmail,onLoginUser,onCreateAccount,onRecoveryPass} from './func'
import { useSelector, useDispatch } from 'react-redux';
import useAuthChange from '../../hooks/useAuthChange';
import { ModalCore } from '../../components/Main/Modal';

const SafeContainer = styled.SafeAreaView`
  display: flex;
  flex: 1;
  padding-top: ${({theme})=>theme.statusHeight}px;
  padding-bottom: ${RFValue(20)}px;
`;
const Container = styled.View`
  flex: 1;
  padding: 0 18px 10px 18px;
`;

const TouchableText = styled.TouchableOpacity`
  /* justify-content: flex-end; */
  width:100%;
  padding-bottom: ${RFValue(10)}px;
  margin:2px 0px ${RFValue(10)}px 0px;
`;

const TextForgotPass = styled.Text`
  color:grey;
  font-size: ${RFValue(14)}px;
  text-align:right;
  
`;

export default function Auth({}) {

  const [expanded, setExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useAuthChange(Toast);

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const object = {email: Yup.string().trim().email('Email com formatação inválida!').required('Nome é obrigatório!')}
  if (expanded) object.pass = Yup.string().min(6, ({ min }) => `A senha deve conter no mínimo ${min} characteres`).required('Senha é obrigatório!');
  if (expanded == 'register') object.confirm_pass = Yup.string().oneOf([Yup.ref('pass')], 'As senhas devem ser iguais.').required('Senha é obrigatório!')

  const schema = Yup.object().shape({...object});

  const {control, setFocus, getValues, setValue, setError ,handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(schema)});
  // const {control, setFocus, reset, getValues, watch, setValue, setError, clearErrors ,handleSubmit,formState: { errors,isValid }} = useForm({resolver: yupResolver(schema)});
  // const {fieldState: { invalid, isTouched, isDirty },field} = useController({name:'email',control});
  // const email = useWatch({name:'email',control});


  function handleSign(form){
    Keyboard.dismiss()
    if (expanded == 'register') {
      onCreateAccount({data:form,dispatch})
    } else {
      onLoginUser({data:form, Toast, dispatch})
    }
	}

  function onFocusUsername(error){
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
          500,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity
        )        
    );
    setExpanded(false)
    if (expanded) setValue('pass','')
    if (expanded === 'register') setValue('confirm_pass','')
	}

  function handleCheckEmail(){
    Keyboard.dismiss()
    const email = getValues('email')
    if (!email) return setError('email',{message:'email não pode esta vazio'})
    onCheckEmail({email:email.trim(),setExpanded, setError, LayoutAnimation, Toast, dispatch}) 
	}

  function handleRecoveryEmail(){
    Keyboard.dismiss()
    const email = getValues('email')
    if (!email) return setError('email',{message:'email não pode esta vazio'})
    onRecoveryPass({email,Toast,setModalVisible,dispatch})
	}

  // function handleSign2(){
  //   Keyboard.dismiss()
  //   setTimeout(() => {
  //     dispatch({type: 'LOGIN_USER', payload:{name:true}})
  //   }, 1000);
	// }

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <SafeContainer >
        <Header leftIcon text='Login'/>
        <Container>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex:1}}/>
          </TouchableWithoutFeedback>
          <InputForm
            name="email"
            defaultValue='rodrigobanselmo@gmail.com'
            error={errors.email && errors.email.message}
            control={control}
            placeholder="e-mail"
            autoCapitalize="none"
            onFocus={onFocusUsername}
            onSubmitEditing={handleCheckEmail}
            keyboardType='email-address'
            clearButtonMode='while-editing'
            returnKeyType="next"
            autoCompleteType='email'
            textContentType="emailAddress"
            autoFocus
          />
          {expanded && (
            <>
              <InputForm
                name="pass"
                error={errors.pass && errors.pass.message}
                control={control}
                placeholder="senha"
                autoCapitalize="none"
                clearButtonMode='while-editing'
                textContentType={expanded === 'register' ? 'none':'password'}
                autoCompleteType={expanded === 'register' ? 'off':'password'}
                returnKeyType={expanded === 'login' ? 'done':'next'}
                onSubmitEditing={expanded === 'register' ? ()=>setFocus('confirm_pass'):handleSubmit(handleSign)}
                autoFocus
                secure
              />
              {expanded && expanded != 'register' && (
                <TouchableText onPress={()=>setModalVisible(true)}>
                  <TextForgotPass >Esqueceu sua senha?</TextForgotPass>
                </TouchableText>
              )}
              {expanded === 'register' && (
                <InputForm
                  name="confirm_pass"
                  error={errors.confirm_pass && errors.confirm_pass.message}
                  control={control}
                  blurOnSubmit={false}
                  placeholder="confirmar senha"
                  autoCapitalize="none"
                  clearButtonMode='while-editing'
                  textContentType={'none'}
                  returnKeyType={'done'}
                  autoCompleteType={'off'}
                  secure
                  // onSubmitEditing={()=>onContinue(false)}
                />
              )}
            </>
          )}
          <Button
            text='Confirme'
            onPress={!expanded?handleCheckEmail:handleSubmit(handleSign)}
          />
          {/* <Button
            text='Test'
            onPress={handleSign2}
          /> */}
        </Container>
      </SafeContainer>
      <ModalCore 
        onConfirm={handleRecoveryEmail} 
        title={'Redefinir senha'} 
        text={`Deseja redefinir a senha do seu \n e-mail descrito abaixo?`} 
        open={modalVisible} 
        confirmText='Redefinir'
        onClose={()=>setModalVisible(false)}
        option 
      >
        <InputForm
          style={{marginBottom:20,marginTop:-10}}
          name="email"
          error={errors.email && errors.email.message}
          control={control}
          placeholder="e-mail"
          autoCapitalize="none"
          editable={false}
          keyboardType='email-address'
          clearButtonMode='while-editing'
          returnKeyType="done"
          autoCompleteType='email'
          textContentType="emailAddress"
          autoFocus
        />
      </ModalCore>
    </KeyboardAvoidingView>
  )
}
