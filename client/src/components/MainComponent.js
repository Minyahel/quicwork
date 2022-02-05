import React, { Component } from "react";

import Header from "./HeaderComponent";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <>
            <Header />

            This is the main component
        </>
    );
  }
}

export default Main;
