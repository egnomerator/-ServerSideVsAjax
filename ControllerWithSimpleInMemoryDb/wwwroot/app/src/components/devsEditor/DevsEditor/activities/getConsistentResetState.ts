import { DevsEditor } from "..";
import { DevsEditorState } from "../state";
import { determineNextId } from "../tasks/determineNextId";

export function getConsistentResetState(devsEditor: DevsEditor): DevsEditorState {
    return {
        nextId: devsEditor.state === undefined ? determineNextId([]) : determineNextId(devsEditor.state.devs),
        devs: devsEditor.state === undefined ? null : devsEditor.state.devs,
        devDetails: "",
        ajaxResult: ""
    };
}