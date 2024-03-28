// ==UserScript==
// @name         WebEOC - Main Nav
// @namespace    http://tampermonkey.net/
// @version      2024-03-15
// @description  try to take over the world!
// @author       You
// @match        https://webeoc.nationalemr.us/eoc7/controlpanel.aspx
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nationalemr.us
// @run-at       document-end
// @grant        unsafeWindow
// @downloadURL  https://gist.chrismartintx.com/tampermonkey/webeoc-main-nav.js
// @updateURL    https://gist.chrismartintx.com/tampermonkey/webeoc-main-nav.js
// @homepage     https://gist.chrismartintx.com/tampermonkey/
// ==/UserScript==

(function() {
    'use strict';
        window.addEventListener('load', function() {

    setTimeout(function() {
        console.debug('timeout')
        console.debug('running')
        var positionMenu = document.getElementById('role-switcher');
        var positionSelect = document.getElementById('role-switcher').querySelector('span:nth-child(1)');
        console.debug('positionSelect',positionSelect)
        var position = positionSelect.innerText;
        console.debug('position',position)
        var incidentMenu = document.getElementById('incident-switcher');
        var incidentSelect = document.getElementById('incident-switcher').querySelector('span:nth-child(1)');
        var incident = incidentSelect.innerText;
        console.debug('incident',incident)
        var openBoardMenu = document.querySelector('a[title="Menu"]');

        function jumpToCIS() {
        // If the position is not CIS, switch to CIS
        setTimeout(function() {
        if (position !== 'CIS') {
            positionMenu.click();
            // find the 'li' with the text 'CIS' and click it.  find the 'li' by finding the element with data-bind="foreach: positions"
            var positionList = document.querySelectorAll('[data-bind="foreach: positions"] li');
            console.debug('positionList',positionList)
            positionList.forEach(function(li) {
                if (li.innerText === 'CIS') {
                    console.debug('clicking')
                    li.querySelector('a:nth-child(1)').click();
                }
            });
    }
        }, 5000);
        };

        function jumpToDailyOpsIncident() {
        // If the incident is not Daily Ops, switch to Daily Ops
        setTimeout(function() {
        if (incident !== 'Daily Ops') {
            incidentMenu.click();
            // find the 'li' with the text 'Daily Ops' and click it.  find the 'li' by finding the element with data-bind="foreach: incidents"
            var incidentList = document.querySelectorAll('[data-bind="foreach: incidents"] li');
            console.debug('incidentList',incidentList)
            incidentList.forEach(function(li) {
                if (li.innerText === 'Daily Ops') {
                    console.debug('clicking')
                    li.querySelector('a:nth-child(1)').click();
                }
            });
        }

    }, 5000);

    }

    function closeAllTabs() {
        // find 'a' with title="Tab Menu" and click it.  find the 'a' by finding the element with id="TabMenu"
        var tabMenu = document.querySelector('a[title="Tab Menu"]');
        console.debug('tabMenu',tabMenu)
        var menuOfOption = document.getElementById('TabMenu');
        var closeAllTabsLink = menuOfOption.querySelectorAll('li a');
        console.debug('closeAllTabsLink',closeAllTabsLink)
        closeAllTabsLink.forEach(function(a) {
            if (a.innerText === 'Close All Tabs') {
                console.debug('clicking')
                a.click();
            }
        });

    }





document.querySelector('.suit-header--dark').classList.add('suit-header--light');
document.querySelector('.suit-header--light').classList.remove('suit-header--dark');


var lastNavElement = document.getElementById('lnkLogOut');
var lastParent = lastNavElement.parentElement;


if (position !== 'CIS') {
var jumpToCISLink = document.createElement('a');
jumpToCISLink.href = 'javascript:void(0)';
jumpToCISLink.innerText = '➡ CIS';
jumpToCISLink.onclick = jumpToCIS;
lastParent.appendChild(jumpToCISLink);
}

if (incident !== 'Daily Ops') {
var jumpToDailyOpsIncidentLink = document.createElement('a');
jumpToDailyOpsIncidentLink.href = 'javascript:void(0)';
jumpToDailyOpsIncidentLink.innerText = '➡ Daily Ops';
jumpToDailyOpsIncidentLink.onclick = jumpToDailyOpsIncident;
lastParent.appendChild(jumpToDailyOpsIncidentLink);
}

var closeAllTabsHeaderLink = document.createElement('a');
closeAllTabsHeaderLink.href = 'javascript:void(0)';
closeAllTabsHeaderLink.innerText = '✖';
closeAllTabsHeaderLink.onclick = closeAllTabs;
lastParent.appendChild(closeAllTabsHeaderLink);




    }, 5000);
        });
})();
