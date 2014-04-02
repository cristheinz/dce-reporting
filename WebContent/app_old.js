Ext.application({
    requires: ['Ext.container.Viewport',
               'Ext.ux.grid.FiltersFeature',
               'Ext.window.*',
               'Ext.ux.GMapPanel'],
    name: 'AM',
    appFolder: 'app',
    controllers: [
        'Application',
        'BalanceController',
        'FileController',
        'Branches'
    ],
    launch: function() {
    	//Ext.create('Ext.util.LocalStorage',{id: 'foo', session: true});
    	Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    	AM.user = Ext.state.Manager.get('username');
        var main = Ext.create('Ext.container.Viewport', {
        	disabled: true,
            layout: 'border',
            items: [{
    	        region:'north',
    	        height: 50,
    	        items: [Ext.create('Ext.Container',{
    	        	id: "app-header",
    	        	layout: {type: "hbox",align: "middle"},
    	        	items: [{
    	        		xtype: "component",
    	        		id: "app-header-title",
    	        		html: "DCE Reporting",
    	        		flex: 1
    	        	/*}, {
    	        		xtype: 'component',
    	        		html: Ext.Date.format(new Date(), 'F j, Y, g:i a'),
    	        		margins: '0 15 0 0'*/
    	        	}, {
    	        		xtype: 'button',
    	        		scale: 'medium',
    	        		//icon: 'http://blog.fpweb.net/images/default_gravatar.png',
    	        		icon: 'https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/man-24-20.png',
    	        		text: Ext.state.Manager.get('username',''),
    	        		menu: [{
    	        			text:'Importar ficheiro...',
    	        			icon: 'https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519673-179_Upload-16.png',
    	        			handler: function() {
    	        				Ext.create('Ext.window.Window', {
    	        				    title: 'Importar ficheiro...',
    	        				    height: 200,
    	        				    width: 400,
    	        				    layout: 'fit',
    	        				    items: {  
    	        				    	xtype: 'upload'
    	        				    }
    	        				}).show();
        	        	    }
    	        		},{
    	        			text:'Pasta pessoal',
    	        			icon: 'https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519946-006_Folder-16.png',
    	        			handler: function() {
    	        				//alert('You clicked the button!');
    	        				Ext.create('Ext.window.Window', {
    	        				    title: 'Pasta pessoal',
    	        				    maximizable: true,
    	        				    //height: auto,
    	        				    width: 600,
    	        				    layout: 'fit',
    	        				    items: {  
    	        				    	xtype: 'filelist'
    	        				    }
    	        				}).show();
    	        			}
    	        		}, {
    	                    xtype: 'menuseparator'
    	                },{
                            text:'Sair',
                            icon: 'https://cdn1.iconfinder.com/data/icons/duesseldorf/16/sign-out.png',
                            handler: function() {
        	        	        //alert('You clicked the button!');
        	        	        Ext.state.Manager.set('logged','false');
        	        	        Ext.state.Manager.clear('username');
        	        	        window.location.href="user/signout.action";
        	        	        //location.reload();
        	        	    }
                        }],
    	        	    margins: '0 15 0 0'
    	        	}]
    	        })]
    	    },{
    	        region:'west',
    	        title: 'Locais',
    	        layout: 'fit',
    	        margins: '5 0 0 5',
    	        width: 200,
    	        collapsible: true,   // make collapsible
    	        split: true,          // enable resizing
    	        items: [Ext.create('Ext.panel.Panel',{
    	        	layout: 'accordion',
    	        	items: [{
    	        		title: 'Aplicações',
    	            	xtype: 'applicationsmenu',
    	            	layout: 'fit'
    	            /*},{
    	                title: 'Ficheiros',
    	                html: 'Panel content!'*/
    	            },{
    	                title: 'Relatórios',
    	                xtype: 'reportsmenu',
    	            	layout: 'fit'
    	                //html: 'Panel content!'
    	        	}]
    	        })]
    	    },{
    	        region: 'center',     // center region is required, no width/height specified
    	        layout: 'fit',
    	        xtype: 'tabpanel',
    	        id: 'mainContent',
	        	items: [{xtype: 'dashboard'}],
    	        margins: '5 5 0 0'
    	    },{
    	        region: 'south',     // position for region
    	        title: 'Atalhos',
    	        html: 'Panel content!',
    	        height: 150,
    	        minHeight: 75,
    	        maxHeight: 250,
    	        collapsible: true,   // make collapsible
    	        collapsed: true,
    	        margins: '0 5 5 5'
    	    }]
        });
        //console.log('inicializando...');
        var login = new Ext.FormPanel({ 
            labelWidth:80,
            url:'user/signin.action', 
            frame:true, 
            //title:'Please Login', 
            defaultType:'textfield',
    	monitorValid:true,
    	// Specific attributes for the text fields for username / password. 
    	// The "name" attribute defines the name of variables sent to the server.
            items:[/*{ 
                    fieldLabel:'Username', 
                    name:'loginUsername', 
                    allowBlank:false 
                },*/{ 
                    fieldLabel:'ID de acesso', 
                    name:'loginPassword', 
                    inputType:'password', 
                    allowBlank:false 
                }],
     
    	// All the magic happens after the user clicks the button     
            buttons:[{ 
                    text:'Entrar',
                    formBind: true,	 
                    // Function that fires when user clicks the button 
                    handler:function(){ 
                        login.getForm().submit({ 
                            method:'POST', 
                            waitTitle:'Connecting', 
                            waitMsg:'Sending data...',
     
    			// Functions that fire (success or failure) when the server responds. 
    			// The one that executes is determined by the 
    			// response that comes from login.asp as seen below. The server would 
    			// actually respond with valid JSON, 
    			// something like: response.write "{ success: true}" or 
    			// response.write "{ success: false, errors: { reason: 'Login failed. Try again.' }}" 
    			// depending on the logic contained within your server script.
    			// If a success occurs, the user is notified with an alert messagebox, 
    			// and when they click "OK", they are redirected to whatever page
    			// you define as redirect. 
     
                            success:function(form, action){
                            	
                            	obj = Ext.JSON.decode(action.response.responseText);
                            	//console.log(obj.user[0].name);
                            	//window.localStorage.setItem('logged', 'true');
                            	Ext.state.Manager.set('logged','true');
                            	Ext.state.Manager.set('username',obj.user[0].name);
                            	//console.log(Ext.state.Manager.get('logged','false'));
                            	main.setDisabled(false);
                            	//login.removeAll();
                            	win.hide();
                            	location.reload();
                            	
                            	/*Ext.Msg.alert('Status', 'Login Successful!', function(btn, text){
    				   if (btn == 'ok'){
    		                        var redirect = 'index.html'; 
    		                        window.location = redirect;
                                       }
    			        });*/
                            },
     
    			// Failure function, see comment above re: success and failure. 
    			// You can see here, if login fails, it throws a messagebox
    			// at the user telling him / her as much.  
     
                            failure:function(form, action){ 
                            	/*var redirect = 'index.html'; 
    	                        window.location = redirect;*/
    	                        Ext.Msg.alert('Login Failed!', 'Try again.');/*
                                if(action.failureType == 'server'){ 
                                    obj = Ext.util.JSON.decode(action.response.responseText); 
                                    Ext.Msg.alert('Login Failed!', obj.message); 
                                }else{ 
                                    Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
                                } */
                                login.getForm().reset(); 
                            } 
                        }); 
                    } 
                }] 
        });
     
     
    	// This just creates a window to wrap the login form. 
    	// The login object is passed to the items collection.       
        var win = new Ext.Window({
        	title:'Autenticação',
            layout:'fit',
            /*width:300,
            height:150,*/
            closable: false,
            resizable: false,
            plain: true,
            border: false,
            modal: true,
            y: 200,
            items: [login]
            //renderTo: Ext.getBody()
    	});
        if(main.isDisabled() && Ext.state.Manager.get('logged','false')=='false') {
        	main.setDisabled(false);
        	win.show();
        }
        if(Ext.state.Manager.get('logged','false')=='true') {
        	main.setDisabled(false);
        	Ext.getStore('AuthData').load({
        		params: {
        			user : AM.user
        			}
        	});
        	Ext.getStore('FileStore').load();
        	/*Ext.getStore('FileStore').load({
        		params: {
        			user : AM.user
        			}
        	});*/
        }
        //console.log(Ext.state.Manager.get('logged','false'));
        
        /*main.beforerender( this, eOpts ) {
        	win.show();
        }*/
    }
});