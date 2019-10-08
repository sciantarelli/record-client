import React from "react";
import Loadable from "react-loadable";
import AsyncLoading from './AsyncLoading';


let modules = ['messages'];
const loading = AsyncLoading;

// Messages Chunk

const AsyncCrudMessages = Loadable({
    loader: () => import(/* webpackChunkName: "messages" */ "../messages/CrudMessages"),
    loading,
    modules
});

const AsyncWarningMessages = Loadable({
    loader: () => import(/* webpackChunkName: "messages" */ "../messages/WarningMessages"),
    loading,
    modules
});

const AsyncErrorMessages = Loadable({
    loader: () => import(/* webpackChunkName: "messages" */ "../messages/ErrorMessages"),
    loading,
    modules
});

const AsyncMessagesContainer = Loadable({
    loader: () => import(/* webpackChunkName: "messages" */ "../messages/MessagesContainer"),
    loading,
    modules
});

// Notes chunk
modules = ['notes'];

const AsyncNotes = Loadable({
    loader: () => import(/* webpackChunkName: "notes" */ "../Notes"),
    loading,
    modules
});

const AsyncNote = Loadable({
    loader: () => import(/* webpackChunkName: "notes" */ "../Note"),
    loading,
    modules
});

export {
  AsyncCrudMessages as CrudMessages,
  AsyncWarningMessages as WarningMessages,
  AsyncErrorMessages as ErrorMessages,
  AsyncMessagesContainer as MessagesContainer,
  AsyncNotes as Notes,
  AsyncNote as Note
};