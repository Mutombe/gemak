"""
Gemak Security Shop — Product Image Fetcher
Searches for product images via Bing, removes backgrounds (if rembg available),
and saves as optimized PNGs in public/products/.
"""

import os
import re
import sys
import time
import json
import random
import requests
from io import BytesIO
from pathlib import Path
from urllib.parse import quote_plus
from PIL import Image, ImageOps

# Try importing rembg
try:
    from rembg import remove as rembg_remove
    HAS_REMBG = True
    print("[+] rembg available — backgrounds will be removed")
except Exception:
    HAS_REMBG = False
    print("[!] rembg not available — images will be cleaned up without bg removal")

# ── Config ──
PUBLIC_DIR = Path(__file__).parent / "public" / "products"
SITEDATA_PATH = Path(__file__).parent / "src" / "data" / "siteData.js"
PUBLIC_DIR.mkdir(parents=True, exist_ok=True)

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
]

# Better search terms per category
CATEGORY_HINTS = {
    "CCTV Cameras": "CCTV security camera product",
    "Alarms": "security alarm system product",
    "Self Defense": "self defense product",
    "Spy Cameras": "hidden spy camera product",
    "Dashboard Cameras": "dash cam dashcam product",
    "Trackers": "GPS tracker device product",
    "Detectors": "security detector product",
    "Flashlights": "LED flashlight torch product",
    "Money Accessories": "money counter detector product",
    "Guard Equipment": "security guard equipment product",
    "Footwear": "tactical security boots product",
    "Communication": "walkie talkie two way radio product",
    "Accessories": "CCTV accessory product",
    "Gate Automation": "automatic gate motor product",
}

# Specific overrides for products with ambiguous names
NAME_OVERRIDES = {
    "P29 Magazine": "pistol magazine holder pouch",
    "F92 Magazine": "pistol magazine pouch tactical",
    "Tactical Belt": "tactical belt black security product",
    "Duty Belt": "police duty belt product",
    "Inner Belt": "inner belt nylon security product",
    "Combat Belt": "military combat belt product",
    "Reflective Vest": "reflective vest high visibility security product",
    "Beret": "security beret black product",
    "Peak Cap": "security peak cap black product",
    "Epaulettes (Pair)": "security epaulettes shoulder product",
    "Lanyard": "security lanyard cord product",
    "Whistle": "metal whistle product",
    "Rain Suit": "rain suit waterproof security product",
    "Rain Coat": "rain coat waterproof black product",
    "Combat Shirt (Long Sleeve)": "tactical combat shirt long sleeve black product",
    "Combat Shirt (Short Sleeve)": "tactical combat shirt short sleeve black product",
    "Combat Trousers": "tactical combat trousers black cargo product",
    "Security Jersey": "security pullover jersey black product",
    "Security Golf Shirt": "security polo shirt product",
    "Baton": "expandable security baton product",
    "Handcuff Pouch": "handcuff pouch leather product",
    "Handcuffs": "steel handcuffs product",
    "Tonfa": "security tonfa baton product",
    "Baton Holder": "baton holder ring product",
    "Guard Boots": "security guard boots product",
    "Security Boots": "tactical security boots product",
    "Compound Alarm": "perimeter compound alarm product",
    "PIR Detector": "PIR passive infrared detector product",
    "Microwave Detector": "microwave motion detector product",
    "Panic Button": "emergency panic button product",
    "Siren": "security alarm siren product",
    "Strobe Light": "security strobe light alarm product",
    "UV Flashlight": "UV ultraviolet flashlight product",
    "Junction Box": "CCTV junction box white product",
    "1TB Hard Drive": "surveillance hard drive 1TB product",
    "Bill Counter": "money bill counter machine product",
    "UV Money Lamp": "UV money detector lamp product",
    "Banknote Tester Pen": "counterfeit money tester pen product",
    "Spy Wall Clock": "hidden camera wall clock product",
    "Spy Pen": "spy pen camera product",
    "Spy Glasses": "spy camera glasses product",
    "Lipstick Pepper Spray": "lipstick pepper spray product",
    "Stun Gun Flashlight": "stun gun flashlight taser product",
    "2-in-1 Money Detector": "money detector UV MG product",
    "Money Detector iR/MG/UV/WM": "money detector machine product",
    "Portable Money Counter": "portable money counter product",
    "Cash Register Box": "cash register money box product",
    "Cash Register Box (Small)": "small cash register box product",
    "Coin Counter": "coin counting machine product",
    "Coin Sorter": "coin sorting machine product",
    "Mini Alarm": "mini security alarm product",
    "Alarm Lock": "alarm padlock security product",
    "Car Alarm": "car alarm system product",
    "Magnetic Door Alarm": "magnetic door alarm sensor product",
    "Solar Alarm Lamp": "solar alarm lamp security product",
    "Window Alarm": "window alarm sensor product",
    "Smoke Detector": "smoke detector alarm product",
    "Gas Detector": "gas leak detector product",
    "Fire Extinguisher (1kg)": "1kg fire extinguisher product",
    "Fire Extinguisher (2kg)": "2kg fire extinguisher product",
    "Fire Extinguisher (4.5kg)": "fire extinguisher 4.5kg product",
    "Fire Extinguisher (9kg)": "fire extinguisher 9kg product",
    "Safety Sign Pack": "safety sign pack fire exit product",
    "Pet Collar Tracker": "pet GPS tracker collar product",
    "Magnetic GPS Tracker": "magnetic GPS tracker car product",
    "Super Scanner Metal Detector": "super scanner handheld metal detector product",
    "Handheld Security Detector": "handheld metal detector wand product",
}


def extract_products(js_path):
    """Parse products from siteData.js that use the LOGO placeholder."""
    data = js_path.read_text(encoding="utf-8")
    products_start = data.find("export const products = [")
    products_end = data.find("];", products_start) + 2
    section = data[products_start:products_end]

    pattern = r'\{\s*id:\s*(\d+),\s*name:\s*"([^"]+)",\s*category:\s*"([^"]+)",[^}]*?image:\s*"([^"]+)"'
    matches = re.findall(pattern, section)

    products = []
    for pid, name, category, image in matches:
        if "LOGO" in image:
            products.append({"id": int(pid), "name": name, "category": category})
    return products


def search_bing_images(query, max_results=8):
    """Search Bing Images and return image URLs."""
    url = "https://www.bing.com/images/search"
    params = {
        "q": query,
        "form": "HDRSC2",
        "first": 1,
    }
    headers = {
        "User-Agent": random.choice(USER_AGENTS),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        "DNT": "1",
    }

    try:
        session = requests.Session()
        resp = session.get(url, params=params, headers=headers, timeout=15)
        resp.raise_for_status()

        # Bing encodes image URLs as HTML entities in iusc elements
        # Pattern: murl&quot;:&quot;https://...&quot;
        urls = re.findall(r'murl&quot;:&quot;(https?://[^&]+)', resp.text)

        # Deduplicate and filter
        seen = set()
        clean = []
        for u in urls:
            u = u.replace("\\u0026", "&").replace("&amp;", "&")
            if u not in seen and any(ext in u.lower() for ext in [".jpg", ".jpeg", ".png", ".webp"]):
                seen.add(u)
                clean.append(u)
        return clean[:max_results]
    except Exception as e:
        print(f"  [!] Bing search error: {e}")
        return []


def search_image_url(product_name, category):
    """Search for a product image using Bing."""
    if product_name in NAME_OVERRIDES:
        query = NAME_OVERRIDES[product_name]
    else:
        hint = CATEGORY_HINTS.get(category, "product")
        query = f"{product_name} {hint}"

    for attempt in range(2):
        urls = search_bing_images(query)
        if urls:
            return urls[0]  # Return the first good result
        if attempt < 1:
            time.sleep(3)
            # Try simpler query on retry
            query = f"{product_name} product"

    return None


def download_image(url, timeout=20):
    """Download image from URL and return PIL Image."""
    headers = {
        "User-Agent": random.choice(USER_AGENTS),
    }
    try:
        resp = requests.get(url, headers=headers, timeout=timeout)
        resp.raise_for_status()
        ct = resp.headers.get("content-type", "")
        if "image" not in ct and "octet" not in ct:
            return None
        img = Image.open(BytesIO(resp.content))
        return img.convert("RGBA")
    except Exception:
        return None


def process_image(img, use_rembg=True):
    """Remove background (if rembg available) and clean up the image."""
    if use_rembg and HAS_REMBG:
        try:
            buf = BytesIO()
            img.save(buf, format="PNG")
            buf.seek(0)
            output = rembg_remove(buf.read())
            img = Image.open(BytesIO(output)).convert("RGBA")
        except Exception as e:
            print(f"  [!] rembg failed: {e}, using original")

    # Resize to max 500px maintaining aspect ratio
    max_size = 500
    if img.width > max_size or img.height > max_size:
        ratio = min(max_size / img.width, max_size / img.height)
        new_size = (int(img.width * ratio), int(img.height * ratio))
        img = img.resize(new_size, Image.LANCZOS)

    # Center on a square transparent canvas
    canvas_size = max(img.width, img.height)
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    x = (canvas_size - img.width) // 2
    y = (canvas_size - img.height) // 2
    canvas.paste(img, (x, y), img)

    return canvas


def save_image(img, product_id, output_dir):
    """Save as optimized PNG."""
    out_path = output_dir / f"{product_id}.png"
    img.save(out_path, "PNG", optimize=True)
    return out_path


def update_sitedata(js_path, product_id):
    """Update product image path in siteData.js."""
    data = js_path.read_text(encoding="utf-8")
    pattern = rf'(id:\s*{product_id},\s*name:\s*"[^"]+",\s*category:\s*"[^"]+",[^}}]*?)image:\s*"[^"]+"'
    replacement = rf'\1image: "/products/{product_id}.png"'
    new_data = re.sub(pattern, replacement, data, count=1)
    if new_data != data:
        js_path.write_text(new_data, encoding="utf-8")
        return True
    return False


def main():
    print("=" * 60)
    print("  Gemak Security Shop — Product Image Fetcher")
    print("=" * 60)

    products = extract_products(SITEDATA_PATH)
    total = len(products)
    print(f"\n  Products needing images: {total}\n")

    success = 0
    failed = 0
    skipped = 0
    failed_products = []

    for i, product in enumerate(products, 1):
        pid = product["id"]
        name = product["name"]
        cat = product["category"]

        # Skip if already processed
        out_file = PUBLIC_DIR / f"{pid}.png"
        if out_file.exists() and out_file.stat().st_size > 1000:
            print(f"[{i}/{total}] SKIP  #{pid} {name}")
            skipped += 1
            # Still update siteData if needed
            update_sitedata(SITEDATA_PATH, pid)
            continue

        print(f"[{i}/{total}] FETCH #{pid} {name} ({cat})")

        # Search
        url = search_image_url(name, cat)
        if not url:
            print(f"  -> No image found")
            failed += 1
            failed_products.append(f"#{pid} {name}")
            time.sleep(2)
            continue

        # Download — try multiple URLs if first fails
        img = download_image(url)
        if img is None:
            # Try getting more URLs from search
            urls = search_bing_images(f"{name} product photo")
            for backup_url in urls[:3]:
                img = download_image(backup_url)
                if img:
                    break

        if img is None:
            print(f"  -> Download failed")
            failed += 1
            failed_products.append(f"#{pid} {name}")
            time.sleep(2)
            continue

        # Process (bg removal + resize + center)
        print(f"  -> Processing...")
        result = process_image(img, use_rembg=HAS_REMBG)

        # Save
        save_path = save_image(result, pid, PUBLIC_DIR)
        file_size = save_path.stat().st_size / 1024
        print(f"  -> Saved {save_path.name} ({file_size:.0f} KB)")

        # Update data
        update_sitedata(SITEDATA_PATH, pid)

        success += 1

        # Rate limit — random delay 3-6 seconds
        delay = random.uniform(3, 6)
        time.sleep(delay)

    # Summary
    print("\n" + "=" * 60)
    print(f"  RESULTS:")
    print(f"    Success:  {success}")
    print(f"    Skipped:  {skipped}")
    print(f"    Failed:   {failed}")
    if failed_products:
        print(f"\n  Failed products:")
        for fp in failed_products:
            print(f"    - {fp}")
    print(f"\n  Images saved to: {PUBLIC_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    main()
