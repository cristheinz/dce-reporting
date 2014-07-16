Ext.define('AM.view.balance.List' ,{
    extend: 'Ext.tree.Panel',

    xtype: 'tree-grid',
    alias: 'widget.balancelist',
    //id: 'module_balance',
    
    //title: 'Balancete',
    //iconCls: 'module-icon',
    //closable: true,
    
    store: 'BalanceStore',
    
    fbar: [{ 
    	xtype: 'textfield', 
    	fieldLabel: 'Saldo balancete',
    	fieldStyle: 'text-align: right;',
    	name: 'saldo',
    	//value: '999999,99',
    	readOnly: true
    }],

    
    //height: 300,
    useArrows: true,
    rootVisible: false,
    //multiSelect: true,
    singleExpand: true,
    
    initComponent: function() {
        //this.width = 500;
        
        Ext.apply(this, {
            columns: {
            	defaults: {
            		menuDisabled: true,
                    sortable: false
                },
            	items: [{xtype: 'treecolumn', //this is so we know which column will show the tree
                    text: 'Conta contabilística',
                    flex: 2,
                    dataIndex: 'cta',
                    renderer: function(value, p, r) {
                    	//console.log(value);
                    	return r.data['cta'] + ' ' + r.data['text'];
                    }
                },{
                    text: 'Débito',
                    flex: 1,
                    align: 'right',
                    dataIndex: 'vald',
                    renderer: function(v,p,r){
                    	return Ext.util.Format.number(v, '0.000,00/i');
                    }
                },{
                    text: 'Crédito',
                    flex: 1,
                    align: 'right',
                    dataIndex: 'valc',
                    renderer: function(v,p,r){
                    	return Ext.util.Format.number(v, '0.000,00/i');
                    }
                    
                }/*, {
                    xtype: 'checkcolumn',
                    header: 'Done',
                    dataIndex: 'done',
                    width: 40,
                    stopSelection: false,
                    menuDisabled: true
                }*/
                
      	        ]
            }
        });
        this.callParent();
    }
    
});