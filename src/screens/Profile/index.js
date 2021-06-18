import React, { useState, useEffect } from 'react'
import { View, Text, Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import styled from "styled-components/native";
import Toast from 'react-native-toast-message';
import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Main/Header';


const SafeContainer = styled.SafeAreaView`
  display: flex;
  flex: 1;
  padding-top: ${({theme})=>theme.statusHeight}px;
  padding-bottom: 20px;
`;
const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 0 18px;
`;

export default function Profile({navigation}) {

  function handleContinue() {
    navigation.navigate('DashStack')
  }
  


  return (
    <SafeContainer >
      <Header text='PROFILE_SCREEN'/>
      <Container>
        <Button
          text='CALENDAR'
          onPress={handleContinue}
        />
      </Container>
    </SafeContainer>
  )
}
