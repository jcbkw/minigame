(function (arg) {

    /**
     * An enumeration of the keyboard arrow key codes
     * for reference.
     * 
     * @private
     * 
     * @type Object
     */
    var keymap = {

        left_arrow  : 37,
        up_arrow    : 38,
        right_arrow : 39,
        down_arrow  : 40

    };

    app.joystick = {

        /**
         * Initializes the jostick
         */
        init: function () {

            document.addEventListener("keydown", onKeydown , false);
            document.addEventListener("keyup", onKeyup , false);

        },

        /**
         * Contains the directional buttons
         * currently pressed by the en user.
         * 
         * @type String[]
         */
        direction: [],

    };

    /**
     * Updates the app.joystick.direction array on keydown
     * to add the newly pressed direction.
     * 
     * @private
     * 
     * @param {Event} event 
     */
    function onKeydown (event) {

        event.preventDefault();

        switch (event.which) {

            case keymap.left_arrow : 
                
                addDirection(app.player.direction.LEFT);

            break;

            case keymap.right_arrow : 
                
                addDirection(app.player.direction.RIGHT);

            break;  

            case keymap.up_arrow : 
                
                addDirection(app.player.direction.UP);

            break;

            case keymap.down_arrow : 
                
                addDirection(app.player.direction.DOWN);

            break;             

        }

    }

    /**
     * Updates the app.joystick.direction array on keydown
     * to remove the newly released direction.
     * 
     * @private
     * 
     * @param {Event} event 
     */
    function onKeyup (event) {

         switch (event.which) {

            case keymap.left_arrow : 
                
                removeDirection(app.player.direction.LEFT);

            break;

            case keymap.right_arrow : 
                
                removeDirection(app.player.direction.RIGHT);

            break;  

            case keymap.up_arrow : 
                
                removeDirection(app.player.direction.UP);

            break;

            case keymap.down_arrow : 
                
                removeDirection(app.player.direction.DOWN);

            break;             

        }

    }

    /**
     * Adds the provided direction to the app.joystick.direction
     * array if the provided direction didn't already figure in 
     * the array.
     * 
     * @private
     * 
     * @param {String} direction 
     */
    function addDirection (direction) {

        if (app.joystick.direction.indexOf(direction) === -1) {

            app.joystick.direction.push(direction);

        }

    }

    /**
     * Removes the provided direction from the app.joystick.direction
     * array if the provided direction figured in the array.
     * 
     * @private
     * 
     * @param {String} direction 
     */
    function removeDirection (direction) {

        var index = app.joystick.direction.indexOf(direction);

        if (index !== -1) {

            app.joystick.direction.splice(index, 1);

        }

    }

})();