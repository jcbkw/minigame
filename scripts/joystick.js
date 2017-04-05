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

        direction: null,

    };

    function onKeydown (event) {

        event.preventDefault();

        switch (event.which) {

            case keymap.left_arrow : 
                
                app.joystick.direction = app.player.direction.LEFT;

            break;

            case keymap.right_arrow : 
                
                app.joystick.direction = app.player.direction.RIGHT;

            break;  

            case keymap.up_arrow : 
                
                app.joystick.direction = app.player.direction.UP;

            break;

            case keymap.down_arrow : 
                
                app.joystick.direction = app.player.direction.DOWN;

            break;             

        }

    }

    function onKeyup (event) {

        app.joystick.direction = null;

    }

})();