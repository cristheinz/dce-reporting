Ext.define('AM.controller.Application', {
    extend: 'AM.controller.AbstractController',
    
    stores: [
        'DashboardData',
        'ReportStore',
        'FaqstStore'],
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
    },{
        ref: 'header',
        selector: 'head [name=account]'
    },{
        ref: 'footer',
        selector: 'mainapp [name=footer]'
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
        	'head [name=account]': {
        		beforerender: this.onUserRender
        	},
            'module': {
            	itemdblclick: this.runApp
            }, 
            'report': {
               	itemdblclick: this.runReport
            
            },
            '[name=footer]':{
            	beforerender: this.onRender
            },
            'head':{
            	beforerender: this.onRenderNotifications
            }
        });
    },
    
    onUserRender: function() {
    	var username = Ext.String.format(document.getElementById("userId").value);
    	if(username!='0') {
        	Ext.state.Manager.set('username',username);
        	this.getHeader().text=Ext.state.Manager.get('username');
    	} else {
    		window.location.href="signout.action";
    	}
    },
    onRenderNotifications: function() {
    	if (!!window.EventSource) {
    		var source = new EventSource('admin/systemalert.action');
    		/*var source = new EventSource('admin/systemalert.action?id=0');
        	var onMessageHandler=function(e) {
        		var data = JSON.parse(e.data);
        		//console.log(data.msg);
        		var x=Ext.MessageBox.show({
        			title: 'Notificação!',
        	        msg: data.msg
        	    });
        		//setTimeout(function () { x.close(); }, 3000);
        		source.close();
        		source = new EventSource('admin/systemalert.action?id='+e.lastEventId);
        		source.addEventListener('message', onMessageHandler, false);
        	};
    		source.addEventListener('message', onMessageHandler, false);*/
    		
    		source.addEventListener('message', function(e) {
        		var data = JSON.parse(e.data);
        		Ext.MessageBox.show({
        			title: 'Notificação!',
        	        msg: data.msg
        	    });
        	}, false);

    /*} else {
   			Ext.MessageBox.show({
    			title: 'Notificação!',
    	        msg: 'No SSE available.\n Notifications are off!'
    	    });
	        //console.log("No SSE available");*/
  		}
    	
    },
    onRender: function() {
    	//console.log('aaaaaaaaaaaaaaaa');
    	//console.log(this.getFooter());
    	//this.getFooter().setText('aaaaaaaa');
    	var dt=new Date().getFullYear();
    	//console.log(dt);
    	this.getFooter().html='<center style="color: gray;font-size:x-small">'+dt+' bapop dce v3.0</center>';
    	
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
		    title: 'Drive pessoal',
		    maximizable: true,
		    width: 800,
		    layout: 'fit',
		    modal: true,
		    items: {  
		    	xtype: 'filemain'
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
            case 'moduleBonif':
            	if(main.child('panel[id="module_bonif"]')==null) {
            		//Ext.getStore('BonifStore').load();
            		main.add(Ext.widget('boniflist')).show();
            	}
            		
            	break;
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
            case 'moduleBatch':
            	if(main.child('panel[id="module_batch"]')==null) {
            		main.add(Ext.widget('batchmain')).show();
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
    		//fazer log de quem pede relatorios:
    		var rpt=record.get('cls').substring(record.get('cls').indexOf('_report=')+8,record.get('cls').indexOf('.rptdesign'));
    		
    		var form = Ext.create('Ext.form.Panel');
			if(form.isValid()){
				form.getForm().submit({
					url: 'admin/log.action?action='+2+'&msg='+rpt,
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
    		

			/*
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
        	})).show();*/
    		//main.setActiveTab(1);
    	}
    	
    }
});