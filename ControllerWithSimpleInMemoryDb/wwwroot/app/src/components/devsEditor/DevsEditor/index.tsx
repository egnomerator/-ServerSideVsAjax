import * as React from "react";
import { AjaxResult } from "../AjaxResult";
import { CreateDev } from "../CreateDev";
import { DevDetails } from "../DevDetails";
import { EditableTable } from "../EditableTable";
import { Dev } from "../models/Dev";
import { DevsEditorProps } from "./props";
import { DevsEditorState } from "./state";
import { Workflows } from "./workflows";

export class DevsEditor extends React.Component<DevsEditorProps, DevsEditorState> {
    unSubscribers = [];

    constructor(props: DevsEditorProps) {
        super(props);

        this.unSubscribers = [];

        this.refreshTable = this.refreshTable.bind(this);
        this.save = this.save.bind(this);
        this.view = this.view.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);

        this.workflows = new Workflows(this);
        const initialState = this.workflows.getConsistentResetState();
        this.state = initialState;
    }

    componentDidMount() {
        const subscribe = this.props.pubSub.subscribe;
        const devEditedByJqueryTableEvent = this.props.pubSub.eventRegister.devEditedByJqueryTable;

        const unSubscriber = subscribe(devEditedByJqueryTableEvent, this.refreshTable);
        this.unSubscribers.push(unSubscriber);
        this.refreshTable();
    }

    componentWillUnmount() {
        this.unSubscribers.map((unSubscribe, i) => { unSubscribe();});
    }

    workflows: Workflows;
    refreshTable() { this.workflows.refreshTable(); }
    save(firstName: string, lastName: string, onSuccessfulSave: () => void): void { this.workflows.save(firstName, lastName, onSuccessfulSave); }
    view(id: number): void { this.workflows.view(id); }
    edit(dev: Dev): void { this.workflows.edit(dev); }
    delete(id: number): void { this.workflows.delete(id); }

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