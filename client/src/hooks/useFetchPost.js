import { useEffect, useState } from 'react';

function useFetchPost(url) {
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(url)
            .then((res) => {
                res.json();
            })
            .then((res) => {
                setPost(res);
            });
    }, [url]);

    return { post };
}

export default useFetchPost;
