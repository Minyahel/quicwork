import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <div>
            <nav style={{ display: 'inline', margin: 'auto' }}>
                <Link to="/">quicWork</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/createpost">Create Post</Link>
            </nav>
        </div>
    );
};
