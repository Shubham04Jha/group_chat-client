import { toast } from "react-toastify";


export const copyToClipBoard = (data:string,onSucces?:string) =>{
    try {
        navigator.clipboard.writeText(data);
        toast.success(onSucces||'Copied to Clipboard',{autoClose:1500});
    } catch (error) {
        toast.error('Failed to copy',{autoClose:1500});
    }
}

export const copyJoinInfo = ()=>{
    const id = localStorage.getItem('id'); 
    const code = localStorage.getItem('code');
    const text = `id: ${id} 
    code: ${code}`;
    copyToClipBoard(text,'Copied joining info on clipboard');
}