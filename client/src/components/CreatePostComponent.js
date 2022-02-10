import React, { Component } from 'react';

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: null
        };
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handlePost(e) {
        fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: this.state.description
            })
        });
    }

    render() {
        return (
            <>
                <form>
                    <label>Post </label>
                    <br />
                    <input
                        type="text"
                        name="description"
                        placeholder={this.state.description}
                        onChange={this.handleDescriptionChange}
                    />
                    <button type="button" onClick={this.handlePost}>
                        Post
                    </button>
                </form>
            </>
        );
    }
}

export default CreatePost;
