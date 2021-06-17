import React from 'react';
import {StyleSheet,Modal, KeyboardAvoidingView, Platform,TouchableWithoutFeedback} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css} from "styled-components/native";
import { RectButton } from 'react-native-gesture-handler';

const Container = styled.View`
  justify-content: center;
  flex:1;
  background-color: ${({theme})=>theme.colors.background.transparent};

`;

const ViewContainer = styled.View`
  padding:20px 25px;
  background-color: ${({theme})=>theme.colors.background.paper};
  max-width: 450px;
  min-width: 250px;
  margin: 0px 25px ;
  border-radius:6px;
`;

const TextTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  text-align: left;
  margin-bottom: ${RFValue(10)}px;
  font-family: ${({theme})=>theme.fonts.bold};
  color: ${({theme})=>theme.colors.text.primary};
`;


const TextSub = styled.Text`
  font-family: ${({theme})=>theme.fonts.medium};
  font-size: ${RFValue(15)}px;
  text-align: left;
  margin-bottom: ${RFValue(25)}px;
  color: ${({theme})=>theme.colors.text.secondary};;
`;

const ButtonOk = styled(RectButton)`
  background-color: ${({theme,warn})=> warn? theme.colors.status.attention:theme.colors.primary.main};
  justify-content: center;
  align-items: center;
  flex:1;
  padding: ${RFValue(7)}px ${RFValue(10)}px;
  border-radius:5px;

  ${props => props.disabledConfirm && css`
    background-color: ${({theme})=> theme.colors.status.inactive};
  `}
`;

const ButtonCancel = styled(ButtonOk)`
  background-color: transparent;
  border: ${({theme})=> theme.colors.status.inactive};
  justify-content: center;
  align-items: center;
  margin-right:10px;
`;

const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const TextOk = styled.Text`
  font-family: ${({theme})=>theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({theme})=> theme.colors.primary.contrastText};
`;

const TextCancel = styled(TextOk)`
  font-family: ${({theme})=>theme.fonts.medium};
  font-size: ${RFValue(15)}px;
  color: ${({theme})=> theme.colors.text.grey};
`;

export const ModalCore = ({title,option,text, warn,open,onClose, onConfirm,disabledConfirm, children,cancelText='Cancelar',confirmText='Confirmar'}) => {

  function onConfirmPress() {
    if (onClose) onClose()
    if (onConfirm) onConfirm()
  }

  return (
    <Modal animationType={'fade'} visible={open} onRequestClose={onClose} transparent>
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Container>
          <TouchableWithoutFeedback onPress={()=>{}}>
            <ViewContainer style={[styles.shadow]}>
              {title && <TextTitle >{title}</TextTitle>}
              {text && <TextSub >{text}</TextSub>}
              {children}
              <ContainerButtons>
                {option ?
                  <ButtonCancel option={option} activeOpacity={0.5} onPress={onClose}>
                      <TextCancel>{cancelText}</TextCancel>
                  </ButtonCancel>
                :null }
                  <ButtonOk warn={warn} disabled={disabledConfirm} disabledConfirm={disabledConfirm} option={option} onPress={onConfirmPress} >
                      <TextOk>{confirmText}</TextOk>
                  </ButtonOk>
              </ContainerButtons>
            </ViewContainer>
          </TouchableWithoutFeedback>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.48,
    shadowRadius: 16.00,

    elevation: 24,
  },
});
