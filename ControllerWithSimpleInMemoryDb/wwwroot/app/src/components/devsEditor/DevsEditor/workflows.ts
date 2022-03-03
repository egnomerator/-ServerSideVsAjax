import { DevsEditor } from ".";
import { Dev } from "../models/Dev";
import { deleteDev } from "./activities/deleteDev";
import { editDev } from "./activities/editDev";
import { refreshTable } from "./activities/refreshTable";
import { saveDev } from "./activities/saveDev";
import { getConsistentResetState } from "./activities/getConsistentResetState";
import { viewDev } from "./activities/viewDev";
import { DevsEditorState } from "./state";

export class Workflows {
    constructor(devsEditor: DevsEditor) {
        this.devsEditor = devsEditor;

        this.getConsistentResetState = this.getConsistentResetState.bind(this);
        this.refreshTable = this.refreshTable.bind(this);
        this.save = this.save.bind(this);
        this.view = this.view.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    devsEditor: DevsEditor;

    getConsistentResetState(): DevsEditorState {
        return getConsistentResetState(this.devsEditor);
    }

    refreshTable() {
        refreshTable(this.devsEditor);
    }

    save(firstName: string, lastName: string, onSuccessfulSave: () => void): void {
        saveDev(firstName, lastName, onSuccessfulSave, this.devsEditor);
    }

    view(id: number): void {
        viewDev(id, this.devsEditor);
    }

    edit(dev: Dev): void {
        editDev(dev, this.devsEditor);
    }

    delete(id: number): void {
        deleteDev(id, this.devsEditor);
    }
}
