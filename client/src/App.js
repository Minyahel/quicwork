import logo from './logo.svg';
import './App.css';
import React from 'react';

import Main from './components/MainComponent';

function App() {
    const [data, setDate] = React.useState(null);

    React.useEffect(() => {
        fetch('/').then((res) => console.log(res.json()));
    });

    return <Main />;
}

export default App;
