from PIL import Image
import sys

def remove_white_bg(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # If the pixel is very close to white, make it transparent
            # Also blending the alpha could be better, but we do simple cutoff
            if item[0] > 230 and item[1] > 230 and item[2] > 230:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print("Success")
    except Exception as e:
        print("Error:", e)

remove_white_bg(sys.argv[1], sys.argv[2])
