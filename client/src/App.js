import logo from './logo.svg';
import './App.css';
import React from 'react';

import Main from './components/MainComponent';

function App() {
    const [data, setDate] = React.useState(null);

    React.useEffect(() => {
        fetch('/post')
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    });

    return <Main />;
}

export default App;
