(function () {

    app.stage = {

        /**
         * The stage element
         * @type Element
         */
        element: null,

        /**
         * The stage width
         * @type Number
         */
        width: 300,

        /**
         * The stage height
         * @type Number
         */
        height: 300,

        /**
         * Draws the game stage
         * @param {Element} parentElement 
         */
        render: function (parentElement) {

            this.element = document.createElement('main');

            this.element.classList.add('stage');
            
            this.element.style.width    = this.width  + "px";
            this.element.style.height   = this.height + "px";

            parentElement.appendChild(this.element);

        }

    };
    
})();
    
