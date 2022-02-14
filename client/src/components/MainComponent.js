import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Login from './LoginComponent';
import Home from './HomeComponent';
import Signup from './SignupComponent';
import CreatePost from './CreatePostComponent';
import SinglePost from './SinglePostComponent';
import { connect } from 'react-redux';

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
        fetch('/user/checkSession')
            .then((res) => res.json())
            .then((res) => {
                if (res.message === true) {
                    this.props.dispatch({
                        type: 'LOGIN'
                    });
                }
            });
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
                    {this.props.activeSession && (
                        <Route path="/createpost" element={<CreatePost />} />
                    )}
                    <Route path="/post/:postId" element={<SinglePost />} />
                </Routes>
                <Footer />
            </>
        );
    }
}

//loads state from store
const mapStateToProps = (state) => {
    return { activeSession: state.activeSession };
};

//loads dispatch type from store
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

//connects the required functions to the component
export default connect(mapStateToProps, mapDispatchToProps)(Main);
