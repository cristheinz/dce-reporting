Ext.define('AM.controller.ReportController', {
    extend: 'AM.controller.AbstractController',
    
    stores: ['ReportStore'],
    views: [
        'layout.Report'
    ],
    
    refs: [{
        ref: 'bt',
        selector: 'report [name=rptbtn]'
    /*},{
    	ref: 'report',
        selector: 'report'*/
    }],
    
    init: function() {
        this.control({
            /*'report': {
               	itemdblclick: this.runReport
            
            },*/
            'report [action=change]':{
            	click: this.onChange
            }
        });
    },
    
    onChange: function(btn) {
    	var val=btn.val;
    	this.getBt().setText(btn.text);
    	
    	var form = Ext.create('Ext.form.Panel');
		if(form.isValid()){
			form.getForm().submit({
				url: 'report/change.action?val='+val,
                success: function(fp, o) {
                	Ext.getStore('ReportStore').load();
                },
                failure: function() {
                }
            });
		 }
    }
/*
    runReport: function(tree, record) {
    	console.log('RUN!');
    	var main = this.getMainapp();
    	if(main.child('panel[id="'+record.get('text')+'"]')==null && record.get('cls')!=null) {
    		var form = Ext.create('Ext.form.Panel');
			if(form.isValid()){
				form.getForm().submit({
					url: 'admin/log.action?action='+2+'&msg='+record.get('id'),
	                success: function(fp, o) {
	            		main.add(Ext.widget('panel',{
	            			id: record.get('text'),
	                		title : record.get('text'),
	                		iconCls: 'report-icon',
	                		closable: true,
	                	    layout : 'fit',
	                	    items : [{
	                	        xtype : 'component',
	                	        autoEl : {
	                	            tag : 'iframe',
	                	            src : record.get('cls')
	                	        }
	                	    }]
	                	})).show();
	                },
	                failure: function() {
	                	Ext.Msg.alert("Alerta", "Não autorizado!");
	                }
	            });
			  }
    	}
    }
*/
});