Ext.define('AM.controller.FileController', {
    extend: 'AM.controller.AbstractController',
    
    models: ['File'],
    stores: ['FileStore'],
    
    views: [
        'file.Browser',
        'file.Upload',
        'file.Grid',
        'file.Main',
        'file.Seis',
        'file.List',
        'file.Folder'
    ],
    
    refs: [{
        ref: 'upload',
        selector: 'upload'
    },{
    	ref: 'filemain',
    	selector: 'filemain'
    },{
    	ref: 'fileseis',
    	selector: 'fileseis'
    },{
    	ref: 'filelist',
    	selector: 'filelist'
    },{
    	ref: 'filefolder',
    	selector: 'filefolder'
    },{
    	ref: 'filefregulist',
    	selector: 'filefregulist'
    }],

    init: function() {
        this.control({
            'upload button[action=save]': {
                click: this.uploadFile
            },
            'upload button[action=reset]': {
                click: this.resetUploadForm
            },
            'filelist': {
            	/*containerclick: function(grid, e, eOpts){
            		console.log('click!');
            		grid.getSelectionModel().deselectAll();
            	},*/
            	//itemclick: this.onFileItemSelect,
            	//cellkeydown: this.onFileItemKeyDown,
            	selectionchange: this.onSelect
            	//itemdownloadbuttonclick: this.onFileItemDownload
            	//itemdblclick: this.onFileItemDownload
            },
            'filelist textfield[name=filefilter]': {
            	keyup: this.onFileGridNameFilter
            },
            'filelist button[action=refresh]': {
            	click: this.onFileRefresh
            },
            'filelist button[action=remove]': {
            	click: this.onFileDelete
            },
            'filelist button[action=newfregu]': {
            	click: this.newFREGU
            },
            'filelist button[action=newseis]': {
            	click: this.newSEIS
            },
            'filelist button[action=download]': {
            	click: this.onFileItemDownload
            },
            'filemain': {
            	afterrender: this.onMainRendered
            },
            'filefolder': {
            	//itemexpand: this.openFolder
            	beforeitemdblclick: this.openFolder
            /*},
            'filefolder item[id=listall]': {
            	click: this.onListAll
            },
            'filefolder item[id=listfregu]': {
            	click: this.onListFregu*/
            },
            'fileseis button[action=cancel]': {
            	click: this.newSEIScancel
            },
            'fileseis button[action=create]': {
            	click: this.newSEIScreate
            }
        });
    },
    
    openFolder: function(tree, record) {
    	record.expand();
    	var id = record.get('id');
    	var folder=this.getFilefolder();
    	var list=this.getFilelist();
    	var store = this.getFilelist().getStore();
    	switch(id) {
        case 'listall':
        	list.columns[2].setVisible(true);
        	list.columns[3].setVisible(true);
        	list.columns[4].setVisible(false);
        	list.columns[5].setVisible(false);
        	list.columns[6].setVisible(false);
        	store.load({
        		params: {
        			fid: ''
        			}
        	});
        	break;
        case 'listfregu':
        	//console.log(main.layout.centerRegion);
        	folder.collapse();
        	//main.west.collapsed(true);
        	list.columns[2].setVisible(false);
        	list.columns[3].setVisible(false);
        	list.columns[4].setVisible(true);
        	list.columns[5].setVisible(true);
        	list.columns[6].setVisible(true);
        	store.load({
        		params: {
        			fid: 'OREGU'
        			}
        	});
        	break;
        case 'listseis':
        	list.columns[2].setVisible(false);
        	list.columns[3].setVisible(false);
        	list.columns[4].setVisible(false);
        	list.columns[5].setVisible(false);
        	list.columns[6].setVisible(true);
        	store.load({
        		params: {
        			fid: 'OSEIS'
        			}
        	});
        	break;
        case 'listoths':
        	list.columns[2].setVisible(false);
        	list.columns[3].setVisible(false);
        	list.columns[4].setVisible(false);
        	list.columns[5].setVisible(false);
        	list.columns[6].setVisible(true);
        	store.load({
        		params: {
        			fid: 'OPAPE'
        			}
        	});
        	break;
        default:
        	break;
        }
        
    },
    
    onMainRendered: function() {
    	this.getFilelist().columns[2].setVisible(true);
    	this.getFilelist().columns[3].setVisible(true);
    	this.getFilelist().columns[4].setVisible(false);
    	this.getFilelist().columns[5].setVisible(false);
    	this.getFilelist().columns[6].setVisible(false);
    },
    
    uploadFile: function(button) {
    	//var form = button.up('form').getForm();
    	var form = this.getUpload();
        if(form.isValid()){
            form.getForm().submit({
                url: 'file/upload.action',//?user='+AM.user,
                waitMsg: 'Carregando ficheiro...',
                success: function(fp, o) {
                	Ext.Msg.alert('Mensagem', 'Ficheiro importado com sucesso',function(btn){
                		//Ext.ComponentQuery.query('#uploadWindow')[0].close();
                		form.up('window').close();
                	});
                },
                failure: function() {
                	Ext.Msg.alert("Importação Falhou!", Ext.JSON.decode(this.response.responseText).message);
                	//Ext.Msg.alert("Importação Falhou!", "Erro no ficheiro");
                }
            });
        }
    },
    
    resetUploadForm: function(button) {
    	//button.up('form').getForm().reset();
    	this.getUpload().getForm().reset();
    }, 
    
    onFileGridNameFilter: function(textfield, e, eOpts ){
    	var store = this.getFilelist().getStore();
		store.clearFilter();
		if (textfield.value) {
			store.filter({
				property : 'name',
				value : textfield.value,
				anyMatch : true,
				caseSensitive : false
			});
		}
    },
    
    onSelect: function(smodel, selected, eOpts){
    	//console.log(smodel.getSelection().length);
    	var sbar=this.getFilelist().down('label[name=filecount]');
    	var rbtn=this.getFilelist().down('button[action=remove]');
    	var newf=this.getFilelist().down('button[action=newfregu]');
    	var news=this.getFilelist().down('button[action=newseis]');
    	var down=this.getFilelist().down('button[action=download]');
    	newf.hide();
    	news.hide();
    	down.hide();
    	if(selected[0]) {
    		sbar.setText(selected[0].get('name'));
    		if(selected.length>1) {
        		sbar.setText(selected.length+' ficheiros selecionados');
        	} else {
        		down.show();
        		if(selected[0].get('fid')=='FREGU') {
        			newf.show();
        		}
        		if(selected[0].get('fid')=='FSEIS') {
        			news.show();
        		}
        	}
    		rbtn.show();
    	} else {
    		rbtn.hide();
    		sbar.setText('Nenhum ficheiro selecionado');
    	}
    	this.getFilelist().down('label[name=totalfilesize]').setText('');
    	
    },

    /*onFileItemSelect: function(grid, record){
    	this.getFilelist().down('label[name=filecount]').setText(record.get('name')+' [Delete para apagar, duplo clique para baixar.]');
    	this.getFilelist().down('label[name=totalfilesize]').setText('');
    },

    onFileItemKeyDown: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
    	var store = this.getFilelist().getStore();
    	if(e.getKey()==46) {
    		Ext.MessageBox.confirm('Apagar', 'Vai apagar o ficheiro:<br/><p>'+record.get('name')+
        			'</p><br/>Pretende continuar ?', function(btn){
     		   if(btn === 'yes'){
     			  store.remove(record);
     		   }
     		 });
    	}
    },*/
    
    onFileDelete: function(button){
    	var store = this.getFilelist().getStore();
    	var sel=this.getFilelist().getSelectionModel().getSelection();
    	for(var i=0;i<sel.length;i++) {
    		//console.log(sel[i]);
    		store.remove(sel[i]);
    		store.commitChanges();
    	}
    },
    
    onFileItemDownload: function(button) {
    //onFileItemDownload: function(grid, record) {
    	var sel=this.getFilelist().getSelectionModel().getSelection();
    	var id=sel[0].data.id;
    	window.open('file/download.action?id='+id);
    },
    
    onFileRefresh: function (button) {
    	//console.log('refresh!');
    	var store = this.getFilelist().getStore();
    	store.reload();
    },
    
    newFREGU: function (button) {
    	var sel=this.getFilelist().getSelectionModel().getSelection();
    	var id=sel[0].data.id;
    	//console.log(sel[0].data.id);
    	//vai ao servidor e gera novo ficheiro!
    	var form = Ext.create('Ext.form.Panel');
    	if(form.isValid()){
    		form.getForm().submit({
    			url: 'file/fregu/new.action?id='+id,
    			waitMsg: 'Gerando ficheiro de regularização...',
    			success: function(fp, o) {
    				Ext.Msg.alert('Mensagem', 'Ficheiro de regularização gerado com sucesso.',function(btn){
    				});
    			},
    			failure: function() {
    				Ext.Msg.alert("Erro ao gerar ficheiro!", Ext.JSON.decode(this.response.responseText).message);
    			}
    		});
    	}
    },
    
    newSEIS: function (button) {
    	//console.log('newSEIS!');
    	var sel=this.getFilelist().getSelectionModel().getSelection();
    	//var id=sel[0].data.id;
    	
    	//isto poderia estar numa region tipo south ou fbar da filelist....
    	var win=Ext.create('Ext.window.Window', {
    		id: 'newseisWindow',
		    title: 'Posição analitica...',
		    modal: true,
		    //height: 200,
		    width: 400,
		    layout: 'fit'/*,
		    items: {
		    	xtype: 'filenewseis'
		    }*/
		    
		})/*.show()*/;
    	
    	var form=Ext.widget('fileseis');
    	//var form=this.getFileseis();
    	form.show();
    	form.loadRecord(sel[0]);
    	win.add(form);
    	win.show();

    },
    newSEIScancel: function (button) {
    	//console.log('newSEIS cancel!');
    	button.up('window').close();
    },
    newSEIScreate: function (button) {
    	var form = this.getFileseis();
        if(form.isValid()){
            form.getForm().submit({
                url: 'file/fseis/new.action',
                waitMsg: 'Gerando ficheiro posição analitica...',
                success: function(fp, o) {
                	Ext.Msg.alert('Mensagem', 'Ficheiro gerado com sucesso.',function(btn){
                		form.up('window').close();
                	});
                },
                failure: function() {
                	Ext.Msg.alert("Erro ao gerar ficheiro!", Ext.JSON.decode(this.response.responseText).message);
                }
            });
        }
    }

    
    
    /*onEditFile: function(grid, record) {
		//console.log('Edit file:'+record.getId());
		var view = Ext.widget('fileedit');
    	view.down('form').loadRecord(record);
	},
	
    onDownloadFile: function(grid, rowIndex, colIndex) {
    	var rec = grid.getStore().getAt(rowIndex);
    	window.open('file/download.action?id='+rec.get('id'));
    },

    onDeleteFile: function(grid, rowIndex, colIndex){
    	var rec = grid.getStore().getAt(rowIndex);
    	var store = this.getFileStoreStore();
    	Ext.MessageBox.confirm('Delete', 'Are you sure ?', function(btn){
    		   if(btn === 'yes'){
    			   store.remove(rec);
    		   }
    		 });
    }*/ 
});