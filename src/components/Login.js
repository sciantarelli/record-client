import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { doAuthUser } from '../actions/auth';
import { getIsAuthenticating, getAuthError } from '../selectors/auth';

class Login extends Component {
  onSubmit = formProps => {
    const { dispatch } = this.props;

    dispatch(doAuthUser(formProps));
  };

  render() {
    const { handleSubmit, authError, isAuthenticating } = this.props;

    return (
      <div>
        { authError && <p>{authError.message}</p> }
        { isAuthenticating && <p>Logging In...</p> }
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
          <button>Login</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticating: getIsAuthenticating(state.auth),
  authError: getAuthError(state.auth)
});

export default compose(
    connect(mapStateToProps),
    reduxForm({ form: 'login' })
)(Login);
