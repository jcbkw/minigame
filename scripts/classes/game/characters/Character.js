 /* global app, ns */

(function () {
     
    /**
     * @class Character A base Character Class
     * 
     * @param {DisplayObject} stage
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Character (stage, x, y, width, height) {
        
        // call to super
        app.classes.display.DisplayClip.call(this, stage, x, y, width, height);
        
        this.group.add(Character.GROUP);
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.characters.Character
     */
    Character.GROUP = 'character';
    
    /**
     * @static
     * @memberOf app.classes.game.characters.Character
     * @name Attributes
     * @type {Enum}
     */
    Character.Attributes = {
        
        /**
         * @memberOf app.classes.game.characters.Character.Attributes
         * @name STANCE
         * @type {String}
         */
        STANCE: 'stance',
        
        /**
         * @memberOf app.classes.game.characters.Character.Attributes
         * @name MOVING
         * @type {String}
         */
        MOVING: 'moving'
                
    };
    
    /**
     * @type app.classes.game.characters.Character.prototype
     */
    var api = new app.classes.display.DisplayClip;
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Character;
    
    /**
     * @type {app.classes.game.characters.CharacterPacing}  Used to make the character 
     *                                                      execute pacing movements.
     */
    api.pacer = null;
    
    /**
     * @type {app.classes.game.characters.DisplayGauge}
     */
    api.lifeGauge = null;
    
    /**
     * Tells whether this character should be consider dangerous.
     * 
     * @returns {Boolean}
     */
    api.isHarmful = function () {
        
        return false;
        
    };
    
    /**
     * Tells whether this character has a life gauge with more than
     * 0 point;
     * 
     * @returns {Boolean}
     */
    api.isAlive = function () {
        
        return this.lifeGauge && this.lifeGauge.getLife() > 0;
        
    };
    
    /**
     * Harm this character with the provided entity.
     * 
     * @param {app.classes.game.entities.Harmful} entity
     */
    api.harmWith = function (entity) {
        
        if (this.lifeGauge) {
            
            this.lifeGauge.updateLife(-entity.getHitPoints());
            
        }
        
    };
    
    /**
     * Returns a <code>CharacterPacing</code> instance used to make the character
     * execute pacing movements.
     * 
     * @returns {app.classes.game.characters.CharacterPacing}
     */
    api.pace = function () {
        
        if (!this.pacer) {
            
            this.pacer = new app.classes.game.characters.CharacterPacing(this);
            
        }
        
        return this.pacer;
        
    };
    
    /**
     * Set the character's stance (e.g. the direction
     * towards which the character is facing)
     * 
     * @param {String} value
     */
    api.setStance = function (value) {
        
        if (value === null) {
            
            this.removeAttribute(Character.Attributes.STANCE);
            
        }
        else {
            
            this.setAttribute(Character.Attributes.STANCE, value);
            
        }
            
    };
    
    /**
     * Returns the character's stance (e.g. the direction
     * towards which the character is facing)
     * 
     * @returns {(String|null)}
     */
    api.getStance = function () {
        
        return this.getAttribute(Character.Attributes.STANCE);
            
    };
    
    /**
     * Indicate that the character is walking.
     * 
     * @param {Boolean} value
     */
    api.setMoving = function (value) {
        
        if (value) {
            
            this.group.add(Character.Attributes.MOVING);
            
        }
        else {
            
            this.group.remove(Character.Attributes.MOVING);
            
        }
        
    };
    
    /**
     * Check whether the character is walking.
     * 
     * @returns {Boolean}
     */
    api.isMoving = function () {
        
        return this.group.contains(Character.Attributes.MOVING);
        
    };
    
    /**
     * A function to call when the cross has been completed
     * 
     * @callback crossOnCompleteCallback
     * @param {app.classes.display.DisplayClip} instance The instance which was crossing
     * @param {Boolean} wasForce Whether the completion was forcefully triggered 
     *                          (e.g. called before the cross has actually completed)
     */
    
    /**
     * Makes the clip "cross" (make a series of steps) towards the provided 
     * x and/or y axis relative to its current position.
     * 
     * @param {Number} [x=0]                The desired final X position.
     *                                      Can be a negative integer.
     *                                      
     * @param {Number} [y=0]                The desired final Y position.
     *                                      Can be a negative integer.
     * 
     * @param {app.classes.display.DisplayClip~crossOnCompleteCallback} [onComplete]
     *                                      
     * @param {Function} [onDirection]      A function to call each time
     *                                      this function has new insights
     *                                      about the direction towards 
     *                                      which this clip is crossing.
     *                                      
     * @param {Function} [onStep]           A function to call after each
     *                                      step of the cross.
     */
    api.cross = function (x, y, onComplete, onDirection, onStep) {
        
        var that = this;
        
        function onEachStep (isLastStep) {
            
            that.setMoving(true);
            onStep && onStep(isLastStep);
            
        }
        
        function onStopped (instance, forced) {
            
            that.setMoving(false);
            that.setStance(null);
            onComplete && onComplete(instance, forced);
            
        }
        
        function onDirectionInsight (direction) {
            
            that.setStance(direction);
            onDirection && onDirection(direction);
            
        }

        app.classes.display.DisplayClip.prototype.cross.call(this, x, y, onStopped, onDirectionInsight, onEachStep);

    };
    
    /**
     * Makes the clip "cross" (make a series of steps) untils it reaches 
     * the provided x and/or y axis relative to the stage.
     * 
     * @param {Number} [x=0]                The desired final X position.
     *                                      Cannot be a negative integer.
     *                                      
     * @param {Number} [y=0]                The desired final Y position.
     *                                      Cannot be a negative integer.
     * 
     * @param {crossOnCompleteCallback} [onComplete]
     *                                      
     * @param {Function} [onDirection]      A function to call each time
     *                                      this function has new insights
     *                                      about the direction towards 
     *                                      which this clip is walking.
     *                                      
     * @param {Function} [onStep]           A function to call after each
     *                                      step of the cross.
     */
    api.crossTo = function (x, y, onComplete, onDirection, onStep) {
        
        var that = this;
        
        function onEachStep (isLastStep) {
            
            that.setMoving(true);
            onStep && onStep(isLastStep);
            
        }
        
        function onStopped (instance, forced) {
            
            that.setMoving(false);
            that.setStance(null);
            onComplete && onComplete(instance, forced);
            
        }
        
        function onDirectionInsight (direction) {
            
            that.setStance(direction);
            onDirection && onDirection(direction);
            
        }

        return app.classes.display.DisplayClip.prototype.crossTo.call(this, x, y, onStopped, onDirectionInsight, onEachStep);

    };
    
    Character.prototype = api;
    
    ns.set('app.classes.game.characters.Character', Character);
    
 })();