Ext.define('AM.view.layout.Report' ,{
    extend: 'Ext.tree.Panel',

    alias: 'widget.report',
    store: 'ReportStore',
    rootVisible: false,
    
    
    tbar: [{
    	    text      : 'Periodo-Destino',
    	    name: 'rptbtn',
    	    arrowAlign: 'right',
    	    menu      : [
    	        {text: 'Periodo-Destino', action:'change', val: 'rec-ori'},
				{text: 'Periodo-Entidade', action:'change', val: 'rec-ent'},
				{xtype: 'menuseparator'},
    	        {text: 'Destino-Periodo', action:'change', val: 'ori-rec'},
    	        {text: 'Destino-Entidade', action:'change', val: 'ori-ent'},
    	        {xtype: 'menuseparator'}, 
    	        {text: 'Entidade-Periodo', action:'change', val: 'ent-rec'},
    	        {text: 'Entidade-Destino', action:'change', val: 'ent-ori'}
    	    ]
    }],
    
    useArrows: true
});