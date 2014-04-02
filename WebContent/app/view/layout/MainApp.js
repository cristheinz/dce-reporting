Ext.define('AM.view.layout.MainApp', {
    extend: 'Ext.container.Container',

    alias: 'widget.mainapp',
    layout:'border',
    
    items: [{
        region:'north',
        height: 50,
        items: [{ xtype: 'head' }]
    },{
        region:'west',
        title: 'Locais',
        layout: 'fit',
        margins: '5 0 0 5',
        width: 200,
        collapsible: true,   // make collapsible
        split: true,          // enable resizing
        items: [{ xtype: 'mainmenu' }]
    },{
        region: 'center',     // center region is required, no width/height specified
        layout: 'fit',
        xtype: 'tabpanel',
        name: 'mainContent',
    	items: [{xtype: 'dashboard'}],
        margins: '5 5 0 0'
    },{
        region: 'south',     // position for region
        //title: 'Atalhos',
        xtype: 'label',
        html: '<center style="color: gray;font-size:x-small">bapop dce v3.0</center>',
        height: 25,
        //minHeight: 75,
        //maxHeight: 250,
        //collapsible: true,   // make collapsible
        //collapsed: true,
        margins: '5 0 0 0'
    }]
});