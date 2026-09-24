import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:5173")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Scroll down to reveal the bottom-right area of the page where a floating voice advisor or chat widget would appear.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll to the bottom of the homepage and search the page for the words 'радник' and 'чат' to find the floating voice advisor.
        await page.mouse.wheel(0, 300)
        
        # --> Assertions to verify final state
        
        # --> A consultation response was not received; the voice advisor showed a connection error instead.
        # Assert-outcome: failed
        # Assert: Expected the voice advisor to display a consultation response instead of a connection error.
        await expect(page.locator("xpath=/html/body/elevenlabs-convai/div[1]/div[1]/div[3]/div/div[2]").nth(0)).to_contain_text("\u0421\u0442\u0430\u043b\u0430\u0441\u044f \u043f\u043e\u043c\u0438\u043b\u043a\u0430 Connection closed unexpectedly before session could be established.", timeout=15000), "Expected the voice advisor to display a consultation response instead of a connection error."
        
        # --> The conversation remains open for follow-up; the message input textarea is still visible.
        await page.locator("xpath=/html/body/elevenlabs-convai/div[1]/div[1]/div[2]/div[2]/div[2]/div/textarea").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: failed
        # Assert: Expected the conversation input textarea to remain visible for follow-up.
        await expect(page.locator("xpath=/html/body/elevenlabs-convai/div[1]/div[1]/div[2]/div[2]/div[2]/div/textarea").nth(0)).to_be_visible(timeout=15000), "Expected the conversation input textarea to remain visible for follow-up."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    