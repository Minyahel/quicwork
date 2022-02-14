import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default (props) => {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const activeSession = useSelector((state) => state.activeSession);
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();

        fetch('/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        }).then((res) => {
            if (res.status === 200)
                dispatch({
                    type: 'LOGIN'
                });
        });
    }

    return (
        <div>
            <form>
                <label>Username: </label>
                <input
                    type="text"
                    name="username"
                    placeholder={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <br />
                <br />
                <label>Email: </label>
                <input
                    type="email"
                    name="email"
                    placeholder={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <br />
                <br />
                <label>Password: </label>
                <input
                    type="password"
                    name="password"
                    placeholder={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <br />
                <br />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};
