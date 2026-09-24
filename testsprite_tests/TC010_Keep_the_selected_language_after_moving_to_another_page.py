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
        
        # -> Click the 'Български' language button to switch the site language to Bulgarian, then click the 'Про нас' (About) navigation link to open the About page.
        # 🇧🇬 button
        elem = page.get_by_role("button", name="🇧🇬")
        await elem.click(timeout=10000)
        
        # -> Click the 'Български' language button to switch the site language to Bulgarian, then click the 'Про нас' (About) navigation link to open the About page.
        # Про нас link
        elem = page.get_by_role("link", name="За нас")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The site interface is shown in Bulgarian — the navigation link text reads 'За нас'.
        # Assert-outcome: passed
        # Assert: The 'За нас' navigation link displays Bulgarian text.
        await expect(page.locator("xpath=/html/body/div[1]/div[2]/header/div/nav/a[3]").nth(0)).to_have_text("\u0417\u0430 \u043d\u0430\u0441", timeout=15000), "The '\u0417\u0430 \u043d\u0430\u0441' navigation link displays Bulgarian text."
        
        # --> The About page is open (URL contains '/about').
        # Assert-outcome: passed
        # Assert: The current URL contains '/about', indicating the About page is displayed.
        await expect(page).to_have_url(re.compile("/about"), timeout=15000), "The current URL contains '/about', indicating the About page is displayed."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    