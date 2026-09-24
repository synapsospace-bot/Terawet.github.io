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
        
        # -> Scroll down the page to reveal content below the hero section so the floating voice assistant (if present) becomes visible.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll down the page to reveal content below the hero section so the floating voice assistant (if present) becomes visible.
        await page.mouse.wheel(0, 300)
        
        # --> Assertions to verify final state
        
        # --> The floating assistant panel is displayed with its message input visible.
        await page.locator("xpath=/html/body/elevenlabs-convai/div[1]/div[1]/div[2]/div[2]/div[2]/div/textarea").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The assistant's message textarea is visible.
        await expect(page.locator("xpath=/html/body/elevenlabs-convai/div[1]/div[1]/div[2]/div[2]/div[2]/div/textarea").nth(0)).to_be_visible(timeout=15000), "The assistant's message textarea is visible."
        
        # --> The assistant is ready to accept a question and contains the typed test message.
        # Assert-outcome: passed
        # Assert: The assistant input contains the typed message 'Тестове питання'.
        await expect(page.locator("xpath=/html/body/elevenlabs-convai/div[1]/div[1]/div[2]/div[2]/div[2]/div/textarea").nth(0)).to_have_value("\u0422\u0435\u0441\u0442\u043e\u0432\u0435 \u043f\u0438\u0442\u0430\u043d\u043d\u044f", timeout=15000), "The assistant input contains the typed message '\u0422\u0435\u0441\u0442\u043e\u0432\u0435 \u043f\u0438\u0442\u0430\u043d\u043d\u044f'."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    