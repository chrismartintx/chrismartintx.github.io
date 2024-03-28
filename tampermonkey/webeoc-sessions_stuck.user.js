// ==UserScript==
// @name         WebEOC - Sessions (Stuck)
// @namespace    https://webeoc.nationalemr.us/eoc7/
// @version      1.0.5
// @description  Sort by postion and kill any stuck sessions, exluding "SubscriptionBoard User"
// @author       Chris Martin
// @match        https://webeoc.nationalemr.us/eoc7/admin/sessions/list.aspx
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nationalemr.us
// @downloadURL  https://github.com/chrismartintx/chrismartintx.github.io/raw/master/tampermonkey/webeoc-sessions_stuck.user.js
// @updateURL    https://github.com/chrismartintx/chrismartintx.github.io/raw/master/tampermonkey/webeoc-sessions_stuck.user.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

(function () {
    'use strict';

    var incidentLink = document.querySelector("a[href*='p.name']");
    var sort;
    if (incidentLink.parentElement.classList.contains('sorting_asc')) {
        console.log('Incident link is sorted in ascending order');
        sort = true;
    } else if (incidentLink.parentElement.classList.contains('sorting_desc')) {
        console.log('Incident link is sorted in descending order');
        sort = false;
    } else {
        console.log('Incident link is not sorted');
        sort = false;
    }

    if (sort === false) {
        incidentLink.click();
        console.log('Clicked on the incident link');
    }

    // if the second column is empty and the first column does not contain "SubscriptionBoard User", then click icon to kill the session
    var firstColumn = document.querySelector("td:nth-child(1)");
    console.log(firstColumn);
    var secondColumn = document.querySelector("td:nth-child(2)");
    console.log(secondColumn);
    if (secondColumn.textContent === '' && firstColumn.textContent.indexOf('SubscriptionBoard User') === -1) {
        var deleteIcon = document.querySelector("td:nth-child(2) .fa-trash");
        console.log(deleteIcon);
        deleteIcon.click();
        console.log('Clicked on the delete icon');
    } else {
        console.log('Second column is not empty or first column contains SubscriptionBoard User');
    }

    console.log('Tampermonkey - End of script');

})();