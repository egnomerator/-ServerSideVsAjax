function ajaxCall(method, resource, payload) {
    var ajaxConfig = {
        url: resource,
        type: method
    };

    if (payload !== undefined && payload !== null) {
        ajaxConfig.data = JSON.stringify(payload);
        ajaxConfig.contentType = "application/json";
    }

    return $.ajax(ajaxConfig);
}
