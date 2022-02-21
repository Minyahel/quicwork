import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

export default (props) => {
    const activeSession = useSelector((state) => state.activeSession);
    const dispatch = useDispatch();

    // useEffect(() => {

    // }, [activeSession]);

    function handleLogout(e) {
        fetch('/user/logout', {
            method: 'POST'
        }).then((res) => {
            if (res.status === 200)
                dispatch({
                    type: 'LOGOUT'
                });
        });
    }

    return (
        <div>
            <nav style={{ display: 'inline', margin: 'auto' }}>
                <Link to="/">quicWork</Link>

                {!activeSession && <Link to="/login">Login</Link>}
                {!activeSession && <Link to="/signup">Sign Up</Link>}
                {activeSession && (
                    <>
                        <Link to="/createpost">Create Post</Link>
                        <Link to="/" onClick={handleLogout}>
                            Log out
                        </Link>
                    </>
                )}
            </nav>
        </div>
    );
};
