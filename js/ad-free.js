---
layout: none
permalink: "/js/ad-free-v2024.07.14.js"
---

// Set up Paddle
Paddle.Initialize({
	token: 'live_ab76ec9da4495bd6ddd5b14f83b',
	checkout: {
		settings: {
			displayMode: "overlay",
			locale: "en"
		}
	},
	eventCallback: handleCheckoutEvent
});

const afapItems = [{
	priceId: "pri_01hwxrwp7ec9nfkv31kf6jc4j6",
	quantity: 1
}];

// Set the price
function updatePrice() {
	const priceElement = document.getElementById("price");
	const currencyCodeElement = document.getElementById("currency-code");
	fetch("https://api.wurstclient.net/afa/price-preview")
		.then((response) => response.json())
		.then((data) => {
			// Update the currency code
			currencyCodeElement.textContent = data.currency_code;
			currencyCodeElement.classList.remove("loading");

			// Update the price
			const priceNumberBold = document.createElement("b");
			priceNumberBold.textContent = data.price_number;
			const priceCurrencyNode = document.createTextNode(data.price_currency_symbol);

			// Update the price element
			priceElement.textContent = "";
			if (data.currency_symbol_first) {
				priceElement.appendChild(priceCurrencyNode);
				priceElement.appendChild(priceNumberBold);
			} else {
				priceElement.appendChild(priceNumberBold);
				priceElement.appendChild(priceCurrencyNode);
			}
			priceElement.classList.remove("loading");
		})
		.catch((error) => {
			console.error("Error fetching price:", error);
			priceElement.classList.remove("loading");
			currencyCodeElement.classList.remove("loading");
		});
}
updatePrice();

// Load data from localStorage
const alreadyPurchased = localStorage.getItem("WurstAdFreeAccess") === "true";
const priorWurstDownloads = parseInt(localStorage.getItem("WurstDownloadCount")) || 0;
const firstWurstDownload = parseInt(localStorage.getItem("FirstWurstDownload")) || 0;
const adBlockerDetected = localStorage.getItem("WurstAdBlockerDetected") === "true" && !alreadyPurchased;

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("token"))
	if (!alreadyPurchased)
		validateToken(urlParams.get("token"));
	else
		alert("You already have Ad-Free Access. Maybe you wanted to open this link on a different device or browser?");

// Switch to already purchased section if purchased
if(alreadyPurchased)
{
	document.getElementById("purchase").style.display = "none";
	document.getElementById("already-purchased").style.display = "block";
}

// Show adblocker question if ad-blocker is detected
if(adBlockerDetected)
	document.getElementById("adblocker-faq").style.display = "block";

// Open the checkout
const buyButton = document.getElementById("buy-button");
buyButton.addEventListener("click", event => openCheckout());
if (urlParams.get("open") === "true")
	openCheckout();
function openCheckout()
{
	Paddle.Checkout.open({items: afapItems});
}

// Handle checkout events
let hasLoadedCheckout = false;
function handleCheckoutEvent(event)
{
	console.log(event);
	const eventProps = {
		prior_wurst_downloads: priorWurstDownloads,
		first_wurst_download: firstWurstDownload,
		adblocker: adBlockerDetected
	}
	switch(event.name)
	{
		case "checkout.loaded":
			hasLoadedCheckout = true;
			plausible("Open Ad-Free Access Pass Checkout", {props: eventProps});
			break;
		case "checkout.completed":
			if(hasLoadedCheckout)
			{
				activateAdFreeAccess(event.data.transaction_id);
				plausible("Buy Ad-Free Access Pass", {props: eventProps});
			}
			break;
	}
}

// Handle checkout completion
function activateAdFreeAccess(txid)
{
	localStorage.setItem("WurstAFAPurchaseId", txid);
	localStorage.setItem("WurstAdFreeAccess", "true");
	alert("Thank you for your purchase! Your Ad-Free Access Pass has been enabled.");
	document.getElementById("purchase").style.display = "none";
	document.getElementById("already-purchased").style.display = "block";
}

// Handle restore access form
const form = document.getElementById("restore-access-form");
form.addEventListener("submit", event => {
	requestRestoreLink();
	event.preventDefault();
});
function requestRestoreLink()
{
	const email = form.querySelector("input[name=email]").value;
	fetch("https://api.wurstclient.net/afa/restore", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({email})
	}).then(handleRestoreResponse).catch(handleFetchError);
}
function handleRestoreResponse(response)
{
	if(response.ok)
		alert("Your request has been received. If you've purchased ad-free access, you will get an email with a restore link shortly.");
	else
		response.json().then(data => {
			console.log(data);
			alert("Error: " + data.error);
		});

	plausible("Request Ad-Free Access Restore Link", {
		props: {
			prior_wurst_downloads: priorWurstDownloads,
			first_wurst_download: firstWurstDownload,
			adblocker: adBlockerDetected,
			response_code: response.status
		}
	});
}

// Handle restore token
function validateToken(token) {
	fetch("https://api.wurstclient.net/afa/validate", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({token})
	}).then(handleValidateResponse).catch(handleFetchError);
}
function handleValidateResponse(response)
{
	response.json().then(data => {
		console.log(data);
		if(!response.ok)
		{
			alert("Error: This restore link has expired or is not valid.");
			return;
		}

		activateAdFreeAccess(data.id);

		plausible("Open Ad-Free Access Restore Link", {
			props: {
				prior_wurst_downloads: priorWurstDownloads,
				first_wurst_download: firstWurstDownload,
				adblocker: adBlockerDetected,
				response_code: response.status
			}
		});
	})
}

function handleFetchError(error) {
	console.error(error);
	alert("Request failed. Either your internet connection or the server is down. Try again later and if the problem persists, contact me.");
}

// Track FAQ entries
document.querySelectorAll("details.ad-free-faq").forEach((details) => {
	details.addEventListener("toggle", (event) => {
		if(event.target.hasAttribute("open"))
		{
			const summaryElement = event.target.querySelector("summary");
			const summaryId = summaryElement.getAttribute("id");

			plausible("Open Ad-Free Access FAQ", {
				props: {
					id: summaryId
				}
			});
		}
	});
});
