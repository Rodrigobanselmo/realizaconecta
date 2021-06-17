import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {ModalCore} from '../index'



export const ModalAlert = () => {
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();
  
  if (!modal && modal?.open !== false && modal?.open !== true ) return null

  function onCloseModal() {
    dispatch({type: 'MODAL_HIDE'})
  }

  return (
    <ModalCore title={modal?.title} text={modal?.text} warn={modal?.warn} open={modal?.open} onClose={onCloseModal} />
  );
}