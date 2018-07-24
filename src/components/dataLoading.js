import React, { Component } from 'react';
import { connect } from 'react-redux';

export default Entity => {

  class ComposedComponent extends Component {

    componentDidMount() {
      const { data, errorMessage, doFetch, skipLoad } = this.props;

      if (!skipLoad && (!data || errorMessage) ) doFetch();
    }

    render() {
      const {isFetching, isSaving, errorMessage} = this.props;

      return(
        <div>
          { isFetching && <div>Loading...</div> }
          { isSaving && <div>Saving...</div> }
          { errorMessage && <p>{errorMessage}</p> }

          <Entity {...this.props} />
        </div>
      )
    }
  }

  return ComposedComponent;
}