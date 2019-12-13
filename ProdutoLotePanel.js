Ext.define('CISSMob.view.produtolote.ProdutoLotePanel', {
    extend: 'Ext.Panel',
    alias: ['widget.produtoloteview'],
    controller: 'produtolotecontroller',
    viewModel: 'produtolote',

    classCls: 'ciss-modal-produtolote',
    title: '<h4 class="heading">Pesquisa em Lote</h4>',
    ui: 'flat',
    padding: 0,
    maxWidth: 900,

    platformConfig: {
        'phone': {
            width: '100%',
            title: '<h4 class="heading heading-retirada">Pesquisa em lote</h4>',
            scrollable: 'y'
        },
        '!phone': {
            cls: 'panel-borded feedlist',
            width: '96%',
            // maxWidth: 900,
            modal: true,
            hideOnMaskTap: false,
            maxHeight: '70vh',
            centered: true,
            scrollable: 'y'
        }
    },

    layout: 'vbox',

    items: [

        {
            docked: 'bottom',
            padding: 16,
            platformConfig: {
                'phone': {
                    hidden: true
                }
            },

            layout: {
                type: 'hbox',
                align: 'middle'
            },

            items: [{
                xtype: 'checkboxfield',
                cls: 'align-left',
                flex: 2,
                margin: '0 16px 0 0',
                name: 'ocultar-sem-estoque',
                label: 'Ocultar lotes e locais sem estoque',
                labelAlign: 'right',
                labelTextAlign: 'left',
                listeners: {
                    change: 'ocultarSemEstoque'
                }
            }, {
                flex: 1
            }, {
                xtype: 'container',
                items: [
                    {
                        xtype: 'ciss-button',
                        ui: 'flat',
                        text: 'Cancelar',
                        handler: 'handlerCancel'
                    }, {
                        xtype: 'ciss-button',
                        ui: 'action',
                        margin: '0 0 0 16',
                        iconAlign: 'right',
                        text: 'Salvar',
                        handler: 'handlerSave'
                    }
                ]

            }]
        }, {
            xtype: 'fieldset',
            title: '<h3>Saldo de estoque por lote<h3>',
            border: true,
            name: 'formconversao',

            layout: {
                type: 'hbox',
                wrap: true
            },

            defaults: {
                labelAlign: 'top',
                labelTextAlign: 'left',
            },
            items: [{
                xtype: 'textfield',
                label: 'Descrição do Produto',
                value: 'LOTE PRODUTO TESTE JKASSNER',
                width: '45%',
                disabled: true,
                tooltip: 'Nome do Lote'
            }, {
                flex: 1
            }, {
                xtype: 'numberfield',
                label: 'Quantidade para Sugestão de Lote UN',
                name: 'sugestaoProdutoUn',
                width: '45%',
                maxLength: 10,
                minValue: 0.1,
                errorTarget: 'under',

                listeners: {
                    blur: 'converterUnToM2'
                }

            }, {
                xtype: 'textfield',
                label: 'Embalagem Venda',
                value: 'Metro Quadrado',
                name: 'embalagemVenda',
                width: '25%',
                disabled: true,
                tooltip: 'Descrição da Embalagem'
            }, {
                xtype: 'numberfield',
                value: 2600,
                label: 'Valor',
                width: '20%',
                disabled: true,
                tooltip: 'Valor do M2'
            }, {
                flex: 1
            }, {
                xtype: 'numberfield',
                label: 'Quantidade para Sugestão de Lote',
                name: 'sugestaoProdutoLote',
                value: '2600',
                width: '45%',
                maxLength: 10,
                allowBlank: false,
                minValue: 0.1,
                errorTarget: 'under',
                listeners: {
                    blur: 'converterM2ToUn'
                }
            }, {
                xtype: 'grid',
                height: 200,
                width: '100%',
                margin: '10 0 10 0',

                store: {
                    fields: ['disponivel', 'lote', 'saldo', 'saldoGeral', 'saldoVenda', 'dataValidade', 'desconto'],
                    data: [
                        {
                            disponivel: true,
                            lote: 'teste lote',
                            saldo: 12000,
                            saldoGeral: 12000,
                            saldoVenda: 15000,
                            dataValidade: '20/11/2020',
                            desconto: '0'
                        },
                        {
                            disponivel: false,
                            lote: 'teste lote2',
                            saldo: 1500,
                            saldoGeral: 1800,
                            saldoVenda: 100,
                            dataValidade: '20/11/2020',
                            desconto: '0'
                        },
                        {
                            disponivel: true,
                            lote: 'teste lote3',
                            saldo: 0,
                            saldoGeral: 0,
                            saldoVenda: 0,
                            dataValidade: '00/00/0000',
                            desconto: '0'
                        },
                    ]
                },
                columns: [
                    {
                        text: 'Disponível',
                        width: 100,
                        // tpl:'{disponivel}',
                        cell: {
                            xtype: 'gridcell',
                            align: 'center',
                            //bodyCls: "x-fa fa-check",
                            bind: {
                                bodyCls: '{(saldo == 0 ? "x-fa fa-check" : "x-fa fa-remove")}'
                            },
                        },
                    },
                    {text: 'Lote', dataIndex: 'lote', flex: 2},
                    {text: 'Saldo', dataIndex: 'saldo', flex: 1},
                    {text: 'Saldo Geral', dataIndex: 'saldoGeral', flex: 1},
                    {text: 'Saldo Venda', dataIndex: 'saldoVenda', flex: 1},
                    {text: 'Data Validade', dataIndex: 'dataValidade', flex: 1},
                    {text: 'Desconto', dataIndex: 'desconto', flex: 1, renderer: 'renderPercent'},
                ]
            }]
        },
        {
            xtype: 'fieldset',
            title: '<h3>Saldo de Estoque por Locais e Empresas<h3>',
            items: [
                {
                    xtype: 'grid',
                    height: '300',
                    name: 'grid-lotesporempresa',
                    selModel: {
                        type: 'cellmodel'
                    },

                    requires: [
                        'Ext.grid.plugin.CellEditing',
                        'Ext.grid.filters.Filters',
                        'Ext.selection.CellModel'
                    ],

                    plugins: {
                        cellediting: {
                            clicksToEdit: 1
                        },
                    },

                    store: {
                        fields: ['empresa', 'localEstoque', 'embalagem', 'unidades', 'pontoRetirada', 'quantidade', 'tpEntrega'],
                        data: [
                            {
                                empresa: 3,
                                localEstoque: 'Teste Teste',
                                embalagem: 92000,
                                unidades: 92000,
                                pontoRetirada: 'Ponto retirada teste',
                                quantidade: 1000,
                                tpEntrega: 'Imediata'
                            },
                            {
                                empresa: 5,
                                localEstoque: 'Teste Teste',
                                embalagem: 0,
                                unidades: 0,
                                pontoRetirada: 'Ponto retirada teste',
                                quantidade: 0,
                                tpEntrega: 'Imediata'
                            },
                            {
                                empresa: 2,
                                localEstoque: 'Teste Teste',
                                embalagem: 92000,
                                unidades: 92000,
                                pontoRetirada: 'Ponto retirada teste',
                                quantidade: 1000,
                                tpEntrega: 'Normal'
                            },
                            {
                                empresa: 11,
                                localEstoque: 'Teste Teste',
                                embalagem: 92000,
                                unidades: 92000,
                                pontoRetirada: 'Ponto retirada teste',
                                quantidade: 1000,
                                tpEntrega: 'Normal'
                            },
                            {
                                empresa: 31,
                                localEstoque: 'Teste Teste',
                                embalagem: 0,
                                unidades: 0,
                                pontoRetirada: 'Ponto retirada teste',
                                quantidade: 0,
                                tpEntrega: 'Imediata'
                            },

                        ],
                    },
                    columns: [
                        {text: 'Empresa', dataIndex: 'empresa', flex: 1},
                        {text: 'Local de Estoque', dataIndex: 'localEstoque', flex: 2},
                        {text: 'Embalagem', dataIndex: 'embalagem', flex: 1},
                        {text: 'Unidades', dataIndex: 'unidades', flex: 1},
                        {text: 'Pontos de Retirada', dataIndex: 'pontoRetirada', flex: 2},
                        {
                            text: 'Quantidade',
                            dataIndex: 'quantidade',
                            renderer: Ext.util.Format.numberRenderer('0.000'),
                            flex: 2,
                            editable: true,
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                minValue: 0,

                                listeners: {
                                    blur: 'validateQuantidade'
                                },
                            }
                        },
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
            ]
        }],
});
