import React, { Component } from "react";
import Nav from "component/nav";
import Footer from "component/footer";
export default class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="main index column is-8">
          <h1 className="title">React multi page app</h1>
        </div>
        <Footer />
      </div>
    );
  }
}
