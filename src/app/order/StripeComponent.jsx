import React from 'react';
import { Button } from 'reactstrap';
import { CardElement, injectStripe, Elements } from 'react-stripe-elements';
import { Spinner } from '../loaders';
import constants from './constants';

class _CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidePayButton: false };
  }
  render() {
    const { startPaymentProcess, paymentStatus, paymentState } = this.props;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          paymentState(constants.PAYMENT_PROCESSING);
          this.props.stripe
            .createToken()
            .then(payload => {
              if (payload.token) {
                startPaymentProcess(payload.token.id);
              }
            })
            .catch(e => {
              paymentState(constants.PAYMENT_PROCESS_ERROR);
            });
        }}
      >
        <CardElement />
        {paymentStatus === constants.PAYMENT_PROCESSING ||
        this.state.hidePayButton === true ? (
          <Spinner />
        ) : (
          <Button
            className="btn-pay btn-secondary-active b-checkout"
            type="submit"
          >
            Pay
          </Button>
        )}
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);

class Checkout extends React.Component {
  render() {
    const { startPaymentProcess, paymentStatus, paymentState } = this.props;
    return (
      <div className="Checkout">
        <Elements>
          <CardForm
            startPaymentProcess={startPaymentProcess}
            paymentStatus={paymentStatus}
            paymentState={paymentState}
          />
        </Elements>
      </div>
    );
  }
}

export default Checkout;
