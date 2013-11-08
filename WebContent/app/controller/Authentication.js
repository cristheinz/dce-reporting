Ext.define('AM.controller.Authentication', {
    extend: 'Ext.app.Controller',

    views: ['authentication.Login'],
    
     refs: [{
        ref: 'loginForm',
        selector: 'loginForm'
    }],
    
    init: function() {
        this.control({
                     'loginForm button[action=login]': {
                         click: this.onLogin
                     },
                     'loginForm textfield[name=loginPassword]': {
                         afterrender: this.onEmailAfterRender
                     },
                     'loginForm textfield': {
                         specialkey: this.submitOnEnter
                     }
        });
    },
    
    onLogin: function(button){
            if (this.getLoginForm().isValid()){
                    this.getLoginForm().getForm().submit({
                            scope:this,
                            success: function(form, action) {
                            	window.location.href = "";
                            },
                            failure: function(form, action) {
                            	var field = this.getLoginForm().down('textfield[name=loginPassword]');
                            	field.setValue("");
                            	Ext.Msg.alert('Autenticação Falhou!', action.result.message ,function(btn){
                            		field.focus(false, 1000);
                            	});
                            }
                    });
            }
    },
    
    onEmailAfterRender: function(field){
            field.focus(false, 1000);
            
    },
    
    submitOnEnter: function(field, event) {
                if (event.getKey() == event.ENTER) {
                        this.onLogin();
                }
        }
    
});