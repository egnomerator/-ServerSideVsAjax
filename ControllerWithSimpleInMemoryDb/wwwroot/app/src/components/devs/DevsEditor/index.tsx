import * as React from "react";
import { AjaxResult } from "../AjaxResult";
import { CreateDev } from "../CreateDev";
import { DevDetails } from "../DevDetails";
import { EditableTable } from "../EditableTable";
import { Dev } from "../EditableTr";

export interface DevsWebApi {
    getDevs(): any;
    createDev(dev: Dev): any;
    viewDev(id: number): any;
    editDev(dev: Dev): any;
    deleteDev(id: number): any;
}

export interface EditableTableProps {
    devsWebApi: DevsWebApi;
}

export interface EditableTableState {
    nextId: number;
    devs: Dev[];
    devDetails: string;
    ajaxResult: string;
}

export class DevsEditor extends React.Component<EditableTableProps, EditableTableState> {
    constructor(props: EditableTableProps) {
        super(props);

        this.getConsistentResetState = this.getConsistentResetState.bind(this);
        this.determineNextId = this.determineNextId.bind(this);
        this.refreshTable = this.refreshTable.bind(this);
        this.save = this.save.bind(this);
        this.view = this.view.bind(this);
        this.getExistingDevsGivenThisEditedDev = this.getExistingDevsGivenThisEditedDev.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.getCopyOfExistingDevs = this.getCopyOfExistingDevs.bind(this);

        const initialState = this.getConsistentResetState();
        this.state = initialState;
    }

    componentDidMount() {
        this.refreshTable();
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

    refreshTable() {
        const self = this;
        const resetState = self.getConsistentResetState();
        self.setState(resetState);

        const getAllDevs = self.props.devsWebApi.getDevs();

        getAllDevs.done(function (result, textStatus, xhr) {
            let newDevs: Dev[] = [];
            if (xhr.status === 200) newDevs = result;
            const newNextId = self.determineNextId(newDevs);

            const newAjaxResult = self.getAjaxResult(result, textStatus, xhr);
            self.setState({ nextId: newNextId, devs: newDevs, ajaxResult: newAjaxResult });
        });
    }

    save(name: string, onSuccessfulSave: () => void): void {
        const self = this;
        const resetState = self.getConsistentResetState();
        self.setState(resetState);

        const newDev = { id: this.state.nextId, name: name };
        const createDev = devsWebApi.createDev(newDev);

        createDev.done(function (result, textStatus, xhr) {
            const newDevs = self.getCopyOfExistingDevs();
            const isSuccess = xhr.status === 201;
            if (isSuccess) newDevs.push(newDev);

            const nextId = self.determineNextId(newDevs);
            const newAjaxResult = self.getAjaxResult(result, textStatus, xhr);
            self.setState({ nextId: nextId, devs: newDevs, ajaxResult: newAjaxResult });
            onSuccessfulSave();
        });
    }

    view(id: number): void {
        const self = this;
        const resetState = self.getConsistentResetState();
        self.setState(resetState);

        const getDev = self.props.devsWebApi.viewDev(id);

        getDev.done(function (result, textStatus, xhr) {
            let newDevDetails = "";
            if (xhr.status === 200) newDevDetails = result === "" ? "" : JSON.stringify(result);

            const newAjaxResult = self.getAjaxResult(result, textStatus, xhr);
            self.setState({ devDetails: newDevDetails, ajaxResult: newAjaxResult });
        });
    }

    edit(dev: Dev): void {
        const self = this;
        const resetState = self.getConsistentResetState();
        resetState.devs = self.getExistingDevsGivenThisEditedDev(dev);
        self.setState(resetState);

        const updateDev = self.props.devsWebApi.editDev(dev);

        updateDev.done(function (result, textStatus, xhr) {
            const newAjaxResult = self.getAjaxResult(result, textStatus, xhr);

            self.setState({ ajaxResult: newAjaxResult });
        });
    }

    getExistingDevsGivenThisEditedDev(dev: Dev) {
        const existingDevs = this.getCopyOfExistingDevs();

        const devWithNameFieldChanged = existingDevs.find(d => d.id === dev.id);
        devWithNameFieldChanged.name = dev.name;

        return existingDevs;
    }

    delete(id: number): void {
        const self = this;
        const resetState = self.getConsistentResetState();
        self.setState(resetState);

        const removeDev = self.props.devsWebApi.deleteDev(id);

        removeDev.done(function (result, textStatus, xhr) {
            let newDevs: Dev[] = [];
            if (xhr.status === 204) {
                const editedDevs = [];
                self.state.devs.forEach(d => { if (d.id !== id) editedDevs.push(d) });

                newDevs = editedDevs;
            }

            const newAjaxResult = self.getAjaxResult(result, textStatus, xhr);
            const newNextId = self.determineNextId(newDevs);
            self.setState({ nextId: newNextId, devs: newDevs, ajaxResult: newAjaxResult });
        });
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
            <AjaxResult result={this.state.ajaxResult} />
        </div>
    }
}