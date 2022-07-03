from fastapi import FastAPI, File
from fastapi.responses import StreamingResponse
from deblur import ImageDeblur

app = FastAPI()


@app.post("/api/deblur")
async def deblur_image(image: bytes = File(...)):
    imageDeblurer = ImageDeblur(d=22, snr=25)
    res = imageDeblurer.deblur(image)

    return StreamingResponse(res, media_type="image/png")
