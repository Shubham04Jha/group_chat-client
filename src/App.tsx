import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket,setSocket ]  = useState<WebSocket|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(()=>{
    const ws  = new WebSocket('ws://localhost:8080');
    ws.onmessage = (ev)=>{
      const data = ev.data;
      console.log([...messages,data]);
      setMessages([...messages,data]);
      // console.log(messages);
    }
    setSocket(ws);
    
  },[])
  const handleSend = ()=>{
    if(socket ){
      socket.send(inputRef.current?.value||'');
      if(inputRef.current) inputRef.current.value = '';
    }
  }
  return (
    <div>
      <div className='outline-2 outline-green-300 min-h-100 overflow-y-auto'>
        {messages.map((msg,idx)=>{
          return (
            <div key={idx}>                
              {msg}
            </div>
          )
        })}
      </div>
      <div className='outline-1 outline-purple-300 mt-2'>
        <input ref={inputRef} className='outline-none text-xl' type="text" placeholder='type the message' onKeyDown={(ev)=>{
          if(ev.key == 'Enter'){
            handleSend();
          }
        }} />
        <button onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  )
}

export default App
