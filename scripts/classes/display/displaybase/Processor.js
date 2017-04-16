/* global ns, app */

(function () {
    
    /**
     * @lends {Processor.prototype}
     */
    var api = {constructor: Processor};
    
    /**
     * Creates a Processor instance.
     * 
     * @class
     * 
     * @name Processor
     * @param {DisplayBase} displayBase
     */
    function Processor (displayBase) {
        
        this.displayBase = displayBase;
        
    }
    
    /**
     * @type {app.classes.display.DisplayBase}
     */
    api.displayBase = null;
    
    api.centerX = function () {
        
        return this.displayBase.width / 2;
        
    };
    
    api.centerY = function () {
        
        return this.displayBase.height / 2;
        
    };
    
    api.leftTopPoint = function () {
        
        return new app.classes.geom.Point(this.displayBase.x, this.displayBase.y);
        
    };
    
    api.centerTopPoint = function () {
        
        return new app.classes.geom.Point(this.centerX(), this.displayBase.y);
        
    };
    
    api.rightTopPoint = function () {
        
        return new app.classes.geom.Point(this.displayBase.width, this.displayBase.y);
        
    };
    
    api.leftCenterPoint = function () {
        
        return new app.classes.geom.Point(this.displayBase.x, this.centerY());
        
    };
    
    api.centerPoint = function () {
        
        return new app.classes.geom.Point(this.centerX(), this.centerY());
        
    };
    
    api.rightCenterPoint = function () {
        
        return new app.classes.geom.Point(this.displayBase.width, this.centerY());
        
    };
    
    api.leftBottomPoint = function () {
        
        return new app.classes.geom.Point(this.displayBase.x, this.displayBase.heigth);
        
    };
    
    api.centerBottomPoint = function () {
        
        return new app.classes.geom.Point(this.centerX(), this.displayBase.heigth);
        
    };
    
    api.rightBottomPoint = function () {
        
        return new app.classes.geom.Point(this.displayBase.width, this.displayBase.heigth);
        
    };
    
    Processor.prototype = api;
    
    ns.set('app.classes.display.displaybase.Processor', Processor);
    
})();