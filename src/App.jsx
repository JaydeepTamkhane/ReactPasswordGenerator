import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberAllowed) str += "0123456789";
    if (specialCharAllowed) str += "!@#$%^&*()_+[]{}|;:',.<>?/`~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, specialCharAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, specialCharAllowed, passwordGenerator]);

  const copyPasswordToClip = useCallback(() => {
    window.navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy password: ', err);
    });
  }, [password]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white p-4">
      <div className="bg-slate-600 p-6 rounded-3xl max-w-md w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Password Generator</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            value={password}
            className="outline-none p-2 w-full rounded-lg text-black font-medium"
            placeholder="Password"
            readOnly
          />
          <button className="bg-black p-2 rounded-lg mt-2 md:mt-0" onClick={copyPasswordToClip}>
            Copy
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full text-center md:w-1/3">
            <input
              type="range"
              min={1}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label className="mt-2">Length : {length}</label>
          </div>
          <div className="flex flex-col w-full md:w-1/3 items-center">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="mt-2">Numbers</label>
          </div>
          <div className="flex flex-col w-full justify-center text-center items-center md:w-1/3">
            <input
              type="checkbox"
              checked={specialCharAllowed}
              id="charInput"
              onChange={() => setSpecialCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput" className="mt-2">Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
