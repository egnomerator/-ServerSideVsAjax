import * as React from "react";
import { TrEditorCellProps } from "./props";

export class TrEditorCell extends React.Component<TrEditorCellProps> {
    constructor(props: TrEditorCellProps) {
        super(props);
    }

    render() {
        return <td>
            <button onClick={this.props.view}>View</button>{" "}
            <button onClick={this.props.edit}>Edit</button>{" "}
            <button onClick={this.props.delete}>Delete</button>
        </td>
    }
}