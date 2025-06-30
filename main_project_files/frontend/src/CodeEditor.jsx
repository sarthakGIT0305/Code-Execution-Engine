import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function CodeEditor() {
  const [code, setCode] = useState("print('Hello, Vite!')");
  const [output, setOutput] = useState("");
  const [errors, setErrors] = useState("");

  const runCode = async () => {
    try {
      const response = await axios.post("http://localhost:8000/run", { code });
      setOutput(response.data.output);
      setErrors(response.data.errors);
    } catch (err) {
      setErrors("Could not connect to server.");
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
      <button onClick={runCode} style={{ marginTop: "10px" }}>
        ▶️ Run Code
      </button>
      <h3>Output:</h3>
      <pre style={{ background: "#222", color: "#0f0", padding: "10px" }}>
        {output}
      </pre>
      <h3>Errors:</h3>
      <pre style={{ background: "#222", color: "#f55", padding: "10px" }}>
        {errors}
      </pre>
    </div>
  );
}
