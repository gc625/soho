import re, os, html as htmllib, urllib.request, ssl

BASE = "http://www.sohoprintingpress.com"
SRC = "/tmp/soho_index.html"
OUT = "/home/gabriel/soho/listings"

html = open(SRC, encoding="utf-8", errors="ignore").read()
clean = lambda s: re.sub(r"\s+", " ", htmllib.unescape(re.sub(r"<[^>]+>", "", s))).strip()

# grid order = modal 1..9
grid = re.findall(
    r"class='thumbnail_heading'[^>]*>(.*?)</div>\s*<div class='thumbnail_desc'[^>]*>(.*?)</div>",
    html, re.S)
print("grid items:", len(grid))

parts = re.split(r"<div id='myModal_(\d+)'", html)
mods = {int(parts[i]): parts[i + 1] for i in range(1, len(parts), 2)}
print("modals:", sorted(mods))

os.makedirs(OUT, exist_ok=True)
for n in range(1, 10):
    name, spec = clean(grid[n - 1][0]), clean(grid[n - 1][1])
    body = mods[n]
    overviews = [clean(o) for o in re.findall(r"class='overview'[^>]*>(.*?)</div>", body, re.S)]
    imgs = re.findall(r"""src\s*=\s*['"]([^'"]+\.(?:jpe?g|png|gif|webp))['"]""", body, flags=re.I)
    seen, uniq = set(), []
    for u in imgs:
        if u not in seen:
            seen.add(u); uniq.append(u)
    slug = re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_")
    d = os.path.join(OUT, f"{n:02d}_{slug}")
    os.makedirs(d, exist_ok=True)
    print(f"\n[{n}] {name} | spec={spec!r} | overviews={len(overviews)} {[len(o) for o in overviews]} | photos={len(uniq)}")
    for o in overviews:
        print("    OV:", o[:200])
    md = [f"# {name}", "", f"**Details:** {spec}", "",
          f"**Source:** {BASE} (listing {n} of 9)", ""]
    for i, o in enumerate(overviews):
        md += [f"## Description{'' if len(overviews)==1 else f' {i+1}'}", "", o, ""]
    md += [f"## Photos ({len(uniq)})", ""]
    for i, u in enumerate(uniq, 1):
        md.append(f"- {i:02d}.jpg (from `{u}`)")
    open(os.path.join(d, "description.md"), "w").write("\n".join(md) + "\n")
    for i, u in enumerate(uniq, 1):
        url = u if u.startswith("http") else f"{BASE}/{u}"
        dest = os.path.join(d, f"{i:02d}.jpg")
        if not os.path.exists(dest) or os.path.getsize(dest) == 0:
            try:
                urllib.request.urlretrieve(url, dest)
                print(f"    got {i:02d}.jpg ({os.path.getsize(dest)//1024}KB)")
            except Exception as e:
                print(f"    FAIL {url}: {e}")
print("\nDONE")
