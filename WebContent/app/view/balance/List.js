Ext.define('AM.view.balance.List' ,{
    extend: 'Ext.tree.Panel',

    alias: 'widget.balancelist',
    id: 'appbalance',
    title: 'Balancete',
    closable: true,

    xtype: 'tree-grid',
    height: 300,
    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    singleExpand: true,
    
    initComponent: function() {
        this.width = 500;
        
        Ext.apply(this, {
            store: 'BalanceStore',
            columns: [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: 'Cta',
                flex: 2,
                sortable: true,
                dataIndex: 'cta'
            },{
                text: 'Nome',
                flex: 1,
                dataIndex: 'nam',
                sortable: true
            },{
                //we must use the templateheader component so we can use a custom tpl
                //xtype: 'templatecolumn',
                text: 'Débito',
                flex: 1,
                sortable: true,
                dataIndex: 'deb'/*,
                align: 'center',
                //add in the custom tpl for the rows
                tpl: Ext.create('Ext.XTemplate', '{duration:this.formatHours}', {
                    formatHours: function(v) {
                        if (v < 1) {
                            return Math.round(v * 60) + ' mins';
                        } else if (Math.floor(v) !== v) {
                            var min = v - Math.floor(v);
                            return Math.floor(v) + 'h ' + Math.round(min * 60) + 'm';
                        } else {
                            return v + ' hour' + (v === 1 ? '' : 's');
                        }
                    }
                })*/
            },{
                text: 'Crédito',
                flex: 1,
                dataIndex: 'cre',
                sortable: true
            }, {
                xtype: 'checkcolumn',
                header: 'Done',
                dataIndex: 'done',
                width: 40,
                stopSelection: false,
                menuDisabled: true
            }]
        });
        this.callParent();
    }
    
});