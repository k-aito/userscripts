// ==UserScript==
// @name         Alert before order validation on Amazon
// @namespace    Violentmonkey Scripts
// @downloadUrl  https://raw.githubusercontent.com/k-aito/userscripts/main/alert-before-validation-amazon.user.js
// @version      1.0
// @author       k-aito
// @description  A script that alerts you when a certain element is visible.
// @match        https://www.amazon.*/*
// @match        https://amazon.*/*
// ==/UserScript==

(function() {
    'use strict';

    // Define the message constant
    const CONFIRMATION_MESSAGE = 'You will confirm your order on this browser, are you sure you want continue!?';

    // Define the elements to check for order confirmation
    const ELEMENTS = [
      '#turbo-checkout-place-order-button',
      '#desktop-ptc-button-celWidget'
    ];

    // Loop through each element and check if it exists on the page
    for (const element of ELEMENTS) {
        if (document.querySelector(element)) {
            // Show an alert message when an order is confirmed
            alert(CONFIRMATION_MESSAGE);
            break;
        }
    }

})();
