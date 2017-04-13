 /* global app, ns */

(function () {
     
    /**
     * @class HarmfulCharacter A base HarmfulCharacter Class
     * 
     * @augments app.classes.game.entities.Harmful
     * @augments app.classes.game.characters.Character
     * 
     * @param {DisplayObject} stage
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function HarmfulCharacter (stage, x, y, width, height) {
        
        // call to super
        app.classes.game.entities.Harmful.call(this, stage, x, y, width, height);
        app.classes.game.characters.Character.call(this, stage, x, y, width, height);
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.characters.HarmfulCharacter
     */
    HarmfulCharacter.GROUP = 'harmfulcharacter';
    
    /**
     * @type app.classes.game.characters.HarmfulCharacter.prototype
     */
    var api = new app.classes.game.characters.Character;
    
    /**
     * Tells whether this character should be consider dangerous.
     * 
     * @returns {Boolean}
     */
    api.isHarmful = function () {
        
        return true;
        
    };
    
    HarmfulCharacter.prototype = api;
    
    // (mixin) inherits from app.classes.game.entities.Harmful
    ns.merge(api, app.classes.game.entities.Harmful.prototype);
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = HarmfulCharacter;
    
    ns.set('app.classes.game.characters.HarmfulCharacter', HarmfulCharacter);
    
 })();