import { DevsEditor } from "..";
import { Dev } from "../../models/Dev";
import { setConsistentResetState } from "./setConsistentResetState";
import { getAjaxResult } from "../tasks/getAjaxResult";
import { getCopyOfDevs } from "../tasks/getCopyOfDevs";
import { updateMatchingDev } from "../tasks/updateMatchingDev";
import { publishTableEdited } from "../tasks/publishTableEdited";

export function editDev(updatedDev: Dev, devsEditor: DevsEditor): void {
    const existingDevs = getCopyOfDevs(devsEditor.state.devs);
    const editedDevs = updateMatchingDev(updatedDev, existingDevs);
    setConsistentResetState(devsEditor, editedDevs);

    const updateDev = devsEditor.props.devsWebApi.editDev(updatedDev);

    updateDev.done((result, textStatus, xhr) => {
        const newAjaxResult = getAjaxResult(result, textStatus, xhr);
        if (xhr.status === 204) publishTableEdited(devsEditor);

        devsEditor.setState({ ajaxResult: newAjaxResult });
    }).fail((xhr, textStatus, errorThrown) => {
        const newAjaxResult = getAjaxResult(errorThrown, textStatus, xhr);

        devsEditor.setState({ ajaxResult: newAjaxResult });
    });
}