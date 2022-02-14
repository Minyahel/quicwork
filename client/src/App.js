import logo from './logo.svg';
import './App.css';
import React from 'react';

import Main from './components/MainComponent';

import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
    const [data, setDate] = React.useState(null);

    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}

export default App;
