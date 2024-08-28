import { useContext } from "react";
import { ChatContext } from "../context/chatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } =
    useContext(ChatContext);

  return (
    <Container>
      <PotentialChats />
      {userChats && userChats.length > 0 ? (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-8 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading Chats...</p>}
            {userChats.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <ChatBox />
        </Stack>
      ) : (
        !isUserChatsLoading && <p>No chats available.</p>
      )}
    </Container>
  );
};

export default Chat;
