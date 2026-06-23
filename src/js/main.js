const NavMenuIcons = {
    'mobileHide':  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><defs/><path d='M23 20.2L14.8 12 23 3.8 20.2 1 12 9.2 3.8 1 1 3.8 9.2 12 1 20.2 3.8 23l8.2-8.2 8.2 8.2z'/></svg>",
    'hamburger':   "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M24 6H0V2h24v4zm0 4H0v4h24v-4zm0 8H0v4h24v-4z'/></svg>",
    'themeSystem': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10V2zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z'/></svg>",
    'themeLight':  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M4.07 13H0v-2h4.07a8.05 8.05 0 0 0 0 2zM7.1 5.69 4.22 2.8 2.81 4.22 5.69 7.1c.41-.53.88-1 1.41-1.41zM18.31 7.1l2.88-2.88-1.41-1.41-2.88 2.88c.53.4 1 .88 1.41 1.41zM12 4c.34 0 .67.03 1 .07V0h-2v4.07c.33-.04.66-.07 1-.07zm0 16c-.34 0-.67-.03-1-.07V24h2v-4.07c-.33.04-.66.07-1 .07zm7.93-9a8.05 8.05 0 0 1 0 2H24v-2h-4.07zm-3.03 7.31 2.88 2.88 1.41-1.41-2.88-2.88c-.4.53-.88 1-1.41 1.41zM5.69 16.9 2.8 19.78l1.41 1.41 2.88-2.88c-.53-.41-1-.88-1.41-1.41zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z'/></svg>",
    'themeDark':   "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 11a4.51 4.51 0 0 1 3 3 4.52 4.52 0 0 1 3-3 4.52 4.52 0 0 1-3-3 4.5 4.5 0 0 1-3 3zm8 0c.96.3 1.7 1.04 2 2a3 3 0 0 1 2-2 3.01 3.01 0 0 1-2-2c-.3.96-1.04 1.7-2 2zm-1-9a4.51 4.51 0 0 1-3 3 4.52 4.52 0 0 1 3 3 4.51 4.51 0 0 1 3-3 4.52 4.52 0 0 1-3-3zm-7 22a12.01 12.01 0 0 1 0-24c1.9 0 3.63.5 5.37 1.18C14.42 1.68 8 4.45 8 12c0 7.45 5.92 10.2 9.37 10.82-1.5.85-3.48 1.18-5.37 1.18z'/></svg>"
};




/**
 * 
 * @param {Object}                   schema
 * @param {HTMLSourceElement}       [schema.headerHTML]
 * @param {Object}                  [schema.header]
 * @param {URL}                      schema.header.logo
 * @param {String}                   schema.header.title
 * @param {String}                  [schema.header.subtitle]
 * @param {Object[]}                [schema.blocks]
 * @param {'link'|'header'}          schema.blocks[].type
 * @param {String}                   schema.blocks[].text
 * @param {URL}                     [schema.blocks[].href]
 * @param {SVGElement}              [schema.blocks[].icon]
 * @param {Array}                   [schema.blocks[].classes]
 * @param {HTMLSourceElement}       [schema.blocks[].subtext]
 * @param {Array}                   [schema.blocks[].validLinks]
 * @param {Function}                [schema.blocks[].onClick]
 * @param {Object[]}                [schema.controls]
 * @param {SVGElement}               schema.controls[].icon
 * @param {'logout'|'toggleTheme'}   schema.controls[].type
 * @param {String}                  [schema.controls[].title]
 * @param {Function}                [schema.controls[].onClick]
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
    this._mobileHideIconSrc = NavMenuIcons[ 'mobileHide' ];

    /**
     * 
     * @private
     */
    this._hamburgerIconSrc = NavMenuIcons[ 'hamburger' ];

    /**
     * 
     * @private
     */
    this._svgThemeSystem = NavMenuIcons[ 'themeSystem' ];

    /**
     * 
     * @private
     */
    this._svgThemeLight = NavMenuIcons[ 'themeLight' ];

    /**
     * 
     * @private
     */
    this._svgThemeDark = NavMenuIcons[ 'themeDark' ];

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

    /**
     * @private
     */
    this._mobileBarElem = null;

    /**
     * @private
     */
    this._mobileBarIconElem = null;



    this._navElem = document.querySelector( 'nav' );

    this._render( schema );

};




NavMenu.prototype.setHeaderLogo = function( imageUrl ) {

    this._logoImageElem.src = imageUrl;

};

NavMenu.prototype.setHeaderTitle = function( title ) {

    this._logoTitleElem.textContent = title;

};




/**
 * Safely parses an HTML string into DOM nodes to prevent XSS.
 * @private
 * @param {String} htmlString 
 * @returns {DocumentFragment}
 */
NavMenu.prototype._parseHTML = function( htmlString ) {

    const parser    = new DOMParser();
    const doc       = parser.parseFromString( htmlString, 'text/html' );
    const fragment  = document.createDocumentFragment();
    
    while ( doc.body.firstChild ) {

        fragment.appendChild( doc.body.firstChild );

    }
    
    return fragment;

};

NavMenu.prototype._preloadTheme = function() {

    const navmenu_theme = localStorage.getItem( 'navmenu_theme' );

    if ( navmenu_theme === null ) {

        return false;

    }

    this._themeToggleControl.innerHTML = '';

    if ( navmenu_theme === 'darkMode' ) {

        this._themeToggleControl.appendChild( this._parseHTML( this._svgThemeDark ) );

    } else if ( navmenu_theme === 'lightMode' ) {

        this._themeToggleControl.appendChild( this._parseHTML( this._svgThemeLight ) );

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

    let newTheme = 'system';

    if ( document.body.classList.contains( 'darkMode' ) ) {

        document.body.classList.replace( 'darkMode', 'lightMode' );
        localStorage.setItem( 'navmenu_theme', 'lightMode' );
        newTheme = 'lightMode';

    } else if ( document.body.classList.contains( 'lightMode' ) ) {

        document.body.classList.remove( 'lightMode' );
        localStorage.removeItem( 'navmenu_theme' );
        newTheme = 'system';

    } else {

        document.body.classList.add( 'darkMode' );
        localStorage.setItem( 'navmenu_theme', 'darkMode' );
        newTheme = 'darkMode';

    }

    this._themeToggleControl.innerHTML = '';

    if ( newTheme === 'lightMode' ) {

        this._themeToggleControl.appendChild( this._parseHTML( this._svgThemeLight ) );

    } else if ( newTheme === 'darkMode' ) {

        this._themeToggleControl.appendChild( this._parseHTML( this._svgThemeDark ) );

    } else {

        this._themeToggleControl.appendChild( this._parseHTML( this._svgThemeSystem ) );

    }

    const themeChangeEvent = new CustomEvent( 'navMenu:themeToggled', {
        detail: {
            theme: newTheme
        }
    });

    window.dispatchEvent( themeChangeEvent );

    this._navElem.classList.remove( 'active' );

    this._clbk_toggleMobileNav();

}

NavMenu.prototype._clbk_toggleMobileNav = function() {

    if ( window.innerWidth > 1200 ) {

        return false;

    }

    this._navElem.classList.toggle( 'visible' );

    // Check if the mobile bar was created before trying to manipulate it
    if ( this._mobileBarElem !== null ) {
        
        this._mobileBarElem.classList.toggle( 'active' );

        this._mobileBarIconElem.innerHTML = '';

        if ( this._mobileBarElem.classList.contains( 'active' ) ) {

            this._mobileBarIconElem.appendChild( this._parseHTML( this._mobileHideIconSrc ) );

        } else {

            this._mobileBarIconElem.appendChild( this._parseHTML( this._hamburgerIconSrc ) );

        }

    }

};

NavMenu.prototype._render = function( schema ) {

    const fragment = document.createDocumentFragment();

    if ( schema.headerHTML ) {

        this._navElem.appendChild( this._parseHTML( schema.headerHTML ) );

    }

    if ( schema.header ) {

        this._renderHeader( schema.header, fragment );

    }

    if ( schema.blocks ) {

        this._renderBlocks( schema.blocks, fragment );

    }

    if ( schema.controls ) {

        this._renderControls( schema.controls, fragment );

    }

    if ( schema.legends ) {

        this._renderLegends( schema.legends, fragment );

    }

    this._navElem.appendChild( fragment );

    if ( schema.mobile ) {

        this._renderMobile( schema );

    }

};

/**
 * @method
 * @private
 * @param {Object} header
 * @param {String} header.logo
 * @param {String} header.title
 * @param {String} [header.subtitle]
 * @param {DocumentFragment} fragment
 * @returns {void}
 */
NavMenu.prototype._renderHeader = function( header, fragment ) {

    const headerElem = document.createElement( 'A' );
    headerElem.setAttribute( 'href', '/' );
    headerElem.classList.add( 'unitLogo' );
    fragment.appendChild( headerElem );

    this._logoImageElem = document.createElement( 'IMG' );
    this._logoImageElem.src = header.logo;
    headerElem.appendChild( this._logoImageElem );

    const logoTextBlockElem = document.createElement( 'DIV' );
    logoTextBlockElem.classList.add( 'block' );
    headerElem.appendChild( logoTextBlockElem );

    this._logoTitleElem = document.createElement( 'H1' );
    this._logoTitleElem.textContent = header.title;
    logoTextBlockElem.appendChild( this._logoTitleElem );

    if ( header.subtitle ) {

        const logoSubtitleElem = document.createElement( 'H2' );
        logoSubtitleElem.textContent = header.subtitle;
        logoTextBlockElem.appendChild( logoSubtitleElem );

    }

};

/**
 * @method
 * @private
 * @param {Object[]} blocks
 * @param {'link'|'header'} blocks[].type
 * @param {HTMLSourceElement} blocks[].icon
 * @param {String} blocks[].text
 * @param {String} [blocks[].href]
 * @param {String} [blocks[].title]
 * @param {HTMLSourceElement} [blocks[].subtext]
 * @param {CallableFunction} [blocks[].onClick]
 * @param {Boolean} [blocks[].trailingHr]
 * @param {String[]} [blocks[].classes]
 * @param {String[]} [blocks[].validLinks]
 * @param {DocumentFragment} fragment
 */
NavMenu.prototype._renderBlocks = function( blocks, fragment ) {

    const mainMenu = document.createElement( 'DIV' );
    mainMenu.classList.add( 'mainMenu' );
    fragment.appendChild( mainMenu );

    for ( let i = 0 ; i < blocks.length ; i++ ) {

        const block = blocks[ i ];

        if ( block.type === 'link' ) {

            const blockElem = document.createElement( 'A' );

            if ( block.href ) {

                blockElem.setAttribute( 'href', block.href );
                blockElem.setAttribute( 'title', block.text );
                mainMenu.appendChild( blockElem );

            }

            if ( block.classes ) {
                
                for ( const classStr of block.classes ) {

                    blockElem.classList.add( classStr );

                }

            }

            const blockTextElem = document.createElement( 'DIV' );
            blockTextElem.classList.add( 'text' );
            blockElem.appendChild( blockTextElem );

            const blockSpanElem = document.createElement( 'SPAN' );
            blockSpanElem.classList.add( 'icon' );
            blockSpanElem.appendChild( this._parseHTML( block.icon ) );
            blockTextElem.appendChild( blockSpanElem );

            const blockPElem = document.createElement( 'P' );
            blockPElem.textContent = block.text;
            blockTextElem.appendChild( blockPElem );

            if ( block.subtext ) {

                const blockSubtextElem = document.createElement( 'SAMP' );
                blockSubtextElem.appendChild( this._parseHTML( block.subtext ) );
                blockElem.appendChild( blockSubtextElem );

            }

            if ( block.validLinks && block.validLinks.includes( window.location.pathname ) ) {

                blockElem.classList.add( 'active' );

            }

            if ( block.onClick ) {

                blockElem.addEventListener( 'click', block.onClick );

            }

            if ( i < blocks.length - 1 ) {

                if ( block.trailingHr && block.trailingHr === true ) {

                    const hr = document.createElement( 'HR' );
                    mainMenu.appendChild( hr );

                }

            }

        } else if ( block.type === 'header' ) {

            const headerElem = document.createElement( 'P' );
            headerElem.textContent = block.text
            headerElem.classList.add( 'header' );
            mainMenu.appendChild( headerElem );

            if ( block.classes ) {

                for ( const classStr of block.classes ) {

                    headerElem.classList.add( classStr );

                }

            }

        }

    }

};

/**
 * @method
 * @private
 * @param {Object[]} controls
 * @param {'toggleTheme'|'shrink'|String} controls[].type
 * @param {SVGElement} [controls[].icon]
 * @param {CallableFunction} [contols[].onClick]
 * @param {String} [controls[].title]
 * @param {DocumentFragment} fragment
 * @returns {void}
 */
NavMenu.prototype._renderControls = function( controls, fragment ) {

    const controlsBlock = document.createElement( 'DIV' );
    controlsBlock.classList.add( 'controls' );
    fragment.appendChild( controlsBlock );

    for ( const controlObj of controls ) {

        if ( controlObj.type === 'toggleTheme' ) {

            this._themeToggleControl = document.createElement( 'SPAN' );
            this._themeToggleControl.appendChild( this._parseHTML( this._svgThemeSystem ) );
            controlsBlock.appendChild( this._themeToggleControl );

            this._themeToggleControl.addEventListener( 'click', this.evt_click_toggleDarkMode.bind( this ) );

            this._preloadTheme();

        } else {

            const controlBlock = document.createElement( 'SPAN' );
            controlBlock.appendChild( this._parseHTML( controlObj.icon ) ); // Secured
            controlsBlock.appendChild( controlBlock );

            if ( controlObj.title ) {

                controlBlock.setAttribute( 'title', controlObj.title );

            }

            if ( controlObj.onClick ) {

                controlBlock.addEventListener( 'click', controlObj.onClick );

            }

            if ( controlObj.type === 'shrink' ) {

                controlBlock.addEventListener( 'click', this.evt_click_toggleShrink.bind( this ) );
                controlBlock.classList.add( 'shrinkControl' )

            }

        }

    }

};

/**
 * @method
 * @private
 * @param {Object[]} legends
 * @param {String} legends[].url
 * @param {String} legends[].text
 * @param {DocumentFragment} fragment
 * @returns {void}
 */
NavMenu.prototype._renderLegends = function( legends, fragment ) {

    const legendsElem = document.createElement( 'DIV' );
    legendsElem.classList.add( 'legends' );
    fragment.appendChild( legendsElem );

    for ( const legendObj of legends ) {

        const legendElem = document.createElement( 'A' );
        legendElem.setAttribute( 'href', legendObj.url );
        legendElem.setAttribute( 'target', '_blank' );
        legendElem.setAttribute( 'rel', 'noreferrer' );
        legendElem.textContent = legendObj.text;
        legendsElem.appendChild( legendElem );

    }

};

/**
 * @method
 * @private
 * @param {Object} schema
 * @returns {void}
 */
NavMenu.prototype._renderMobile = function( schema ) {

    const fragmentMobile = document.createDocumentFragment();

    if ( schema.mobile.icon ) {

        this._hamburgerIconSrc = schema.mobile.icon;

    }

    this._mobileBarElem = document.createElement( 'DIV' );
    this._mobileBarElem.classList.add( 'mobileBar' );
    fragmentMobile.appendChild( this._mobileBarElem );

    const menuShowButton = document.createElement( 'BUTTON' );
    
    for ( const mobileClass of schema.mobile.classes ) {

        menuShowButton.classList.add( mobileClass );

    }

    this._mobileBarElem.appendChild( menuShowButton );

    menuShowButton.addEventListener( 'click', this.evt_click_mobileButton.bind( this ) );

    this._mobileBarIconElem = document.createElement( 'SPAN' );
    this._mobileBarIconElem.appendChild( this._parseHTML( this._hamburgerIconSrc ) ); // Secured
    menuShowButton.appendChild( this._mobileBarIconElem );

    for ( const block of schema.blocks ) {

        if ( block.mobile ) {

            const buttonElem = document.createElement( 'A' );
            buttonElem.setAttribute( 'href', block.href );
            this._mobileBarElem.appendChild( buttonElem );

            const spanElem = document.createElement( 'SPAN' );
            spanElem.appendChild( this._parseHTML( block.icon ) ); // Secured
            buttonElem.appendChild( spanElem );

            const pElem = document.createElement( 'P' );
            pElem.appendChild( this._parseHTML( block.mobile ) ); // Secured
            buttonElem.appendChild( pElem );

            if ( block.validLinks && block.validLinks.includes( window.location.pathname ) ) {

                buttonElem.classList.add( 'active' );

            }

        }

    }

    document.body.appendChild( fragmentMobile );

};




const navmenu_theme = localStorage.getItem( 'navmenu_theme' );
const shrinkedState = localStorage.getItem( 'shrinked' );

window.addEventListener( 'DOMContentLoaded', function(){

    if ( navmenu_theme !== null ) {

        document.body.classList.add( navmenu_theme );
        
    }

    if ( shrinkedState === 'true' ) {

        document.body.classList.add( 'shrinked' );

    }

    setTimeout( function(){

        document.body.style.transition = 'background-color 0.15s ease 0s, padding-left 0.15s ease 0s';
    
    }, 1500 );

});

window.addEventListener( 'navMenu:themeToggled', function( event ) {

    const newTheme = event.detail.theme;

    document.body.classList.remove( 'lightMode', 'darkMode' );

    if ( newTheme !== 'system' ) {
        
        document.body.classList.add( newTheme );

    }

    if ( window.frames.length > 0 ) {

        for ( let f = 0; f < window.frames.length; f++ ) {

            try {

                const iframe = window.frames[ f ];

                if ( iframe.document ) {
            
                    const frameBody = iframe.document.body;
                    
                    frameBody.classList.remove( 'lightMode', 'darkMode' );
                    
                    if ( newTheme !== 'system' ) {

                        frameBody.classList.add( newTheme );

                    }

                }

            } catch( err ) {

                // The iframe is cross-origin. The browser blocked access.
                // We quietly swallow the error and continue.

            }

        }

    }

});