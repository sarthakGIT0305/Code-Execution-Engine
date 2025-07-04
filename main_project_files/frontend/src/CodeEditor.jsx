// // import React, { useState, useSyncExternalStore } from "react";
// // import Editor from "@monaco-editor/react";
// // import axios from "axios";

// // export default function CodeEditor() {
// //   const [code, setCode] = useState("print('Wassup Warudo!')");
// //   const [input, setInput] = useState("");
// //   const [output, setOutput] = useState("");
// //   const [errors, setErrors] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [checkOutput, setCheckOutput] = useState(false);
// //   const [result, setResult] = useState(null);
// //   const [expectedOutput, setExpectedOutput] = useState("");
// //   const [language, setLanguage] = useState("python");

// //   const runCode = async () => {
// //     setLoading(true);
// //     setErrors("");
// //     setOutput("");
// //     setResult(null);

// //     try {
// //       const payload = {
// //         code,
// //         language,
// //         input: input || "",
// //         expected_output: checkOutput
// //           ? (expectedOutput !== undefined ? expectedOutput : "")
// //           : null
// //       };

// //       const response = await axios.post("http://localhost:8000/run", payload, { headers: { "Content-Type": "application/json" } });
// //       setOutput(response.data.output);
// //       setErrors(response.data.errors);
// //       setResult(response.data.passed);
// //     } catch (err) {
// //       setErrors("Could not connect to server.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={{ padding: "20px", fontFamily: "Arial" }}>
// //       <h2>Python Code Runner</h2>

// //       <select
// //         value={language}
// //         onChange={(e) => {
// //           const selectedLang = e.target.value;
// //           setLanguage(selectedLang);

// //           // if (selectedLang === "cpp" && code.trim() === "") {
// //           //   setCode(`...`);
// //           // }
// //           if (selectedLang === "cpp") {
// //             setCode(`#include<iostream>
// // using namespace std;

// // int main(){
// //     // Your code here
// //     return 0;
// // }`);
// //           }
// //           if (selectedLang === "python") {
// //             setCode(`print("Hello, world!")`);
// //           }
// //         }}
// //       >

// //         <option value="python">Python</option>
// //         <option value="cpp">C++</option>
// //       </select>

// //       <Editor
// //         height="300px"
// //         language={language}
// //         value={code}
// //         onChange={(value) => setCode(value)}
// //       />

// //       <textarea
// //         placeholder="Enter input for your program"
// //         value={input}
// //         onChange={(e) => setInput(e.target.value)}
// //         style={{ width: "100%", height: "100px", marginTop: "10px" }}
// //       />

// //       <label style={{ display: "block", marginTop: "10px" }}>
// //         <input
// //           type="checkbox"
// //           checked={checkOutput}
// //           onChange={(e) => setCheckOutput(e.target.checked)}
// //         />
// //         &nbsp; Check output against expected
// //       </label>

// //       <button onClick={runCode}
// //         disabled={loading}
// //         style={{
// //           marginTop: "10px",
// //           opacity: loading ? 0.5 : 1,
// //           cursor: loading ? "not-allowed" : "pointer",
// //         }}>
// //         ▶️ Run Code
// //       </button>

// //       {loading && (
// //         <div style={{ marginTop: "10px" }}>
// //           ⏳ Running code, please wait...
// //         </div>
// //       )}

// //       <h3>Output:</h3>
// //       <pre style={{ background: "#222", color: "#0f0", padding: "10px" }}>{output}</pre>

// //       <h3>Errors:</h3>
// //       <pre style={{ background: "#222", color: "#f55", padding: "10px" }}>{errors}</pre>

// //       {checkOutput && result !== null && (
// //         <h3>
// //           Verdict: {result ? "✅ Passed" : "❌ Failed"}
// //         </h3>
// //       )}

// //       {checkOutput && (
// //         <textarea
// //           placeholder="Expected output"
// //           value={expectedOutput}
// //           onChange={(e) => setExpectedOutput(e.target.value)}
// //           style={{ width: "100%", height: "100px", marginTop: "10px" }}
// //         />
// //       )}
// //     </div>
// //   );
// // }




// import React, { useState } from "react";
// import Editor from "@monaco-editor/react";
// import axios from "axios";

// export default function CodeEditor() {
//   const [code, setCode] = useState(`print("Hello, world!")`);
//   const [language, setLanguage] = useState("python");
//   const [input, setInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [errors, setErrors] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [checkOutput, setCheckOutput] = useState(false);
//   const [expectedOutput, setExpectedOutput] = useState("");
//   const [result, setResult] = useState(null);

//   const runCode = async () => {
//     setLoading(true);
//     setErrors("");
//     setOutput("");
//     setResult(null);

//     try {
//       const payload = {
//         code,
//         language,
//         input: input || "",
//         expected_output: checkOutput
//           ? expectedOutput || ""
//           : null
//       };

//       const response = await axios.post(
//         "http://localhost:8000/run",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );

//       setOutput(response.data.output);
//       setErrors(response.data.errors);
//       setResult(response.data.passed);
//     } catch (err) {
//       setErrors("Could not connect to server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLanguageChange = (e) => {
//     const selectedLang = e.target.value;
//     setLanguage(selectedLang);

//     if (selectedLang === "cpp") {
//       setCode(`#include<iostream>
// using namespace std;

// int main(){
//     // Your code here
//     return 0;
// }`);
//     }

//     if (selectedLang === "python") {
//       setCode(`print("Hello, world!")`);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h2>Multi-Language Code Runner</h2>

//       <label>
//         Language:&nbsp;
//         <select value={language} onChange={handleLanguageChange}>
//           <option value="python">Python</option>
//           <option value="cpp">C++</option>
//         </select>
//       </label>

//       {/* 
//       <Editor
//         height="300px"
//         language={language === "cpp" ? "cpp" : "python"}
//         value={code}
//         onChange={(value) => setCode(value)}
//       /> */}

//       <Editor
//         key={language}  // <-- THIS forces remount
//         height="300px"
//         language={language}
//         value={code}
//         onChange={(value) => setCode(value)}
//       />

//       <textarea
//         placeholder="Program input"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         style={{ width: "100%", height: "80px", marginTop: "10px" }}
//       />

//       <label style={{ display: "block", marginTop: "10px" }}>
//         <input
//           type="checkbox"
//           checked={checkOutput}
//           onChange={(e) => setCheckOutput(e.target.checked)}
//         />
//         &nbsp; Check output against expected
//       </label>

//       {checkOutput && (
//         <textarea
//           placeholder="Expected output"
//           value={expectedOutput}
//           onChange={(e) => setExpectedOutput(e.target.value)}
//           style={{ width: "100%", height: "80px", marginTop: "10px" }}
//         />
//       )}

//       <button
//         onClick={runCode}
//         disabled={loading}
//         style={{
//           marginTop: "10px",
//           opacity: loading ? 0.5 : 1,
//           cursor: loading ? "not-allowed" : "pointer",
//         }}
//       >
//         ▶️ Run Code
//       </button>

//       {loading && <div>⏳ Running code...</div>}

//       <h3>Output:</h3>
//       <pre style={{ background: "#222", color: "#0f0", padding: "10px" }}>
//         {output}
//       </pre>

//       <h3>Errors:</h3>
//       <pre style={{ background: "#222", color: "#f55", padding: "10px" }}>
//         {errors}
//       </pre>

//       {checkOutput && result !== null && (
//         <h3>Verdict: {result ? "✅ Passed" : "❌ Failed"}</h3>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function CodeEditor() {
  const [code, setCode] = useState(`print("Hello, world!")`);
  const [language, setLanguage] = useState("python");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkOutput, setCheckOutput] = useState(false);
  const [expectedOutput, setExpectedOutput] = useState("");
  const [result, setResult] = useState(null);

  // 🎯 This ensures boilerplate updates AFTER language changes
  useEffect(() => {
    if (language === "cpp") {
      setCode(`#include<iostream>
using namespace std;

int main(){
    // Your code here
    return 0;
}`);
    } else if (language === "python") {
      setCode(`print("Hello, world!")`);
    }
  }, [language]);

  const runCode = async () => {
    setLoading(true);
    setErrors("");
    setOutput("");
    setResult(null);

    try {
      const payload = {
        code,
        language,
        input: input || "",
        expected_output: checkOutput
          ? expectedOutput || ""
          : null
      };

      const response = await axios.post(
        "http://localhost:8000/run",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setOutput(response.data.output);
      setErrors(response.data.errors);
      setResult(response.data.passed);
    } catch (err) {
      setErrors("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Multi-Language Code Runner</h2>

      <label>
        Language:&nbsp;
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>
      </label>

      <Editor
        key={language}
        height="300px"
        language={language}
        value={code}
        onChange={(value) => setCode(value)}
      />


      <textarea
        placeholder="Program input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", height: "80px", marginTop: "10px" }}
      />

      <label style={{ display: "block", marginTop: "10px" }}>
        <input
          type="checkbox"
          checked={checkOutput}
          onChange={(e) => setCheckOutput(e.target.checked)}
        />
        &nbsp; Check output against expected
      </label>

      {checkOutput && (
        <textarea
          placeholder="Expected output"
          value={expectedOutput}
          onChange={(e) => setExpectedOutput(e.target.value)}
          style={{ width: "100%", height: "80px", marginTop: "10px" }}
        />
      )}

      <button
        onClick={runCode}
        disabled={loading}
        style={{
          marginTop: "10px",
          opacity: loading ? 0.5 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        ▶️ Run Code
      </button>

      {loading && <div>⏳ Running code...</div>}

      <h3>Output:</h3>
      <pre style={{ background: "#222", color: "#0f0", padding: "10px" }}>
        {output}
      </pre>

      <h3>Errors:</h3>
      <pre style={{ background: "#222", color: "#f55", padding: "10px" }}>
        {errors}
      </pre>

      {checkOutput && result !== null && (
        <h3>Verdict: {result ? "✅ Passed" : "❌ Failed"}</h3>
      )}
    </div>
  );
}


