'use strict';

const numeral = require('numeral');

numeral.language('pt-br', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'mil',
        million: 'milhões',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function (number) {
        return 'º';
    },
    currency: {
        symbol: 'R$'
    }
});

numeral.language('pt-br');

module.exports = {
    
    /**
     * 
     */
    format: (number) => {
        return numeral(number).format('$ 0,0.00');
    }
};