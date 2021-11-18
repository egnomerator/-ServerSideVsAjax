import * as React from "react";

interface TrEditorCellProps {
    view(): void;
    edit(): void;
    delete(): void;
}

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