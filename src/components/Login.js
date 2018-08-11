import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { ButtonNaked } from './Buttons';
import MessagesContainer from './MessagesContainer';
import ErrorMessages from './ErrorMessages';
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
      <div class="flex-container justify-content-center align-items-center">
        <MessagesContainer>
          { isAuthenticating && <p>Logging In...</p> }

          <ErrorMessages>
            { authError && <p>{authError.message}</p> }
          </ErrorMessages>

        </MessagesContainer>

        <form class="d-flex flex-column" onSubmit={handleSubmit(this.onSubmit)}>
            <label class="offscreen">Email</label>
            <Field
                name="email"
                type="text"
                component="input"
                autoComplete="none"
                placeholder="Email"
            />

            <label class="offscreen">Password</label>
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
