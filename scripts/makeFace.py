from PIL import Image, ImageDraw
import numpy as np

def image_to_pointillism(image_path, output_path, threshold=128):
    # Load the image
    original_image = Image.open(image_path)
    gray_image = original_image.convert("L")

    # Create a canvas
    canvas = Image.new("RGB", gray_image.size, (0, 0, 0))
    draw = ImageDraw.Draw(canvas)

    # Load the numerals as brush strokes
    numeral_0 = Image.open("../dist/numeral_0.png")
    numeral_1 = Image.open("../dist/numeral_1.png")

    brush_size_x = 15
    brush_size_y = 18

    # Iterate over image regions and place numerals based on intensity
    for y in range(0, gray_image.height, brush_size_y):
        for x in range(0, gray_image.width, brush_size_x):
            box = (x, y, x + brush_size_x, y + brush_size_y)
            region = gray_image.crop(box)
            average_color = int(np.mean(region))

            if average_color < threshold:
                draw.bitmap((x,y), numeral_0, fill=(0, 128, 0))
            else:
                draw.bitmap((x, y), numeral_1, fill=(0, 255, 0))

    # Save or display the result
    canvas.save(output_path)
    canvas.show()

image_to_pointillism("../dist/source.jpg", "../dist/face.png", 128)
