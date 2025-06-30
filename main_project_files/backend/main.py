from fastapi import FastAPI, HTTPException
# D:\Coding++\sigma_web_dev\projectsWorking\code-execution-engine\backend\venv\Scripts\python.exe
from pydantic import BaseModel 
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import tempfile
import os

app = FastAPI()
class CodeRequest(BaseModel):
    code: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
@app.get("/")
def read_root():
    return {"message": "this is working (maybe)"}

@app.post("/run")
def run_code(request: CodeRequest):
    # 1. Save code to temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".py") as tmp:
        tmp.write(request.code.encode('utf-8'))
        tmp_filename = tmp.name
    # 2. Run the code
    try:
        result = subprocess.run(
            ["python", tmp_filename],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=5  # prevent infinite loops
        )
        output = result.stdout.decode("utf-8")
        errors = result.stderr.decode("utf-8")
        return {"output": output, "errors": errors}
    finally:
        os.unlink(tmp_filename) 
    # 3. Return output and errors
    # pass
