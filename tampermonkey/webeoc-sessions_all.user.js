// ==UserScript==
// @name         WebEOC - Sessions (All)
// @namespace    https://webeoc.nationalemr.us/eoc7/
// @version      1.0.5
// @description  Auto-kill all WebEOC sessions.  Should be used in conjuction with a search term.
// @author       You
// @match        https://webeoc.nationalemr.us/eoc7/admin/sessions/list.aspx
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nationalemr.us
// @downloadURL  https://github.com/chrismartintx/chrismartintx.github.io/raw/master/tampermonkey/webeoc-sessions_all.user.js
// @updateURL    https://github.com/chrismartintx/chrismartintx.github.io/raw/master/tampermonkey/webeoc-sessions_all.user.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==


(function() {
    const deleteButtonId = 'ctl00_ctl00_formBody_parentBody_sgvf_ctl08_grdSessionList_ctl02_lnkDelete';
    const deleteButton = document.getElementById(deleteButtonId);
    if (deleteButton) {
        deleteButton.removeAttribute('onclick');
        setTimeout(() => deleteButton.click(), 1000);
    }
})();
