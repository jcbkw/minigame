(function (arg) {

    var keymap = {

        left_arrow  : 37,
        up_arrow    : 38,
        right_arrow : 39,
        down_arrow  : 40

    };

    app.joystick = {

        init: function () {

            document.addEventListener("keydown", onKeydown , false);
            document.addEventListener("keyup", onKeyup , false);

        },

        direction: [],

    };

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

    function addDirection (direction) {

        if (app.joystick.direction.indexOf(direction) === -1) {

            app.joystick.direction.push(direction);

        }

    }

    function removeDirection (direction) {

        var index = app.joystick.direction.indexOf(direction);

        if (index !== -1) {

            app.joystick.direction.splice(index, 1);

        }

    }

})();