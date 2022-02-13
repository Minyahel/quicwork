import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default (props) => {
    //using the useParams hook from react-router-dom to get the postId parameter
    //from the url
    const { postId } = useParams();

    const [post, setPost] = useState(null);

    //making sure that the fetch is called only once so running it in a useEffect
    //hook that allows for only one call. The empty array as the second parameter
    //insures that the callback function is only run once
    useEffect(() => {
        fetch('/post/' + postId)
            .then((res) => res.json())
            .then((res) => {
                setPost(res);
            });
    }, []);

    return (
        <>
            {post ? (
                <div>
                    <h1>{post.description}</h1>
                    <h2>{post.user}</h2>
                    <h3>{post.postTime}</h3>
                    <div>
                        {post.comments.map((comment, i) => (
                            <div key={i}>
                                <h4>{comment.body}</h4>
                                <h6>{comment.user}</h6>
                                <h6>{comment.createdAt}</h6>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading</p>
            )}
        </>
    );
};
