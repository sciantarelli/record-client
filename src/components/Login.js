import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { doAuthUser } from '../actions/auth';
import { getAuthError } from '../selectors/auth';

class Login extends Component {
  onSubmit = formProps => {

    // TODO: So this uses a callback to redirect. Try to handle in actions
    // this.props.signin(formProps, () => {
    //   this.props.history.push('/feature');
    // });

    const { dispatch } = this.props;

    dispatch(doAuthUser(formProps));
  };

  render() {
    const { handleSubmit, authError } = this.props;

    return (
      <div>
        { authError && <p className="error">{authError.message}</p> }
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
  authError: getAuthError(state.auth)
});

export default compose(
    connect(mapStateToProps),
    reduxForm({ form: 'login' })
)(Login);
