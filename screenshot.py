import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1280, "height": 800})
        
        # Screenshot 1: Colleges Directory
        await page.goto('http://localhost:3000/colleges')
        await asyncio.sleep(2)
        await page.screenshot(path="C:/Users/surya/.gemini/antigravity/brain/b64e5132-fd03-4506-a650-7ca876fd4f3b/media__colleges_directory.png", full_page=False)

        # Let's also take a screenshot of the Scholarships tab
        await page.click("text=Scholarships & Grants")
        await asyncio.sleep(1)
        await page.screenshot(path="C:/Users/surya/.gemini/antigravity/brain/b64e5132-fd03-4506-a650-7ca876fd4f3b/media__colleges_scholarships.png", full_page=False)


        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
