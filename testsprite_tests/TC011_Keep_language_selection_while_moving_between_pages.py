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
        
        # -> Click the 'Български' language button, then click the 'Про нас' (About) navigation link to open the About page.
        # 🇧🇬 button
        elem = page.get_by_role("button", name="🇧🇬")
        await elem.click(timeout=10000)
        
        # -> Click the 'Български' language button, then click the 'Про нас' (About) navigation link to open the About page.
        # Про нас link
        elem = page.get_by_role("link", name="За нас")
        await elem.click(timeout=10000)
        
        # -> Click the 'Контакти' (Contacts) navigation link and verify the Contacts page displays in Bulgarian.
        # Контакти link
        elem = page.get_by_role("link", name="Контакти")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The About page was shown with Bulgarian text (About header visible in Bulgarian).
        # Assert-outcome: passed
        # Assert: The About navigation link text is 'За нас', indicating Bulgarian language is in use.
        await expect(page.locator("xpath=/html/body/div[1]/div[2]/header/div/nav/a[3]").nth(0)).to_have_text("\u0417\u0430 \u043d\u0430\u0441", timeout=15000), "The About navigation link text is '\u0417\u0430 \u043d\u0430\u0441', indicating Bulgarian language is in use."
        
        # --> The Contacts page displays Bulgarian text after navigation (contact section shown in Bulgarian).
        # Assert-outcome: passed
        # Assert: The Contacts page contains the Bulgarian 'Пишете в WhatsApp' link, showing the page is in Bulgarian.
        await expect(page.locator("xpath=/html/body/div[1]/div[2]/main/div/div/div[3]/div[5]/a[1]").nth(0)).to_have_text("\u041f\u0438\u0448\u0435\u0442\u0435 \u0432 WhatsApp", timeout=15000), "The Contacts page contains the Bulgarian '\u041f\u0438\u0448\u0435\u0442\u0435 \u0432 WhatsApp' link, showing the page is in Bulgarian."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    