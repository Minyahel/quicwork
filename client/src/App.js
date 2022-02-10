import logo from './logo.svg';
import './App.css';
import React from 'react';

import Main from './components/MainComponent';

function App() {
    const [data, setDate] = React.useState(null);

    return <Main />;
}

export default App;
