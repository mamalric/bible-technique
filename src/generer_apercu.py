"""Fabrique les images de la bible pour les liens et les téléphones.

    python src/generer_apercu.py

- apercu.jpg (1200 x 630), tiré de src/apercu.html : l'image d'aperçu que montrent
  Teams, Outlook, WhatsApp... quand on colle le lien de la bible ;
- apple-touch-icon.png (180 x 180), tiré de src/icone-ios.html : l'icône d'écran d'accueil.

Le rendu passe par le Chromium de Playwright (pip install playwright, puis
playwright install chromium), la conversion en JPEG par Pillow. Les deux images sont écrites à la racine du site.
"""
import pathlib
import shutil
import sys
import tempfile

from PIL import Image
from playwright.sync_api import sync_playwright

RACINE = pathlib.Path(__file__).resolve().parent.parent


def capturer(page, source, largeur, hauteur, sortie_png):
    page.set_viewport_size({"width": largeur, "height": hauteur})
    page.goto(source.as_uri())
    page.wait_for_load_state("networkidle")
    page.screenshot(path=str(sortie_png))
    image = Image.open(sortie_png).convert("RGB")
    if image.size != (largeur, hauteur):
        sys.exit("%s : capture de %s au lieu de %dx%d" % (source.name, image.size, largeur, hauteur))
    return image


def main():
    temp = pathlib.Path(tempfile.mkdtemp(prefix="bible-apercu-"))
    try:
        with sync_playwright() as pw:
            navigateur = pw.chromium.launch()
            page = navigateur.new_page(device_scale_factor=1)
            apercu = capturer(page, RACINE / "src" / "apercu.html", 1200, 630, temp / "apercu.png")
            icone = capturer(page, RACINE / "src" / "icone-ios.html", 180, 180, temp / "icone.png")
            navigateur.close()
        apercu.save(RACINE / "apercu.jpg", "JPEG", quality=90, optimize=True, progressive=True)
        icone.save(RACINE / "apple-touch-icon.png", "PNG", optimize=True)
    finally:
        shutil.rmtree(temp, ignore_errors=True)
    for nom in ("apercu.jpg", "apple-touch-icon.png"):
        f = RACINE / nom
        print("%s : %s, %d ko" % (nom, Image.open(f).size, f.stat().st_size // 1024))


if __name__ == "__main__":
    main()
