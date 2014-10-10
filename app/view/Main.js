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

                                var label = Ext.ComponentQuery.query("textareafield")[0];
                                label.setValue(image_uri);

                                var gotFileEntry = function(fileEntry) {
                                    var label = Ext.ComponentQuery.query("textareafield")[0];
                                    label.setValue("Default Image Directory"+fileEntry.fullpath);
                                    navigator.notification.alert(
                                        "Default Image Directory "+fileEntry.fullPath,
                                        null,
                                        "Message",
                                        "OK");
                                    var gotFileSystem = function(fileSystem) {
                                        fileSystem.root.getDirectory(
                                            "MyAppFolder",
                                            { create: true },
                                            function(dataDir) {
                                                var d = new Date();
                                                var n = d.getTime();

                                                var newFileName = n + '.jpg';

                                                var label = Ext.ComponentQuery.query("textareafield")[0];
                                                label.setValue(fileEntry.fullpath+"\n TO "+dataDir.fullpath);

                                                fileEntry.moveTo(dataDir, newFileName, onSuccess, onFail);
                                            },
                                            dirFail
                                        );
                                    };

                                    window.requestFileSystem(LocalFileSystem.PERSISTENT,
                                        0, gotFileSystem, onFail);
                                };

                                window.resolveLocalFileSystemURI(image_uri, gotFileEntry, onFail);

                                var onDirSuccess = function(dir) {
                                    navigator.notification.alert("Success "+dir.fullPath, null, "Message", "OK");
                                }

                                var onFail = function(error) {
                                    navigator.notification.alert("failed " + error.code, null, "Message", "OK");
                                }

                                var dirFail = function(error) {
                                    navigator.notification.alert("Directory " + error.code, null, "Message", "OK");
                                }
                            }
        
                            function fail(message) {
                                navigator.notification.alert("Failed: " + message, null, "Message", "OK");
                            }
        
                            navigator.camera.getPicture(success, fail, 
                                {
                                    quality: 50,
                                    destinationType: navigator.camera.DestinationType.FILE_URI,
                                    sourceType: navigator.camera.PictureSourceType.CAMERA
                                }
                            );
                        }
                    },
                    {
                        xtype: "textareafield",
                        value: "no photo",
                        width: "90%",
                        height:"25%"
                    }
                ]
            }
        ]
    }
});
