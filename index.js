import React from "react";
import ReactDOM from "react-dom";

const content = {
  currency_symbol: "$",
  dont_miss: "Don’t miss this opportunity! ",
  link_subscribe: "Click here to subscribe!",
  sub_thanks: "Thank you for subscribing!",
  annual_savings: "Annual Savings",
  monthly_spending: "Monthly Spending"
};
const calc = {
  months: 12,
  rate: 0.03,
  default_savings: 180,
  default_spending: 500
};

class ProductValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      specialOffer: props.specialOffer,
      isOfferActive: false
    };
    this.updateOfferStatus();
  }
  updateOfferStatus() {
    fetch("/data/index.json")
      .then((response) => response.json())
      .then((data) => this.setState(data));
  }
  render() {
    if (this.state.isOfferActive) {
      return (
        <span>
          {content.currency_symbol}
          {this.state.specialOffer}
        </span>
      );
    }
    return (
      <span>
        {content.currency_symbol}
        {this.state.value}
      </span>
    );
  }
}

class Subscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: false
    };
  }
  render() {
    if (this.state.subscribed) {
      return <div>{content.sub_thanks}</div>;
    }
    return (
      <div>
        {content.dont_miss}
        <a
          className="link"
          href="#"
          onClick={() => this.setState({ subscribed: true })}
        >
          {content.link_subscribe}
        </a>
      </div>
    );
  }
}

class SavingsCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savings: props.savings
    };
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  handleKeyUp(event) {
    if (event.keyCode === 13 || !isNaN(parseInt(event.target.value))) {
      let saving = Math.round(
        calc.months * parseInt(event.target.value) * calc.rate
      );
      this.setState({
        savings: saving
      });
    }
  }
  render() {
    return (
      <div className="flex-container">
        <div className="item auto jc-end fd-col">
          <div className="label t-right">{content.monthly_spending}</div>
          <div className="input">
            <input
              name="monthly_spending"
              onKeyUp={this.handleKeyUp}
              placeholder={calc.default_spending}
            />
            <span>{content.currency_symbol}</span>
          </div>
        </div>
        <div className="c-spacer item"></div>
        <div className="item auto jc-start fd-col">
          <div className="label t-left">{content.annual_savings}</div>
          <div className="c-savings">
            {content.currency_symbol}
            {this.state.savings}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ProductValue value="119" specialOffer="139" />,
  document.getElementById("product-value")
);
ReactDOM.render(
  <ProductValue value="119" specialOffer="139" />,
  document.getElementById("enroll-value")
);
ReactDOM.render(<Subscribe />, document.getElementById("subscribe"));
ReactDOM.render(
  <SavingsCalculator savings={calc.default_savings} />,
  document.getElementById("savings-calculator")
);
