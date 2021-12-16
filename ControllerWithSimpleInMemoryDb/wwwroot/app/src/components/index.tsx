import * as React from "react";
import * as ReactDOM from "react-dom";
import { PubSub } from "../pubSub";
import { DevsEditor } from "./devsEditor/DevsEditor";
import { DevsWebApi } from "./devsEditor/DevsEditor/webApi";

function renderDevsEditor(container: Element, api: DevsWebApi, pubSub: PubSub) {
    ReactDOM.render(
        <React.StrictMode>
            <DevsEditor devsWebApi={api} pubSub={pubSub} />
        </React.StrictMode>,
        container
    )
}

const Components = {
    renderDevsEditor: function (container: Element, devsWebApi: object, pubSub: object) {
        renderDevsEditor(container, devsWebApi as DevsWebApi, pubSub as PubSub);
    }
}

export default Components;
