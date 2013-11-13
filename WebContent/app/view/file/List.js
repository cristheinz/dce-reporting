Ext.define('AM.view.file.List' ,{
    extend: 'Ext.grid.Panel',

    alias: 'widget.filelist',
    //id: 'module_branch',
    
    width: 535,
    height: 400,
    autoScroll: true,
    
    store: 'FileStore',
    
    features: [{
    	ftype: 'filters',
    	autoReload: false, 
    	local: true,
		filters : [ {
			type: 'string',
			dataIndex: 'fid'
		} 
		]
    }],

    initComponent: function() {
        this.columns = [{
			menuDisabled: true,
            sortable: false,
            dataIndex : 'ext',
            renderer: this.renderIcon,
            width: 25
		},{
			text : 'Ficheiro',
			dataIndex : 'name',
			groupable : false,
			width : 300,
			renderer : function(v, cellValues, rec) {
				return rec.get('name');
			},
			editor : {
				xtype : 'textfield'
			},
			items : {
				xtype : 'textfield',
				flex : 1,
				margin : 2,
				enableKeyEvents : true,
				listeners : {
					keyup : function() {
						var store = this.up('tablepanel').store;
						store.clearFilter();
						if (this.value) {
							store.filter({
								property : 'name',
								value : this.value,
								anyMatch : true,
								caseSensitive : false
							});
						}
					},
					buffer : 500
				}
			}
		},{
			header : 'Tipo',
			dataIndex : 'fid',
			flex : 1
		},{
			header : 'Data de criação',
			dataIndex : 'creationDate',
			flex : 1,
			xtype : 'datecolumn',
			format : 'Y-m-d'
		},{
			menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 35,
            /*action: 'download',
            iconCls: 'download-icon',
            tooltip: 'Download'*/
            
            items: [{
            	//action: 'download',
                iconCls: 'download-icon',
                tooltip: 'Download',
                handler: function(grid, rowIndex, colIndex) {
                	this.up('grid').fireEvent('itemdownloadbuttonclick', grid, rowIndex, colIndex);
                }
            },{
            	iconCls: 'delete-icon',
            	tooltip: 'Apagar',
            	handler: function(grid, rowIndex, colIndex){
            		this.up('grid').fireEvent('itemdeletebuttonclick', grid, rowIndex, colIndex);
            	}
            }]
            
    	}];
        
        this.addEvents(
                'itemdownloadbuttonclick',
                'itemdeletebuttonclick'
        );

        this.callParent(arguments);
    },

    renderIcon: function(ext) {
        return '<img src="icons/i_' + ext + '.ico">';
    }/*,
    
    selectedItem: function(grid, rowIndex, colIndex) {
    	alert('asdfsdfsdf');
    	var rec = grid.getStore().getAt(rowIndex);
    	if(rec) {
    		this.fireEvent('deleteItem', this, rec);
    	}
    }*/
});