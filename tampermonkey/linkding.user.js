// ==UserScript==
// @name         linkding
// @namespace    https://linkding.chrismartintx.com/
// @version      1.0.4
// @description  Automatically check unread and save
// @author       You
// @match        https://linkding.chrismartintx.com/bookmarks/new*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=demo.linkding.link
// @downloadURL  https://github.com/chrismartintx/chrismartintx.github.io/raw/master/tampermonkey/linkding.user.js
// @updateURL    https://github.com/chrismartintx/chrismartintx.github.io/raw/master/tampermonkey/linkding.user.js
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    window.onload = function() {
        setTimeout(function() {
        document.getElementById('id_unread').checked = true;
        }, 1000);
        setTimeout(function() {
        document.querySelector('form').submit();
        }, 5000);
    }

})();