import { useEffect, useRef, useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Home } from './pages/Home'
import { PageNotFound } from './pages/PageNotFound'
import { Room } from './pages/Room'



const AppContent = ()=>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/room'} element={<Room />}/>
        <Route path={'*'} element={<PageNotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

const App = ()=>{
  return(
    <>
    <AppContent />
    </>
  )
}


// function App() {
//   const [messages, setMessages] = useState<string[]>([]);
//   const [socket,setSocket ]  = useState<WebSocket|null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   useEffect(()=>{
//     const ws  = new WebSocket('ws://localhost:8080');
    
//     ws.onmessage = (ev)=>{
//       const data = ev.data;
//       setMessages(msg=>[...msg,data]);
//     }
//     setSocket(ws);
//     return ()=>ws.close();
//   },[])
//   const handleSend = ()=>{
//     if(socket ){
//       socket.send(inputRef.current?.value||'');
//       if(inputRef.current) inputRef.current.value = '';
//     }
//   }
//   return (
//     <div>
//       <div className='outline-2 outline-green-300 h-100 overflow-y-auto'>
//         {messages.map((msg,idx)=>{
//           return (
//             <div key={idx}>                
//               {msg}
//             </div>
//           )
//         })}
//       </div>
//       <div className='outline-1 outline-purple-300 mt-2'>
//         <input ref={inputRef} className='outline-none text-xl' type="text" placeholder='type the message' onKeyDown={(ev)=>{
//           if(ev.key == 'Enter'){
//             handleSend();
//           }
//         }} />
//         <button onClick={handleSend}>
//           Send
//         </button>
//       </div>
//     </div>
//   )
// }

export default App
