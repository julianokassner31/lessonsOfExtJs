Ext.define('CISSMob.view.conversaoprodutolote.ConversaoProdutoLotePanel', {
    extend: 'Ext.Container',
    xtype: 'conversaoprodutolote',

    controller: 'conversaoprodutolote',

    viewModel: {
        type: 'conversaoprodutolote'
    },

    requires: [
        'Ext.layout.VBox'
    ],

    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'stretch'
    },

    defaults: {
        bodyPadding: 10
    },

    items: [
        {
            xtype: 'panel',
            title: '<h3>Saldo de Estoque por lote<h3>',
            items: [
                {
                    xtype: 'panel',

                    layout: {
                        type: 'hbox',
                        wrap: true
                    },

                    defaults :{
                        margin: '5px',
                        labelWidth: '250',
                        labelTextAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            label: 'Descrição do Produto',
                            name: 'dsProduto',
                            width: '49%',
                            value: 'Lote 2',
                            disabled: true,
                            tooltip: 'Nome do Lote'
                        },{
                            flex:1
                        },{
                            xtype: 'numberfield',
                            label: 'Quantidade para Sugestão de Lote UN',
                            name: 'qtProdutoUn',
                            value: '1000',
                            width: '49%',
                            maxLength: 10,
                            minValue: 1,
                            errorTarget: 'under',
                            listeners: {
                                blur: 'converterUnToM2'
                            }
                        },{
                            xtype: 'textfield',
                            label: 'Embalagem Venda',
                            value: 'Metro Quadrado',
                            name: 'embalagemVenda',
                            disabled: true,
                            width: '30%',
                            tooltip: 'Descrição da Embalagem'
                        },{
                            xtype: 'numberfield',
                            value: 2600,
                            disabled: true,
                            width: '5%',
                            tooltip: 'Valor do M2'
                        },{
                            flex:1
                        },{
                            xtype: 'numberfield',
                            label: 'Quantidade para Sugestão de Lote',
                            name: 'qtProdutoLote',
                            value: '2600',
                            width: '49%',
                            maxLength: 10,
                            allowBlank: false,
                            minValue: 1,
                            errorTarget: 'under',

                            listeners: {
                                blur: 'converterM2ToUn'
                            }
                        }
                    ]
                },{
                    xtype:  'grid',
                    height: 200,
                    store: {
                        fields: ['lote', 'saldo', 'saldoGeral', 'saldoVenda', 'dataValidade', 'desconto'],
                        data: [
                            { lote: 'teste lote', saldo: 12000, saldoGeral: 12000, saldoVenda: 15000, dataValidade: '20/11/2020', desconto: '0%'},
                            { lote: 'teste lote2', saldo: 1500, saldoGeral: 1800, saldoVenda: 100, dataValidade: '20/11/2020', desconto: '0%'},
                            { lote: 'teste lote3', saldo: 0, saldoGeral: 0, saldoVenda: 0, dataValidade: '00/00/0000', desconto: '0%'},
                        ]
                    },
                    columns: [
                        {text: 'Lote', dataIndex: 'lote', flex: 2},
                        {text: 'Saldo', dataIndex: 'saldo', flex: 1},
                        {text: 'Saldo Geral', dataIndex: 'saldoGeral', flex: 1},
                        {text: 'Saldo Venda', dataIndex: 'saldoVenda', flex: 1},
                        {text: 'Data Validade', dataIndex: 'dataValidade', flex: 1},
                        {text: 'Desconto', dataIndex: 'desconto', flex: 1},
                    ]
                }
            ]
        },
        {
            xtype: 'grid',
            requires: [
                'Ext.grid.plugin.CellEditing'
            ],

            plugins: {
                gridcellediting: {
                    selectOnEdit: true
                }
            },
            title: '<h3>Saldo de Estoque por Locais e Empresas<h3>',
            height: '300',
            store: {
                fields: ['empresa', 'localEstoque', 'embalagem', 'unidades', 'pontoRetirada', 'quantidade', 'tpEntrega'],
                data: [
                    {empresa: 3, localEstoque: 'Teste Teste', embalagem: 92000, unidades: 92000, pontoRetirada: 'Ponto retirada teste', quantidade: 1000, tpEntrega: 'Imediata'},
                    {empresa: 5, localEstoque: 'Teste Teste', embalagem: 92000, unidades: 92000, pontoRetirada: 'Ponto retirada teste', quantidade: 1000, tpEntrega: 'Imediata'},
                    {empresa: 2, localEstoque: 'Teste Teste', embalagem: 92000, unidades: 92000, pontoRetirada: 'Ponto retirada teste', quantidade: 1000, tpEntrega: 'Normal'},
                    {empresa: 11, localEstoque: 'Teste Teste', embalagem: 92000, unidades: 92000, pontoRetirada: 'Ponto retirada teste', quantidade: 1000, tpEntrega: 'Normal'},
                    {empresa: 31, localEstoque: 'Teste Teste', embalagem: 92000, unidades: 92000, pontoRetirada: 'Ponto retirada teste', quantidade: 1000, tpEntrega: 'Imediata'},

                ],
            },
            columns: [
                {text: 'Empresa', dataIndex: 'empresa', flex: 1},
                {text: 'Local de Estoque', dataIndex: 'localEstoque', flex: 2},
                {text: 'Embalagem', dataIndex: 'embalagem', flex: 1},
                {text: 'Unidades', dataIndex: 'unidades', flex: 1},
                {text: 'Pontos de Retirada', dataIndex: 'pontoRetirada', flex: 2},
                {text: 'Quantidade', dataIndex: 'quantidade', flex: 2, editable: true},
                {
                    text: 'Tipo Entrega', flex: 2,
                    dataIndex: 'tpEntrega',
                    editable: true,
                    editor: {
                        xtype: 'selectfield',
                        options: [
                            'Imediata',
                            'Normal'
                        ]
                    }
                },
            ]
        }
    ],

});
