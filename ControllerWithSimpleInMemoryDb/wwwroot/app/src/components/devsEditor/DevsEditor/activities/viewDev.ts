import { DevsEditor } from "..";
import { setConsistentResetState } from "./setConsistentResetState";
import { getAjaxResult } from "../tasks/getAjaxResult";

export function viewDev(id: number, devsEditor: DevsEditor): void {
    setConsistentResetState(devsEditor);

    const getDev = devsEditor.props.devsWebApi.viewDev(id);

    getDev.done((result, textStatus, xhr) => {
        let newDevDetails = "";
        if (xhr.status === 200) newDevDetails = result === "" ? "" : JSON.stringify(result);

        const newAjaxResult = getAjaxResult(result, textStatus, xhr);
        devsEditor.setState({ devDetails: newDevDetails, ajaxResult: newAjaxResult });
    });
}