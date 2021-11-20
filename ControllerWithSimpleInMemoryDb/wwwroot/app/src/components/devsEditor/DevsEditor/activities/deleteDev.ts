import { DevsEditor } from "..";
import { Dev } from "../../models/Dev";
import { setConsistentResetState } from "./setConsistentResetState";
import { determineNextId } from "../tasks/determineNextId";
import { getAjaxResult } from "../tasks/getAjaxResult";

export function deleteDev(id: number, devsEditor: DevsEditor): void {
    setConsistentResetState(devsEditor);

    const removeDev = devsEditor.props.devsWebApi.deleteDev(id);

    removeDev.done((result, textStatus, xhr) => {
        let newDevs: Dev[] = [];
        if (xhr.status === 204) {
            const editedDevs = [];
            devsEditor.state.devs.forEach(d => { if (d.id !== id) editedDevs.push(d) });

            newDevs = editedDevs;
        }

        const newAjaxResult = getAjaxResult(result, textStatus, xhr);
        const newNextId = determineNextId(newDevs);
        devsEditor.setState({ nextId: newNextId, devs: newDevs, ajaxResult: newAjaxResult });
    });
}