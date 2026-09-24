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
        
        # -> Click the 'Переглянути відео' button in the hero section.
        # Переглянути відео link
        elem = page.get_by_role("link", name="Переглянути відео")
        await elem.click(timeout=10000)
        
        # -> Switch back to the home page and verify that the site's header/navigation is visible on the home page.
        # Switch to tab 6F62
        page = context.pages[-1]  # switch to most recently active tab
        
        # -> Click the 'Переглянути відео' button in the hero to open the brand video and verify it loads.
        # Переглянути відео link
        elem = page.get_by_role("link", name="Переглянути відео")
        await elem.click(timeout=10000)
        
        # -> Click the 'Accept all' button on the YouTube consent dialog to continue to the video content.
        # Accept all button
        elem = page.get_by_role("button", name="Accept all")
        await elem.click(timeout=10000)
        
        # -> Check the YouTube tab for a visible video element, then switch to the site home page and verify the header/navigation (look for the 'Переглянути відео' CTA) is visible.
        # Switch to tab 6F62
        page = context.pages[-1]  # switch to most recently active tab
        
        # -> Switch to the 'Теравет Оригинал - YouTube' tab and verify the brand video element is visible.
        # Switch to tab A338
        page = context.pages[-1]  # switch to most recently active tab
        
        # -> Click the 'The Tiny Sponges Revolution' video thumbnail on the channel page to open the video player.
        # The Tiny Sponges Revolution link
        elem = page.get_by_role("link", name="The Tiny Sponges Revolution 5")
        await elem.click(timeout=10000)
        
        # -> Switch to the site home tab and confirm the header/navigation and the 'Переглянути відео' CTA are visible on the homepage.
        # Switch to tab 6F62
        page = context.pages[-1]  # switch to most recently active tab
        
        # --> Assertions to verify final state
        
        # --> The hero 'Переглянути відео' CTA opened the brand video in a YouTube watch page.
        # Assert-outcome: passed
        # Assert: A YouTube watch URL was opened after clicking the hero video CTA.
        await expect(page).to_have_url(re.compile("youtube\\.com/watch"), timeout=15000), "A YouTube watch URL was opened after clicking the hero video CTA."
        
        # --> The site's header navigation remains visible on the homepage (the 'Головна' link is present).
        await page.get_by_role("link", name="Головна").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The 'Головна' navigation link is visible in the header.
        await expect(page.get_by_role("link", name="Головна").nth(0)).to_be_visible(timeout=15000), "The '\u0413\u043e\u043b\u043e\u0432\u043d\u0430' navigation link is visible in the header."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    