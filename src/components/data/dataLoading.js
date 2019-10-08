import React, { Component } from 'react';

export default Entity => {

  class ComposedComponent extends Component {

    componentDidMount() {
      const { data, errorMessage, doFetch, skipLoad } = this.props;

      if (!skipLoad && (!data || errorMessage) ) doFetch();
    }

    render() {
      return(
        <Entity {...this.props} />
      )
    }
  }

  return ComposedComponent;
}