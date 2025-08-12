import { useRef, useState, type Dispatch, type SetStateAction } from "react"
import { backendUrl } from "../config";
import { toast } from "react-toastify";
import { copyJoinInfo } from "../util/copytoClipboard";
import { useNavigate } from "react-router-dom";

const buttonStyle = `hover:cursor-pointer rounded-md px-2 py-1 text-xl w-24 text-center outline-2`

interface TopBarProps {
    toggle:boolean, 
    setToggle: Dispatch<SetStateAction<boolean>>;
}

const TopBar = ({toggle,setToggle}: TopBarProps)=>{
    const handleToggle = ()=>{
        setToggle(b=>!b);
    }
    return(
        <>
        <div className="flex justify-center gap-4 row-span-2">
            <div className="flex justify-center items-center gap-8">
                <div className = {`${buttonStyle} ${toggle?'bg-green-300':''} `} onClick={handleToggle}>
                    Join
                </div>
                <div className = {`${buttonStyle} ${toggle?'':'bg-green-300'} `} onClick={handleToggle} >
                    Create
                </div>
                
            </div>
        </div>
        </>
    )
}

export const Home = ()=>{
    const [join,setJoin]  = useState<boolean>(true);
    return(
        <div className="w-full h-screen flex justify-center items-center">
            <div className="h-96 w-72 rounded-3xl outline-2 grid grid-rows-12">
                <TopBar toggle={join} setToggle={setJoin}/>
                <div className=" row-span-10  p-8">
                    <div className="bg-sky-300 h-full outline-2 rounded-3xl flex justify-center items-center">
                        <div className="flex flex-col justify-center gap-8 items-center">
                            {join?<Join />:<Create />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



const Create = ()=>{
    const buttonStyle = `outline-2 hover:cursor-pointer rounded-md w-32 min-h-12 bg-yellow-300 flex items-center justify-center`;
    const paraStyle = ` text-center my-auto font-bold`;
    const navigate = useNavigate();
    const handleCreate = async ()=>{
        const response = await fetch('http://'+backendUrl+'/makeRoom');
        try {
            const parsedResponse = await response.json();
            if(!response.ok){
                toast.error(parsedResponse.message||'Error');
                return;
            }
            const { id ,code} = parsedResponse;
            localStorage.setItem('id',id);
            localStorage.setItem('code',code);
            copyJoinInfo();
        } catch (error) {
            toast.error('Error Occurred Try after sometime');
        }
    }
    const handleJoin = async ()=>{
        await handleCreate();
        navigate('/room');
    }
    return(
        <>
            <div className={`${buttonStyle}`} onClick={handleCreate}>
                <p className={`${paraStyle}`} >Create Room <br/> for Later</p>
            </div>
            <div className={`${buttonStyle}`} onClick={handleJoin}>
                <p className={`${paraStyle}`} >Create and Join</p>
            </div>
        </>
    )
}
const Join = ()=>{
    const inputStyle = `hover:cursor-pointer rounded-md w-32 outline-2 outline-blue-800 
    text-center text-black font-bold text-xl
    `;
    const buttonStyle = `outline-2 hover:cursor-pointer rounded-md px-2 py-1 w-20 bg-yellow-300 flex items-center justify-center`;
    const paraStyle = ` text-center my-auto font-bold`;
    const idRef = useRef<HTMLInputElement>(null);
    const codeRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const handleJoin = ()=>{
        if(idRef.current&&codeRef.current){
            let id = idRef.current.value.replace(/\s/g,'');
            let code = codeRef.current.value.replace(/\s/g,'');
            if(!id||!code) return;
            localStorage.setItem('id',id);
            localStorage.setItem('code',code);
            navigate('/room');
        }
    }
    return(
        <>
            <input type="text" ref={idRef} placeholder="Room id" className={` ${inputStyle} `} />
            <input type="text" ref={codeRef} placeholder="Code" className={` ${inputStyle} ` } />
            <div className={` ${buttonStyle}  `} onClick={handleJoin}>
                <p className={`${paraStyle}`}>Join</p>
            </div>
        </>
    )
}