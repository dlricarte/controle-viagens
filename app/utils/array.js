'use strict';

module.exports = {
    
    /**
     * Sum array property
     */
    sum: (items, prop) => {
        return items.reduce((a, b) => {
            if (prop) {
                return a + b[prop];
            } else {
                return a + b;
            }
        }, 0);
    }
};