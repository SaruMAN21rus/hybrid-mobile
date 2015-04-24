window.app = {
    initialize: function () {
        'use strict';
        
        kendo.culture("ru-RU");

        this.bindEvents();
    },

    bindEvents: function () {
        'use strict';
        
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('DOMContentLoaded', this.onDeviceReady, false);
    },

    onDeviceReady: function () {
        'use strict';
        
        app.db.onReady()
            .then(function(){
                app.app = new kendo.mobile.Application(document.body, {
                    transition: 'slide',
                    skin: 'flat',
                    initial: 'menuPageView',
                    init: function() {
                        //fix mouse events in iOS don't do it for android, causes more issues than it fixes
                        kendo.UserEvents.defaultThreshold(kendo.support.mobileOS.device === 'android' ? 0:20);
                    }
                });
                app.addVocData();
                app.createKendoDataSources();
            });

        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Eludia App", // title
                    'OK'        // buttonName
                );
            };
        }
    },

    onDOMContentLoaded: function() {
        'use strict';

        FastClick.attach(document.body);
    },

    checkConnection: function(){
        if (navigator.connection) {
            var networkState = navigator.connection.type;
            return networkState !== Connection.NONE;
        }
        return false;
    },
    db: new KetraDatabase({provider: 'sqLite' , databaseName: 'KetraDatabase'})
};