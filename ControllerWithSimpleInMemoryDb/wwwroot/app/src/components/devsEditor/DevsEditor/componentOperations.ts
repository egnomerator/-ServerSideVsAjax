import { DevsEditor } from ".";
import { Dev } from "../models/Dev";
import { EditableTableState } from "./state";

function getCopyOfExistingDevs(devsEditor: DevsEditor) {
    const existingDevsCopy: Dev[] = [];
    devsEditor.state.devs.forEach(d => existingDevsCopy.push(d));
    return existingDevsCopy;
}

function getExistingDevsGivenThisEditedDev(dev: Dev, devsEditor: DevsEditor) {
    const existingDevs = getCopyOfExistingDevs(devsEditor);

    const devWithNameFieldChanged = existingDevs.find(d => d.id === dev.id);
    devWithNameFieldChanged.name = dev.name;

    return existingDevs;
}

function determineNextId(devs: Dev[]) {
    if (devs === null) return 0;

    let highestId = 0;
    devs.map((dev) => {
        if (dev.id > highestId) highestId = dev.id;
    });

    return highestId + 1;
}

function getAjaxResult(result, textStatus, xhr) {
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

function getConsistentResetState(devsEditor: DevsEditor): EditableTableState {
    return {
        nextId: devsEditor.state === undefined ? determineNextId([]) : determineNextId(devsEditor.state.devs),
        devs: devsEditor.state === undefined ? null : devsEditor.state.devs,
        devDetails: "",
        ajaxResult: ""
    }
}

function refreshTable(devsEditor: DevsEditor) {
    const resetState = getConsistentResetState(devsEditor);
    devsEditor.setState(resetState);

    const getAllDevs = devsEditor.props.devsWebApi.getDevs();

    getAllDevs.done((result, textStatus, xhr) => {
        let newDevs: Dev[] = [];
        if (xhr.status === 200) newDevs = result;
        const newNextId = determineNextId(newDevs);

        const newAjaxResult = getAjaxResult(result, textStatus, xhr);
        devsEditor.setState({ nextId: newNextId, devs: newDevs, ajaxResult: newAjaxResult });
    });
}

function save(name: string, onSuccessfulSave: () => void, devsEditor: DevsEditor): void {
    const resetState = getConsistentResetState(devsEditor);
    devsEditor.setState(resetState);

    const newDev = { id: devsEditor.state.nextId, name: name };
    const createDev = devsWebApi.createDev(newDev);

    createDev.done((result, textStatus, xhr) => {
        const newDevs = getCopyOfExistingDevs(devsEditor);
        const isSuccess = xhr.status === 201;
        if (isSuccess) newDevs.push(newDev);

        const nextId = determineNextId(newDevs);
        const newAjaxResult = getAjaxResult(result, textStatus, xhr);
        devsEditor.setState({ nextId: nextId, devs: newDevs, ajaxResult: newAjaxResult });
        onSuccessfulSave();
    });
}

function view(id: number, devsEditor: DevsEditor): void {
    const resetState = getConsistentResetState(devsEditor);
    devsEditor.setState(resetState);

    const getDev = devsEditor.props.devsWebApi.viewDev(id);

    getDev.done((result, textStatus, xhr) => {
        let newDevDetails = "";
        if (xhr.status === 200) newDevDetails = result === "" ? "" : JSON.stringify(result);

        const newAjaxResult = getAjaxResult(result, textStatus, xhr);
        devsEditor.setState({ devDetails: newDevDetails, ajaxResult: newAjaxResult });
    });
}

function edit(dev: Dev, devsEditor: DevsEditor): void {
    const resetState = getConsistentResetState(devsEditor);
    resetState.devs = getExistingDevsGivenThisEditedDev(dev, devsEditor);
    devsEditor.setState(resetState);

    const updateDev = devsEditor.props.devsWebApi.editDev(dev);

    updateDev.done((result, textStatus, xhr) => {
        const newAjaxResult = getAjaxResult(result, textStatus, xhr);

        devsEditor.setState({ ajaxResult: newAjaxResult });
    });
}

function deleteDev(id: number, devsEditor: DevsEditor): void {
    const resetState = getConsistentResetState(devsEditor);
    devsEditor.setState(resetState);

    const removeDev = devsEditor.props.devsWebApi.deleteDev(id);

    removeDev.done((result, textStatus, xhr) => {
        let newDevs: Dev[] = [];
        if (xhr.status === 204) {
            const editedDevs = [];
            devsEditor.state.devs.forEach(d => { if (d.id !== id) editedDevs.push(d) });

            newDevs = editedDevs;
        }

        const newAjaxResult = getAjaxResult(result, textStatus, xhr);
        const newNextId = determineNextId(newDevs);
        devsEditor.setState({ nextId: newNextId, devs: newDevs, ajaxResult: newAjaxResult });
    });
}

const ComponentOperations = {
    getConsistentResetState: function (devsEditor: DevsEditor): EditableTableState { return getConsistentResetState(devsEditor); },
    refreshTable: function (devsEditor: DevsEditor) { refreshTable(devsEditor); },
    save: function (name: string, onSuccessfulSave: () => void, devsEditor: DevsEditor): void { save(name, onSuccessfulSave, devsEditor); },
    view: function (id: number, devsEditor: DevsEditor): void { view(id, devsEditor); },
    edit: function (dev: Dev, devsEditor: DevsEditor): void { edit(dev, devsEditor); },
    delete: function (id: number, devsEditor: DevsEditor): void { deleteDev(id, devsEditor); }
}

export default ComponentOperations;
