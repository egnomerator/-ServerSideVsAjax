import * as React from "react";
import { TrEditorCell } from "../TrEditorCell";

export class EditableTr extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <tr>
            <td>testId</td>
            <td>testName</td>
            <TrEditorCell />
        </tr>
    }
}