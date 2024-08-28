import { useContext } from "react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Container, Stack } from "react-bootstrap";
import { ChatContext } from "../../context/chatContext";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const {onlineUsers} = useContext(ChatContext);

  const isOnline= onlineUsers?.some((user)=>user?.userId === recipientUser?._id) 

  //   console.log(recipientUser);
  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className="user-card align-items-center p-2 justify-content-between"
        role="button"
      >
        <div className="d-flex">
          <div className="me-2">
            {recipientUser?.image ? (
              <img
                src={recipientUser.image}
                // alt={recipientUser.name}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <div className="default-avatar">A</div> // Fallback content if no image
            )}
          </div>
          <div className="text-content">
            <div className="name">{recipientUser?.name}</div>
            <div className="text">Text Message </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-end">
          <div className="date">12/12/2024</div>
          <div className="this-user-notification">2</div>
          <span className={isOnline ? "user-online" : ""}></span>
        </div>
      </Stack>
    </>
  );
};

export default UserChat;
