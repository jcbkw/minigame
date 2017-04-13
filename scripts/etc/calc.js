/* global app, ns */

(function () {
    
    var api  = {
        
        /**
         * Given that the provided <code>number</code> represents
         * the provided <code>percent</code> out of an unknown number X,
         * this function resolves and returns the unknown number X.
         * 
         * For intance, suppose I have "20" and I know that this "20"
         * represents "10%" of a certain number... This method
         * helps me find that certain number.
         * 
         * @param {Number} number
         * @param {Number} percent
         * 
         * @returns {Number}
         * 
         * @example
         * app.etc.calc.fromPercent(20, 10); // returns 200
         */
        fromPercent: function (number, percent) {
            
            return number / (percent / 100);
            
        },
        
        /**
         * Returns the number that the given <code>percent</code>
         * resolves to when applied to the given <code>number</code>.
         * 
         * @param {Number} number
         * @param {Number} percent
         * 
         * @returns {Number}
         * 
         * @example
         * app.etc.calc.ofPercent(200, 10); // returns 20
         */
        ofPercent: function (number, percent) {
            
            return number * (percent / 100);
            
        },
        
        /**
         * Returns the percentage that <code>isNumber</code>
         * is of <code>ofNumber</code>.
         * 
         * @param {Number} isNumber
         * @param {Number} ofNumber
         * 
         * @returns {Number}
         * 
         * @example
         * app.etc.calc.toPercent(20, 200); // returns 10 (as in 10%)
         */
        toPercent: function (isNumber, ofNumber) {
            
            return (isNumber * 100) / ofNumber;
            
        }
        
    };
    
    ns.set('app.etc.calc', api);
    
})();