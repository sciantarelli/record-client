import React, { Component } from 'react';

export default Entity => {

  class ComposedComponent extends Component {

    componentDidMount() {
      const { data, errorMessage, validationErrors, doFetch, skipLoad } = this.props;

      if (!skipLoad && (!data || errorMessage) ) doFetch();
    }

    render() {
      const { isFetching, isSaving, errorMessage, validationErrors } = this.props;

      return(
        <div>
          { isFetching && <div>Loading...</div> }
          { isSaving && <div>Saving...</div> }
          { errorMessage && !validationErrors && <p>{errorMessage}</p> }
          { validationErrors &&
            <ul>
              { validationErrors.map(error => <li>{error}</li>) }
            </ul>
          }

          <Entity {...this.props} />
        </div>
      )
    }
  }

  return ComposedComponent;
}