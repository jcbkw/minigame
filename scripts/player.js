(function () {

    app.player = {

        /**
         * Enumeration of the different directions that
         * the player can step towards.
         * 
         * @type Object
         */
        direction: {

            UP      : 'up',
            DOWN    : 'down',
            LEFT    : 'left',
            RIGHT   : 'right',

        },

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

        /**
         * Set or returns player's stance (e.g. the direction
         * towards which the player is facing)
         * 
         * @param String value
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

                return this.element.setAttribute('stance', value);   

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

            this.element.classList.add('player', 'alice');
            this.stance(this.direction.DOWN);
                        
            this.element.style.width  = this.width  + "px";
            this.element.style.height = this.height + "px";

            parentElement.appendChild(this.element);

        },

        /**
         * Makes the player step in the provided direction.
         * 
         * @param String direction  The desired direction. Can be either
         *                          up, down, left, right 
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
         * @param Number [x=0] The relative x coordinate. 
         * @param Number [y=0] The relativ y coordinate.
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
         * @param Number x The x coordinate. 
         * @param Number y The y coordinate. 
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

    }

var iii;

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

        var count = app.joystick.directions.length,
            i;
        
        if (count === 0) {

            app.player.element.classList.remove('walking');

        }
        else {
            
            app.player.element.classList.add('walking');
            app.player.stance(resolveDirection(app.joystick.directions));

            for (i = 0; i < count; i += 1) {

                app.player.step(app.joystick.directions[i]);

            }

        }

    }

    /**
     * Computes the directional attribute to use
     * based on the provided directions array.
     * 
     * @private
     * @param {String[]} directions 
     */
    function resolveDirection (directions) {

        var result;

        // check for diagonals
        if (directions.indexOf(app.player.direction.LEFT) !== -1) {

            if (directions.indexOf(app.player.direction.UP) !== -1) {

                // diagonal leftup
                result = app.player.direction.LEFT + app.player.direction.UP;

            }
            else if (directions.indexOf(app.player.direction.DOWN) !== -1) {

                // diagonal leftdown
                result = app.player.direction.LEFT + app.player.direction.DOWN;

            }

        }
        else if (directions.indexOf(app.player.direction.RIGHT) !== -1) {

            if (directions.indexOf(app.player.direction.UP) !== -1) {

                // diagonal rightup
                result = app.player.direction.RIGHT + app.player.direction.UP;

            }
            else if (directions.indexOf(app.player.direction.DOWN) !== -1) {

                // diagonal rightdown
                result = app.player.direction.RIGHT + app.player.direction.DOWN;

            }

        }

        // no diagonal found
        if (!result) {

            // then use the last item
            result = directions[directions.length - 1];

        }

        return result || "";

    }

})();