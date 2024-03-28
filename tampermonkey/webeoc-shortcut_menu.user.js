// ==UserScript==
// @name         WebEOC - Shortcut Menu
// @namespace    https://webeoc.nationalemr.us/eoc7/
// @version      1.0.4
// @description  Administrator shortcut menu
// @author       Chris Martin
// @match        https://webeoc.nationalemr.us/eoc7/boards/boarddata.ashx?command=DATA*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nationalemr.us
// @downloadURL  https://github.com/chrismartintx/chrismartintx.github.io/raw/master/tampermonkey/webeoc-shortcut_menu.user.js
// @updateURL    https://github.com/chrismartintx/chrismartintx.github.io/raw/master/tampermonkey/webeoc-shortcut_menu.user.js
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==
(function () {
    'use strict';
    let dts = new Date().toLocaleString('en-US', {
        timeZone: 'America/Chicago', hour12: false,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).replace(/,/g, "");
    const htmlContent = document.querySelector('html').innerHTML;
    const boardNameMatch = htmlContent.match(/Board: (.*?)\n/);
    const viewNameMatch = htmlContent.match(/View: (.*?)\n/);
    const tableNameMatch = htmlContent.match(/Table: (.*?)-->/);
    const boardName = boardNameMatch ? boardNameMatch[1] : null;
    const viewName = viewNameMatch ? viewNameMatch[1] : null;
    const tableName = tableNameMatch ? tableNameMatch[1].replace("-->", "") : null;
    let concatNames = `${boardName} | ${viewName} | ${tableName}`;
    function consoleDocTitle() {
        let consoleStyle = "color: #000000; background-color: #7FFF00; font-size: 20px; font-weight: bold;";
        console.info(`%c    ${dts} | BOARD: ${boardName} | VIEW: ${viewName} | TABLE: ${tableName}    `, consoleStyle);
    }
    consoleDocTitle();
    let url = window.location.href;
    let xmlURL = url.replace("command=DATA", "command=XML");
    let xslURL = url.replace("command=DATA", "command=XSL");
    let showAll = function () {
        let hiddenElements = document.querySelectorAll(".hidden, .d-none, .d-hide, .cisAdmin, .hiddencontent");
        hiddenElements.forEach((element) => {
            element.classList.remove("hidden", "d-none", "d-hide", "cisAdmin", "hiddencontent");
        }
        );
    }
    function changePositionCis() {
        let posField = parent.parent.document.getElementById('hfSelectPosition');
        posField.value = '4874';
        parent.parent.form1.submit();
    }
    function changePositionSandbox() {
        let posField = parent.parent.document.getElementById('hfSelectPosition');
        posField.value = '4081';
        parent.parent.form1.submit();
    }
    function changeIncidentDailyOps() {
        let incField = parent.parent.document.getElementById('hfSelectIncident');
        incField.value = '25';
        parent.parent.form1.submit();
    }
    function changeIncidentTestInc() {
        let incField = parent.parent.document.getElementById('hfSelectIncident');
        incField.value = '12.3';
        parent.parent.form1.submit();
    }
    function closeAllTabs() {
        let closeAllTabs = parent.parent.document.querySelector('[data-bind="click: closeAllTabs, text: closeAllTabsCaption()"]');
        closeAllTabs.click();
    }
    function disableAutoRefresh() {
        parent.pageBoard.SetManualRefreshOnly(true);
    }
    function enableAutoRefresh() {
        parent.pageBoard.SetManualRefreshOnly(false);
    }
    function returnLink() {
        parent.pageBoard.BoardMgr.ReturnView();
    }
    function reloadBoard() {
        document.location.reload();
    }
    let dropdown = document.createElement("select");
    dropdown.style = "position: fixed; top: 5px; right: 5px; z-index: 9999; width: 10px; height: 10px; font-size: 10px; background-color: #7FFF00; border: 1px solid #d3d3d3; box-shadow: 0 .5rem 1rem #696969 !important; padding: 10px !important;"
    dropdown.classList.add("form-control");
    let actions = {
        [concatNames]: consoleDocTitle,
        "Board - Pop Out": url,
        "Board - XML": xmlURL,
        "Board - XSL": xslURL,
        "BoardMgr - Return Link": returnLink,
        "BoardScript - Disable Refresh": BoardScript.Refreshing.Disable,
        "BoardScript - Enable Refresh": BoardScript.Refreshing.Enable,
        "BoardScript - Refresh": BoardScript.Refreshing.Refresh,
        "CSS - Show Hidden Classes": showAll,
        "DOM - Reload Board": reloadBoard,
        "Incident - Daily Ops": changeIncidentDailyOps,
        "Incident - Test Incident": changeIncidentTestInc,
        "Knockout - Close All Tabs": closeAllTabs,
        "pageBoard - Disable Auto Refresh": disableAutoRefresh,
        "pageBoard - Enable Auto Refresh": enableAutoRefresh,
        "Position - CIS": changePositionCis,
        "Position - Sandbox": changePositionSandbox
    };
    Object.keys(actions).forEach((option) => {
        let opt = document.createElement("option");
        opt.value = option;
        opt.innerHTML = option;
        dropdown.appendChild(opt);
    });
    dropdown.onchange = function () {
        let action = actions[this.value];
        if (typeof action === "string") {
            window.open(action, "_blank");
        } else {
            action();
        }
    };
    document.body.appendChild(dropdown);
})();
