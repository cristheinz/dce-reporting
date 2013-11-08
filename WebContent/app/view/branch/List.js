Ext.define('AM.view.branch.List' ,{
    extend: 'Ext.grid.Panel',
    //requires: ['Ext.ux.grid.FiltersFeature'],

    alias: 'widget.branchlist',
    id: 'module_branch',
    
    title: 'Sucursais',
    store: 'BranchStore',
    closable: true,
    
    features: [{
    	ftype: 'filters',
    	autoReload: false, 
    	local: true,
		filters : [ {
			type : 'numeric',
			dataIndex : 'suc'
		}, {
			type: 'string',
			dataIndex: 'alf'
		}, {
			type: 'date',
			dataIndex: 'dti'
		} 
		]
    }],

    initComponent: function() {
        this.columns = [{
			header : 'Suc',
			dataIndex : 'suc',
			flex : 1
		}, {
			header : 'Alf',
			dataIndex : 'alf',
			flex : 1
		}, {
			text : 'Txt',
			//sortable : true,
			dataIndex : 'txt',
			groupable : false,
			width : 240,
			//locked : true,
			renderer : function(v, cellValues, rec) {
				return rec.get('txt');
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
								property : 'txt',
								value : this.value,
								anyMatch : true,
								caseSensitive : false
							});
						}
					},
					buffer : 500
				}
			}
		}, {
			header : 'Dti',
			dataIndex : 'dti',
			flex : 1,
			xtype : 'datecolumn',
			format : 'Y-m-d'
		}, {
			header : 'Dtf',
			dataIndex : 'dtf',
			flex : 1,
			xtype : 'datecolumn',
			format : 'Y-m-d'
		}, {
			header : 'Zon',
			dataIndex : 'zon',
			flex : 1
		}, {
			header : 'Suct',
			dataIndex : 'suct',
			flex : 1
		},{
			menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 50,
            items: [{
                iconCls: 'map-icon',
                tooltip: 'Ver no Google Maps',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    //Ext.Msg.alert('Sell', 'Sell ' + rec.get('txt'));
                    Ext.create('Ext.window.Window', {
                        autoShow: true,
                        layout: 'fit',
                        title: 'Mapa Sucursal: '+rec.get('txt'),
                        closeAction: 'hide',
                        width:450,
                        height:450,
                        border: false,
                        x: 40,
                        y: 60,
                        items: [{
                            xtype: 'gmappanel',
                            markers: [{
                            	lat: rec.get('lat'),
                                lng: rec.get('lng'),
                                title: rec.get('txt')
                            }],
                            center: {
                            	/*lat: rec.get('lat'),
                                lng: rec.get('lng'),*/
                            	geoCodeAddr: rec.get('lat')+' '+rec.get('lng')
                            	/*geoCodeAddr: 'Banco Popular '+rec.get('txt')+', PORTUGAL',
                                marker: {title: rec.get('txt')}*/
                            }
                        }]
                    });
                }
            }]
		}];

        this.callParent(arguments);
    }
});