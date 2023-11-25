from PIL import Image, ImageDraw

# Create a 10x12 pixel image with a transparent background
numeral_0 = Image.new("RGBA", (10, 12), (0, 0, 0, 0))
draw = ImageDraw.Draw(numeral_0)

# Draw the "0" in the center
draw.text((1, 0), "0", fill=(0, 0, 0), font_size=10)

# Save the image
numeral_0.save("../dist/numeral_0.png")