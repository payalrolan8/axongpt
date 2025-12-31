import "./Sidebar.css"
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
    const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setcurrThreadId, setPrevChats } = useContext(MyContext);
    const getAllThreads = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();
            const filteredData = res.map(thread => ({ threadId: thread.threadId, title: thread.title }));
            console.log(filteredData);
            setAllThreads(filteredData);
            // console.log(res);
            //threadId,title

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getAllThreads();
    }, [])
    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setcurrThreadId(uuidv1());
        setPrevChats([]);
    }
    const changeThread = async (newThreadId) => {
        setcurrThreadId(newThreadId);
        try {
            const response=await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
            const res=await response.json();
            console.log(res);
            setPrevChats(res);
            setReply(null);
            setNewChat(false);
        } catch (err) {
            console.log(err);
        }
    }
    const deleteThread=async(threadId)=>{
        try{
            const response =await fetch(`http://localhost:8080/api/thread/${threadId}`,{method:"DELETE"});
            const res=await response.json();
            console.log(res);
            //re-render the threads
            setAllThreads(prev=>prev.filter(thread=>thread.threadId!==threadId));
            if(threadId===currThreadId){
                createNewChat();
            }
        }catch(err){
            console.log(err);
        }

    }
    return (
        <div>
            <section className="sidebar">

                {/* new chat button  */}
                <button onClick={createNewChat}>
                    <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img>
                    <span>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </span>

                </button>
                {/* history */}
                <ul className="history">
                    {
                        allThreads?.map((thread, idx) => (
                            <li key={idx}
                                onClick={(e) => changeThread(thread.threadId)}
                                className={thread.threadId===currThreadId?"highlighted":" "}
                                
                            >{thread.title}
                            <i className="fa-solid fa-trash" onClick={(e)=>{
                                    e.stopPropagation();
                                    deleteThread(thread.threadId);
                                }}></i>
                            </li>
                        ))
                    }

                </ul>
                {/* sign for app */}
                <div className="sign">
                    <p>By Payal &hearts;</p>
                </div>
            </section>

        </div>
    )
}
export default Sidebar;