import React, { Component } from 'react';

import Header from './HeaderComponent';
import PostsComponent from './PostsComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null
        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('/post')
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    posts: res
                });
            });
    }

    render() {
        const { posts } = this.state;
        return (
            <>
                <Header />
                {posts ? <PostsComponent posts={posts} /> : <p>Loading</p>}
            </>
        );
    }
}

export default Main;
