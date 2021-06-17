import React from 'react';
import { View, Text, Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import styled, {css} from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container =  styled.View`
	width: 100%;
	border-color: ${({ theme }) => theme.colors.background.line};
	border-style: solid;
	border-width:1px;
	border-radius: 5px;
	margin-bottom: 8px;
	flex-direction:row;
	align-items: center;


	${props => props.focus && css`
		border-color: ${({ theme }) => theme.colors.primary.main};
	`}

	${props => props.error && css`
		border-color: ${({ theme }) => theme.colors.status.attention};
	`}

`;

export const InputIcon =  styled.View`
`;

export const InputText =  styled.TextInput`
	padding: 16px 18px;
	margin-right:10px;
	flex:1;
	font-size: ${RFValue(14)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.text.dark};
`;

const Icon = styled(Ionicons)`
	font-size: ${RFValue(22)}px;
	color: ${({ theme }) => theme.colors.status.success};
	margin-right:5px;
`;

const IconSecure = styled(Ionicons)`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.text.grey};
`;

const IconButton = styled(BorderlessButton)`
	margin-right:10px;
`;

export function Input({ error,onFocus,secure=false,onBlur,isValid,inputRef,...rest }){
	const [state, setState] = React.useState(false);
	const [secureText, setSecureText] = React.useState(secure);
	
	function onSetFocus() {
		if (onFocus) onFocus()
		setState(true)
	}
	function onSetBlur() {
		if (onBlur) onBlur()
		setState(false)
	}
	
	return (
		<Container focus={state} error={error}>
			<InputText 
				ref={inputRef} 
				focus={state}
				secureTextEntry={secureText}
				onFocus={onSetFocus}
				onBlur={onSetBlur}
				{...rest}
			/>
			{secure &&
				<IconButton onPress={()=>setSecureText(!secureText)}>
					{secureText ?
						<IconSecure name="ios-eye-off-outline"/>
						:
						<IconSecure name="ios-eye-outline"/>
					}
				</IconButton>
			}
			{isValid &&
				<InputIcon>
					<Icon name="ios-checkmark-circle-outline"/>
				</InputIcon>
			}
		</Container>
	)
}
