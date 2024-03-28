// ==UserScript==
// @name         WebEOC - User Administration
// @namespace    https://webeoc.nationalemr.us/eoc7/
// @version      1.0.3
// @description  try to take over the world!
// @author       You
// @match        https://webeoc.nationalemr.us/eoc7/admin/users/detail.aspx?userid=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nationalemr.us
// @downloadURL  https://github.com/chrismartintx/chrismartintx.github.io/raw/master/tampermonkey/webeoc-user_administration.user.js
// @updateURL    https://github.com/chrismartintx/chrismartintx.github.io/raw/master/tampermonkey/webeoc-user_administration.user.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // VALUES TO SET/DECLARE
        var pwd = 'Nemr123';
        var url = 'https://webeoc.nationalemr.us/eoc7/'
        var d = new Date();
        var date = (((d.getMonth() > 8) ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1))) + '/' + ((d.getDate() > 9) ? d.getDate() : ('0' + d.getDate())) + '/' + d.getFullYear());
        var array = [];

        // ELEMENTS TO SELECT
        var passwordCheckbox = document.getElementById('ctl00_ctl00_formBody_parentBody_chkChangePassword');
        var selectAllPositionsCheckbox = document.getElementById('ctl00_ctl00_formBody_parentBody_suitTabs_ctl01_ucPositions_divAssignedItems').querySelector('div > table > thead > tr > th:nth-child(1) > input[type=checkbox]');
        var removePositionsButton = document.getElementById('ctl00_ctl00_formBody_parentBody_suitTabs_ctl01_ucPositions_divItems').querySelector('div.suit-table-footer > div > a');
        var mobileDevicesTab = document.getElementById('ctl00_ctl00_formBody_parentBody_suitTabs').querySelector('ul > li:nth-child(2) > a');
        var selectAllMobileDevicesCheckbox = document.getElementById('ctl00_ctl00_formBody_parentBody_suitTabs_ctl01_ucMobileDevices_sgvfAssigned_ctl08_sgvAssigned_ctl01_chkAll');
        var removeMobileDevicesButton = document.getElementById('ctl00_ctl00_formBody_parentBody_suitTabs_ctl01_ucMobileDevices_lbRemoveAssigned');
        var mobileDeviceCount = document.getElementById('ctl00_ctl00_formBody_parentBody_suitTabs_ctl01_ucMobileDevices_sgvfAssigned_ctl00').querySelector('div.suit-table_header > div.suit-table_info.pull-left').textContent.trim();
        var nav = document.querySelector('html#ctl00_ctl00_HtmlTag body div#container div#content form#aspnetForm.form-horizontal header#ctl00_ctl00_formBody_mainNavigation.suit-header nav#ctl00_ctl00_formBody_nav_nav div.suit-sub-nav ul.suit-page-container');

        // ELEMTENTS TO CREATE
        var createUserLi = document.createElement('li');
        createUserLi.id = "ctl00_ctl00_formBody_nav_rptAdminManagers_ctl04_listItem";
        createUserLi.innerHTML = '<a href="javascript:void(0);" id="ctl00_ctl00_formBody_nav_rptAdminManagers_ctl04_linkButton" class="suit-nav-link">Create User</a>';
        var resetUserLi = document.createElement('li');
        resetUserLi.id = "ctl00_ctl00_formBody_nav_rptAdminManagers_ctl05_listItem";
        resetUserLi.innerHTML = '<a href="javascript:void(0);" id="ctl00_ctl00_formBody_nav_rptAdminManagers_ctl05_linkButton" class="suit-nav-link">Reset User</a>';
        var inactiveUserLi = document.createElement('li');
        inactiveUserLi.id = "ctl00_ctl00_formBody_nav_rptAdminManagers_ctl06_listItem";
        inactiveUserLi.innerHTML = '<a href="javascript:void(0);" id="ctl00_ctl00_formBody_nav_rptAdminManagers_ctl06_linkButton" class="suit-nav-link">Inactive User</a>';
        var demobUserLi = document.createElement('li');
        demobUserLi.id = "ctl00_ctl00_formBody_nav_rptAdminManagers_ctl07_listItem";
        demobUserLi.innerHTML = '<a href="javascript:void(0);" id="ctl00_ctl00_formBody_nav_rptAdminManagers_ctl07_linkButton" class="suit-nav-link">Demob User</a>';

        // VALUES TO GET
        var realName = document.getElementById('ctl00_ctl00_formBody_parentBody_txtRealName');
        var userName = document.getElementById('ctl00_ctl00_formBody_parentBody_txtUserName');
        var primaryEmail = document.getElementById('ctl00_ctl00_formBody_parentBody_txtPrimaryEmail');
        var password = document.getElementById('ctl00_ctl00_formBody_parentBody_txtPassword');
        var passwordConfirm = document.getElementById('ctl00_ctl00_formBody_parentBody_txtConfirmPassword');
        var comments = document.getElementById('ctl00_ctl00_formBody_parentBody_txtComments');
        var existingUserName = userName.value;
        var existingEmail = primaryEmail.value;

        // FUNCTIONS
        function createUser() {

            var lines = comments.value.split('\n');
            var texts = [];
            for (var i = 0; i < lines.length; i++) {
                if (/\S/.test(lines[i])) {
                    texts.push(lines[i].trim());
                }
            }

            comments.value = "Your WebEOC user account has been created. Your account details are provided below.\n\rThe login page is located at " + url + "\nYour username is: " + texts[1] + "\n\rYour temporary password is: " + pwd + "\n\rThe password is case sensitive, and you will be required to change your password after you log in.\n\rAccounts lock after 5 failed attempts, and they unlock automatically after 5 minutes.\n\r" + texts[2] + "\n WebEOC Access";

            passwordCheckbox.checked = true;
            realName.value = texts[0];
            userName.value = texts[1];
            primaryEmail.value = texts[2];
            password.value = pwd;
            passwordConfirm.value = pwd;
        };

        function resetUser() {

            comments.value = "Your WebEOC user account has been reset. Your account details are provided below.\n\rThe login page is located at " + url + "\nYour username is: " + existingUserName + "\n\rYour temporary password is: " + pwd + "\n\rThe password is case sensitive, and you will be required to change your password after you log in.\n\rAccounts lock after 5 failed attempts, and they unlock automatically after 5 minutes.\n\r" + existingEmail + "\n WebEOC Access";

            passwordCheckbox.checked = true;
            password.value = pwd;
            passwordConfirm.value = pwd;

        };

        function inactiveUser() {

            comments.value = 'INACTIVE - CPM - ' + date + '\n' + array;

            selectAllPositionsCheckbox.click();
            removePositionsButton.classList.remove('disabled');
            removePositionsButton.click();

            if (mobileDeviceCount !== '0 entries') {
                alert('Mobile Devices are still assigned to this user. Please remove them before continuing.');
                mobileDevicesTab.click();
                selectAllMobileDevicesCheckbox.click();
                removeMobileDevicesButton.classList.remove('disabled');
                removeMobileDevicesButton.click();
                window.location = removeMobileDevicesButton.getAttribute('href');
            }

        };

        function demobUser() {

            comments.value = 'DEMOBED - CPM - ' + date + '\n' + array;

            selectAllPositionsCheckbox.click();
            removePositionsButton.classList.remove('disabled');
            removePositionsButton.click();

            if (mobileDeviceCount !== '0 entries') {
                alert('Mobile Devices are still assigned to this user. Please remove them before continuing.');
                mobileDevicesTab.click();
                selectAllMobileDevicesCheckbox.click();
                removeMobileDevicesButton.classList.remove('disabled');
                removeMobileDevicesButton.click();
                window.location = removeMobileDevicesButton.getAttribute('href');
            };
        };


        function appendElements() {
            comments.style = 'width: 100%; height: 100px;';
            nav.appendChild(createUserLi);
            nav.appendChild(resetUserLi);
            nav.appendChild(inactiveUserLi);
            nav.appendChild(demobUserLi);
            document.getElementById('ctl00_ctl00_formBody_nav_rptAdminManagers_ctl04_linkButton').addEventListener('click', createUser);
            document.getElementById('ctl00_ctl00_formBody_nav_rptAdminManagers_ctl05_linkButton').addEventListener('click', resetUser);
            document.getElementById('ctl00_ctl00_formBody_nav_rptAdminManagers_ctl06_linkButton').addEventListener('click', inactiveUser);
            document.getElementById('ctl00_ctl00_formBody_nav_rptAdminManagers_ctl07_linkButton').addEventListener('click', demobUser);
        }

        function appendDetails() {
            comments.parentElement.appendChild(document.createElement('span')).id = 'assignedPositions';
            document.getElementById('assignedPositions').style = 'font-size: 12px; font-family: monospace; white-space: pre-line; color: #ff1111; display: block; margin-top: 10px;';
            document.getElementById('assignedPositions').classList.add('control-label');
            document.getElementById('assignedPositions').innerHTML = array.join('');
            mobileDevicesTab.appendChild(document.createElement('span')).id = 'mobileDeviceCount';
            document.getElementById('mobileDeviceCount').style = 'font-size: 12px; font-family: monospace; white-space: pre-line; color: #ff1111;';
            document.getElementById('mobileDeviceCount').innerHTML = '  (' + mobileDeviceCount + ')';
            appendElements();
        };

        function getAssignedPositions() {
            var retryCount = 0;
            var assignedPositionsList = document.getElementById('ctl00_ctl00_formBody_parentBody_suitTabs_ctl01_ucPositions_divAssignedItems').querySelectorAll('div > table > tbody > tr > td.sorting_1');

            // if (assignedPositionsList.length === 0 && retryCount < 2) {
            //     getAssignedPositions();
            // }
            assignedPositionsList.forEach(function (cell) {
                var text = cell.textContent;
                if (text && text !== ' (Select)') {
                    array.push(text + '\n');
                    console.debug('assignedPositionList', text)
                }
            });
            appendDetails();
        };

        setTimeout(function () {
            getAssignedPositions();
        }, 2000);
    });
})();