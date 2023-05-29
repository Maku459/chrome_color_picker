chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

chrome.action.onClicked.addListener(async (tab) => {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === "ON" ? "OFF" : "ON";
    const contentScript = {
        id: "a-script",
        js: ["content.js"],
        matches: [
            "https://developer.chrome.com/docs/extensions/*",
            "https://developer.chrome.com/docs/webstore/*",
        ],
    };

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
    });
    if (nextState === "ON") {
        // Insert the CSS file when the user turns the extension on
        // await chrome.scripting.executeScript({
        //     target: { tabId: tab.id },
        //     files: ["content.js"],
        // });
        try {
            await chrome.scripting.registerContentScripts([contentScript]);
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["content.js"],
            });
        } catch (err) {
            console.error(`failed to register content scripts: ${err}`);
        }
    } else if (nextState === "OFF") {
        try {
            await chrome.scripting.unregisterContentScripts({
                ids: ["a-script"],
            });
        } catch (err) {
            console.error(`failed to unregister content scripts: ${err}`);
        }
    }
});
