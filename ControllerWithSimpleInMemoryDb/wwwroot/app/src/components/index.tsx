import * as React from "react";
import * as ReactDOM from "react-dom";
import { DevsEditor } from "./DevsEditor";


function renderDevsEditor(container: Element) {
    ReactDOM.render(
        <DevsEditor/> ,
        container
    )
}

const Components = {
    renderDevsEditor: function (container: Element) { renderDevsEditor(container); }
}

export default Components;
