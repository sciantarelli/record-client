import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeDataKey } from "../helpers";
import { doFetchList } from "../actions/crudActions";


const DefaultLoadingComponent = () =>
    <div>Loading...</div>;

// TODO: crud - write descriptions for the props
const Fetch = ({
    doFetch,
    endpoint,
    dataKey = makeDataKey(endpoint),
    id,
    dataObj = {},
    dataObj: { data, isFetching, error },
    renderMany=false,
    renderComponent: RenderComponent,
    loadingComponent: LoadingComponent = DefaultLoadingComponent ,
    children,
    ...restProps
}) => {
    useEffect(() => {
        doFetch(endpoint);
    }, []);

    // TODO: crud - Options to display error in place vs in some sort of notifications area?

    if (!RenderComponent) return React.cloneElement(
        children,
        { dataObj: { ...dataObj }, endpoint, dataKey }
    );

    if (isFetching) return <LoadingComponent/>;

    if (renderMany) {
        return (
            // TODO: crud - expand this to handle multiple data types
            (data && Object.values(data) || []).map((item) =>
                <RenderComponent {...restProps} key={item.id} item={item} />
            )
        )
    }

    return <RenderComponent {...restProps} item={data} />
};

// TODO: crud - Can probably prevent an extra render here (ownProps) by making Fetch a component wrapper/generator. See CrudForm
const mapStateToProps = (state, ownProps) => {
    // TODO: crud - Make a selector for this, dynamic of course
    const crudState = state.crud[makeDataKey(ownProps.endpoint)];

    return {
        dataObj: crudState || {}
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const doFetch = doFetchList;
    // TODO: crud - finish this!
    // const doFetch = ownProps.fetchAction || ownProps.

    return {
        doFetch: (endpoint) => dispatch(doFetch(endpoint))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Fetch);