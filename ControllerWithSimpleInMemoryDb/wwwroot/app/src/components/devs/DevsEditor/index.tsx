import * as React from "react";
import { AjaxResult } from "../AjaxResult";
import { CreateDev } from "../CreateDev";
import { DevDetails } from "../DevDetails";
import { EditableTable } from "../EditableTable";
import { Dev } from "../models/Dev";
import { EditableTableState } from "./state";
import { EditableTableProps } from "./props";

export interface DevsWebApi {
    getDevs(): any;
    createDev(dev: Dev): any;
    viewDev(id: number): any;
    editDev(dev: Dev): any;
    deleteDev(id: number): any;
}

export class DevsEditor extends React.Component<EditableTableProps, EditableTableState> {
    constructor(props: EditableTableProps) {
        super(props);

        this.refreshTable = this.refreshTable.bind(this);
        this.save = this.save.bind(this);
        this.view = this.view.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);

        const initialState = this.getConsistentResetState();
        this.state = initialState;
    }

    componentDidMount() {
        this.refreshTable();
    }

    refreshTable() {
        const resetState = this.getConsistentResetState();
        this.setState(resetState);

        const getAllDevs = this.props.devsWebApi.getDevs();

        getAllDevs.done((result, textStatus, xhr) => {
            let newDevs: Dev[] = [];
            if (xhr.status === 200) newDevs = result;
            const newNextId = this.determineNextId(newDevs);

            const newAjaxResult = this.getAjaxResult(result, textStatus, xhr);
            this.setState({ nextId: newNextId, devs: newDevs, ajaxResult: newAjaxResult });
        });
    }

    save(name: string, onSuccessfulSave: () => void): void {
        const resetState = this.getConsistentResetState();
        this.setState(resetState);

        const newDev = { id: this.state.nextId, name: name };
        const createDev = devsWebApi.createDev(newDev);

        createDev.done((result, textStatus, xhr) => {
            const newDevs = this.getCopyOfExistingDevs();
            const isSuccess = xhr.status === 201;
            if (isSuccess) newDevs.push(newDev);

            const nextId = this.determineNextId(newDevs);
            const newAjaxResult = this.getAjaxResult(result, textStatus, xhr);
            this.setState({ nextId: nextId, devs: newDevs, ajaxResult: newAjaxResult });
            onSuccessfulSave();
        });
    }

    view(id: number): void {
        const resetState = this.getConsistentResetState();
        this.setState(resetState);

        const getDev = this.props.devsWebApi.viewDev(id);

        getDev.done((result, textStatus, xhr) => {
            let newDevDetails = "";
            if (xhr.status === 200) newDevDetails = result === "" ? "" : JSON.stringify(result);

            const newAjaxResult = this.getAjaxResult(result, textStatus, xhr);
            this.setState({ devDetails: newDevDetails, ajaxResult: newAjaxResult });
        });
    }

    edit(dev: Dev): void {
        const resetState = this.getConsistentResetState();
        resetState.devs = this.getExistingDevsGivenThisEditedDev(dev);
        this.setState(resetState);

        const updateDev = this.props.devsWebApi.editDev(dev);

        updateDev.done((result, textStatus, xhr) => {
            const newAjaxResult = this.getAjaxResult(result, textStatus, xhr);

            this.setState({ ajaxResult: newAjaxResult });
        });
    }

    getExistingDevsGivenThisEditedDev(dev: Dev) {
        const existingDevs = this.getCopyOfExistingDevs();

        const devWithNameFieldChanged = existingDevs.find(d => d.id === dev.id);
        devWithNameFieldChanged.name = dev.name;

        return existingDevs;
    }

    delete(id: number): void {
        const resetState = this.getConsistentResetState();
        this.setState(resetState);

        const removeDev = this.props.devsWebApi.deleteDev(id);

        removeDev.done((result, textStatus, xhr) => {
            let newDevs: Dev[] = [];
            if (xhr.status === 204) {
                const editedDevs = [];
                this.state.devs.forEach(d => { if (d.id !== id) editedDevs.push(d) });

                newDevs = editedDevs;
            }

            const newAjaxResult = this.getAjaxResult(result, textStatus, xhr);
            const newNextId = this.determineNextId(newDevs);
            this.setState({ nextId: newNextId, devs: newDevs, ajaxResult: newAjaxResult });
        });
    }

    getConsistentResetState(): EditableTableState {
        return {
            nextId: this.state === undefined ? this.determineNextId([]) : this.determineNextId(this.state.devs),
            devs: this.state === undefined ? null : this.state.devs,
            devDetails: "",
            ajaxResult: ""
        }
    }

    determineNextId(devs: Dev[]) {
        if (devs === null) return 0;

        let highestId = 0;
        devs.map((dev) => {
            if (dev.id > highestId) highestId = dev.id;
        });

        return highestId + 1;
    }

    getAjaxResult(result, textStatus, xhr) {
        const r = result === undefined ? "" : JSON.stringify(result);
        const c = JSON.stringify(textStatus);
        const x = JSON.stringify(xhr);

        const fullResult = {
            content: r,
            textStatus: c,
            jqXhr: x
        };

        return JSON.stringify(fullResult);
    }

    getCopyOfExistingDevs() {
        const existingDevsCopy: Dev[] = [];
        this.state.devs.forEach(d => existingDevsCopy.push(d));
        return existingDevsCopy;
    }

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