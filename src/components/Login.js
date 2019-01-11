import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { ButtonNaked } from './Buttons';
import { MessagesContainer, ErrorMessages } from './async';
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
      <div className="flex-container justify-content-center align-items-center">
        <MessagesContainer>
          { isAuthenticating && <p>Logging In...</p> }

          <ErrorMessages>
            { authError &&
              <li>{authError.message}</li>
            }
          </ErrorMessages>
        </MessagesContainer>

        <form className="d-flex flex-column" onSubmit={handleSubmit(this.onSubmit)}>
            <label className="offscreen">Email</label>
            <Field
                name="email"
                type="text"
                component="input"
                autoComplete="none"
                placeholder="Email"
            />

            <label className="offscreen">Password</label>
            <Field
                name="password"
                type="password"
                component="input"
                autoComplete="none"
                placeholder="Password"
            />
          <ButtonNaked>Login</ButtonNaked>
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
