import React from "react";
import ReactDOM from "react-dom";

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: this.props.class
    };
  }
  render() {
    return <div className={this.state.class}></div>;
  }
}

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: this.props.class
    };
  }
}

ReactDOM.render(
  <Banner class="banner brand-announcement" />,
  document.getElementById("root")
);
