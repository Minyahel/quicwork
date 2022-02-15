import { createStore } from 'redux';

const initialState = {
    activeSession: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log('login called');
            return {
                ...state,
                activeSession: true
            };
        case 'LOGOUT':
            console.log('logout called');
            return {
                ...state,
                activeSession: false
            };
    }
    return state;
};

const store = createStore(reducer);

export default store;
