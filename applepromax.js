const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin());
const locateChrome = require('chrome-location');
const {executablePath} = require('puppeteer');

const url_16 = "https://www.apple.com/shop/buy-iphone/iphone-16-pro"

async function givePage(){
    const browser = await puppeteer.launch({headless: false, executablePath: locateChrome})
    let page = await browser.newPage();
    return page
}

async function run(){
    let page = await givePage();
    await page.goto(url_16);
    await add_to_cart(page);
    await shipping(page);
    await payment(page);
}

async function add_to_cart(page){
    await smart_click_with_pause(page, "input[data-autom ='dimensionScreensize6_3inch']", 0) 
    await smart_click_with_pause(page, "input[value= 'deserttitanium']", 0) 
    await smart_click_with_pause(page, "input[data-autom= 'dimensionCapacity256gb']", 1000) 
    await smart_click_with_pause(page, '[id="noTradeIn_label"]', 500) 
    await smart_click_with_pause(page, '[data-autom="purchaseGroupOptionfullprice_price"]', 500) 
    await smart_click_with_pause(page, '.form-selector-title.rf-bfe-dimension-simfree', 1000) 
    await smart_click_with_pause(page, '[id="applecareplus_58_noapplecare_label"]', 1000) 
    await smart_click_with_pause(page, '[data-autom="add-to-cart"]', 500) 


}

async function shipping(page){
    await smart_click_with_pause(page, "button[name='proceed']", 500) 
    await smart_click_with_pause(page, "[id='shoppingCart.actions.navCheckout']", 500) 
    await smart_click_with_pause(page, "button[data-autom='guest-checkout-btn']", 0) 
    await smart_click_with_pause(page, "[id='rs-checkout-continue-button-bottom']", 0)     

    await smart_type(page,"input[name='firstName']",'Aidan')
    await smart_type(page,"input[name='lastName']",'Hennessy')
    await smart_type(page,"input[name='street']",'7 Indian Hill Dr')
    // clear old postal code
    //await clearSelector(page,"input[name='postalCode']")
    const input = await page.$("input[name='postalCode']")
    await input.click({clickCount:3})
    await input.type('06035')
    // Step 3: Type the new value into the field
    await smart_type(page,"input[name='emailAddress']",'aidanjhennessy@gmail.com')
    await smart_type(page,"input[name='fullDaytimePhone']",'8609705480')
    await smart_click_with_pause(page, "button[data-autom='shipping-continue-button']", 0)    
}

async function payment(page){
    await smart_click_with_pause(page,"input[name='checkout.billing.billingOptions.selectBillingOption']",0)
    await smart_type(page,"input[data-autom='card-number-input']",'4136325052131455')
    await smart_type(page,"input[data-autom='expiration-input']",'1224')
    await smart_type(page,"input[data-autom='security-code-input']",'544')
    await smart_click_with_pause(page, "button[data-autom='continue-button-label']", 0)    
    await smart_click_with_pause(page, "button[id='rs-checkout-continue-button-bottom']", 10000)     
    await smart_click_with_pause(page, "button[id='rs-checkout-continue-button-bottom']", 0)     

}

// helper functions
async function smart_click_with_pause(page,selector,pause){
    await page.waitForSelector(selector);
    await page.evaluate((s) => document.querySelector(s).click(), selector)
    await new Promise(r => setTimeout(r, pause))
}

async function smart_type(page,selector,text){
    await page.waitForSelector(selector);
    await page.type(selector, text);
}

run()