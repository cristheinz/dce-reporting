Ext.define('AM.view.authentication.Login', {
    extend: 'Ext.form.Panel',
    xtype: 'loginForm',
    
    title: 'Autenticação',
    labelWidth:80,
    url:'user/signin.action', 
    frame:true, 
    defaultType:'textfield',
    monitorValid:true,
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
    buttons:[{ 
            text:'Entrar',
            action:'login',
            formBind: true
        }]
});