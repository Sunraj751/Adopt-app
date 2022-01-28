import {useEffect, useRef} from "react"
import {createPortal} from "react-dom"

const modalRoot = document.getElementById('modal');
const container = document.createElement("div");

const Modal = ({children}) => {
    const elRef = useRef(null);
    if(!elRef.current){
        elRef.current = document.createElement ('div');
    }
    useEffect(() =>{
        modalRoot.appendChild(elRef.current);
        return () => modalRoot.removeCHild(elRef.current);
    },[])

    return createPortal(<div>{children}</div>, elRef.current);
}

export default Modal;