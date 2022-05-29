﻿import * as React from "react";
import { Dev } from "../models/Dev";
import { EditableTableState } from "./state";
import { EditableTableProps } from "./props";

export class DevsEditor extends React.Component<EditableTableProps, EditableTableState> {
    constructor(props: EditableTableProps) {
        super(props);

        this.refreshTable = this.refreshTable.bind(this);
        this.save = this.save.bind(this);
        this.view = this.view.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);

        this.getNextId = this.getNextId.bind(this);
        this.handleCreateDevNameChange = this.handleCreateDevNameChange.bind(this);
        this.handleDevNameChange = this.handleDevNameChange.bind(this);

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

    save(): void {
        const resetState = this.getConsistentResetState();
        this.setState(resetState);

        const newDev = { id: this.state.nextId, name: this.state.createDevName };
        const createDev = devsWebApi.createDev(newDev);

        createDev.done((result, textStatus, xhr) => {
            const newDevs = this.getCopyOfExistingDevs();
            const isSuccess = xhr.status === 201;
            if (isSuccess) newDevs.push(newDev);

            const nextId = this.determineNextId(newDevs);
            const newAjaxResult = this.getAjaxResult(result, textStatus, xhr);
            this.setState({ nextId: nextId, devs: newDevs, createDevName: "", ajaxResult: newAjaxResult });
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

    edit(id: number): void {
        const devToEdit = this.state.devs.filter(d => d.id === id)[0];

        const resetState = this.getConsistentResetState();
        resetState.devs = this.getExistingDevsGivenThisEditedDev(devToEdit);
        this.setState(resetState);

        const updateDev = this.props.devsWebApi.editDev(devToEdit);

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
            createDevName: "",
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

    getNextId() {
        return this.state.devs !== null ? this.state.nextId.toString() : "";
    }

    handleCreateDevNameChange(event) {
        this.setState({ createDevName: event.target.value });
    }

    handleDevNameChange(id: number, event) {
        const editedDev: Dev = { id: id, name: event.target.value };
        const editedDevss = this.state.devs.map(d => d.id === id ? editedDev : d);

        this.setState({ devs: editedDevss });
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
            <div>
                <div>
                    <input id="reactNewDevId" type="number" readOnly={true} value={this.getNextId()} />
                    {" "}
                    <label htmlFor="reactNewDevId">Next Id</label>
                </div>
                <div>
                    <input id="reactNewDevName" type="text" value={this.state.createDevName} onChange={this.handleCreateDevNameChange} />
                    {" "}
                    <label htmlFor="reactNewDevName">Name</label>
                </div>
                <button onClick={this.save}>Save Dev</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.devs === null || this.state.devs.length < 1
                            ? <tr><td colSpan={3} className="text-center" >There are no devs.</td></tr>
                            : this.state.devs.map((dev) =>
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

            <p></p>
            <div>
                <div className="h4" style={{ display: "inline" }}>Dev Details:</div>{" "}
                <div style={{ display: "inline" }}>{this.state.devDetails}</div>
            </div>
            <p></p>
            <div>
                <div className="h4" style={{ display: "inline" }}>Ajax Result:</div>{" "}
                <div style={{ display: "inline" }}>{this.state.ajaxResult}</div>
            </div>
        </div>
    }
}