import { DevsEditor } from "..";
import { Dev } from "../../models/Dev";

export function getCopyOfExistingDevs(devsEditor: DevsEditor) {
    const existingDevsCopy: Dev[] = [];
    devsEditor.state.devs.forEach(d => existingDevsCopy.push(d));
    return existingDevsCopy;
}