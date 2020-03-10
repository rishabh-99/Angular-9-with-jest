'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">test-jest documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-b52c6c0315d24ca9c9c69592b85ebace"' : 'data-target="#xs-components-links-module-AdminModule-b52c6c0315d24ca9c9c69592b85ebace"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-b52c6c0315d24ca9c9c69592b85ebace"' :
                                            'id="xs-components-links-module-AdminModule-b52c6c0315d24ca9c9c69592b85ebace"' }>
                                            <li class="link">
                                                <a href="components/AdminOrdersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminOrdersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminProductsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminProductsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderDescriptionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderDescriptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-cd6bcf86a9277b1ceb7da43bf60e7b9b"' : 'data-target="#xs-components-links-module-AppModule-cd6bcf86a9277b1ceb7da43bf60e7b9b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-cd6bcf86a9277b1ceb7da43bf60e7b9b"' :
                                            'id="xs-components-links-module-AppModule-cd6bcf86a9277b1ceb7da43bf60e7b9b"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoreModule-232344cd918b04797be3aabc32abc2c3"' : 'data-target="#xs-components-links-module-CoreModule-232344cd918b04797be3aabc32abc2c3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-232344cd918b04797be3aabc32abc2c3"' :
                                            'id="xs-components-links-module-CoreModule-232344cd918b04797be3aabc32abc2c3"' }>
                                            <li class="link">
                                                <a href="components/BsNavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsNavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-484b08634fe1ee162fe9cfa472f445fc"' : 'data-target="#xs-components-links-module-SharedModule-484b08634fe1ee162fe9cfa472f445fc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-484b08634fe1ee162fe9cfa472f445fc"' :
                                            'id="xs-components-links-module-SharedModule-484b08634fe1ee162fe9cfa472f445fc"' }>
                                            <li class="link">
                                                <a href="components/ProductCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductDescriptionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductDescriptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductQuantityComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductQuantityComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharedModule-484b08634fe1ee162fe9cfa472f445fc"' : 'data-target="#xs-injectables-links-module-SharedModule-484b08634fe1ee162fe9cfa472f445fc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-484b08634fe1ee162fe9cfa472f445fc"' :
                                        'id="xs-injectables-links-module-SharedModule-484b08634fe1ee162fe9cfa472f445fc"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BrandService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BrandService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OrderDescriptionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>OrderDescriptionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OrderService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>OrderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProductService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ShoppingCartService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ShoppingCartService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ShoppingModule.html" data-type="entity-link">ShoppingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ShoppingModule-3a82b2800433c97588333d02020223db"' : 'data-target="#xs-components-links-module-ShoppingModule-3a82b2800433c97588333d02020223db"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ShoppingModule-3a82b2800433c97588333d02020223db"' :
                                            'id="xs-components-links-module-ShoppingModule-3a82b2800433c97588333d02020223db"' }>
                                            <li class="link">
                                                <a href="components/CheckOutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CheckOutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyOrdersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyOrdersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderSuccessComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderSuccessComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductFilterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductFilterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShippingFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShippingFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShoppingCartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShoppingCartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShoppingCartSummaryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShoppingCartSummaryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link">Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link">Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShoppingCart.html" data-type="entity-link">ShoppingCart</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShoppingCartItem.html" data-type="entity-link">ShoppingCartItem</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/OrderDescriptionService.html" data-type="entity-link">OrderDescriptionService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminAuthGuard.html" data-type="entity-link">AdminAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppUser.html" data-type="entity-link">AppUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});