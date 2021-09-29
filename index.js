import React from "react";
import ReactDOM from "react-dom";
import product from "./images/food.png";

class Text extends React.Component {
  render() {
    return <span className={this.props.class}>{this.props.text}</span>;
  }
}

class Banner extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="c-banner">
          <div className="c-brand-announcement">
            <Text class="c-brand-name text-uppercase" text="My Brand" />
            <div className="c-separator"></div>
            <Text
              class="c-announcement text-uppercase"
              text="Enrollment Available"
            />
            <Text class="c-announcement-2" text="through 12/31/21" />
          </div>
        </div>
        <div className="c-product-background"></div>
      </div>
    );
  }
}

ReactDOM.render(<Banner class="c-banner" />, document.getElementById("root"));
