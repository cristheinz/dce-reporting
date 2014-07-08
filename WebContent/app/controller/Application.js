Ext.define('AM.controller.Application', {
    extend: 'AM.controller.AbstractController',
    
    stores: ['DashboardData','ReportStore','FaqstStore'],
    views: [
        'layout.MainApp',
        'layout.Head',
        'layout.MainMenu',
        'layout.Module',
        'layout.Report',
        'layout.Dashboard'
    ],
    
    refs: [{
        ref: 'mainapp',
        selector: 'mainapp [name=mainContent]'
    }],

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
            'module': {
            	itemdblclick: this.runApp
            }, 
            'report': {
               	itemdblclick: this.runReport
            
            }
        });
    },
    
    onAfterRender: function() {
    	//console.log('The panel was rendered');
    	/*Ext.getStore('AuthData').load({
    		params: {
    			user : AM.user
    			}
    	});*/
    	Ext.getStore('AuthData').load();
    	//Ext.getStore('FileStore').load();
    },
    
    onLogout: function() {
    	window.location.href="signout.action";
    },
    
    onOpen: function() {
    	Ext.getStore('FileStore').load({
    		params: {
    			fid: ''
    			}
    	});
    	Ext.create('Ext.window.Window', {
		    title: 'Pasta pessoal',
		    maximizable: true,
		    width: 600,
		    layout: 'fit',
		    modal: true,
		    items: {  
		    	xtype: 'filelist'
		    }
		}).show();
    },

    onUpload: function() {
    	Ext.create('Ext.window.Window', {
    		id: 'uploadWindow',
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
        //var main = Ext.ComponentQuery.query('#mainContent')[0];
        var main = this.getMainapp();
        if(this.getAccess(id,'E')) {
        	switch(id) {
            case 'moduleBranch':
            	if(main.child('panel[id="module_branch"]')==null) {
            		Ext.getStore('BranchStore').load();
            		main.add(Ext.widget('branchlist')).show();
            	}
            		
            	break;
            case 'moduleBalance':
            	if(main.child('panel[id="module_balance"]')==null) {
            		main.add(Ext.widget('balancemain')).show();
            	}
            		
            	break;
            case 'moduleFaqst':
            	if(main.child('panel[id="module_faqst"]')==null) {
            		Ext.getStore('FaqstStore').load();
            		main.add(Ext.widget('faqstlist')).show();
            	}
            		
            	break;
            case 'modulePapel':
            	if(main.child('panel[id="module_papel"]')==null) {
            		//Ext.getStore('PapelStore').load();
            		main.add(Ext.widget('papelmain')).show();
            	}
            		
            	break;
            default:
            	break;
            }
        }
        
    },
    
    runReport: function(tree, record) {
    	//var main = Ext.ComponentQuery.query('#mainContent')[0];
    	var main = this.getMainapp();
    	if(main.child('panel[id="'+record.get('text')+'"]')==null && record.get('cls')!=null) {
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
    		//main.setActiveTab(1);
    	}
    	
    }
});