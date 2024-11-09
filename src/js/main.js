/**
 * 
 * @employSchema
 * @eventListeners
 * @sensibleDefaults
 * @svgSrc
 * @documentation
 * @documentationApi
 * @iconUniformNames
 * @minimizeProperties
 * @objectifyEventListeners
 * @parentElementSelector
 * @distinctEventListeners
 * @propertiesElemUnderscore
 * @propertify
 * @propertyNamingConventions
 * @methodNamingConventions
 */




/**
 * 
 * @param {Object}                   schema
 * @param {HTMLSourceElement}       [schema.headerHTML]
 * @param {Object}                  [schema.header]
 * @param {URL}                      schema.header.logo
 * @param {String}                   schema.header.title
 * @param {Object[]}                [schema.blocks]
 * @param {'link'|'header'}          schema.blocks[].type
 * @param {String}                   schema.blocks[].text
 * @param {URL}                     [schema.blocks[].href]
 * @param {SVGElement}              [schema.blocks[].icon]
 * @param {Array}                   [schema.blocks[].classes]
 * @param {HTMLSourceElement}       [schema.blocks[].subtext]
 * @param {Array}                   [schema.blocks[].validLinks]
 * @param {Function}                [schema.blocks[].onClick]
 * @param {Object[]}                [schema.blocks[].eventListeners]
 * @param {String}                   schema.blocks[].eventListeners[].type
 * @param {Function}                 schema.blocks[].eventListeners[].listener
 * @param {Object[]}                [schema.controls]
 * @param {SVGElement}               schema.controls[].icon
 * @param {'logout'|'toggleTheme'}   schema.controls[].type
 * @param {String}                  [schema.controls[].title]
 * @param {Function}                [schema.controls[].onClick]
 * @param {Object[]}                [schema.controls[].eventListeners]
 * @param {String}                   schema.controls[].eventListeners[].type
 * @param {Function}                 schema.controls[].eventListeners[].listener
 * @param {Object[]}                [schema.legends]
 * @param {URL}                      schema.legends[].url
 * @param {String}                   schema.legends[].text
 * @param {Object}                  [schema.mobile]
 * @param {SVGElement}              [schema.mobile.icon]
 * @param {Array}                   [schema.mobile.classes]
 */
function NavMenu( schema ) {

    /**
     * 
     * @private
     */
    this._mobileHideIconSrc = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><defs/><path d='M23 20.2L14.8 12 23 3.8 20.2 1 12 9.2 3.8 1 1 3.8 9.2 12 1 20.2 3.8 23l8.2-8.2 8.2 8.2z'/></svg>";

    /**
     * 
     * @private
     */
    this._hamburgerIconSrc = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M24 6H0V2h24v4zm0 4H0v4h24v-4zm0 8H0v4h24v-4z'/></svg>";

    /**
     * 
     * @private
     */
    this._svgThemeSystem = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10V2zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z'/></svg>";

    /**
     * 
     * @private
     */
    this._svgThemeLight = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M4.07 13H0v-2h4.07a8.05 8.05 0 0 0 0 2zM7.1 5.69 4.22 2.8 2.81 4.22 5.69 7.1c.41-.53.88-1 1.41-1.41zM18.31 7.1l2.88-2.88-1.41-1.41-2.88 2.88c.53.4 1 .88 1.41 1.41zM12 4c.34 0 .67.03 1 .07V0h-2v4.07c.33-.04.66-.07 1-.07zm0 16c-.34 0-.67-.03-1-.07V24h2v-4.07c-.33.04-.66.07-1 .07zm7.93-9a8.05 8.05 0 0 1 0 2H24v-2h-4.07zm-3.03 7.31 2.88 2.88 1.41-1.41-2.88-2.88c-.4.53-.88 1-1.41 1.41zM5.69 16.9 2.8 19.78l1.41 1.41 2.88-2.88c-.53-.41-1-.88-1.41-1.41zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z'/></svg>";

    /**
     * 
     * @private
     */
    this._svgThemeDark = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 11a4.51 4.51 0 0 1 3 3 4.52 4.52 0 0 1 3-3 4.52 4.52 0 0 1-3-3 4.5 4.5 0 0 1-3 3zm8 0c.96.3 1.7 1.04 2 2a3 3 0 0 1 2-2 3.01 3.01 0 0 1-2-2c-.3.96-1.04 1.7-2 2zm-1-9a4.51 4.51 0 0 1-3 3 4.52 4.52 0 0 1 3 3 4.51 4.51 0 0 1 3-3 4.52 4.52 0 0 1-3-3zm-7 22a12.01 12.01 0 0 1 0-24c1.9 0 3.63.5 5.37 1.18C14.42 1.68 8 4.45 8 12c0 7.45 5.92 10.2 9.37 10.82-1.5.85-3.48 1.18-5.37 1.18z'/></svg>";

    /**
     * 
     * @private
     */
    this._themeToggleControl = null;

    /**
     * 
     * @private
     */
    this._logoImageElem = null;

    /**
     * 
     * @private
     */
    this._logoTitleElem = null;



    this._navElem = document.querySelector( 'nav' );

    var fragment = document.createDocumentFragment();

    if ( schema.hasOwnProperty( 'headerHTML' ) ) {

        this._navElem.innerHTML = schema.headerHTML;

    }

    if ( schema.hasOwnProperty( 'header' ) ) {

        var headerElem = document.createElement( 'DIV' );
        headerElem.classList.add( 'unitLogo' );
        this._navElem.appendChild( headerElem );

        this._logoImageElem = document.createElement( 'IMG' );
        this._logoImageElem.src = schema.header.logo;
        headerElem.appendChild( this._logoImageElem );

        this._logoTitleElem = document.createElement( 'H1' );
        this._logoTitleElem.textContent = schema.header.title;
        headerElem.appendChild( this._logoTitleElem );

    }

    if ( schema.hasOwnProperty( 'blocks' ) ) {

        var mainMenu = document.createElement( 'DIV' );
        mainMenu.classList.add( 'mainMenu' );
        fragment.appendChild( mainMenu );

        for ( var i = 0 ; i < schema.blocks.length ; i++ ) {

            if ( schema.blocks[ i ].type === 'link' ) {

                if ( schema.blocks[ i ].hasOwnProperty( 'href' ) ) {

                    var blockElem = document.createElement( 'A' );
                    blockElem.setAttribute( 'href', schema.blocks[ i ].href );
                    blockElem.setAttribute( 'title', schema.blocks[ i ].text );
                    mainMenu.appendChild( blockElem );

                }

                if ( schema.blocks[ i ].hasOwnProperty( 'classes' ) ) {

                    blockElem.classList.add( schema.blocks[ i ].classes );

                }

                var blockTextElem = document.createElement( 'DIV' );
                blockTextElem.classList.add( 'text' );
                blockElem.appendChild( blockTextElem );

                var blockSpanElem = document.createElement( 'SPAN' );
                blockSpanElem.classList.add( 'icon' );
                blockSpanElem.innerHTML = schema.blocks[ i ].icon;
                blockTextElem.appendChild( blockSpanElem );

                var blockPElem = document.createElement( 'P' );
                blockPElem.textContent = schema.blocks[ i ].text;
                blockTextElem.appendChild( blockPElem );

                if ( schema.blocks[ i ].hasOwnProperty( 'subtext' ) ) {

                    var blockSubtextElem = document.createElement( 'SAMP' );
                    blockSubtextElem.innerHTML = schema.blocks[ i ].subtext;
                    blockElem.appendChild( blockSubtextElem );

                }

                if ( schema.blocks[ i ].hasOwnProperty( 'validLinks' ) && schema.blocks[ i ].validLinks.includes( window.location.pathname ) ) {

                    blockElem.classList.add( 'active' );

                }

                if ( schema.blocks[ i ].hasOwnProperty( 'eventListeners' ) ) {

                    for ( var q = 0 ; q < schema.blocks[ i ].eventListeners.length ; q++ ) {

                        blockElem.addEventListener(
                            schema.blocks[ i ].eventListeners[ q ].type,
                            schema.blocks[ i ].eventListeners[ q ].listener
                        );

                    }

                }

                if ( schema.blocks[ i ].hasOwnProperty( 'onClick' ) ) {

                    blockElem.addEventListener( 'click', schema.blocks[ i ].onClick );

                }

                if ( i < schema.blocks.length - 1 ) {

                    if ( schema.blocks[ i ].hasOwnProperty( 'trailingHr' ) === false || schema.blocks[ i ].trailingHr === true ) {

                        var hr = document.createElement( 'HR' );
                        mainMenu.appendChild( hr );

                    }

                }

            } else if ( schema.blocks[ i ].type === 'header' ) {

                var header = document.createElement( 'P' );
                header.textContent = schema.blocks[ i ].text
                header.classList.add( 'header' );
                mainMenu.appendChild( header );

                if ( schema.blocks[ i ].hasOwnProperty( 'classes' ) ) {

                    for ( q = 0 ; q < schema.blocks[ i ].classes.length ; q++ ) {

                        header.classList.add( schema.blocks[ i ].classes[ q ] );

                    }

                }

            }

        }

    }

    if ( schema.hasOwnProperty( 'controls' ) ) {

        var controlsBlock = document.createElement( 'DIV' );
        controlsBlock.classList.add( 'controls' );
        fragment.appendChild( controlsBlock );

        for ( var e = 0 ; e < schema.controls.length ; e++ ) {

            if ( schema.controls[ e ].type === 'toggleTheme' ) {

                this._themeToggleControl = document.createElement( 'SPAN' );
                this._themeToggleControl.innerHTML = this._svgThemeSystem;
                controlsBlock.appendChild( this._themeToggleControl );

                this._themeToggleControl.addEventListener( 'click', this.evt_click_toggleDarkMode.bind( this ) );

                this._preloadTheme();

            } else {

                var controlBlock = document.createElement( 'SPAN' );
                controlBlock.innerHTML = schema.controls[ e ].icon;
                controlsBlock.appendChild( controlBlock );

                if ( schema.controls[ e ].hasOwnProperty( 'title' ) ) {

                    controlBlock.setAttribute( 'title', schema.controls[ e ].title );

                }

                if ( schema.controls[ e ].hasOwnProperty( 'eventListeners' ) ) {

                    for ( var w = 0 ; w < schema.controls[ e ].eventListeners.length ; w++ ) {

                        controlBlock.addEventListener(
                            schema.controls[ e ].eventListeners[ w ].type,
                            schema.controls[ e ].eventListeners[ w ].listener
                        );

                    }

                }

                if ( schema.controls[ e ].hasOwnProperty( 'onClick' ) ) {

                    controlBlock.addEventListener( 'click', schema.controls[ e ].onClick );

                }

                if ( schema.controls[ e ].type === 'shrink' ) {

                    controlBlock.addEventListener( 'click', this.evt_click_toggleShrink.bind( this ) );
                    controlBlock.classList.add( 'shrinkControl' )

                }

            }

        }

    }

    if ( schema.hasOwnProperty( 'legends' ) ) {

        var legendsElem = document.createElement( 'DIV' );
        legendsElem.classList.add( 'legends' );
        fragment.appendChild( legendsElem );

        for ( var r = 0 ; r < schema.legends.length ; r++ ) {

            var legendElem = document.createElement( 'A' );
            legendElem.setAttribute( 'href', schema.legends[ r ].url );
            legendElem.setAttribute( 'target', '_blank' );
            legendElem.setAttribute( 'rel', 'noreferrer' );
            legendElem.textContent = schema.legends[ r ].text;
            legendsElem.appendChild( legendElem );

        }

    }

    this._navElem.appendChild( fragment );

    if ( schema.hasOwnProperty( 'mobile' ) ) {

        var fragmentMobile      = document.createDocumentFragment();

        if ( schema.mobile.hasOwnProperty( 'icon' ) ) {

            this._hamburgerIconSrc = schema.mobile.icon;

        }

        var mobileMenuBar = document.createElement( 'DIV' );
        mobileMenuBar.classList.add( 'mobileBar' );
        fragmentMobile.appendChild( mobileMenuBar );

        var menuShowButton = document.createElement( 'BUTTON' );
        
        for ( var e = 0 ; e < schema.mobile.classes.length ; e++ ) {

            menuShowButton.classList.add( schema.mobile.classes[ e ] );

        }

        mobileMenuBar.appendChild( menuShowButton );

        menuShowButton.addEventListener( 'click', this.evt_click_mobileButton.bind( this ) );

        var menuShowButtonSpan = document.createElement( 'SPAN' );
        menuShowButtonSpan.innerHTML = this._hamburgerIconSrc;
        menuShowButton.appendChild( menuShowButtonSpan );

        for ( var r = 0 ; r < schema.blocks.length ; r++ ) {

            if ( schema.blocks[ r ].hasOwnProperty( 'mobile' ) ) {

                var buttonElem = document.createElement( 'A' );
                buttonElem.setAttribute( 'href', schema.blocks[ r ].href );
                mobileMenuBar.appendChild( buttonElem );

                var spanElem = document.createElement( 'SPAN' );
                spanElem.innerHTML = schema.blocks[ r ].icon;
                buttonElem.appendChild( spanElem );

                var pElem = document.createElement( 'P' );
                pElem.innerHTML = schema.blocks[ r ].mobile;
                buttonElem.appendChild( pElem );

                if ( schema.blocks[ r ].hasOwnProperty( 'validLinks' ) && schema.blocks[ r ].validLinks.includes( window.location.pathname ) ) {

                    buttonElem.classList.add( 'active' );

                }

            }

        }

        document.body.appendChild( fragmentMobile );

    }

};




NavMenu.prototype.setHeaderLogo = function( imageUrl ) {

    this._logoImageElem.src = imageUrl;

};




NavMenu.prototype.setHeaderTitle = function( title ) {

    this._logoTitleElem.textContent = title;

};




NavMenu.prototype._preloadTheme = function() {

    var navmenu_theme = localStorage.getItem( 'navmenu_theme' );

    if ( navmenu_theme === null ) {

        return false;

    }

    if ( navmenu_theme === 'darkMode' ) {

        this._themeToggleControl.innerHTML = this._svgThemeDark;

    } else if ( navmenu_theme === 'lightMode' ) {

        this._themeToggleControl.innerHTML = this._svgThemeLight;

    }

};




NavMenu.prototype.evt_click_toggleShrink = function( evt ) {

    document.body.classList.toggle( 'shrinked' );

    localStorage.setItem( 'shrinked', document.body.classList.contains( 'shrinked' ) );

};




NavMenu.prototype.evt_click_mobileButton = function( evt ) {

    evt.preventDefault();

    this._clbk_toggleMobileNav();

};




NavMenu.prototype.evt_click_toggleDarkMode = function() {

    if ( document.body.classList.contains( 'darkMode' ) ) {

        document.body.classList.remove( 'lightMode' );
        document.body.classList.remove( 'darkMode' );
        document.body.classList.add( 'lightMode' );

        localStorage.setItem( 'navmenu_theme', 'lightMode' );

        if ( window.frames[ 0 ] ) {

            window.frames[ 0 ].document.body.classList.remove( 'lightMode' );
            window.frames[ 0 ].document.body.classList.remove( 'darkMode' );
            window.frames[ 0 ].document.body.classList.add( 'lightMode' );
    
        }

        this._themeToggleControl.innerHTML = this._svgThemeLight;

    } else if ( document.body.classList.contains( 'lightMode' ) ) {

        document.body.classList.remove( 'lightMode' );
        document.body.classList.remove( 'darkMode' );

        localStorage.removeItem( 'navmenu_theme' );

        if ( window.frames[ 0 ] ) {

            window.frames[ 0 ].document.body.classList.remove( 'lightMode' );
            window.frames[ 0 ].document.body.classList.remove( 'darkMode' );
    
        }

        this._themeToggleControl.innerHTML = this._svgThemeSystem;

    } else {

        document.body.classList.remove( 'lightMode' );
        document.body.classList.remove( 'darkMode' );
        document.body.classList.add( 'darkMode' );

        localStorage.setItem( 'navmenu_theme', 'darkMode' );

        if ( window.frames[ 0 ] ) {

            window.frames[ 0 ].document.body.classList.remove( 'lightMode' );
            window.frames[ 0 ].document.body.classList.remove( 'darkMode' );
            window.frames[ 0 ].document.body.classList.add( 'darkMode' );
    
        }

        this._themeToggleControl.innerHTML = this._svgThemeDark;

    }

    document.querySelector( 'nav' ).classList.remove( 'active' );

    this._clbk_toggleMobileNav();

}




NavMenu.prototype._clbk_toggleMobileNav = function() {

    if ( window.innerWidth > 1200 ) {

        return false;

    }

    this._navElem.classList.toggle( 'visible' );

    document.querySelector( '.mobileBar' ).classList.toggle( 'active' );

    if ( document.querySelector( '.mobileBar' ).classList.contains( 'active' ) ) {

        document.querySelector( '.mobileBar button span' ).innerHTML = this._mobileHideIconSrc;

    } else {

        document.querySelector( '.mobileBar button span' ).innerHTML = this._hamburgerIconSrc;

    }

};




var navmenu_theme = localStorage.getItem( 'navmenu_theme' );
var shrinkedState = localStorage.getItem( 'shrinked' );

window.addEventListener( 'DOMContentLoaded', function(){

    if ( navmenu_theme !== null ) {

        document.body.classList.add( navmenu_theme );
        
    }

    if ( shrinkedState === 'true' ) {

        this.document.body.classList.add( 'shrinked' );

    }

    setTimeout( function(){

        document.body.style.transition = 'background-color 0.15s ease 0s, padding-left 0.15s ease 0s';
    
    }, 1500 );

});
