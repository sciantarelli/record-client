import React from 'react';


const withUrlId = WrappedComponent => {
    const Wrapper = ({ match: { params: { id } }}) => {
        return <WrappedComponent id={id} />;
    };

    return Wrapper;
};

export default withUrlId;