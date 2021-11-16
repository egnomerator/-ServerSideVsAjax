import * as React from "react";
import { EditableTr } from "../EditableTr";

export class EditableTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <table className="table">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    <EditableTr />
                </tbody>
            </table>
        </div>
    }
}
