// ==UserScript==
// @name         WebEOC - Group Administration
// @namespace    https://webeoc.nationalemr.us/eoc7/
// @version      1.0.3
// @description  Get and set groups from positions in WebEOC
// @author       You
// @match        https://webeoc.nationalemr.us/eoc7/admin/positions/detail.aspx?positionid=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nationalemr.us
// @downloadURL  https://github.com/chrismartintx/chrismartintx.github.io/raw/master/tampermonkey/webeoc-group_administration.user.js
// @updateURL    https://github.com/chrismartintx/chrismartintx.github.io/raw/master/tampermonkey/webeoc-group_administration.user.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

(function () {
    'use strict';

    window.onload = function () {
        setTimeout(function () {


            var groupsAssigned = document.getElementById('ctl00_ctl00_formBody_parentBody_ctl03_ctl01_groupsMultiSelect_sgvfAssigned_ctl08_scrollDiv').querySelectorAll('tbody > tr > td.sorting_1');
            var comments = document.getElementById('ctl00_ctl00_formBody_parentBody_txtComments');
            // var parsedComments = comments.value.split('\n');
            var availableGroups = document.getElementById('ctl00_ctl00_formBody_parentBody_ctl03_ctl01_groupsMultiSelect_mw_ctl10_sgvfAvailable_ctl08_sgvAvailable').querySelectorAll('div > table > tbody > tr > td.sorting_1');
            var assignButton = document.getElementById('ctl00_ctl00_formBody_parentBody_ctl03_ctl01_groupsMultiSelect_mw_ctl13_lbAssign');

            var availableGroupsArray = [];

            availableGroups.forEach(function (group) {
                availableGroupsArray.push(group.textContent);
                // console.debug('availableGroups -> group', group.textContent)
            });

            var assignedArray = [];

            groupsAssigned.forEach(function (group) {
                assignedArray.push(group.textContent + '\n');
                // console.debug('groupsAssigned -> group', group.textContent)
            }
            );

            function getGroups() {
                console.debug('getGroups');
                comments.value += 'GROUPS GET:\n' + assignedArray.join('');

            };

            function setGroups() {
                console.debug('setGroups');

                var setGroupComments = comments.value.split('\n');
                // console.debug('setGroupComments', setGroupComments);
                setGroupComments.forEach(function (comment) {
                    availableGroupsArray.forEach(function (group) {
                        if (comment === group) {
                            console.debug('comment === group', comment, group);
                            availableGroups.forEach(function (group) {
                                if (group.textContent === comment) {
                                    group.parentElement.querySelector('input').checked = true;
                                }
                            });
                        }
                    });
                });
                assignButton.click();

            }

            var nav = document.querySelector('html#ctl00_ctl00_HtmlTag body div#container div#content form#aspnetForm.form-horizontal header#ctl00_ctl00_formBody_mainNavigation.suit-header nav#ctl00_ctl00_formBody_nav_nav div.suit-sub-nav ul.suit-page-container');

            var getGroupsLi = document.createElement('li');
            getGroupsLi.id = 'ctl00_ctl00_formBody_nav_rptAdminManagers_ctl04_listItem';
            getGroupsLi.innerHTML = '<a href="javascript:void(0);" id="ctl00_ctl00_formBody_nav_rptAdminManagers_ctl04_hypManagerLink" class="suit-nav-link">Get Groups</a>';
            nav.appendChild(getGroupsLi);

            var setGroupsLi = document.createElement('li');
            setGroupsLi.id = 'ctl00_ctl00_formBody_nav_rptAdminManagers_ctl05_listItem';
            setGroupsLi.innerHTML = '<a href="javascript:void(0);" id="ctl00_ctl00_formBody_nav_rptAdminManagers_ctl05_hypManagerLink" class="suit-nav-link">Set Groups</a>';
            nav.appendChild(setGroupsLi);

            comments.style = 'width: 100%; height: 100px;';

            document.getElementById('ctl00_ctl00_formBody_nav_rptAdminManagers_ctl04_hypManagerLink').addEventListener('click', getGroups);
            document.getElementById('ctl00_ctl00_formBody_nav_rptAdminManagers_ctl05_hypManagerLink').addEventListener('click', setGroups);



        }, 1000);
    }

})();