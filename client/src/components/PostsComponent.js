import React from 'react';

import Post from './PostComponent';

function PostsComponent(props) {
    console.log(props.posts);
    const post = props.posts.map((post, i) => {
        return <p key={i}>{post.desription}</p>;
    });
    console.log(post);

    //function for handling onClick of individual posts
    //serves to identify which post is actually being clicked on

    return (
        <div>
            <p>Posts</p>
            <ul>
                {props.posts.map((post, i) => {
                    return (
                        <Post
                            key={i}
                            description={post.description}
                            postedBy={post.user}
                            date={post.postTime}
                            postId={post._id}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default PostsComponent;
