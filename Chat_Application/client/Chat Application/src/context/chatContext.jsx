import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postLoginRequest } from "../utils/services";
import { io } from "socket.io-client";


export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError,setSendTextMessageError] = useState(null);
  const [newMessage,setNewMessage]= useState(null);
  const [socket,setSocket] = useState(null);
  const [onlineUsers,setOnlineUsers]=useState(null);

  console.log("Online Users: ", onlineUsers);

  //initialize socket
  useEffect(()=>{
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () =>{
      newSocket.disconnect()
    };
  },[user]);

  useEffect(()=>{
    if(socket === null) return ;

    socket.emit("addNewUser",user?._id)
    socket.on("getOnlineUsers",(res)=>{
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
    
  },[socket])


  useEffect(()=>{
    if(socket === null) return ;

    socket.emit("sendMessage",{...newMessage,recipientId})
    
  },[newMessage])
  

  useEffect(() => {
    const getUsers = async () => {
      if (!user || !user._id) {
        console.log("User is not defined or does not have an ID.");
        return;
      }

      try {
        const response = await getRequest(`${baseUrl}/users`);
        if (response.error) {
          return console.log("Error Fetching Users", response.message);
        }

        const pChats = response.filter((u) => {
          if (!u || !u._id) {
            console.log(
              "User in response is not defined or does not have an ID."
            );
            return false;
          }

          let isChatCreated = false;
          if (userChats) {
            isChatCreated = userChats.some((chat) => {
              return chat.members[0] === u._id || chat.members[1] === u._id;
            });
          }

          return !isChatCreated;
        });

        setPotentialChats(pChats);
      } catch (error) {
        console.log("Error Fetching Users", error);
      }
    };

    getUsers();
  }, [userChats, user]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        const response = await getRequest(`${baseUrl}/chats/${user._id}`);
        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response.error);
        }

        setUserChats(response);
      }
    };

    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );
      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }

      setMessages(response);
    };

    getMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) {
        return console.log("You must type something");
      }

      const response = await postLoginRequest(
        `${baseUrl}/messages/`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._id,
          text: textMessage,
        })
      );

      if(response.error){
        return setUserChatsError(response.error);
      }

      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postLoginRequest(
      `${baseUrl}/chats/`,
      JSON.stringify({ firstId, secondId })
    );
    if (response.error) {
      return console.log("Error creating chat", response);
    }

    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessage,
        onlineUsers
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
