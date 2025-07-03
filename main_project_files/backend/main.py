# uvicorn main:app --reload --port 8000
# D:\Coding++\sigma_web_dev\projectsWorking\Code-Execution-Engine\main_project_files\backend\venv\Scripts\python.exe
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel 
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import tempfile
import os
from typing import List, Optional

app = FastAPI()
    
class CodeRequest(BaseModel):
    code: str
    input: str = ""
    expected_output: Optional[str] = None

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
    with tempfile.NamedTemporaryFile(delete=False, suffix=".py") as tmp:
        tmp.write(request.code.encode('utf-8'))
        tmp_filename = tmp.name

    try:
        result = subprocess.run(
            ["python", tmp_filename],
            input=request.input.encode("utf-8"),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=5
        )
        actual_output = result.stdout.decode("utf-8").strip()
        errors = result.stderr.decode("utf-8").strip()

        passed = None
        if request.expected_output is not None:
            passed = (actual_output == request.expected_output.strip()) and not errors
        else:
            passed = None
            
        return {
            "output": actual_output,
            "errors": errors,
            "passed": passed
        }

    except subprocess.TimeoutExpired:
        return {
            "output": "",
            "errors": "Execution timed out.",
            "passed": False if request.expected_output else None
        }
    finally:
        os.unlink(tmp_filename)
