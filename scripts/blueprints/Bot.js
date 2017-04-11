/* global app */

(function () {
    
    function Bot () {};
    
    Bot.prototype  = {
        
        /**
         * The Bot constructor
         * @type Function
         */
        constructor: Bot,

        /**
         * Enumeration of the different directions that
         * the player can step towards.
         * 
         * @type Object
         */
        direction : app.player.direction,

        /**
         * The player element
         * @type Element
         */
        element: null,
        
        /**
         * The player's weapon.
         * @type Weapon
         */
        weapon: null,
        
        /**
         * The player width
         * @type Number
         */
        width: 32,

        /**
         * The player height
         * @type Number
         */
        height: 32,

        /**
         * Horizontal position of the player on the stage.
         * @type Number  
         */
        x: 0, 
        
        /**
         * Vertical position of the player on the stage.  
         * @type Number
         */
        y: 0, 

        /**
         * Step size of the player on the stage.  
         * @type Number
         */
        stepSize: 1,

        /**
         * Initializes the player
         */
        init: function () {
            
            app.onTick(animate);
            
        },
        
        exit: function () {
            
            app.unTick(animate);
            
        },

        /**
         * Set or returns player's stance (e.g. the direction
         * towards which the player is facing)
         * 
         * @param {String} value
         * 
         * @returns String|null|app.player
         */
        stance: function (value) {
                            
            if (arguments.length === 0) {

                if (this.element) { 

                    return this.element.getAttribute('stance');   

                }
                
                return null;

            }

            if (this.element) { 
                
                value = !value
                      ? this.direction.DOWN // default stance
                      : value;
                    
                this.element.setAttribute('stance', value);   
                
            }
            
            return this;

        },

        /**
         * Attacks using the player's weapon if any.
         */
        attack: function () {

            if (this.weapon) {
                
                this.weapon.attack();

            }

        },

        /**
         * Draws the game player
         * @param {Element} parentElement 
         */
        render: function (parentElement) {
            
            this.element = document.createElement('div');

            this.element.classList.add('bot');
            this.stance(null);
                        
            this.element.style.width  = this.width  + "px";
            this.element.style.height = this.height + "px";

            parentElement.appendChild(this.element);

        },
        
        /**
         * Makes the player "walk" towards the provided x and/or y
         * axis relative to the stage.
         * 
         * @param {Number} [x=0]                The desired final X position.
         *                                      Cannot be a negative integer.
         *                                      
         * @param {Number} [y=0]                The desired final Y position.
         *                                      Cannot be a negative integer.
         * 
         * @param {Function} [callback]         A function to call when the
         *                                      walk has been completed.
         * 
         * @returns {app.player.walk.stopper}   A fustopthat can be called
         *                                      to stop the walk before the
         *                                      palyer reaches the provided x
         *                                      and y points if desired.
         */        
        walkTo: function (x, y, callback) {
            
            // quick check for a positive integer
            x = !x || x < 0 ? 0 : x;
            y = !y || y < 0 ? 0 : y;
            
            return this.walk(x - this.x, y - this.y, callback);
            
        },
        
        /**
         * Makes the player "walk" towards the provided x and/or y
         * axis relative to its current position.
         * 
         * @param {Number} [x=0]                The desired final X position.
         *                                      Can be a negative integer.
         *                                      
         * @param {Number} [y=0]                The desired final Y position.
         *                                      Can be a negative integer.
         * 
         * @param {Function} [callback]         A function to call when the
         *                                      walk has been completed.
         * 
         * @returns {app.player.walk.stopper}   A fustopthat can be called
         *                                      to stop the walk before the
         *                                      palyer reaches the provided x
         *                                      and y points if desired.
         */
        walk: function (x, y, callback) {
            
            x = x || 0;
            y = y || 0;
            
            var that            = this,
                currentStep     = 1,
                
                xDirection      = x > 0 ? that.direction.RIGHT 
                                        : that.direction.LEFT,
                xMaxSteps       = x && (Math.ceil(Math.abs(x) / that.stepSize)),
                xLastStep       = x && (xMaxSteps - 1),
                xRemainder      = x && (x % xMaxSteps),
                xStepSize       = x && ((x - xRemainder) / xMaxSteps),
                xLastStepSize   = xStepSize + xRemainder,
                xDone           = !x,
                
                yDirection      = y > 0 ? that.direction.DOWN 
                                        : that.direction.UP,
                yMaxSteps       = y && (Math.ceil(Math.abs(y) / that.stepSize)),
                yLastStep       = y && (yMaxSteps - 1),
                yRemainder      = y && (y % yMaxSteps),
                yStepSize       = y && ((y - yRemainder) / yMaxSteps),
                yLastStepSize   = yStepSize + yRemainder,
                yDone           = !y;
                
            function setStance () {
                
                var stance = '';
                
                if (!xDone) {
                    
                    stance += xDirection;
                    
                }
                
                if (!yDone) {
                    
                    stance += yDirection;
                    
                }
                
                that.stance(stance);
                
            }
                        
            function stepper () {
                
                if (x && !xDone) {
                    
                    xDone = currentStep === xMaxSteps;
                    
                    if (!xDone) {
                                               
                        switch (currentStep) {

                            case xLastStep: that.move(xLastStepSize, 0); break;
                            default: that.move(xStepSize, 0); break;

                        }
                        
                    }
                    else {
                        
                        setStance();
                        stop();
                        
                    }
                    
                }
                
                if (y && !yDone) {
                    
                    yDone = currentStep === yMaxSteps;
                    
                    if (!yDone) {
                        
                        switch (currentStep) {

                            case yLastStep: 
                                that.move(0, yLastStepSize); break;
                                
                            default: 
                                that.move(0, yStepSize); break;

                        }
                        
                    }
                    else {
                        
                        setStance();
                        stop();
                        
                    }
                    
                }
                
                ++currentStep;
                
                // needs to be called on each step since
                // animate removes that flag on each step
                // if a direct is not found in the joystick
                setWalking(true);
                
            }
            
            function stop (force) {
                
                if (stepper && (force || (xDone && yDone))) {
                    
                    xDone = yDone = true;
                    
                    app.unTick(stepper);
                    setWalking(false);
                    setStance();
                    callback && callback(that);

                    stepper = stopper = stop = that =  null;
                    
                }
                
            }
            
            function stopper () {
                
                stop && stop(true);
                
            }
            
            setStance();            
            app.onTick(stepper);
            
            return stopper;
            
        },

        /**
         * Makes the player step in the provided direction.
         * 
         * @param {String} direction    The desired direction. Can be either
         *                              up, down, left, right 
         */
        step: function (direction) {

            switch (direction) {

                case this.direction.UP   : this.move(0, -this.stepSize); break;
                case this.direction.DOWN : this.move(0, this.stepSize);  break;
                case this.direction.LEFT : this.move(-this.stepSize);    break;
                case this.direction.RIGHT: this.move(this.stepSize);     break;

            }  
            
        },

        /**
         * Places the player at a new position
         * relative to its current position.
         * 
         * @param {Number} [x=0] The relative x coordinate. 
         * @param {Number} [y=0] The relativ y coordinate.
         * 
         * @example
         * app.player.move(5)     // moves right by 5px
         * app.player.move(0, -2) // moves up by 2px
         */
        move: function (x, y) {
            
            this.moveTo(this.x + (x || 0), this.y + (y || 0));

        },

        /**
         * Places the player at the specified position.
         * 
         * @param {Number} x The x coordinate. 
         * @param {Number} y The y coordinate. 
         */
        moveTo : function (x, y) {

            var maxRight,
                maxDown;
            
            // prevents from going out of bounds up or down
            // if y is less than zero
            if (y < 0) {

                // than set y to zero
                // so that it can't go further up
                y = 0;

            }
            // otherwise
            else {

                // the fartest it can go down is
                // the stage height minus its own height
                // (since its origin point starts at its top left corner)
                maxDown = app.stage.height - this.height;

                // if y is more than the fartest allowed
                if (y > maxDown) {

                    // than set it to the fartest allowed
                    // so that it can't go further down
                    y = maxDown;

                }

            }

            // prevents from going out of bounds left or right
            // if x is less than zero
            if (x < 0) {

                // than set x to zero
                // so that it can't go further left
                x = 0;

            }
            // otherwise
            else {

                // the fartest it can go right is
                // the stage width minus its own width
                // (since its origin point starts at its top left corner)
                maxRight = app.stage.width - this.width;

                // if x is more than the fartest allowed
                if (x > maxRight) {

                    // than set it to the fartest allowed
                    // so that it can't go further right
                    x = maxRight;

                }

            }

            // now set the player position using
            // our refined x and y
            this.element.style.top  = y + "px";
            this.element.style.left = x + "px";

            // and cached them in the object
            // for future refence
            this.x = x;
            this.y = y;

        }

    };
    
    /**
     * Indicate that the player is walking.
     * 
     * @param {Boolean} value
     */
    function setWalking (value) {
        
        if (value) {
            
            app.player.element.classList.add('walking');
            
        }
        else {
            
            app.player.element.classList.remove('walking');
            
        }
        
    }
    
    /**
     * This gets called on each application tick.
     * It checks the directions listed by the joystick
     * and moves the player towards them.
     * 
     * The function also assigns the correct position
     * classes to the player so that the correct sprites
     * get displayed.
     * 
     * @private
     */
    function animate () {
    }
    
    app.blueprints.Bot = Bot;

})();