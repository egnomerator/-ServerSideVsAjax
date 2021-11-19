import { nanoid } from "nanoid";
import * as React from "react";
import { Dev, EditableTr } from "../EditableTr";

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

    getTableRows() {
        if (this.props.devs.length < 1)
            return <tr><td colSpan={3} className="text-center" >There are no devs.</td></tr>

        const rows = [];
        this.props.devs.map((dev) => {
            rows.push(<EditableTr
                key={nanoid()}
                dev={dev}
                view={this.props.view}
                edit={this.props.edit}
                delete={this.props.delete} />);
        });

        return rows;
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
                    {this.getTableRows()}
                </tbody>
            </table>
        </div>
    }
}
