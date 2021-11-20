import { DevsEditor } from "..";
import { Dev } from "../../models/Dev";
import { setConsistentResetState } from "./setConsistentResetState";
import { getAjaxResult } from "../tasks/getAjaxResult";
import { getCopyOfExistingDevs } from "../tasks/getCopyOfExistingDevs";
import { getExistingDevsGivenThisEditedDev } from "../tasks/getExistingDevsGivenThisEditedDev";

export function editDev(dev: Dev, devsEditor: DevsEditor): void {
    const existingDevs = getCopyOfExistingDevs(devsEditor);
    const editedDevs = getExistingDevsGivenThisEditedDev(dev, existingDevs);
    setConsistentResetState(devsEditor, editedDevs);

    const updateDev = devsEditor.props.devsWebApi.editDev(dev);

    updateDev.done((result, textStatus, xhr) => {
        const newAjaxResult = getAjaxResult(result, textStatus, xhr);

        devsEditor.setState({ ajaxResult: newAjaxResult });
    });
}