from PIL import Image, ImageDraw

# Create a 10x12 pixel image with a transparent background
numeral_1 = Image.new("RGBA", (10, 12), (0, 0, 0, 0))
draw = ImageDraw.Draw(numeral_1)

# Draw the "1" in the center
draw.text((1, 0), "1", fill=(0, 0, 0), font_size=10)

# Save the image
numeral_1.save("../dist/numeral_1.png")