import React from "react";

const AsyncLoading = (props) => {
  // console.log(props);

  if (props.error) {
    // TODO: Improve the user experience for this when I rework the UI
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return <div>Components are Loading...</div>;
  } else {
    return null;
  }
};

export default AsyncLoading;