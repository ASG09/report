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

@app.post("/upload-cv")
async def upload_cv(file: UploadFile = File(...)):
    content = await file.read()

    return JSONResponse(content={
        "filename": file.filename,
        "content_type": file.content_type,
        "file_size": len(content)
    })
