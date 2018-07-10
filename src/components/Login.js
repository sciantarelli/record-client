import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { authUser } from '../actions/auth';

class Login extends Component {
  onSubmit = formProps => {

    // TODO: So this uses a callback to redirect. Try to handle in actions
    // this.props.signin(formProps, () => {
    //   this.props.history.push('/feature');
    // });

    const { dispatch } = this.props;

    dispatch(authUser(formProps));
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field
              name="email"
              type="text"
              component="input"
              autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
              name="password"
              type="password"
              component="input"
              autoComplete="none"
          />
        </fieldset>
        <div>{this.props.error}</div>
        <button>Login</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { error: state.auth.error };
}

export default compose(
    connect(mapStateToProps),
    reduxForm({ form: 'login' })
)(Login);
