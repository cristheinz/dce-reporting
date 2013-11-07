Ext.define('AM.controller.FileController', {
    extend: 'AM.controller.AppController',
    
    models: ['File'],
    stores: ['FileStore'],
    views: [
        'file.Upload',
        'file.List'
    ],

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
    	//console.log('The file was sent to upload');
    	var form = button.up('form').getForm();
        if(form.isValid()){
            form.submit({
                url: 'user/uploadfile.action?user='+AM.user,
                waitMsg: 'Carregando ficheiro...',
                success: function(fp, o) {
                	Ext.Msg.alert('Success', 'Processed file "' + o.result.file + '" on the server');
                },
                failure: function() {
                	Ext.Msg.alert("Error", Ext.JSON.decode(this.response.responseText).message);
                }
            });
        }
    },
    
    resetForm: function(button) {
    	//console.log('RESET!');
    	button.up('form').getForm().reset();
    }
});