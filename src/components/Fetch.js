import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeDataKey } from "../helpers";
import { doFetch } from "../actions/crudActions";
import { pathWithId } from "../helpers";


const DefaultLoadingComponent = () =>
    <div>Loading...</div>;

// TODO: crud - write descriptions for the props
const Fetch = ({
    doFetch,
    endpoint,
    openState = false,
    defaultState,
    dataKey = makeDataKey(endpoint, openState),
    id,
    dataObj = {},
    renderMany = false,
    renderComponent: RenderComponent,
    loadingComponent: LoadingComponent = DefaultLoadingComponent ,
    children,
    ...restProps
}) => {
    useEffect(() => {
        const calculatedEndpoint =
            id ? pathWithId(endpoint, id) : endpoint;

        doFetch(calculatedEndpoint, dataKey, id, defaultState);
    }, []);

    const { data, isFetching, error } = dataObj;

    // TODO: crud - Options to display error in place vs in some sort of notifications area?

    console.log('fetch render');

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

const mapStateToProps = (state, ownProps) => {
    // TODO: crud - Make a selector for this, dynamic of course
    const { id, openState, endpoint } = ownProps;
    const dataKey = makeDataKey(endpoint, openState);
    const crudState = state.crud[dataKey];

    let dataObj = {};

    if (crudState) {
        dataObj = id ? crudState[id] : crudState;
    }

    return {
        dataObj: dataObj
    }
};

const mapDispatchToProps = {
    doFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(Fetch);