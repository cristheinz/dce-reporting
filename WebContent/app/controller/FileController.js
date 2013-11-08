Ext.define('AM.controller.FileController', {
    extend: 'AM.controller.AbstractController',
    
    models: ['File'],
    stores: ['FileStore'],
    
    views: [
        'file.Upload',
        'file.List'
    ],
    
    refs: [{
        ref: 'upload',
        selector: 'upload'
    }],

    init: function() {
        this.control({
            'upload button[action=save]': {
                click: this.uploadFile
            },
            'upload button[action=reset]': {
                click: this.resetForm
            }
        });
    },

    uploadFile: function(button) {
    	//var form = button.up('form').getForm();
    	var form = this.getUpload();
        if(form.isValid()){
            form.submit({
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
                }
            });
        }
    },
    
    resetForm: function(button) {
    	//button.up('form').getForm().reset();
    	this.getUpload().getForm().reset();
    }
});