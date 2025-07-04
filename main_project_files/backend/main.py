# # uvicorn main:app --reload --port 8000
# # D:\Coding++\sigma_web_dev\projectsWorking\Code-Execution-Engine\main_project_files\backend\venv\Scripts\python.exe
# from fastapi import FastAPI, HTTPException # type: ignore
# from pydantic import BaseModel  # type: ignore
# from fastapi.middleware.cors import CORSMiddleware # type: ignore
# import subprocess
# import tempfile
# import os
# from typing import List, Optional, Literal

# app = FastAPI()
    
# class CodeRequest(BaseModel):
#     code: str
#     language: Literal['Python', 'C++']
#     input: str = ""
#     expected_output: Optional[str] = None

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,  
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# def read_root():
#     return {"message": "this is working (maybe)"}

# @app.post("/run")
# def run_code(request: CodeRequest):
    
#     if (request.language == 'Python'):
#         suffix = '.py'
#         command = ["Python"]
#     elif request.language == 'C++':
#         suffix = '.cpp'
#         command = ['C++']
#     else: 
#         raise HTTPException(status_code=400, detail = "Unsupported Language.")
    
#     with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
#         tmp.write(request.code.encode('utf-8'))
#         tmp_filename = tmp.name

#     try:
#         if (request.language == 'Python'): 
#             result = subprocess.run(
#                 ["python", tmp_filename],
#                 input=request.input.encode("utf-8"),
#                 stdout=subprocess.PIPE,
#                 stderr=subprocess.PIPE,
#                 timeout=5
#             )
            
#         elif request.language == 'C++':
#             compiled_binary = tmp_filename + '.out'
#             compile_result = subprocess.run(
#                 ["g++", tmp_filename, '-o', compiled_binary],
#                 stdout = subprocess.PIPE,
#                 stderr = subprocess.PIPE
#             )
#             if (compile_result.returncode != 0):
#                 os.unlink(tmp_filename)
#                 return{
#                     'output': "",
#                     'errors': compile_result.stderr.decode('utf-8')
#                     # 'passed': False if request.expected_output else None
#                 }
#             result = subprocess.run(
#                 [compiled_binary],
#                 input = request.input.encode("utf-8"),
#                 stdout=subprocess.PIPE,
#                 stderr=subprocess.PIPE,
#                 timeout=5
#             )
            
#         actual_output = result.stdout.decode("utf-8").strip()
#         errors = result.stderr.decode("utf-8").strip()

#         passed = None
#         if request.expected_output is not None:
#             passed = (actual_output == request.expected_output.strip()) and not errors
#         else:
#             passed = None
            
#         return {
#             "output": actual_output,
#             "errors": errors,
#             "passed": passed
#         }

#     except subprocess.TimeoutExpired:
#         return {
#             "output": "",
#             "errors": "Execution timed out.",
#             "passed": False if request.expected_output else None
#         }
#     finally:
#         os.unlink(tmp_filename)
#         if request.language == 'C++':
#             try:
#                 os.unlink(compiled_binary)
#             except:
#                 pass


from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import tempfile
import os
from typing import Optional, Literal

app = FastAPI()

class CodeRequest(BaseModel):
    code: str
    language: Literal["python", "cpp"]
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
    if request.language == "python":
        suffix = ".py"
    elif request.language == "cpp":
        suffix = ".cpp"
    else:
        raise HTTPException(status_code=400, detail="Unsupported language")

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(request.code.encode("utf-8"))
        tmp_filename = tmp.name

    try:
        if request.language == "python":
            result = subprocess.run(
                ["python", tmp_filename],
                input=request.input.encode("utf-8"),
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=5
            )
        elif request.language == "cpp":
            compiled_binary = tmp_filename + ".out"
            compile_result = subprocess.run(
                ["g++", tmp_filename, "-o", compiled_binary],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )

            if compile_result.returncode != 0:
                os.unlink(tmp_filename)
                return {
                    "output": "",
                    "errors": compile_result.stderr.decode("utf-8"),
                    "passed": False if request.expected_output else None
                }

            result = subprocess.run(
                [compiled_binary],
                input=request.input.encode("utf-8"),
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=5
            )
        else:
            raise HTTPException(status_code=400, detail="Invalid language.")

        actual_output = result.stdout.decode("utf-8").strip()
        errors = result.stderr.decode("utf-8").strip()

        passed = None
        if request.expected_output is not None:
            passed = (actual_output == request.expected_output.strip()) and not errors

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
        if request.language == "cpp":
            try:
                os.unlink(compiled_binary)
            except:
                pass
