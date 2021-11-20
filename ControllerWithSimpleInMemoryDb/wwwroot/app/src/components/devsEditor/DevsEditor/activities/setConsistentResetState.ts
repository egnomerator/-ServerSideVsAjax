import { DevsEditor } from "..";
import { Dev } from "../../models/Dev";
import { determineNextId } from "../tasks/determineNextId";
import { getConsistentResetState } from "../tasks/getConsistentResetState";

export function setConsistentResetState(devsEditor: DevsEditor, devsToUse?: Dev[]): void {
    const resetState = getConsistentResetState(devsEditor);

    resetState.devs = devsToUse ? devsToUse : resetState.devs;
    resetState.nextId = devsToUse ? determineNextId(devsToUse) : resetState.nextId;

    devsEditor.setState(resetState);
}