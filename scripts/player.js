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
         * The player width
         * @type Number
         */
        width: 25,

        /**
         * The player height
         * @type Number
         */
        height: 25,

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
         * Draws the game player
         * @param {Element} parentElement 
         */
        render: function (parentElement) {
            
            this.element = document.createElement('div');

            this.element.classList.add('player');
            
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
         * Moves the player relative to its current position.
         * 
         * @param Number [x=0] The relative x coordinate. 
         * @param Number [y=0] The relativ y coordinate. 
         */
        move: function (x, y) {
            
            this.moveTo(this.x + (x || 0), this.y + (y || 0));

        },

        /**
         * Moves the player to the specified position.
         * 
         * @param Number x The x coordinate. 
         * @param Number y The y coordinate. 
         */
        moveTo : function (x, y) {

            var maxRight,
                maxDown;
            
            // prevents from going out of bounds up or down
            if (y < 0) {

                y = 0;

            }
            else {

                maxDown = app.stage.height - this.height;

                if (y > maxDown) {

                    y = maxDown;

                }

            }

            // prevents from going out of bounds left or right
            if (x < 0) {

                x = 0;

            }
            else {

                maxRight = app.stage.width - this.width;

                if (x > maxRight) {

                    x = maxRight;

                }

            }

            this.element.style.top  = y + "px";
            this.element.style.left = x + "px";

            this.x = x;
            this.y = y;

        }

    }

    function animate () {

        var count = app.joystick.direction.length,
            i;
            
        for (i = 0; i < count; i += 1) {

            app.player.step(app.joystick.direction[i]);

        }

    }

})();