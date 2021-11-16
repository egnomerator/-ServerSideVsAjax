var devsWebApi = (function () {
    var api = {
        getDevs: function () { return getDevs(); },
        createDev: function (newDev) { return createDev(newDev); },
        viewDev: function (id) { return viewDev(id); },
        editDev: function (devToEdit) { return editDev(devToEdit); },
        deleteDev: function (id) { return deleteDev(id); }
    };

    var devsResource = "/api/devs/";

    function getDevs() {
        return ajaxCall("get", devsResource);
    }

    function createDev(newDev) {
        return ajaxCall("post", devsResource, newDev);
    }

    function viewDev(id) {
        return ajaxCall("get", devsResource + id);
    }

    function editDev(devToEdit) {
        return ajaxCall("put", devsResource, devToEdit);
    }

    function deleteDev(id) {
        return ajaxCall("delete", devsResource + id);
    }

    return api;
})();
