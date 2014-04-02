Ext.define('AM.view.balance.Files', {
	extend: 'Ext.window.Window',
	
	alias: 'widget.balancefiles',
	
	title: 'Selecionar balancete',
    modal: true,
    width: 600,
    resizable: false,
    type: 'vbox',
    autoShow: true,
    
    items: [{
    	xtype: 'filelist',
    	flex: 1
    },{
    	xtype: 'balanceload',
    	hidden: true,
    	flex: 1
    }]/*,
    
    fbar:[{
    	text: 'OK',
    	hidden: true,
    	action: 'select'
	}]*/
});