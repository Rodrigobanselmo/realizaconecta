
const initialState = null

export default (state = initialState, action) => {



    switch(action.type) {

        case 'LOGOUT_USER':
            console.log('LOGOUT_USER')
        return initialState;

        case 'LOGIN_USER':
            var _user =  {};
            _user = {...action.payload}
        return {..._user};

        case 'ADD_USER_DATA':
            let data = {...action.payload}
            if (data?.info) {
                data.info = {...state.info,...data.info}
            }
        return {...state , ...data };

        default:
            return state;
    }
    
}


