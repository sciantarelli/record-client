import React, { Component } from 'react';
import { connect } from 'react-redux';

export default Entity => {

  class ComposedComponent extends Component {

    // TODO: Consider that data fetching shouldn't run if user is logged out
    componentDidMount() {
      console.log(this.props);
      const { data, doFetch } = this.props;

      // TODO: Is this check necessary? If it is, may need to modify to handle arrays, object, etc
      if (!data) {
        doFetch();
      }
    }

    render() {
      const {isFetching, error} = this.props;

      return(
        <div>
          { isFetching && <div>Loading...</div> }
          { error && <p className="error">{error.message}</p> }

          <Entity {...this.props} />
        </div>
      )
    }
  }

  return ComposedComponent;
}