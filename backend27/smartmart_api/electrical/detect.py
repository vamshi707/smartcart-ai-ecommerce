from ultralytics import YOLO

import cv2

# LOAD YOLO MODEL

model = YOLO("yolov8n.pt")


def detect_hardware_ai(image_path):

    # RUN YOLO

    results = model(image_path)

    detected_category = "Unknown"

    confidence = 0

    # LOAD IMAGE

    image = cv2.imread(image_path)

    # CHECK IMAGE

    if image is None:

        return {

            "category": "Unknown",

            "confidence": 0,

            "length_mm": 0,

            "diameter_mm": 0,

        }

    height, width, _ = image.shape

    # DEFAULT VALUES

    length_mm = 0

    diameter_mm = 0

    # DETECT OBJECTS

    for result in results:

        boxes = result.boxes

        names = result.names

        for box in boxes:

            # IGNORE LOW CONFIDENCE

            if float(box.conf[0]) < 0.5:

                continue

            class_id = int(box.cls[0])

            detected_category = names[class_id]

            confidence = float(box.conf[0]) * 100

            # BOUNDING BOX

            x1, y1, x2, y2 = map(

                int,

                box.xyxy[0]

            )

            # OBJECT SIZE IN PIXELS

            object_width = x2 - x1

            object_height = y2 - y1

            # TEMP PIXEL → MM LOGIC

            length_mm = round(object_height / 10)

            diameter_mm = round(object_width / 10)

    return {

        "category": detected_category,

        "confidence": round(confidence, 2),

        "length_mm": length_mm,

        "diameter_mm": diameter_mm,

    }