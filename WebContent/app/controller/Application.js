Ext.define('AM.controller.Application', {
    extend: 'AM.controller.AppController',
    
    stores: ['ReportsTree','DashboardData','AuthData'],
    views: [
        'layout.MainApp',
        'layout.Header',
        'layout.Menu',
        'layout.ApplicationsMenu',
        'layout.ReportsMenu',
        'layout.Dashboard'
    ],

    init: function() {
    	
        this.control({
        	'head button[name=account]': {
                afterrender: this.onAfterRender
            },
        	'head [action=logout]': {
        		click: this.onLogout
        	},
        	'head [action=open]': {
        		click: this.onOpen
        	},
        	'head [action=upload]': {
        		click: this.onUpload
        	},
            'applicationsmenu': {
            	itemdblclick: this.runApp
            }, 
            'reportsmenu': {
               	itemdblclick: this.runReport
            
            }
        });
    },
    
    onAfterRender: function() {
    	//console.log('The panel was rendered');
    	Ext.getStore('AuthData').load({
    		params: {
    			user : AM.user
    			}
    	});
    	Ext.getStore('FileStore').load();
    },
    
    onLogout: function() {
    	window.location.href="signout.action";
    },
    
    onOpen: function() {
    	//Ext.getStore('FileStore').load();
    	Ext.create('Ext.window.Window', {
		    title: 'Pasta pessoal',
		    maximizable: true,
		    width: 600,
		    layout: 'fit',
		    items: {  
		    	xtype: 'filelist'
		    }
		}).show();
    },

    onUpload: function() {
    	Ext.create('Ext.window.Window', {
		    title: 'Importar ficheiro...',
		    height: 200,
		    width: 400,
		    layout: 'fit',
		    items: {  
		    	xtype: 'upload'
		    }
		}).show();
    },

    runApp: function(tree, record) {
    	var id = record.get('id');
        var main = Ext.ComponentQuery.query('#mainContent')[0];
        if(this.getAccess(id,'E')) {
        	switch(id) {
            case 'appBranch':
            	if(main.child('panel[id="appbranch"]')==null) {
            		Ext.getStore('Branches').load();
            		main.add(Ext.widget('branchlist')).show();
            	}
            		
            	break;
            case 'appBalance':
            	if(main.child('panel[id="appbalance"]')==null) {
            		main.add(Ext.widget('balancelist')).show();
            	}
            		
            	break;
            default:
            	break;
            }
        }
        
    },
    
    runReport: function(tree, record) {
    	var main = Ext.ComponentQuery.query('#mainContent')[0];
    	if(main.child('panel[id="'+record.get('text')+'"]')==null && record.get('cls')!=null) {
    		main.add(Ext.widget('panel',{
    			id: record.get('text'),
        		title : 'Relatório: '+record.get('text'),
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
    		//main.setActiveTab(1);
    	}
    	
    }
});