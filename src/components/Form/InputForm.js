import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from './Input';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';


export const Container = styled.View`
	width: 100%;
`;

export const Error = styled.Text`
	color: ${({ theme }) => theme.colors.status.attention};
	font-size: ${RFValue(14)}px;
	font-family: ${({ theme }) => theme.fonts.regular};

	margin: 7px;
`;

export function InputForm({control,name,error,style={},...rest}){

	return (
		<Container style={{...style}}>
			<Controller
				control={control}
				render={({field: {onChange,value,ref}}) => (
					<Input
						onChangeText={onChange}
						value={value}
						inputRef={ref}
						error={error}
						{...rest}
					/>
				)}
				name={name}
			/>
			{error && (<Error>{error}</Error>)}
		</Container>
	)
}
