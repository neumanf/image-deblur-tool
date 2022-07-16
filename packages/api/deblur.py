import numpy as np
import cv2 as cv
from utils.image_converter import ImageConverter


class ImageDeblur:
    def __init__(self, d, snr, angle):
        self.d = d
        self.snr = snr
        self.angle = angle

    def blur_edge(self, img, d=31):
        h, w = img.shape[:2]
        img_pad = cv.copyMakeBorder(img, d, d, d, d, cv.BORDER_WRAP)
        img_blur = cv.GaussianBlur(img_pad, (2*d+1, 2*d+1), -1)[d:-d, d:-d]
        y, x = np.indices((h, w))
        dist = np.dstack([x, w-x-1, y, h-y-1]).min(-1)
        w = np.minimum(np.float32(dist)/d, 1.0)
        return img*w + img_blur*(1-w)

    def defocus_kernel(self, d, sz=65):
        kern = np.zeros((sz, sz), np.uint8)
        cv.circle(kern, (sz, sz), d, 255, -1, cv.LINE_AA, shift=1)
        kern = np.float32(kern) / 255.0
        return kern

    def motion_kernel(self, angle, d, sz=65):
        kern = np.ones((1, d), np.float32)
        c, s = np.cos(angle), np.sin(angle)
        A = np.float32([[c, -s, 0], [s, c, 0]])
        sz2 = sz // 2
        A[:, 2] = (sz2, sz2) - np.dot(A[:, :2], ((d-1)*0.5, 0))
        kern = cv.warpAffine(kern, A, (sz, sz), flags=cv.INTER_CUBIC)
        return kern

    def deblur(self, image):
        img = ImageConverter.from_bytes_to_image(image)
        img = np.float32(img)/255.0
        img = self.blur_edge(img)
        IMG = cv.dft(img, flags=cv.DFT_COMPLEX_OUTPUT)

        d = self.d
        noise = 10**(-0.1*self.snr)

        if self.angle is not None:
            angle = np.deg2rad(self.angle)
            psf = self.motion_kernel(angle, d)
        else:
            psf = self.defocus_kernel(d)

        psf /= psf.sum()
        psf_pad = np.zeros_like(img)
        kh, kw = psf.shape
        psf_pad[:kh, :kw] = psf
        PSF = cv.dft(psf_pad, flags=cv.DFT_COMPLEX_OUTPUT, nonzeroRows=kh)
        PSF2 = (PSF**2).sum(-1)
        iPSF = PSF / (PSF2 + noise)[..., np.newaxis]
        RES = cv.mulSpectrums(IMG, iPSF, 0)
        res = cv.idft(RES, flags=cv.DFT_SCALE | cv.DFT_REAL_OUTPUT)
        res = np.roll(res, -kh//2, 0)
        res = np.roll(res, -kw//2, 1)
        res = ImageConverter.from_image_to_bytes(255*res)

        return res
