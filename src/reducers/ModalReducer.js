const initialState = {open:false, text:'',title:'',warn:false}

export default (state = initialState, action) => {

    switch(action.type) {

        case 'MODAL':
        return {...initialState, open:true, ...action.payload};

        case 'MODAL_HIDE':
        return {...initialState};

        default:
        return state;
    }
    
}


