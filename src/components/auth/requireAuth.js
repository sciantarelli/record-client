import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { LOGIN_PATH } from '../../constants';

export default Entity => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.navigateAway();
      }
    }

    render() {
      return <Entity {...this.props} />;
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    navigateAway: () => dispatch(push(LOGIN_PATH))
  });

  function mapStateToProps(state) {
    // TODO: Change to a selector, consider adding method isAuthenticated or something that checks this property
    return { auth: state.auth.accessToken };
  }

  return connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
};
