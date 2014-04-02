Ext.define('AM.view.ctvst.List' ,{
    extend: 'Ext.form.field.ComboBox',
    
    alias: 'widget.ctvstlist',
    
    store: 'CtvstStore',
    
    initComponent: function() {
    	Ext.apply(this, {
            displayField:'ctv',
            valueField:'ctv',
            queryMode:'local',
            triggerAction: 'all',
            typeAhead: true
    		
    	});
    	
        this.callParent(arguments);
    }
});