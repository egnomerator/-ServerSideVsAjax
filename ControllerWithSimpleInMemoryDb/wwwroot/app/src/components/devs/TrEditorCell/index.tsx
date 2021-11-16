import * as React from "react";

export class TrEditorCell extends React.Component {
    constructor(props) {
        super(props);
    }

    // TODO
    //  - ajaxDevViewId + dev.id (see Devs\index.js--pass dev.id in as props)
    //      - same for ajaxDevEditId and ajaxDevDeleteId
    //  - pass view/edit/delete functionality as props for onclick

    render() {
        return <td>
            <button id="ajaxDevViewId">View</button>{" "}
            <button id="ajaxDevEditId">View</button>{" "}
            <button id="ajaxDevDeleteId">View</button>
        </td>
    }
}