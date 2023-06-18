// ==UserScript==
// @name        Compare Amazon prices
// @namespace   Violentmonkey Scripts
// DP URLs
// @match       https://www.amazon.com/*dp/*
// @match       https://www.amazon.com.be/*dp/*
// @match       https://www.amazon.fr/*dp/*
// @match       https://www.amazon.it/*dp/*
// @match       https://www.amazon.nl/*dp/*
// @match       https://www.amazon.de/*dp/*
// @match       https://www.amazon.es/*dp/*
// GP URLs
// @match       https://www.amazon.com/*gp/*
// @match       https://www.amazon.com.be/*gp/*
// @match       https://www.amazon.fr/*gp/*
// @match       https://www.amazon.it/*gp/*
// @match       https://www.amazon.nl/*gp/*
// @match       https://www.amazon.de/*gp/*
// @match       https://www.amazon.es/*gp/*
// @grant       GM_xmlhttpRequest
// @version     1.0
// @author      -
// @description Compare the prices on multiple Amazon domains
// ==/UserScript==

// DOMAIN_LIST that must be checked for price and coupon
const DOMAIN_LIST = [
  "www.amazon.com",
  "www.amazon.com.be",
  "www.amazon.fr",
  "www.amazon.it",
  "www.amazon.nl",
  "www.amazon.de",
  "www.amazon.es",
]

// Function to extract price and coupon
// $1 domain
// $2 html input
function findPriceAndCoupon(domain, html) {
  let flag      = html.querySelector('.icp-nav-flag')
  let price     = html.querySelector('#apex_offerDisplay_desktop .a-price .a-offscreen').textContent
  let coupon    = false
  let delivery  = html.querySelector('#mir-layout-DELIVERY_BLOCK').textContent
  let feature   = html.querySelector('#amazonGlobal_feature_div > span.a-size-base')

  for (i of html.querySelectorAll('span')) {
    if(i.textContent.indexOf('Coupon') != -1) {
      // Extract the coupon string
      let element = i.innerHTML.match(/<span class="a-color-success">(.*?)\.cxcwPopoverLink/)[1]
      // Convert element to couponText (text format)
      let couponElement = document.createElement("p")
      couponElement.innerHTML = element
      coupon = couponElement.innerText.trim()
      break
    }
  }
  if (! coupon) {
    coupon = "No coupon"
  }

  // Workaround for domain where flag is null
  if(! flag) {
    flag = document.createElement("span")
    if(domain == "www.amazon.fr") {
      flag.className = "icp-nav-flag icp-nav-flag-fr icp-nav-flag-lop"
    } else if (domain == "www.amazon.it") {
      flag.className = "icp-nav-flag icp-nav-flag-it icp-nav-flag-lop"
    }
  }

  // Fill feature
  if(feature) {
    feature = feature.textContent
  } else {
    feature = "/"
  }
  return { price: price, coupon: coupon, flag: flag, delivery: delivery, feature: feature }
}

// Actual domain
const actualDomain  = window.location.host + "/"

// Prepare table elements
let display         = document.createElement("table")
let tr              = document.createElement("tr")
let flagHeader      = document.createElement("th")
let priceHeader     = document.createElement("th")
let couponHeader    = document.createElement("th")
let deliveryHeader  = document.createElement("th")
let featureHeader   = document.createElement("th")

// Fill table textContent
flagHeader.textContent      = "Flag"
priceHeader.textContent     = "Price"
couponHeader.textContent    = "Coupon"
deliveryHeader.textContent  = "Delivery"
featureHeader.textContent   = "Feature"

// Append elements
tr.append(flagHeader)
tr.append(priceHeader)
tr.append(couponHeader)
tr.append(deliveryHeader)
tr.append(featureHeader)
display.append(tr)

// Workaround for rows that are duplicate
let urlList = []

// Check each domain from DOMAIN_LIST
for (let domain of DOMAIN_LIST) {
  // Only process on other domain that our actual
  // Add a "/" at the end to have a difference between amazon.com.be/ and amazon.com/
  if (actualDomain.indexOf(domain + "/") == -1) {
    // Download page for each domain and apply findPriceAndCoupon
    let url = "https://" + domain + window.location.pathname
    GM_xmlhttpRequest({
      'method' : 'GET',
      'url' : url,
      onreadystatechange : response => {
        if (response.readyState == 4) {
          // Before any process check if we not found the URL in urlList
          if(! urlList.includes(url)) {
            // Add URL in urlList
            urlList.push(url)

            // Element of html response
            let element   = findPriceAndCoupon(domain, response.responseXML)

            // Elements
            let tr          = document.createElement("tr")
            let tdFlag      = document.createElement("td")
            let aLink       = document.createElement("a")
            let tdPrice     = document.createElement("td")
            let tdCoupon    = document.createElement("td")
            let tdDelivery  = document.createElement("td")
            let tdFeature   = document.createElement("td")

            // textContents
            aLink.href = url
            aLink.append(element.flag)
            tdFlag.append(aLink)
            tdPrice.textContent     = element.price
            tdCoupon.textContent    = element.coupon
            tdDelivery.textContent  = element.delivery
            tdFeature.textContent   = element.feature

            // Append
            tr.append(tdFlag)
            tr.append(tdPrice)
            tr.append(tdCoupon)
            tr.append(tdDelivery)
            tr.append(tdFeature)
            display.append(tr)
          }
        }
      },
      onerror : response => {
        console.error("Error on GM_xmlhttpRequest")
      },
    })
  }
}

// Display element
let titleElement = document.querySelector('title')
titleElement.parentElement.insertBefore(display, titleElement);
