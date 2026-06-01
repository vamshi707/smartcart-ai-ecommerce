import cv2
import requests
import os


def download_image(url, filename):

    try:

        response = requests.get(url, timeout=10)

        if response.status_code == 200:

            with open(filename, "wb") as f:

                f.write(response.content)

            return filename

    except Exception as e:

        print("Download Error:", e)

    return None


def generate_room(room_image_path, products):

    room = cv2.imread(room_image_path)

    if room is None:
        print("Room image not found")
        return None

    height, width = room.shape[:2]

    for item in products:

        furniture_url = item.image

        temp_file = f"temp_{item.id}.png"

        furniture_path = download_image(
            furniture_url,
            temp_file
        )

        if not furniture_path:
            continue

        furniture = cv2.imread(
            furniture_path,
            cv2.IMREAD_UNCHANGED
        )

        if furniture is None:
            continue

        name = item.name.lower()

        # BIGGER REALISTIC SIZES

        if "bed" in name:

            fw = 420
            fh = 260

        elif "sofa" in name:

            fw = 220
            fh = 180

        elif "wardrobe" in name:

            fw = 180
            fh = 300

        elif "table" in name:

            fw = 120
            fh = 100

        elif "lamp" in name:

            fw = 60
            fh = 100

        else:

            fw = 120
            fh = 120

        furniture = cv2.resize(
            furniture,
            (fw, fh)
        )

        # BETTER ROOM LAYOUT

        if "bed" in name:

            x = width // 2 - fw // 2
            y = height - fh - 20

        elif "sofa" in name:

            x = 50
            y = height - fh - 40

        elif "wardrobe" in name:

            x = width - fw - 50
            y = height - fh - 30

        elif "lamp" in name:

            x = width // 2 + 140
            y = height - fh - 130

        elif "table" in name:

            x = width // 2 + 80
            y = height - fh - 40

        else:

            x = 50
            y = height - fh - 40

        # BOUNDARY CHECK

        if (
            x >= 0 and
            y >= 0 and
            x + fw <= width and
            y + fh <= height
        ):

            if len(furniture.shape) == 3 and furniture.shape[2] == 4:

                alpha = furniture[:, :, 3] / 255.0

                for c in range(3):

                    room[
                        y:y+fh,
                        x:x+fw,
                        c
                    ] = (

                        alpha * furniture[:, :, c]
                        +

                        (1 - alpha) *
                        room[
                            y:y+fh,
                            x:x+fw,
                            c
                        ]

                    )

            else:

                room[
                    y:y+fh,
                    x:x+fw
                ] = furniture[:, :, :3]

    output_path = os.path.join(
        "media",
        "generated_room.jpg"
    )

    cv2.imwrite(
        output_path,
        room
    )

    return output_path