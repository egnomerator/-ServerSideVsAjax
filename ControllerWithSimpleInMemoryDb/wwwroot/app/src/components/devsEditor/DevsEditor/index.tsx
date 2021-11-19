import * as React from "react";
import { AjaxResult } from "../AjaxResult";
import { CreateDev } from "../CreateDev";
import { DevDetails } from "../DevDetails";
import { EditableTable } from "../EditableTable";
import { Dev } from "../models/Dev";
import { EditableTableState } from "./state";
import { EditableTableProps } from "./props";
import ComponentOperations from "./componentOperations";

export class DevsEditor extends React.Component<EditableTableProps, EditableTableState> {
    constructor(props: EditableTableProps) {
        super(props);

        this.refreshTable = this.refreshTable.bind(this);
        this.save = this.save.bind(this);
        this.view = this.view.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);

        const initialState = ComponentOperations.getConsistentResetState(this);
        this.state = initialState;
    }

    componentDidMount() { this.refreshTable(); }

    refreshTable() { ComponentOperations.refreshTable(this); }
    save(name: string, onSuccessfulSave: () => void): void { ComponentOperations.save(name, onSuccessfulSave, this); }
    view(id: number): void { ComponentOperations.view(id, this); }
    edit(dev: Dev): void { ComponentOperations.edit(dev, this); }
    delete(id: number): void { ComponentOperations.delete(id, this); }

    render() {
        return <div>
            <div className="h2" style={{ display: "inline" }}>
                React{" "}
            </div>
            <a className="btn btn-primary" style={{ display: "inline" }} onClick={this.refreshTable}>
                Refresh
            </a>
            <p></p>
            <CreateDev nextId={this.state.nextId} nextIdIsKnown={this.state.devs !== null} save={this.save} />
            <EditableTable
                devs={this.state.devs ?? []}
                view={this.view}
                edit={this.edit}
                delete={this.delete}
            />
            <p></p>
            <DevDetails details={this.state.devDetails} />
            <p></p>
            <AjaxResult result={this.state.ajaxResult} />
        </div>
    }
}