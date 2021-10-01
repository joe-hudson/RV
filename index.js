import React from "react";
import ReactDOM from "react-dom";

const content = {
  my_brand: "My Brand",
  enrollment_available: "Enrollment Available",
  through: "through",
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

class Page extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BrandBanner end_date="12/31/2021" />
        <ProductImage />
        <SignUp />
        <Savings />
      </React.Fragment>
    );
  }
}

class BrandBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      end_date: props.end_date
    };
  }
  render() {
    return (
      <div class="brand-banner">
        <div class="bg">
          <h2 class="brand t-uppercase">{content.my_brand}</h2>
          <span class="bar"></span>
          <div class="announcement">
            <span>
              <b class="t-uppercase">{content.enrollment_available}</b>
              <br />
              {content.through} {this.state.end_date}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

class ProductImage extends React.Component {
  render() {
    return (
      <div class="c-food">
        <div class="c-product">
          <div class="c-value-overlay">
            <b class="c-content c-product-up-to t-uppercase">up to</b>
            <b id="product-value" class="c-value"></b>
            <b class="c-content c-product-in-value t-uppercase">in value</b>
          </div>
        </div>
      </div>
    );
  }
}

class SignUp extends React.Component {
  render() {
    return (
      <div class="c-sign-up">
        <div class="c-background">
          <div class="c-content">
            <div class="c-barker t-uppercase">
              <b>For a limited time</b>
            </div>
            <h3>
              Enjoy a complimentary Food Pass
              <br />
              subscription for up to 12-months
            </h3>
            <div class="c-enroll">
              Enroll with your credit card and you could
              <b>
                save up to <span id="enroll-value"></span>
              </b>
              <br />
              in subscription fees annually!
            </div>
            <div id="subscribe" class="mt-20"></div>
          </div>
        </div>
      </div>
    );
  }
}

class Savings extends React.Component {
  render() {
    return (
      <div class="c-savings">
        <div class="c-content">
          <img class="c-piggy-bank" src="./images/piggy-bank.jpg" />
          <div class="c-calculator">
            <h1 class="t-center">
              <b>Calculate Yearly Savings</b>
            </h1>
            <div class="c-subtitle">
              with the <b class="c-hl">Food Plus Card</b>
            </div>
            <div id="savings-calculator"></div>
          </div>
        </div>
      </div>
    );
  }
}

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

ReactDOM.render(<Page />, document.getElementById("root"));
// ReactDOM.render( <ProductValue value="119" specialOffer="139" />, document.getElementById("product-value"));
// ReactDOM.render( <ProductValue value="119" specialOffer="139" />, document.getElementById("enroll-value"));
// ReactDOM.render(<Subscribe />, document.getElementById("subscribe"));
// ReactDOM.render( <SavingsCalculator savings={calc.default_savings} />, document.getElementById("savings-calculator"));
