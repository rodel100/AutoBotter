const {Builder, Browser, Key, until, By} = require("selenium-webdriver")
const randomgen = import("random-words")
const _ = require("lodash")
const account = require("./account.json")
const loginFunction = require("./Functions/Login")
let SearchQueryWords = ["How to ",
"What is ",
"Where to find ",
"Best way to ",
"Top tips for ",
"List of ",
"Comparison between ",
"Benefits of ",
"Pros and cons of ",
"History of ",
"Future of ",
"Latest trends in ",
"Common problems with ",
"Alternative solutions for ",
"Step-by-step guide to ",
"Beginner's guide to ",
"Advanced techniques for ",
"Case study on ",
"Interview with "]
let driver = new Builder().forBrowser(Browser.CHROME).build();
let NumberOfQueries = 30
const timer = ms => new Promise(res => setTimeout(res, ms))
async function Search_Query(Queries){
    try{
        let RandomPrefix = _.sample(SearchQueryWords)
        let RandomWord = (await randomgen).generate()
        await driver.get("https://www.bing.com/")
        let textArea = await driver.findElement(By.id("sb_form_q"))
        await timer(300)
        await textArea.sendKeys(RandomPrefix + RandomWord, Key.ENTER)
        await driver.wait(until.titleIs(`${RandomPrefix + RandomWord} - Search`, 1000)) 
        for(let i = 0; i < Queries; i++){
            let BlockedRandomPrefix = _.sample(SearchQueryWords)
            let BlockedRandomWord = (await randomgen).generate()
            await driver.findElement(By.id("sb_form_q")).sendKeys(BlockedRandomPrefix + BlockedRandomWord, Key.RETURN)
            await timer(120000)
        }
    }
    finally{
        await driver.quit()
    }
}
loginFunction(driver, account[0].Email, account[0].Password, "https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=22&id=264960&wreply=https%3a%2f%2fwww.bing.com%2fsecure%2fPassport.aspx%3fedge_suppress_profile_switch%3d1%26requrl%3dhttps%253a%252f%252fwww.bing.com%252f%253fform%253dREDIRERR%2526wlexpsignin%253d1%26sig%3d0CF5B9A481706CED32D8AD9E808B6DB3%26nopa%3d2&wp=MBI_SSL&lc=1033&CSRFToken=6dd67cae-717c-4e7e-93e7-626bae4b6906&cobrandid=c333cba8-c15c-4458-b082-7c8ce81bee85&aadredir=1&nopa=2")