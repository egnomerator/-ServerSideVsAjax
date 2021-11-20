import { DevsEditor } from "..";
import { setConsistentResetState } from "./setConsistentResetState";
import { determineNextId } from "../tasks/determineNextId";
import { getAjaxResult } from "../tasks/getAjaxResult";
import { getCopyOfExistingDevs } from "../tasks/getCopyOfExistingDevs";

export function saveDev(name: string, onSuccessfulSave: () => void, devsEditor: DevsEditor): void {
    setConsistentResetState(devsEditor);

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