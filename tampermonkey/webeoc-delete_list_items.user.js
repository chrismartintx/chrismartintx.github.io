// ==UserScript==
// @name         WebEOC - Delete List Items
// @namespace    https://webeoc.nationalemr.us/eoc7/
// @version      1.0.2
// @description  Delete all WebEOC list items.  Must define listid at time of use to prevent accidental trigger.
// @author       Chris Martin
// @match        https://webeoc.nationalemr.us/eoc7/admin/lists/detail.aspx?listid=99999999
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nationalemr.us
// @downloadURL  https://tampermonkey.chrismartintx.com/webeoc-delete_list_items.user.js
// @updateURL    https://tampermonkey.chrismartintx.com/webeoc-delete_list_items.user.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==


(function() {
    const deleteButtonId = 'ctl00_ctl00_formBody_parentBody_sgvf_ctl08_grdListItems_ctl02_lnkDelete';
    const deleteButton = document.getElementById(deleteButtonId);
    if (deleteButton) {
        deleteButton.removeAttribute('onclick');
        setTimeout(() => deleteButton.click(), 250);
    }
})();