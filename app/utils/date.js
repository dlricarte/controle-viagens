'use strict';

const moment = require('moment');

const DEFAULT_FORMAT = 'DD/MM/YYYY';

module.exports = {
    
    /**
     * 
     */
    toDate: (string, format) => {
        if (!string) {
            return null;
        }
        
        format = format || DEFAULT_FORMAT;
        let date = moment(string, format);
        return date.isValid() ? date.toDate() : null;
    },
    
    /**
     * 
     */
    toString: (date, format) => {
        if (!date) {
            return '';
        }
        
        format = format || DEFAULT_FORMAT;
        date = moment(date);
        
        return date.isValid() ? date.format(format) : '';
    }
};