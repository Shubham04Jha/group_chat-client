import { useEffect, useState } from "react"
import { SendIcon } from "../components/icons"
import { GOHomePage } from "./GOHomePage"
import { backendUrl } from "../config";


export const Room = ()=>{
    const [error,setError] = useState<boolean>(false);
    const [id,setId] = useState<string>('');
    const [code,setCode] = useState<string>('');
    useEffect(()=>{
        try {
            const response = await fetch('http://'+backendUrl+'/checkRoom',{
                method:'post',
                
            })
        } catch (error) {
            setError(true);
        }
    },[])
    if(error){
        <GOHomePage message="Error Occured please go to home page" />
    }
    return(
        <div className="h-screen w-full flex justify-center items-center ">
            <div className="md:w-2/3 lg:w-2/5 h-full py-2">
                <ChatInterface />
            </div>
        </div>
    )
}

const ChatInterface = ()=>{
    return(
        <div className=" h-full w-full rounded-lg grid grid-rows-12">
            <div className={`row-span-11 bg-gray-100 outline-1 rounded-lg`}>

            </div>
            <div className="row-start-12 flex justify-between outline-1 rounded-lg">
                <div className="flex-4 bg-gray-200">
                    <textarea placeholder="Message" className="text-4xl w-full h-full 
                    flex items-center font-bold text-black pt-4 pl-1 " />
                </div>
                <div className={`bg-green-300 flex-1 flex justify-center items-center rounded-lg py-1 px-2 `}>
                    <div className={`w-12 text-white`} >
                        <SendIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}