import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <>
            <Link to={'/post/' + props.postId}>
                <div
                    style={{
                        backgroundColor: '#EBEBEB',
                        width: 'fit-content',
                        borderRadius: '20px',
                        padding: '5px 20px 5px 20px',
                        margin: '5px'
                    }}
                    className="post"
                >
                    <div>
                        <h1>{props.description}</h1>
                    </div>
                    <div>
                        <h4>{props.postedBy}</h4>
                    </div>
                    <div>
                        <h6>{props.date}</h6>
                    </div>
                </div>
            </Link>
        </>
    );
};
