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
async def deblur_image(r: int = 0, snr: int = 0, image: bytes = File(...)):
    imageDeblurer = ImageDeblur(r, snr)
    res = imageDeblurer.deblur(image)

    return StreamingResponse(res, media_type="image/png")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=os.getenv(
        "PORT", default=5000), log_level="info")
