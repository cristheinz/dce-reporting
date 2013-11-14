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
    
    fbar: [{ 
    	xtype: 'label', 
    	id: 'filelisttotalfiles',
    	flex: 1,
    	//id: 'totalSum',
    	someMadeUpPropertyName: 'nameLabel',
    	text: 'Carregando ficheiros..'//Ext.getStore('FileStore').count
    	/*renderer: function(store) {
    		alert(store.getCount());
			return store.getCount();
		}*/
    }],
    
    viewConfig : {
        listeners : {
            'itemkeydown' : function(view, record, item, index, key) {
                if (key.getKey() == 46) {
                	this.up('grid').fireEvent('itemdeletekeypress',view, record, item, index, key);
                }  
            }
        }
    },

    initComponent: function() {
        this.columns = [{
			text : 'Ficheiro',
			dataIndex : 'name',
			groupable : false,
			width : 300,
			renderer: this.renderName,
			/*renderer : function(v, cellValues, rec) {
				return rec.get('name');
			},*/
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
						Ext.getCmp('filelisttotalfiles').setText(store.count()+' Ficheiros');
					},
					buffer : 500
				}
			}
		},{
			header : 'Data criação',
			dataIndex : 'creationDate',
			flex : 1,
			xtype : 'datecolumn',
			format : 'Y-m-d'
		},{
			header : 'Tipo',
			dataIndex : 'fid',
			flex : 1
		},{
			header : 'Tamanho',
			dataIndex : 'siz',
			flex : 1,
			align: 'right',
			renderer : function(v, cellValues, rec) {
				return rec.get('siz')+' KB';
			}
		/*},{
			menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 35,
            items: [{
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
            }]*/
            
    	}];
        
        this.addEvents(
                /*'itemdownloadbuttonclick',
                'itemdeletebuttonclick',*/
                'itemdeletekeypress'
        );

        this.callParent(arguments);
    },
    
    renderName: function(name) {
    	var ext="none";
    	var last4 = name.substr(name.length - 4);
		if(last4==".csv" || last4==".csv" || 
				last4==".TXT" || last4==".txt" ||
				last4==".PDF" || last4==".pdf") {
			ext = name.substring(name.lastIndexOf(".")+1, name.length).toLowerCase();
		}
        return '<img src="icons/i_' + ext + '.ico"> '+name;
    }
});