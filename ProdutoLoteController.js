Ext.define('CISSMob.view.produtolote.ProdutoLoteController', {
    extend: 'Ciss.app.ViewController',
    alias: 'controller.produtolotecontroller',

    init: function () {
        const me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            form = view.lookup('formconversao');

        vm.set({'configProdutoLote': 2.600, 'configProdutoUn': 1.000});// tm que buscar no servidor

        let fieldProdutoLote = Ext.ComponentQuery.query('numberfield[name=sugestaoProdutoLote]')[0];
        fieldProdutoLote.setValue(vm.get('configProdutoLote'));

        let fieldProdutoUn = Ext.ComponentQuery.query('numberfield[name=sugestaoProdutoUn]')[0];
        fieldProdutoUn.setValue(vm.get('configProdutoUn'));
    },

    converterUnToM2: function (field) {
        const me = this,
            vm = me.getViewModel(),
            qtProdutoLote= field.getParent().down('[name=sugestaoProdutoLote]');

        if (field.getValue() != undefined  && field.getValue() > 0) {
            qtProdutoLote.setValue(field.getValue() * vm.get('configProdutoLote'));

        } else {
            field.setValue(vm.get('configProdutoUn'));
        }

    },

    converterM2ToUn: function (field) {
        const me = this,
            vm = me.getViewModel(),
            fieldProdutoUn = field.getParent().down('[name=sugestaoProdutoUn]');

        if (field.getValue() != undefined && field.getValue() > 0) {
            const configProdutoLote = vm.get('configProdutoLote');
            const valorTotal = (field.getValue() / configProdutoLote);
            fieldProdutoUn.setValue(valorTotal);

        } else {
            field.setValue(vm.get('configProdutoLote'));
        }
    },

    handlerCancel: function () {

        var me = this,
            vm = me.getViewModel(),
            view = me.getView();

        Ext.getBody().removeCls('disabled-scroll');
        // Preservando scroll da pagina
        window.scroll(0, vm.get('scrollPage'));

        if (view) {
            view.destroy();
        }
    },

    ocultarSemEstoque: function (checkbox) {
        const grid = Ext.ComponentQuery.query('grid[name="grid-lotesporempresa"]')[0];
        if(checkbox.isChecked()) {
            grid.getStore().filterBy( (record) => {
                return record.data.quantidade > 0
            }, this)
        } else {
            grid.getStore().clearFilter();
        }
    },

    validateQuantidade: function (field) {
        const me = this,
            vm = me.getViewModel(),
            configProdutoLote = vm.get('configProdutoLote'),
            valorDigitadao = field.getValue();

        let valor = valorDigitadao / configProdutoLote;

        if (!Number.isInteger(valor)) {
            valor = Math.floor(valor);
           const numeroMin = (valor * configProdutoLote);
           const minimo = Ext.util.Format.number(numeroMin.toFixed(2), '0.000');
           const proximo = Ext.util.Format.number((numeroMin + configProdutoLote).toFixed(2), '0.000');

            Ext.toast(`Quantidade informada está fora da embalagem de venda
            Sugestões de quantidade ${minimo} ou ${proximo}`, 3000);

        }
    },

    renderPercent: function (value) {
        return Ext.util.Format.number(value, '0.00%');
    },

});
