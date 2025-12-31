import "./ChatWindow.css"
import { MyContext } from "./MyContext.jsx";
import Chat from './Chat.jsx'
import { useContext, useState, useEffect } from "react";
import { SyncLoader } from "react-spinners"
function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const getReply = async () => {
        setLoading(true);
        setNewChat(false);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };
        try {
            const response = await fetch("http://localhost:8080/api/chat", options);
            const data = await response.json();
            console.log(response);
            console.log(data);
            setReply(data.reply);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }
    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                }, {
                    role: "assistant",
                    content: reply
                }]
            ));
        }
        setPrompt("");
    }, [reply]);
    const handleProfileClick=()=>{
        setIsOpen(!isOpen);
    }
    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>AxonGPT <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            {/* <SyncLoader color="white" loading={loading}></SyncLoader> */}
            {
                isOpen && <div className="dropDown">
                    <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i>  Upgrade Plan </div>
                    <div className="dropDownItem"><i className="fa-solid fa-gear"></i>  Settings</div>
                    <div className="dropDownItem"><i className="fa-solid fa-arrow-right-from-bracket"></i>  Log out</div>
                </div>
            }
            <Chat></Chat>
            {/* Loader */}
            {loading && (
                <div className="loaderContainer">
                    <SyncLoader color="#ffffff" size={8} />
                </div>
            )}
            <br></br>
            <br></br>
            <div className="chatInput">

                <div className="inputBox">
                    <input placeholder="Ask anything" value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => (e.key === "Enter") ? getReply() : ''}
                    >

                    </input>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    AXONGPT can make mistakes.Check important information.
                </p>
            </div>
        </div>
    )
}
export default ChatWindow;