// ==UserScript==
// @name         WebEOC - Shortcut Menu (OLD)
// @namespace    http://tampermonkey.net/
// @version      2024-03-26
// @description  Administrator shortcut menu
// @author       Chris Martin
// @match        https://webeoc.nationalemr.us/eoc7/boards/boarddata.ashx?command=DATA*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nationalemr.us
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==
(function () {
    'use strict';
    var dts = new Date().toLocaleString();
    var docTitle = document.title;
    console.debug(docTitle + ' - ' + dts)
    let url = window.location.href;
    let xmlURL = url.replace("command=DATA", "command=XML");
    let xslURL = url.replace("command=DATA", "command=XSL");
    // var positionMenu = parent.parent.document.getElementById('role-switcher');
    // var positionSelect = positionMenu.querySelector('span:nth-child(1)');
    // var position = positionSelect.innerText;
    // var incidentMenu = parent.parent.document.getElementById('incident-switcher');
    // var incidentSelect = incidentMenu.querySelector('span:nth-child(1)');
    // var incident = incidentSelect.innerText;


    let showAll = function () {
        let hiddenElements = document.querySelectorAll(".hidden, .d-none, .d-hide, .cisAdmin, .hiddencontent");
        hiddenElements.forEach((element) => {
            element.classList.remove("hidden", "d-none", "d-hide", "cisAdmin", "hiddencontent");
        }
        );
    }

    // function jumpToCIS() {
    //         if (position !== 'CIS') {
    //             positionMenu.click();
    //             var positionList = parent.parent.document.querySelectorAll('[data-bind="foreach: positions"] li');
    //             console.debug('positionList', positionList)
    //             positionList.forEach(function (li) {
    //                 if (li.innerText === 'CIS') {
    //                     console.debug('clicking')
    //                     li.querySelector('a:nth-child(1)').click();
    //                 }
    //             });
    //         }
    // };

    function jumpToCIS() {
        let posField = parent.parent.document.getElementById('hfSelectPosition');
        posField.value = '4874';
        parent.parent.form1.submit();
    }
    // function jumpToSanbox() {
    //         if (position !== 'SANDBOX POSITION CHRIS') {
    //             positionMenu.click();
    //             var positionList = parent.parent.document.querySelectorAll('[data-bind="foreach: positions"] li');
    //             console.debug('positionList', positionList)
    //             positionList.forEach(function (li) {
    //                 if (li.innerText === 'SANDBOX POSITION CHRIS') {
    //                     console.debug('clicking')
    //                     li.querySelector('a:nth-child(1)').click();
    //                 }
    //             });
    //         }
    // };

    function jumpToSanbox() {
        let posField = parent.parent.document.getElementById('hfSelectPosition');
        posField.value = '4081';
        parent.parent.form1.submit();
    }

    // function jumpToDailyOpsIncident() {
    //         if (incident !== 'Daily Ops') {
    //             incidentMenu.click();
    //             var incidentList = parent.parent.document.querySelectorAll('[data-bind="foreach: incidents"] li');
    //             console.debug('incidentList', incidentList)
    //             incidentList.forEach(function (li) {
    //                 if (li.innerText === 'Daily Ops') {
    //                     console.debug('clicking')
    //                     li.querySelector('a:nth-child(1)').click();
    //                 }
    //             });
    //         }
    // }

    function jumpToDailyOpsIncident() {
        let incField = parent.parent.document.getElementById('hfSelectIncident');
        incField.value = '25';
        parent.parent.form1.submit();
    }

    //     function jumpToTestIncident() {
    //         if (incident !== '---test incident 2') {
    //             incidentMenu.click();
    //             var incidentList = parent.parent.document.querySelectorAll('[data-bind="foreach: incidents"] li');
    //             console.debug('incidentList', incidentList)
    //             incidentList.forEach(function (li) {
    //                 if (li.innerText === '---test incident 2') {
    //                     console.debug('clicking')
    //                     li.querySelector('a:nth-child(1)').click();
    //                 }
    //             });
    //         }
    // }

    function jumpToTestIncident() {
        let incField = parent.parent.document.getElementById('hfSelectIncident');
        incField.value = '12.3';
        parent.parent.form1.submit();
    }

    function closeAllTabs() {
        //closeAllTabs();
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

    let dropdown = document.createElement("select");
    dropdown.style = "position: fixed; top: 10px; z-index: 9999; right: 10px; width: 75px; font-size: 10px; background-color: #7FFF00; border: 1px solid #d3d3d3; box-shadow: 0 .5rem 1rem #696969 !important; padding: 5px !important";
    dropdown.classList.add("form-control");

    let options = ["(admin)", "Show All", "Refresh", "Return Link", "XSL", "XML", "Enable Refresh", "Disable Refresh", "Jump to CIS", "Jump to Sandbox", "Jump to Daily Ops", "Jump to Test Incident", "Close All Tabs", "Disable Auto Refresh", "Enable Auto Refresh"];
    let actions = [null, showAll, BoardScript.Refreshing.Refresh, returnLink, xslURL, xmlURL, BoardScript.Refreshing.Enable, BoardScript.Refreshing.Disable, jumpToCIS, jumpToSanbox, jumpToDailyOpsIncident, jumpToTestIncident, closeAllTabs, disableAutoRefresh, enableAutoRefresh];

    options.forEach((option, index) => {
        let opt = document.createElement("option");
        opt.value = index;
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
