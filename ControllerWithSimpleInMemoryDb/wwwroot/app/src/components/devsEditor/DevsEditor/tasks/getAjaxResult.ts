export function getAjaxResult(result, textStatus, xhr) {
    const fullResult = {
        content: result === undefined ? "" : JSON.stringify(result),
        textStatus: JSON.stringify(textStatus),
        jqXhr: JSON.stringify(xhr)
    };

    return JSON.stringify(fullResult);
}