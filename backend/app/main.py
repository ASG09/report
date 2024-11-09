from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Backend is running!"}


@app.post("/create-report")
async def create_report(cv: UploadFile = File(...), template: UploadFile = File(...)):
    cv = await cv.read()
    template = await template.read()

    return JSONResponse(content={
        "success": True,
    })
