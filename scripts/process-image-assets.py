from pathlib import Path
from collections import deque

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"


def make_portrait_cutout(source: Path, destination: Path) -> None:
    image = Image.open(source).convert("RGB")
    pixels = np.asarray(image).copy()

    channel_min = pixels.min(axis=2)
    channel_max = pixels.max(axis=2)

    neutral_light = (channel_min > 205) & ((channel_max - channel_min) < 34)
    candidate = Image.fromarray((neutral_light * 255).astype(np.uint8), mode="L").copy()
    ImageDraw.floodfill(candidate, (0, 0), 128, thresh=0)
    ImageDraw.floodfill(candidate, (image.width - 1, 0), 128, thresh=0)
    connected_background = np.asarray(candidate) == 128

    alpha_array = np.full(channel_min.shape, 255, dtype=np.uint8)
    feathered = np.clip((242 - channel_min.astype(np.int16)) * 12, 0, 255).astype(np.uint8)
    alpha_array[connected_background] = feathered[connected_background]
    alpha = Image.fromarray(alpha_array, mode="L").filter(ImageFilter.GaussianBlur(radius=0.55))

    red = pixels[:, :, 0].astype(np.float32)
    green = pixels[:, :, 1].astype(np.float32)
    blue = pixels[:, :, 2].astype(np.float32)
    suit = (
        (alpha_array > 220)
        & (blue > red * 1.2)
        & (blue > green * 1.06)
        & (channel_max < 175)
    )

    recolored = pixels.astype(np.float32)
    recolored[:, :, 0][suit] = red[suit] * 0.5 + blue[suit] * 0.38
    recolored[:, :, 1][suit] = green[suit] * 0.72
    recolored[:, :, 2][suit] = blue[suit] * 1.08 + red[suit] * 0.08
    recolored = np.clip(recolored, 0, 255).astype(np.uint8)

    output = Image.fromarray(recolored, mode="RGB").convert("RGBA")
    output.putalpha(alpha)
    output.save(destination)


def make_ink_transparent(source: Path, destination: Path) -> None:
    image = Image.open(source).convert("RGBA")
    pixels = np.asarray(image).copy()
    rgb = pixels[:, :, :3].astype(np.float32)
    luminance = 0.2126 * rgb[:, :, 0] + 0.7152 * rgb[:, :, 1] + 0.0722 * rgb[:, :, 2]
    alpha = np.clip((248 - luminance) * 5.0, 0, 255).astype(np.uint8)
    pixels[:, :, 3] = alpha
    Image.fromarray(pixels, mode="RGBA").save(destination)


def make_reference_ink_transparent(
    source: Path,
    destination: Path,
    scale: int = 4,
    neutral_only: bool = False,
) -> None:
    """Preserve reference lettering while removing its pale paper background."""
    image = Image.open(source).convert("RGBA")
    image = image.resize(
        (image.width * scale, image.height * scale),
        Image.Resampling.LANCZOS,
    ).filter(ImageFilter.UnsharpMask(radius=1.15, percent=155, threshold=2))

    pixels = np.asarray(image).copy()
    rgb = pixels[:, :, :3].astype(np.float32)
    luminance = 0.2126 * rgb[:, :, 0] + 0.7152 * rgb[:, :, 1] + 0.0722 * rgb[:, :, 2]
    alpha = np.clip((240 - luminance) * 10.0, 0, 255)
    if neutral_only:
        chroma = rgb.max(axis=2) - rgb.min(axis=2)
        neutral_mask = np.clip((58 - chroma) / 18, 0, 1)
        alpha *= neutral_mask
    alpha = alpha.astype(np.uint8)
    if neutral_only:
        # The source crop brushes the descender of the serif headline above it.
        # Remove only ink connected to the crop's top edge; the handwritten note
        # itself begins lower and remains untouched.
        ink = alpha > 20
        seen = np.zeros_like(ink, dtype=bool)
        queue = deque((0, x) for x in np.flatnonzero(ink[0]))
        for y, x in queue:
            seen[y, x] = True
        while queue:
            y, x = queue.popleft()
            for next_y in range(max(0, y - 1), min(ink.shape[0], y + 2)):
                for next_x in range(max(0, x - 1), min(ink.shape[1], x + 2)):
                    if ink[next_y, next_x] and not seen[next_y, next_x]:
                        seen[next_y, next_x] = True
                        queue.append((next_y, next_x))
        alpha[seen] = 0
        # Clear the remaining isolated serif remnant above "tools" without
        # touching the nearby handwritten ascender.
        alpha[0:58, 1080:1260] = 0
    pixels[:, :, 3] = alpha
    Image.fromarray(pixels, mode="RGBA").save(destination, optimize=True)


def make_hires_reference(source: Path, destination: Path, scale: int = 4) -> None:
    image = Image.open(source).convert("RGB")
    image = image.resize(
        (image.width * scale, image.height * scale),
        Image.Resampling.LANCZOS,
    )
    image = ImageEnhance.Contrast(image).enhance(1.01)
    image = image.filter(ImageFilter.UnsharpMask(radius=1.25, percent=150, threshold=2))
    image.save(destination, quality=96, optimize=True)


make_portrait_cutout(
    ASSETS / "benjamin-wick-headshot.jpg",
    ASSETS / "benjamin-wick-cutout.png",
)
make_ink_transparent(
    ASSETS / "bkw-signature-lockup.png",
    ASSETS / "bkw-signature-lockup-transparent.png",
)
make_ink_transparent(
    ASSETS / "bkw-signature-mark.png",
    ASSETS / "bkw-signature-mark-transparent.png",
)
make_reference_ink_transparent(
    ASSETS / "signature-lockup-reference.png",
    ASSETS / "signature-lockup-hires-transparent.png",
)
make_reference_ink_transparent(
    ASSETS / "process-before-tools-reference.png",
    ASSETS / "process-before-tools.png",
    neutral_only=True,
)
make_hires_reference(
    ASSETS / "tyria-operating-model.png",
    ASSETS / "tyria-operating-model-hires.jpg",
)
