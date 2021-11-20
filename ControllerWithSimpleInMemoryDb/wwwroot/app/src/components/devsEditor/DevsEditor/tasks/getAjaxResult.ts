export function getAjaxResult(result, textStatus, xhr) {
    const r = result === undefined ? "" : JSON.stringify(result);
    const c = JSON.stringify(textStatus);
    const x = JSON.stringify(xhr);

    const fullResult = {
        content: r,
        textStatus: c,
        jqXhr: x
    };

    return JSON.stringify(fullResult);
}