import { DevsEditor } from "..";
import { setConsistentResetState } from "./setConsistentResetState";
import { determineNextId } from "../tasks/determineNextId";
import { getAjaxResult } from "../tasks/getAjaxResult";
import { getCopyOfDevs } from "../tasks/getCopyOfDevs";
import { publishTableEdited } from "../tasks/publishTableEdited";

export function saveDev(firstName: string, lastName: string, onSuccessfulSave: () => void, devsEditor: DevsEditor): void {
    setConsistentResetState(devsEditor);

    const newDev = { id: devsEditor.state.nextId, firstName: firstName, lastName: lastName };
    const createDev = devsEditor.props.devsWebApi.createDev(newDev);

    createDev.done((result, textStatus, xhr) => {
        const newDevs = getCopyOfDevs(devsEditor.state.devs);
        const isSuccess = xhr.status === 201;
        if (isSuccess) newDevs.push(newDev);

        const nextId = determineNextId(newDevs);
        const newAjaxResult = getAjaxResult(result, textStatus, xhr);
        devsEditor.setState({ nextId: nextId, devs: newDevs, ajaxResult: newAjaxResult });

        if (isSuccess) publishTableEdited(devsEditor);
        onSuccessfulSave();
    }).fail((xhr, textStatus, errorThrown) => {
        const newAjaxResult = getAjaxResult(errorThrown, textStatus, xhr);

        devsEditor.setState({ ajaxResult: newAjaxResult });
    });
}