import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members.find((id) => id !== user?._id);
  // console.log(recipientId);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) {
        return;
      }
      try {
        const response = await getRequest(
          `${baseUrl}/users/find/${recipientId}`
        );
        if (response.error) {
          setError(response.message);
        } else {
          setRecipientUser(response);
        }
      } catch (err) {
        setError("An error occurred while fetching the recipient user.");
      }
    };

    getUser();
  }, [chat, user, recipientId]);

  return { recipientUser, error };
};
