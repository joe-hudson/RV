import React from "react";
import ReactDOM from "react-dom";

const content = {
  currency_symbol: "$"
};

class ProductValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  render() {
    return (
      <span>
        {content.currency_symbol}
        {this.state.value}
      </span>
    );
  }
}

ReactDOM.render(
  <ProductValue value="119" />,
  document.getElementById("product-value")
);
