import { useEffect, useRef, useState } from "react"
import { SendIcon } from "../components/icons"
import { GOHomePage } from "./GOHomePage"
import { backendUrl } from "../config";


export const Room = ()=>{
    const [id,setId] = useState<string>('');
    const [code,setCode] = useState<string>('');
    const [error,setError] = useState<boolean>(false);
    useEffect(()=>{
        const id = localStorage.getItem('id')||'';
        const code = localStorage.getItem('code')||'';
        const func = async ()=>{
            const response = await fetch('http://'+backendUrl+'/checkRoom',{
                method:'post',
                headers:{
                    'content-type': 'application/json'
                },
                body:JSON.stringify({id,code})
            });
            if(!response.ok){
                setError(true);
            }else{
                setId(id);
                setCode(code);
            }
        }
        func();
    },[])
    if(error){
        <GOHomePage message="Error Occured please go to home page" />
    }
    return(
        <div className="h-screen w-full flex justify-center items-center ">
            <div className="md:w-2/3 lg:w-2/5 h-full py-2">
                <ChatInterface id={id} code={code} />
            </div>
        </div>
    )
}

const Message = ({message}:{message:string})=>{
    return(
        <div className="w-[80%]">
            <p>{message}</p>
        </div>
    )
}

const ChatInterface = ({id,code}:{id:string, code: string})=>{
    const socketRef = useRef<WebSocket>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [messages,setMessages] = useState<string[]>([]);
    const handleSend = ()=>{
        const message = inputRef.current?.value||null;
        if(socketRef.current&&!message){
            socketRef.current.send(JSON.stringify({
                    type:'message',
                    message
                }));
        }
    }
    useEffect(()=>{
        const ws = new WebSocket('ws://'+backendUrl);
        socketRef.current = ws;
        ws.onopen = ()=>{
            ws.send(JSON.stringify({type:'auth',id,code}));
        }
        ws.onmessage = (ev)=>{
            setMessages(prev=>[...prev,ev.data]);
        }
        
        return ()=>{
            ws.close();
            socketRef.current = null;
        }
    },[])
    return(
        <div className=" h-full w-full rounded-lg grid grid-rows-12">
            <div className={`row-span-11 bg-gray-100 outline-1 rounded-lg`}>
                {messages.map((val,idx)=>{
                    return(
                        <div key={idx} className="w-full">
                            <Message message={val} />
                        </div>
                    )
                })}
            </div>
            <div className="row-start-12 flex justify-between outline-1 rounded-lg">
                <div className="flex-4 bg-gray-200">
                    <textarea ref={inputRef} placeholder="Message" className="text-4xl w-full h-full 
                    flex items-center font-bold text-black pt-4 pl-1 " />
                </div>
                <div className={`bg-green-300 flex-1 flex justify-center items-center rounded-lg py-1 px-2 `} onClick={handleSend}>
                    <div className={`w-12 text-white`} >
                        <SendIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}