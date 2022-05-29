import * as React from "react";
import { EditableTableProps } from "./props";

export class EditableTable extends React.Component<EditableTableProps> {
    constructor(props: EditableTableProps) {
        super(props);

        this.handleDevNameChange = this.handleDevNameChange.bind(this);
        this.view = this.view.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    handleDevNameChange(id, event) {
        this.props.handleDevNameChange(id, event);
    }

    view(id: number) {
        this.props.view(id);
    }
    edit(id: number) {
        const editedDev = this.props.devs.filter(d => d.id === id)[0];
        this.props.edit(editedDev);
    }
    delete(id: number) {
        this.props.delete(id);
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
                            <tr key={dev.id}>
                                <td>{dev.id}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={dev.name}
                                        onChange={(e) => this.handleDevNameChange(dev.id, e)}
                                    />
                                </td>
                                <td>
                                    <button onClick={(e) => this.view(dev.id)}>View</button>{" "}
                                    <button onClick={(e) => this.edit(dev.id)}>Edit</button>{" "}
                                    <button onClick={(e) => this.delete(dev.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                }
            </tbody>
        </table>
    }
}
