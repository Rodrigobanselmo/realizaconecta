import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import LoadReducer from './LoadReducer';
import ModalReducer from './ModalReducer';

export default combineReducers({
    user: UserReducer,
    loader: LoadReducer,
    modal:ModalReducer,
});
