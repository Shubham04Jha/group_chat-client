import { useState, type Dispatch, type SetStateAction } from "react"

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
        <div className="w-full h-screen">
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
    return(
        <>
            <div className={`${buttonStyle}`}>
                <p className={`${paraStyle}`} >Create Room <br/> for Later</p>
            </div>
            <div className={`${buttonStyle}`}>
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
    return(
        <>
            <input type="text" placeholder="Room id" className={` ${inputStyle} `} />
            <input type="text" placeholder="Code" className={` ${inputStyle} ` } />
            <div className={` ${buttonStyle}  `}>
                <p className={`${paraStyle}`}>Join</p>
            </div>
        </>
    )
}