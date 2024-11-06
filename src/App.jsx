import { useCallback, useState, useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [length, setlength] = useState(8);
  const [num, isnumber] = useState(false);
  const [chr, ischar] = useState(false);
  const [inpu, setinpu] = useState("");

  
  const passgen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPRSTUVWXYZ";
    if (num) str += "123456789";
    if (chr) str += "!@#$%^&*()<>?:";

    for (let i = 0; i < length; i++) {
      const pos = Math.floor(Math.random() * str.length);
      pass += str[pos];
    }
    setinpu(pass);
  }, [length, num, chr,]);

  
useEffect(() => {
  passgen();
}, [length, num,chr,passgen])

const passref = useRef(null)

const handleCopy = useCallback(() =>{
  passref.current?.select();
  passref.current?.setSelectionRange(0,9);
  window.navigator.clipboard.writeText(inpu)
},[inpu])

return (
  <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-auto text-orange-500 bg-gray-700'>
    <div className='flex shadow rounded-lg overflow-hidden mb-0 py-4'>
      <input
        type="text"
        value={inpu}
        className='outline-none w-full py-1 px-3 rounded-md'
        placeholder='password'
        readOnly
        ref = {passref}
      />
      <button
        onClick={handleCopy}
        className='bg-blue-700 px-3 mx-2 rounded-md outline-none py-0.5'>
        Copy
      </button>
    </div>
    <div className='flex gap-2 shadow rounded-lg overflow-hidden py-3'>
      <div className='flex gap-2'>
        <input
          type="range"
          className='cursor-pointer'
          value={length}
          min={6}
          max={100}
          onChange={(e) => setlength(Number(e.target.value))}
          />
        <lavel>Length ({length})</lavel>
      </div>
      <div className='flex gap-1' onClick={() => isnumber(!num)}>
        <input type="checkbox" checked={num} onChange={() => {}} />
        <p>Numbers</p>
      </div>
      <div className='flex gap-1' onClick={() => ischar(!chr)}>
        <input type="checkbox" checked={chr} onChange={() => {}} />
        <p>Characters</p>
      </div>
    </div>
  </div>
);
}

export default App
