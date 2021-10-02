import React from "react";
import ReactDOM from "react-dom";

const content = {
  my_brand: " My Brand ",
  enrollment_available: " Enrollment Available ",
  through: " through ",
  up_to: " up to ",
  in_value: " in value ",
  for_limited_time: " For a limited time ",
  enjoy_food_pass: " Enjoy a complimentary Food Pass ",
  sub_12: " subscription for up to 12-months ",
  enroll_with_credit: " Enroll with your credit card and you could ",
  save_up_to: " save up to ",
  in_sub_annual: " in subscription fees annually! ",
  with_the: " with the ",
  food_plus_card: " Food Plus Card ",
  calc_yearly_savings: " Calculate Yearly Savings ",
  currency_symbol: " $ ",
  dont_miss: " Don’t miss this opportunity! ",
  link_subscribe: " Click here to subscribe! ",
  sub_thanks: " Thank you for subscribing! ",
  annual_savings: " Annual Savings ",
  monthly_spending: " Monthly Spending "
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
      <div className="brand-banner">
        <div className="bg">
          <h2 className="brand t-uppercase">{content.my_brand}</h2>
          <span className="bar"></span>
          <div className="announcement">
            <span>
              <b className="t-uppercase">{content.enrollment_available}</b>
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
      <div className="product-banner">
        <div className="food">
          <div className="overlay">
            <b className="content up-to t-uppercase">{content.up_to}</b>
            <b className="t-right">
              {<ProductValue value="119" specialOffer="139" />}
            </b>
            <b className="content in-value t-uppercase">{content.in_value}</b>
          </div>
        </div>
      </div>
    );
  }
}

class SignUp extends React.Component {
  render() {
    return (
      <div className="sign-up">
        <div className="bg">
          <div className="content">
            <div className="barker t-uppercase">
              <b>{content.for_limited_time}</b>
            </div>
            <h3>
              {content.enjoy_food_pass}
              <br />
              {content.sub_12}
            </h3>
            <div className="enroll">
              {content.enroll_with_credit}
              <b>
                {content.save_up_to}
                {<ProductValue value="119" specialOffer="139" />}
              </b>
              <br />
              {content.in_sub_annual}
            </div>
            {<Subscribe />}
          </div>
        </div>
      </div>
    );
  }
}

class Savings extends React.Component {
  render() {
    return (
      <div className="savings">
        <div className="content">
          <img
            className="piggy-bank"
            alt="Piggy Bank"
            src="./images/piggy-bank.jpg"
          />
          <div className="calculator">
            <h1 className="t-center">
              <b>{content.calc_yearly_savings}</b>
            </h1>
            <div className="subtitle">
              {content.with_the} <b className="hl">{content.food_plus_card}</b>
            </div>
            {<SavingsCalculator savings={calc.default_savings} />}
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
        <span className="value">
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
      subscribed: window.localStorage.subbed || false
    };
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(e) {
    e.preventDefault();
    window.localStorage.subbed = true;
    this.setState({ subscribed: window.localStorage.subbed });
  }
  render() {
    if (this.state.subscribed) {
      return <div className="subscribe">{content.sub_thanks}</div>;
    }
    return (
      <div className="subscribe">
        {content.dont_miss}
        <a className="link" href="subscribe" onClick={(e) => this.subscribe(e)}>
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
        <div className="spacer item"></div>
        <div className="item auto jc-start fd-col">
          <div className="label t-left">{content.annual_savings}</div>
          <div className="amount">
            {content.currency_symbol}
            {this.state.savings}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById("root"));
