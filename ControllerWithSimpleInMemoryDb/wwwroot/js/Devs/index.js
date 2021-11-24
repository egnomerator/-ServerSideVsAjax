var reactDevs = (function () {
    var api = {
        renderReactDevs: function () { renderReactDevs(); }
    }

    function renderReactDevs() {
        var container = $("#reactTableContainer")[0];
        ClientApp.Components.renderDevsEditor(container, devsWebApi);
    }

    return api;
})();

var nonAjaxDevs = (function () {
    var api = {
        devEdited: function (input) { devEdited(input); }
    }

    function devEdited(input) {
        var editedDevTr = $(input).closest("tr");
        var editedRowId = editedDevTr[0].id;
        var hiddenNameInput =
            $("#" + editedRowId + " td:nth-child(3) form:nth-child(2) input:nth-child(2)");

        var newDevName = $("#" + editedRowId + " td:nth-child(2) input").val();
        hiddenNameInput.val(newDevName);
    }

    return api;
})();

var ajaxDevs = (function () {
    var api = {
        getDevs: function () { getDevs(); },
        refreshDevs: function () { refreshDevs(); },
        createDev: function () { createDev(); },
        viewDev: function (id) { viewDev(id); },
        editDev: function (id) { editDev(id); },
        deleteDev: function (id) { deleteDev(id); }
    }

    function getDevs() {
        updateDevDetails("");

        var getAllDevs = devsWebApi.getDevs();

        getAllDevs.done(function (result, textStatus, xhr) {
            displayAjaxResult(result, textStatus, xhr);
            if (xhr.status === 200) addAllDevsToTable(result);
            updateAjaxNextId();
            displayNoDevsMessage();
        });
    }

    function refreshDevs() {
        clearDevs();
        getDevs();
    }

    function createDev() {
        updateDevDetails("");

        var newDev = {
            id: parseInt($("#ajaxNewDevId").val()),
            firstName: $("#ajaxNewDevFirstName").val(),
            lastName: $("#ajaxNewDevLastName").val()
        }

        var createDev = devsWebApi.createDev(newDev);

        createDev.done(function (result, textStatus, xhr) {
            displayAjaxResult(result, textStatus, xhr);
            if (xhr.status === 201) addDevElementToTable(newDev);
            updateAjaxNextId();
            clearNewDevNameFields();
        });
    }

    function viewDev(id) {
        updateDevDetails("");

        var getDev = devsWebApi.viewDev(id);

        getDev.done(function (result, textStatus, xhr) {
            displayAjaxResult(result, textStatus, xhr);
            if (xhr.status === 200) updateDevDetails(result);
        });
    }

    function editDev(id) {
        updateDevDetails("");
        var devToEdit = getDevToEdit(id);

        var updateDev = devsWebApi.editDev(devToEdit);

        updateDev.done(function (result, textStatus, xhr) {
            displayAjaxResult(result, textStatus, xhr);
        });
    }

    function deleteDev(id) {
        updateDevDetails("");

        var removeDev = devsWebApi.deleteDev(id);

        removeDev.done(function (result, textStatus, xhr) {
            displayAjaxResult(result, textStatus, xhr);
            if (xhr.status === 204) removeDevElement(id);
            updateAjaxNextId();
            displayNoDevsMessage();
        });
    }

    function updateDevDetails(result) {
        var devDetails = result === "" ? "" : JSON.stringify(result);
        $("#ajaxDevDetailsId")[0].innerHTML = devDetails;
    }

    function clearDevs() {
        $("#ajaxTableBody").empty();
    }

    function displayAjaxResult(result, textStatus, xhr) {
        var ajaxResult = document.getElementById("ajaxResultId");

        var r = result === undefined ? "" : JSON.stringify(result);
        var c = JSON.stringify(textStatus);
        var x = JSON.stringify(xhr);

        var fullResult = {
            content: r,
            textStatus: c,
            jqXhr: x
        };

        ajaxResult.innerHTML = JSON.stringify(fullResult);
    }

    function displayNoDevsMessage() {
        var ajaxBody = $("#ajaxTableBody");
        if (ajaxBody.children().length > 0) return;

        ajaxBody.append(getNoDevsMessageRow());
    }

    function updateAjaxNextId() {
        var nextIdField = $("#ajaxNewDevId");
        var nextId = getHighestDevId() + 1;
        nextIdField.val(nextId);
    }

    function clearNewDevNameFields() {
        var newFirstNameField = $("#ajaxNewDevFirstName");
        var newLastNameField = $("#ajaxNewDevLastName");
        newFirstNameField.val("");
        newLastNameField.val("");
    }

    function getHighestDevId() {
        var devIds = [];
        var devRows = $("#ajaxTableBody tr");

        if (devRows.length < 1) return 0;

        devRows.each(function (i, row) {
            var id = row.firstElementChild.textContent;
            devIds.push(parseInt(id));
        });

        var maxId = Math.max.apply(Math, devIds);
        return maxId;
    }

    function removeDevElement(id) {
        var devRowId = "ajaxDevRowId" + id;
        var rowToRemove = document.getElementById(devRowId);
        if (rowToRemove !== null) rowToRemove.remove();
    }

    function getDevToEdit(id) {
        var devName = $("#ajaxDevRowId" + id + " input").val();

        return {
            id: id,
            firstName: devName
        };
    }

    function addAllDevsToTable(devs) {
        for (var i = 0; i < devs.length; i++) {
            addDevElementToTable(devs[i]);
        }
    }

    function addDevElementToTable(newDev) {
        removeNoDevsMessage();
        var newDevRow = getNewDevRow(newDev);
        $("#ajaxTableBody").append(newDevRow);
    }

    function getNewDevRow(dev) {
        var newRow =
            $("<tr>")
                .attr("id", "ajaxDevRowId" + dev.id)
                .append($("<td>").text(dev.id))
                .append($("<td>")
                    .append($("<input>").attr("value", dev.firstName)))
                .append($("<td>")
                    .append($("<button>")
                        .attr("id", "ajaxDevViewId" + dev.id)
                        .attr("onclick", "ajaxDevs.viewDev(" + dev.id + ")")
                        .text("View"))
                    .append(" ")
                    .append($("<button>")
                        .attr("id", "ajaxDevEditId" + dev.id)
                        .attr("onclick", "ajaxDevs.editDev(" + dev.id + ")")
                        .text("Edit"))
                    .append(" ")
                    .append($("<button>")
                        .attr("id", "ajaxDevDeleteId" + dev.id)
                        .attr("onclick", "ajaxDevs.deleteDev(" + dev.id + ")")
                        .text("Delete"))
                );

        return newRow;
    }

    function getNoDevsMessageRow() {
        var newRow =
            $("<tr>")
                .attr("id", "noDevsMessageRowAjaxId")
                .append($("<td>")
                    .attr("colspan", "3")
                    .attr("class", "text-center")
                    .append("There are no devs.")
                );

        return newRow;
    }

    function removeNoDevsMessage() {
        var tableRowCount = $("#ajaxTableBody")[0].children.length;
        var tableHasDevs = tableRowCount > 1;
        if (tableHasDevs) return;
        var tableIsEmpty = tableRowCount < 1;
        if (tableIsEmpty) return;

        var theOnlyTableRow = $("#ajaxTableBody tr")[0];
        var isNoDevsMessage = theOnlyTableRow.id === "noDevsMessageRowAjaxId";

        if (isNoDevsMessage) theOnlyTableRow.remove();
    }

    return api;
})();
