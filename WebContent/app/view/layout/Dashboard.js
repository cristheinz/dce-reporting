Ext.define('AM.view.layout.Dashboard' ,{
    extend: 'Ext.panel.Panel',

    alias: 'widget.dashboard',
    title: 'Dashboard',
    //store: 'Branches',
    closable: false,
    //autoShow: true,
    //layout: 'fit',
    frame: true,
    bodyPadding: 5,
    //width: 1050,
    //height: 740,

    fieldDefaults: {
        labelAlign: 'left',
        msgTarget: 'side'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    
    initComponent: function() {
    	/*var store1 = Ext.create('Ext.data.Store', {
    	    //model: 'WeatherPoint',
    		fields: ['data1','data2','data3','data4','data5', 'name'],
    	    data: [
    	        { data1: 58, data2: 85, data3: 33, data4: 43, data5: 34, name: 'Cartão crédito' },
    	        { data1: 63, data2: 58, data3: 55, data4: 22, data5: 11, name: 'Conta Corrente' },
    	        { data1: 73, data2: 45, data3: 78, data4: 13, data5: 89, name: 'Descoberto' },
    	        { data1: 78, data2: 48, data3: 14, data4: 85, data5: 98, name: 'Efeitos' },
    	        { data1: 81, data2: 95, data3: 63, data4: 52, data5: 65, name: 'Empréstimos	' }
    	    ]
    	});*/
    	var store2 = Ext.create('Ext.data.Store', {
    	    //model: 'WeatherPoint',
    		fields: ['data1', 'anomes'],
    	    data: [
       	        { data1: 0, anomes: 'periodo homólogo' },
    	        { data1: 0, anomes: '3 meses antes' },
    	        { data1: 0, anomes: '2 meses antes' },
    	        { data1: 0, anomes: 'mês anterior' }
    	    ]
    	});
    	
        var selectedRec = false,
        //performs the highlight of an item in the bar series
        highlightCompanyPriceBar = function(storeItem) {
            var name = storeItem.get('data1'),
                series = barChart.series.get(0),
                i, items, l;

            series.highlight = true;
            series.unHighlightItem();
            series.cleanHighlights();
            for (i = 0, items = series.items, l = items.length; i < l; i++) {
                if (name == items[i].storeItem.get('data1')) {
                    series.highlightItem(items[i]);
                    break;
                }
            }
            series.highlight = false;
        }, updateChart2 = function(rec) {
            store2.loadData([{
                'anomes': 'periodo homólogo',
                'data1': rec.get('data5')
            }, {
                'anomes': '3 meses antes',
                'data1': rec.get('data4')
            }, {
                'anomes': '2 meses antes',
                'data1': rec.get('data3')
            }, {
                'anomes': 'mes anterior',
                'data1': rec.get('data2')
            }]);
        };

    	
    	var barChart = Ext.create('Ext.chart.Chart', {
    		items: [{
    		      type  : 'text',
    		      text  : 'Posição '+Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -1),'Ym'),
    		      font  : '20px Arial',
    		      width : 1000,
    		      height: 50,
    		      x:5, y: 15/*,
    		      x : 50, //the sprite x position
    		      y : 10  //the sprite y position
    		      */
    		   }],
    		width: 1000,
    		height: 300,
    		margin: '0 0 3 0',
            style: 'background:#fff',
            //theme: 'Base',// 'Base', 'Green', 'Sky', 'Red', 'Purple', 'Blue', 'Yellow' 
            animate: true,
            //cls: 'x-panel-body-default',
            shadow: true,
            //store: store1,
            store: 'DashboardData',
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data1'],
                minimum: 0,
                hidden: true
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                //title: 'Month of the Year',
                label: {
                    renderer: function(v) {
                        return Ext.String.ellipsis(v, 15, false);
                    },
                    font: '9px Arial',
                    rotate: {
                        degrees: 270
                    }
                }
            }],
            series: [{
                type: 'column',
                axis: 'left',
                style: {
                    fill: '#456d9f'
                },
                highlightCfg: {
                    fill: '#a2b5ca'
                },
                label: {
                    contrast: true,
                    display: 'insideEnd',
                    field: 'data1',
                    color: '#000',
                    orientation: 'horizontal',
                    'text-anchor': 'middle',
                    renderer: Ext.util.Format.numberRenderer('0')
                },
                listeners: {
                    itemmouseup: function(item) {
                         var series = barChart.series.get(0);
                         gridPanel.getSelectionModel().select(Ext.Array.indexOf(series.items, item));
                    }
                },
                xField: 'name',
                yField: ['data1']
            }]
        });
    	
    	var barChart2 = Ext.create('Ext.chart.Chart', {
    		margin: '0 0 0 0',
            insetPadding: 20,
            flex: 5,
            //theme: 'Base',// 'Base', 'Green', 'Sky', 'Red', 'Purple', 'Blue', 'Yellow' 
    		animate: true,
            shadow: true,
            store: store2,
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['data1'],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                //title: 'Number of Hits',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'left',
                fields: ['anomes']
                //title: 'Month of the Year',
                //hidden: true
            }],
            series: [{
                type: 'bar',
                axis: 'bottom',
                highlight: true,
                /*tips: {
                    trackMouse: true,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' views');
                    }
                },*/
                label: {
                  display: 'insideEnd',
                      field: 'data1',
                      renderer: Ext.util.Format.numberRenderer('0'),
                      orientation: 'horizontal',
                      color: '#333',
                    'text-anchor': 'middle'
                },
                xField: 'anomes',
                yField: ['data1']
            }]
        });
    	
    	
    	
    	var gridPanel = Ext.create('Ext.grid.Panel',{
    		id: 'company-form',
            flex: 5,
    		//title: 'Dados',
    		//store: store1,
    		store: 'DashboardData',
    		columns: [{
    			header : 'Rubrica',
    			dataIndex : 'name',
    			flex : 1
    		},{
    			header : 'Valor (M€)',
    			type : 'numeric',
    			dataIndex : 'data1',
    			flex : 1,
    			align: 'right',
    			renderer: function(v,p,r){
                	return Ext.util.Format.number(v, '0.000,00/i');
                }
    		},{
    			header : 'data2',
    			type : 'numeric',
    			dataIndex : 'data2',
    			hidden: true,
    			flex : 1
    		},{
    			header : 'data3',
    			type : 'numeric',
    			dataIndex : 'data3',
    			hidden: true,
    			flex : 1
    		},{
    			header : 'data4',
    			type : 'numeric',
    			dataIndex : 'data4',
    			hidden: true,
    			flex : 1
    		},{
    			header : 'data5',
    			type : 'numeric',
    			dataIndex : 'data5',
    			hidden: true,
    			flex : 1
    		}],
    		listeners: {
                selectionchange: function(model, records) {
                    if (records[0]) {
                        selectedRec = records[0];
                        highlightCompanyPriceBar(selectedRec);
                        updateChart2(selectedRec);
                    }
                }
            }
    	});
    	
    	Ext.apply(this, {
    		items: [ barChart, {
                xtype: 'container',
                layout: {type: 'hbox', align: 'stretch'},
                flex: 3,
                items: [gridPanel, barChart2 ]
    		}]
    	});
    	

        this.callParent(arguments);
	}
});