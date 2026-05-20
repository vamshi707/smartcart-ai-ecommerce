import cv2
import os


def detect_hardware_ai(image_path):

    # LOAD IMAGE

    image = cv2.imread(image_path)

    # CHECK IMAGE

    if image is None:

        return {

            "category": "Unknown",

            "confidence": 0,

            "length_mm": 0,

            "diameter_mm": 0,

            "output_image": ""

        }

    # COPY IMAGE

    output_image = image.copy()

    # CONVERT TO GRAY

    gray = cv2.cvtColor(

        image,

        cv2.COLOR_BGR2GRAY

    )

    # BLUR IMAGE

    blur = cv2.GaussianBlur(

        gray,

        (5, 5),

        0

    )

    # THRESHOLD

    _, thresh = cv2.threshold(

        blur,

        180,

        255,

        cv2.THRESH_BINARY_INV

    )

    # FIND CONTOURS

    contours, _ = cv2.findContours(

        thresh,

        cv2.RETR_EXTERNAL,

        cv2.CHAIN_APPROX_SIMPLE

    )

    detected_category = "Screw"

    confidence = 95

    length_mm = 0

    diameter_mm = 0

    # FILTER CONTOURS

    filtered_contours = [

        c for c in contours

        if cv2.contourArea(c) > 500

    ]

    print("TOTAL:", len(contours))

    print("FILTERED:", len(filtered_contours))

    # FIND BIGGEST OBJECT

    if filtered_contours:

        biggest_contour = max(

            filtered_contours,

            key=cv2.contourArea

        )

        x, y, w, h = cv2.boundingRect(

            biggest_contour

        )

        # PIXEL TO MM

        length_mm = round(h / 8)

        diameter_mm = round(w / 20)

        # GREEN RECTANGLE

        cv2.rectangle(

            output_image,

            (x, y),

            (x + w, y + h),

            (0, 255, 0),

            8

        )

        # LENGTH LINE

        cv2.line(

            output_image,

            (x + w + 20, y),

            (x + w + 20, y + h),

            (255, 0, 0),

            6

        )

        # DIAMETER LINE

        cv2.line(

            output_image,

            (x, y + h + 20),

            (x + w, y + h + 20),

            (0, 0, 255),

            6

        )

        # LENGTH TEXT

        cv2.putText(

            output_image,

            f"Length: {length_mm}MM",

            (40, 80),

            cv2.FONT_HERSHEY_SIMPLEX,

            1.5,

            (255, 0, 0),

            4

        )

        # DIAMETER TEXT

        cv2.putText(

            output_image,

            f"Diameter: {diameter_mm}MM",

            (40, 150),

            cv2.FONT_HERSHEY_SIMPLEX,

            1.5,

            (0, 0, 255),

            4

        )

        # DRAW CENTER POINT

        center_x = x + w // 2

        center_y = y + h // 2

        cv2.circle(

            output_image,

            (center_x, center_y),

            15,

            (0, 255, 255),

            -1

        )

    # CREATE MEDIA FOLDER

    os.makedirs(

        "media",

        exist_ok=True

    )

    # SAVE OUTPUT IMAGE

    output_path = os.path.join(

        "media",

        "detected_output.png"

    )

    cv2.imwrite(

        output_path,

        output_image

    )

    print("IMAGE SAVED")

    print("PATH:", output_path)

    return {

        "category": detected_category,

        "confidence": confidence,

        "length_mm": length_mm,

        "diameter_mm": diameter_mm,

        "output_image": output_path

    }