import React from 'react';

function PostsComponent(props) {
    console.log(props.posts);
    const post = props.posts.map((post, i) => {
        return <p key={i}>{post.desription}</p>;
    });
    console.log(post);
    return (
        <div>
            <p>Posts</p>
            <ul>
                {props.posts.map((post, i) => {
                    return <p key={i}>{post.description}</p>;
                })}
            </ul>
        </div>
    );
}

export default PostsComponent;
