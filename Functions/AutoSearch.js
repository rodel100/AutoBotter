const randomgen = import("random-words")
const _ = require("lodash")
const { Builder, Browser, Key, until, By } = require("selenium-webdriver")
module.exports = async function Search_Query(driver, Queries) {
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
    const timer = ms => new Promise(res => setTimeout(res, ms))
    try {
        let RandomPrefix = _.sample(SearchQueryWords)
        let RandomWord = (await randomgen).generate()
        await driver.get("https://www.bing.com/")
        let textArea = await driver.findElement(By.id("sb_form_q"))
        await timer(3000)
        await textArea.sendKeys(RandomPrefix + RandomWord, Key.ENTER)
        await driver.wait(until.titleIs(`${RandomPrefix + RandomWord} - Search`, 3000))
        await timer(300000)
        for (let i = 0; i < Queries; i++) {
            let BlockedRandomPrefix = _.sample(SearchQueryWords)
            let BlockedRandomWord = (await randomgen).generate()
            let searchTextBox = await driver.findElement(By.id("sb_form_q"))
            searchTextBox.clear()
            searchTextBox.sendKeys(BlockedRandomPrefix + BlockedRandomWord, Key.RETURN)
            await timer(300000)
        }
    }
    finally {
        await driver.quit()
    }
}