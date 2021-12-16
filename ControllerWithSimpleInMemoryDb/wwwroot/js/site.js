var pubSub = (function () {
    var eventRegister = {
        devEditedByJqueryTable: "DEV_EDITED_JQUERY_TABLE",
        devEditedByReact: "DEV_EDITED_REACT_TABLE"
    };

    var messageBroker = {
        findEvent: function (eventName) {
            return this.events.filter(e => { return e.eventName === eventName })[0];
        },
        events: [
            {
                eventName: eventRegister.devEditedByJqueryTable,
                eventHandlers: []
            },
            {
                eventName: eventRegister.devEditedByReact,
                eventHandlers: []
            }
        ],
        subscribe: function (eventName, handler) {
            var event = this.findEvent(eventName);

            var eventHandler = {
                id: ClientApp.Shared.CreateUUID(),
                callBack: handler
            }
            event.eventHandlers.push(eventHandler);

            var unsubscriber = function () {
                event.eventHandlers = event.eventHandlers.filter((h) => {
                    return h.id !== eventHandler.id;
                });
            }
            return unsubscriber;
        },
        publish: function (eventName, data) {
            var event = this.findEvent(eventName);
            event.eventHandlers.map((handler, i) => { handler.callBack(data); });
        }
    };

    return {
        eventRegister: eventRegister,
        subscribe: function (eventName, subscriber) { return messageBroker.subscribe(eventName, subscriber); },
        publish: function (eventName, data) { messageBroker.publish(eventName, data); },
        events: function () { return messageBroker.events;}
    }
})();

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
