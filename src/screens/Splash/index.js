import React, { useState, useEffect } from 'react'
import { View, Text, Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import styled from "styled-components/native";
import Toast from 'react-native-toast-message';
import { Button } from '../../components/Form/Button';


const SafeContainer = styled.SafeAreaView`
  display: flex;
  flex: 1;
  padding-top: ${({theme})=>theme.statusHeight}px;
  padding-bottom: 20px;
`;
const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 0 18px;
`;

export default function Splash({navigation}) {

  function handleContinue() {
    navigation.navigate('Auth')
  }
  


  return (
    <SafeContainer >
      <Container>
        <Text>Oi2</Text>
        <Button
          text='Oi'
          onPress={handleContinue}
        />
      </Container>
    </SafeContainer>
  )
}
