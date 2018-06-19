'use strict';

(function () {

    //----- EXTERNAL HELP -----

    //----- POLYFILL -----
    //Permet d'ajouter les méthodes de Array de ES6
    // Production steps of ECMA-262, Edition 5, 15.4.4.18
    // Reference: http://es5.github.io/#x15.4.4.18
    if (typeof Array.prototype.forEach != 'function') {

        Array.prototype.forEach = function (callback /*, thisArg*/) {

            var T, k;

            if (this == null) {
                throw new TypeError('this is null or not defined');
            }

            // 1. Let O be the result of calling toObject() passing the
            // |this| value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get() internal
            // method of O with the argument "length".
            // 3. Let len be toUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If isCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            // 5. If thisArg was supplied, let T be thisArg; else let
            // T be undefined.
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // 6. Let k be 0.
            k = 0;

            // 7. Repeat while k < len.
            while (k < len) {

                var kValue;

                // a. Let Pk be ToString(k).
                //    This is implicit for LHS operands of the in operator.
                // b. Let kPresent be the result of calling the HasProperty
                //    internal method of O with argument Pk.
                //    This step can be combined with c.
                // c. If kPresent is true, then
                if (k in O) {

                    // i. Let kValue be the result of calling the Get internal
                    // method of O with argument Pk.
                    kValue = O[k];

                    // ii. Call the Call internal method of callback with T as
                    // the this value and argument list containing kValue, k, and O.
                    callback.call(T, kValue, k, O);
                }
                // d. Increase k by 1.
                k++;
            }
            // 8. return undefined.
        };
    }

    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }
    //SVG use compatibility with IE10 et 11
    /*!
     * @copyright Copyright (c) 2017 IcoMoon.io
     * @license   Licensed under MIT license
     *            See https://github.com/Keyamoon/svgxuse
     * @version   1.2.4
     */
    (function () {
        if ("undefined" !== typeof window && window.addEventListener) {
            var e = Object.create(null),
                n,
                t,
                d = function d() {
                clearTimeout(t);t = setTimeout(n, 100);
            },
                q = function q() {},
                u = function u() {
                var f;window.addEventListener("resize", d, !1);window.addEventListener("orientationchange", d, !1);window.MutationObserver ? (f = new MutationObserver(d), f.observe(document.documentElement, { childList: !0, subtree: !0, attributes: !0 }), q = function q() {
                    try {
                        f.disconnect(), window.removeEventListener("resize", d, !1), window.removeEventListener("orientationchange", d, !1);
                    } catch (w) {}
                }) : (document.documentElement.addEventListener("DOMSubtreeModified", d, !1), q = function q() {
                    document.documentElement.removeEventListener("DOMSubtreeModified", d, !1);window.removeEventListener("resize", d, !1);window.removeEventListener("orientationchange", d, !1);
                });
            },
                v = function v(f) {
                function e(a) {
                    var c;void 0 !== a.protocol ? c = a : (c = document.createElement("a"), c.href = a);return c.protocol.replace(/:/g, "") + c.host;
                }var d, p;window.XMLHttpRequest && (d = new XMLHttpRequest(), p = e(location), f = e(f), d = void 0 === d.withCredentials && "" !== f && f !== p ? XDomainRequest || void 0 : XMLHttpRequest);return d;
            };n = function n() {
                function d() {
                    --r;0 === r && (q(), u());
                }function l(a) {
                    return function () {
                        !0 !== e[a.base] && (a.isXlink ? a.useEl.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + a.hash) : a.useEl.setAttribute("href", "#" + a.hash));
                    };
                }function n(a) {
                    return function () {
                        var c = document.body,
                            b = document.createElement("x");a.onload = null;b.innerHTML = a.responseText;if (b = b.getElementsByTagName("svg")[0]) b.setAttribute("aria-hidden", "true"), b.style.position = "absolute", b.style.width = 0, b.style.height = 0, b.style.overflow = "hidden", c.insertBefore(b, c.firstChild);d();
                    };
                }function p(a) {
                    return function () {
                        a.onerror = null;a.ontimeout = null;d();
                    };
                }var a,
                    c,
                    m,
                    g,
                    r = 0,
                    b,
                    k = !1,
                    h;q();h = document.getElementsByTagName("use");for (g = 0; g < h.length; g += 1) {
                    try {
                        c = h[g].getBoundingClientRect();
                    } catch (x) {
                        c = !1;
                    }(a = h[g].getAttribute("href")) ? k = !1 : (a = h[g].getAttributeNS("http://www.w3.org/1999/xlink", "href"), k = !0);m = a && a.split ? a.split("#") : ["", ""];a = m[0];m = m[1];b = c && 0 === c.left && 0 === c.right && 0 === c.top && 0 === c.bottom;c && 0 === c.width && 0 === c.height && !b ? a.length && (b = e[a], !0 !== b && setTimeout(l({ useEl: h[g], base: a, hash: m, isXlink: k }), 0), void 0 === b && (k = v(a), void 0 !== k && (b = new k(), e[a] = b, b.onload = n(b), b.onerror = p(b), b.ontimeout = p(b), b.open("GET", a), b.send(), r += 1))) : b ? a.length && e[a] && setTimeout(l({ useEl: h[g], base: a, hash: m, isXlink: k }), 0) : void 0 === e[a] ? e[a] = !0 : e[a].onload && (e[a].abort(), delete e[a].onload, e[a] = !0);
                }h = "";r += 1;d();
            };var _l;_l = function l() {
                window.removeEventListener("load", _l, !1);t = setTimeout(n, 0);
            };
            "complete" !== document.readyState ? window.addEventListener("load", _l, !1) : _l();
        }
    })();

    //----- FUNCTIONS -----
    var cleanClass = function cleanClass(target, className) {
        if (target.classList.contains(className)) {
            target.classList.remove(className);
        }
    };

    var navController = function navController() {
        document.querySelector('.nav').classList.toggle('triggered');
        document.querySelector('.nav-full').classList.toggle('triggered');
        document.querySelector('body').classList.toggle('no-scroll');
        if (flagBurger) {
            document.querySelector('#top-anim').beginElement();
            document.querySelector('#middle-anim').beginElement();
            document.querySelector('#bottom-anim').beginElement();
        } else {
            document.querySelector('#top-base').beginElement();
            document.querySelector('#middle-base').beginElement();
            document.querySelector('#bottom-base').beginElement();
        }
        flagBurger = !flagBurger;
    };

    var sliderController = function sliderController(target) {
        var yPos = slider[target].offsetTop + slider[target].clientTop;
        console.log(yPos);
        window.scroll({
            top: yPos,
            left: 0,
            behavior: 'smooth'
        });
        btnSlider.forEach(function (btn) {
            cleanClass(btn, 'triggered');
        });
        btnSlider[target].classList.add('triggered');
    };

    //----- INIT -----
    var flagBurger = true,
        slider = document.querySelectorAll('.section-slider'),
        btnSlider = document.querySelectorAll('.btn-slider'),
        lastScrollPos = 0,
        flagWheel = false;

    document.addEventListener("wheel", function (e) {
        if (window.innerWidth >= 1000) {
            if (flagWheel) {
                return;
            }
            var delta = void 0,
                target = parseInt(document.querySelector('.btn-slider.triggered').getAttribute('data-target'));
            if (e.wheelDelta) {
                delta = e.wheelDelta;
            } else {
                delta = -1 * e.deltaY;
            }

            if (delta < 0 && target + 1 < btnSlider.length) {
                sliderController(target + 1);
            } else if (delta > 0 && target - 1 >= 0) {
                sliderController(target - 1);
            }
            flagWheel = true;
            setTimeout(function () {
                flagWheel = false;
            }, 500);
        }
    });

    document.addEventListener('click', function (e) {
        var el = e.target;

        //Menu navigation
        if (el.classList.contains('burger')) {
            navController();
        };

        if (el.classList.contains('btn-slider')) {
            sliderController(el.getAttribute('data-target'));
        };
    });
})();
//# sourceMappingURL=main.js.map
