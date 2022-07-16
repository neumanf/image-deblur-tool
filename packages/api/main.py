import uvicorn
import os
from fastapi import FastAPI, File
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from deblur import ImageDeblur

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=[
    "*"], allow_methods=["POST"], allow_headers=["*"])


@app.post("/api/deblur")
async def deblur_image(d: int = 0, snr: int = 0, angle: int = None, image: bytes = File(...)):
    imageDeblurer = ImageDeblur(d, snr, angle)
    res = imageDeblurer.deblur(image)

    return StreamingResponse(res, media_type="image/png")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv(
        "PORT", default=5000)), log_level="info")
