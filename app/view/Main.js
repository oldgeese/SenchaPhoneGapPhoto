Ext.define('Photo.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to Sencha Touch 2'
                },

                html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")
            },
            {
                title: 'Camera',
                iconCls: 'action',
                layout: {
                    type:"vbox",
                    pack:"center",
                    align:"center"
                },
                items: [
                    {
                        xtype: "image",
                        src: "http://placehold.it/200x200",
                        width: 200,
                        height: 200
                    },
                    {
                        xtype: "button",
                        text: "Photo",
                        handler: function() {
                            function success(image_uri) {
                                var img = Ext.ComponentQuery.query("image")[0];
                                img.setSrc(image_uri);
                            }
        
                            function fail(message) {
                                alert("Failed: " + message);
                            }
        
                            navigator.camera.getPicture(success, fail, 
                                {
                                    quality: 50,
                                    destinationType: navigator.camera.DestinationType.FILE_URI,
                                    sourceType: navigator.camera.PictureSourceType.CAMERA
                                }
                            );
                        }
                    }
                ]
            }
        ]
    }
});
