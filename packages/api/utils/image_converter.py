import io
import numpy as np
import cv2 as cv


class ImageConverter:
    def from_bytes_to_image(bytes):
        image_stream = io.BytesIO(bytes)
        image_stream.seek(0)
        file_bytes = np.asarray(bytearray(image_stream.read()), dtype=np.uint8)
        frame = cv.imdecode(file_bytes, cv.IMREAD_GRAYSCALE)
        return frame

    def from_image_to_bytes(image):
        res, im_png = cv.imencode(".png", image)
        return io.BytesIO(im_png.tobytes())
