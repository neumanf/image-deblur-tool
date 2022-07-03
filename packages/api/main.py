import uvicorn
from fastapi import FastAPI, File
from fastapi.responses import StreamingResponse
from deblur import ImageDeblur

app = FastAPI()


@app.post("/api/deblur")
async def deblur_image(image: bytes = File(...)):
    imageDeblurer = ImageDeblur(d=22, snr=25)
    res = imageDeblurer.deblur(image)

    return StreamingResponse(res, media_type="image/png")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=os.getenv(
        "PORT", default=5000), log_level="info")
