import { nanoid } from "nanoid";
import * as React from "react";
import { EditableTr } from "../EditableTr";
import { Dev } from "../models/Dev";

interface EditableTableProps {
    devs: Dev[];
    view(id: number): void;
    edit(dev: Dev): void;
    delete(id: number): void;
}

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
                                key={nanoid()}
                                dev={dev}
                                view={this.props.view}
                                edit={this.props.edit}
                                delete={this.props.delete} />)
                }
            </tbody>
        </table>
    }
}
