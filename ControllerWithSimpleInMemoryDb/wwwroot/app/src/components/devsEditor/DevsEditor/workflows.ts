import { DevsEditor } from ".";
import { Dev } from "../models/Dev";
import { deleteDev } from "./activities/deleteDev";
import { editDev } from "./activities/editDev";
import { refreshTable } from "./activities/refreshTable";
import { saveDev } from "./activities/saveDev";
import { getConsistentResetState } from "./tasks/getConsistentResetState";
import { viewDev } from "./activities/viewDev";
import { DevsEditorState } from "./state";

export class Workflows {
    constructor(devsEditor: DevsEditor) {
        this.devsEditor = devsEditor;
    }

    devsEditor: DevsEditor;

    getConsistentResetState(): DevsEditorState {
        return getConsistentResetState(this.devsEditor);
    }

    refreshTable() {
        refreshTable(this.devsEditor);
    }

    save(name: string, onSuccessfulSave: () => void): void {
        saveDev(name, onSuccessfulSave, this.devsEditor);
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
