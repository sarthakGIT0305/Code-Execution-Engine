import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function CodeEditor() {
  const [code, setCode] = useState("print('Wassup Warudo!')");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  // const [testCases, setTestCases] = useState(`[
  //   {
  //     "input": "", 
  //     "expected_output": ""
  //   }
  // ]`);

  const runCode = async () => {
    setLoading(true);
    setErrors("");
    setOutput("");
    try {
      const response = await axios.post("http://localhost:8000/run", { code, test_cases: JSON.parse(testCases) });
      setOutput(response.data.output);
      setErrors(response.data.errors);
    } catch (err) {
      setErrors("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Python Code Runner</h2>
      <Editor
        height="300px"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value)}
      />
      <textarea
        placeholder="Enter test cases as JSON"
        value={testCases}
        onChange={(e) => setTestCases(e.target.value)}
        style={{ width: "100%", height: "150px", marginTop: "10px" }}
      />
      <button onClick={runCode}
        disabled={loading}
        style={{
          marginTop: "10px",
          opacity: loading ? 0.5 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}>
        ▶️ Run Code
      </button>
      {loading && (
        <div style={{ marginTop: "10px" }}>
          ⏳ Running code, please wait...
        </div>
      )}
      <h3>Output:</h3>
      <pre style={{ background: "#222", color: "#0f0", padding: "10px" }}>
        {output}
      </pre>
      <h3>Errors:</h3>
      <pre style={{ background: "#222", color: "#f55", padding: "10px" }}>
        {errors}
      </pre>
      {/* {response.data.results && (
        <div style={{ marginTop: "20px" }}>
          <h3>Test Results:</h3>
          {response.data.results.map((res, index) => (
            <div key={index} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
              <strong>Test Case {index + 1}: {res.passed ? "✅ Passed" : "❌ Failed"}</strong>
              <div><b>Input:</b><pre>{res.input}</pre></div>
              <div><b>Expected:</b><pre>{res.expected}</pre></div>
              <div><b>Actual:</b><pre>{res.actual}</pre></div>
              {res.errors && <div><b>Errors:</b><pre>{res.errors}</pre></div>}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}

