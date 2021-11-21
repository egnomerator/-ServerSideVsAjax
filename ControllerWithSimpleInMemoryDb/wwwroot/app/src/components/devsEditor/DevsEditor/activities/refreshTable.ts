import { DevsEditor } from "..";
import { Dev } from "../../models/Dev";
import { setConsistentResetState } from "./setConsistentResetState";
import { determineNextId } from "../tasks/determineNextId";
import { getAjaxResult } from "../tasks/getAjaxResult";

export function refreshTable(devsEditor: DevsEditor) {
    setConsistentResetState(devsEditor);

    const getAllDevs = devsEditor.props.devsWebApi.getDevs();

    getAllDevs.done((result, textStatus, xhr) => {
        let newDevs: Dev[] = [];
        if (xhr.status === 200) newDevs = result;
        const newNextId = determineNextId(newDevs);

        const newAjaxResult = getAjaxResult(result, textStatus, xhr);
        devsEditor.setState({ nextId: newNextId, devs: newDevs, ajaxResult: newAjaxResult });
    }).fail((xhr, textStatus, errorThrown) => {
        const newAjaxResult = getAjaxResult(errorThrown, textStatus, xhr);

        devsEditor.setState({ ajaxResult: newAjaxResult });
    });
}