import ReactDom from "react-dom";
import React from "react";
import App from "./App";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import reducer from "./reducer";
import "./index.css";
const store = createStore(reducer, compose(applyMiddleware(thunk)));

ReactDom.render(
  
        <Provider store={store}>
            <App />
            </Provider>
    
    ,
    document.getElementById("root")
);