import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import PostsComponent from './PostsComponent';
import Login from './LoginComponent';
import Home from './HomeComponent';
import Signup from './SignupComponent';
import CreatePost from './CreatePostComponent';

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
                <Routes>
                    <Route path="/" element={<Home posts={posts} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/createpost" element={<CreatePost />} />
                </Routes>
                <Footer />
            </>
        );
    }
}

export default Main;
