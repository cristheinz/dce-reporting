Ext.define('AM.view.file.List' ,{
    extend: 'Ext.grid.Panel',
    
    requires: [
               'Ext.selection.CellModel',
               'Ext.grid.*',
               'Ext.data.*',
               'Ext.util.*',
               'Ext.form.*'
           ],

    alias: 'widget.filelist',
    //id: 'module_branch',
    
    /*width: 535,*/
    height: 400,
    layout: 'fit',
    autoScroll: true,
    
    store: 'FileStore',
    selType: 'checkboxmodel',
    /*selModel: {
        mode: 'SINGLE'
    },*/
    
    features: [{
    	ftype: 'filters',
    	autoReload: false, 
    	local: true,
		filters : [ {
			type: 'string',
			dataIndex: 'fid'
		}]
    },{
    	ftype: 'summary'
    }],
    
    tbar: [{
    	iconCls: 'remove-icon',
    	action: 'remove',
    	hidden: true,
    	tooltip: 'Apagar'
    },{
    	iconCls: 'download-icon',
    	action: 'download',
    	hidden: true,
    	tooltip: 'Download'
    },{
    	xtype: 'button', 
    	action: 'newfregu',
    	text: 'Criar Ficheiro Regularização',
    	hidden: true
    },{
    	xtype: 'button', 
    	action: 'newseis',
    	text: 'Criar Ficheiro Posição Analitica',
    	hidden: true
    },'->',{ 
    	xtype: 'textfield', 
    	name: 'filefilter',
    	emptyText: 'Procurar',
    	width: 200,
    	enableKeyEvents : true
    },{
    	iconCls: 'refresh-icon',
    	action: 'refresh',
    	tooltip: 'Actualizar'
    }],
    
    fbar: [{
    	xtype: 'label', 
    	name: 'filecount',
    	text: 'Carregando ficheiros..'
    },'->',{
    	xtype: 'label', 
    	name: 'totalfilesize'
    }],
    
    initComponent: function() {
    	this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
    	Ext.apply(this, {
    		plugins: [this.cellEditing],
    		columns: [{
    			//text : 'Nome',
    			header : 'Nome',
    			dataIndex : 'name',
    			groupable : false,
    			width : 300,
    			renderer: this.renderName,
    			summaryType: 'count',
    	        summaryRenderer: function(value, summaryData, dataIndex) {
    	        	this.down('label[name=filecount]').setText(Ext.String.format('{0} ficheiro{1}', value, value !== '1' ? 's' : ''));
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
    			},
    			summaryType: 'sum',
    	        summaryRenderer: function(value, summaryData, dataIndex) {
    	        	this.down('label[name=totalfilesize]').setText(value+' KB');
    	        }
    		},{
    			header : 'Enviado em',
    			dataIndex : 'dts',
    			menuDisabled: true,
    			flex : 1,
    			xtype : 'datecolumn',
    			format : 'Y-m-d',
    			editor: {
                    xtype: 'datefield',
                    format: 'Y-m-d'//,
                    //minValue: '01/01/06',
                    //disabledDays: [0, 6],
                    //disabledDaysText: 'Plants are not available on the weekends'
                }
    		},{
    			header : 'Processado em',
    			dataIndex : 'dtp',
    			menuDisabled: true,
    			flex : 1,
    			xtype : 'datecolumn',
    			format : 'Y-m-d',
    			editor: {
                    xtype: 'datefield',
                    format: 'Y-m-d'
                }
    		},{
       			header : 'Observações',
       			dataIndex : 'title',
       			menuDisabled: true,
       			flex : 2,
       			editor: {
                    allowBlank: true
                }
    /*
    		},{
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
                }]
    */            
        	}]
    	});
        /*this.columns = [{
			];*/
        
        this.addEvents(
                'itemdownloadbuttonclick'/*,
                'itemdeletebuttonclick',
                'itemdeletekeypress'*/
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