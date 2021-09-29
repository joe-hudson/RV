import React from "react";
import ReactDOM from "react-dom";

const content = {
  brand_name: "My Brand",
  enrollment_available: "Enrollment Available",
  enrollment_end: "through 12/31/21",
  product_up_to: "up to",
  product_in_value: "in value",
  currency_symbol: "$"
};

class Text extends React.Component {
  render() {
    return <span className={this.props.class}>{this.props.text}</span>;
  }
}

class ProductValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      class: props.class
    };
  }
  render() {
    return (
      <span className={this.state.class}>
        {content.currency_symbol}
        {this.state.value}
      </span>
    );
  }
}

class Banner extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="c-banner">
          <div className="c-brand-announcement">
            <Text
              class="c-brand-name text-uppercase"
              text={content.brand_name}
            />
            <span className="c-separator"></span>
            <div className="c-announcement">
              <span className="c-announcement-content">
                <span className="text-uppercase">
                  {content.enrollment_available}
                </span>
                <br />
                {content.enrollment_end}
              </span>
            </div>
          </div>
        </div>
        <div className="c-product">
          <div className="c-product-value-overlay">
            <Text
              class="c-product-text c-product-up-to text-uppercase"
              text={content.product_up_to}
            />
            <ProductValue value="119" class="c-product-value" />
            <Text
              class="c-product-text c-product-in-value text-uppercase"
              text={content.product_in_value}
            />
          </div>
        </div>
        <div className="c-sign-up">
          <span>cool</span>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Banner class="c-banner" />, document.getElementById("root"));
