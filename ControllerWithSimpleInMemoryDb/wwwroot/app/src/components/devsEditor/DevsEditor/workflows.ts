import { DevsEditor } from ".";
import { Dev } from "../models/Dev";
import { deleteDev } from "./activities/deleteDev";
import { editDev } from "./activities/editDev";
import { refreshTable } from "./activities/refreshTable";
import { saveDev } from "./activities/saveDev";
import { getConsistentResetState } from "./tasks/getConsistentResetState";
import { viewDev } from "./activities/viewDev";
import { DevsEditorState } from "./state";

function getConsistentDevsEditorResetState(devsEditor: DevsEditor): DevsEditorState {
    return getConsistentResetState(devsEditor);
}

function refreshDevsTable(devsEditor: DevsEditor) {
    refreshTable(devsEditor);
}

function save(name: string, onSuccessfulSave: () => void, devsEditor: DevsEditor): void {
    saveDev(name, onSuccessfulSave, devsEditor);
}

function view(id: number, devsEditor: DevsEditor): void {
    viewDev(id, devsEditor);
}

function edit(dev: Dev, devsEditor: DevsEditor): void {
    editDev(dev, devsEditor);
}

function deleteDeveloper(id: number, devsEditor: DevsEditor): void {
    deleteDev(id, devsEditor);
}

const Workflows = {
    getConsistentResetState: function (devsEditor: DevsEditor): DevsEditorState { return getConsistentDevsEditorResetState(devsEditor); },
    refreshTable: function (devsEditor: DevsEditor) { refreshDevsTable(devsEditor); },
    save: function (name: string, onSuccessfulSave: () => void, devsEditor: DevsEditor): void { save(name, onSuccessfulSave, devsEditor); },
    view: function (id: number, devsEditor: DevsEditor): void { view(id, devsEditor); },
    edit: function (dev: Dev, devsEditor: DevsEditor): void { edit(dev, devsEditor); },
    delete: function (id: number, devsEditor: DevsEditor): void { deleteDeveloper(id, devsEditor); }
}

export default Workflows;
