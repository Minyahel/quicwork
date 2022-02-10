import React from 'react';
import PostsComponent from './PostsComponent';

export default (props) => {
    return (
        <div>
            <h1>This is the home component</h1>
            {props.posts ? (
                <PostsComponent posts={props.posts} />
            ) : (
                <p>Loading</p>
            )}
        </div>
    );
};
