Ext.define('AM.view.file.Grid' ,{
    extend: 'Ext.Panel',

    alias: 'widget.filegrid',
    id: 'appfile',
    width: 535,
    height: 400,
    autoScroll: true,

    initComponent: function() {
    	this.items = [{
    		xtype: 'filebrowser',
    		id: 'img-chooser-view',
            listeners: {
                scope: this,
                selectionchange: this.onIconSelect,
                itemdblclick: this.fireImageSelected
            }
    	}];

        this.callParent(arguments);
    }, 

    onIconSelect: function(dataview, selections) {
        var selected = selections[0];
        
        if (selected) {
        	//console.log('Selected: '+selected.getId());
        }
    },
    
    fireImageSelected: function() {
        var selectedImage = this.down('filebrowser').selModel.getSelection()[0];
        
        if (selectedImage) {
        	//console.log('double-clicked: '+selectedImage.getId());
        	
        }
    }
});