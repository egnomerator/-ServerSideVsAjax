import * as React from "react";
import CreateUUID from "../../../shared/uuid";
import { EditableTr } from "../EditableTr";
import { EditableTableProps } from "./props";

export class EditableTable extends React.Component<EditableTableProps> {
    constructor(props: EditableTableProps) {
        super(props);
    }

    render() {
        return <table className="table">
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {
                    this.props.devs.length < 1
                        ? <tr><td colSpan={3} className="text-center" >There are no devs.</td></tr>
                        : this.props.devs.map((dev) =>
                            <EditableTr
                                key={CreateUUID()}
                                dev={dev}
                                view={this.props.view}
                                edit={this.props.edit}
                                delete={this.props.delete} />)
                }
            </tbody>
        </table>
    }
}
