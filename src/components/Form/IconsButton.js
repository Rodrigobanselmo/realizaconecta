import React from 'react';
import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const IconButton = styled(BorderlessButton)`
	position:absolute;
	left:10px;
`;


export const Container = styled.View`
	width: 100%;
	align-items: center;
	justify-content: center;
	flex-direction:row;
	color: ${({ theme }) => theme.colors.text.primary};
	/* height: ${RFValue(55)}px; */
`;


export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.bold};
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.colors.text.primary};
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(26)}px;
`;


export function Header({ text,leftIcon, onPress, ...rest }){

  const navigation = useNavigation();
  
	function handleLeftButton() {
    navigation.goBack()
  }
  

	return (
		<IconButton onPress={handleLeftButton}>
			<Icon name='chevron-left'/>
		</IconButton>
	)
}
