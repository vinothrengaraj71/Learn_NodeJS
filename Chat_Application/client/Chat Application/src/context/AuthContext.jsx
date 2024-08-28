import { createContext, useCallback, useEffect, useState } from "react";
import { postLoginRequest, postRegisterRequest, baseUrl } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    username: "",
    image: "",
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("User");

    setUser(JSON.parse(user));
  }, []);

  // console.log(user)
  // console.log("registerInfo", registerInfo);
  // console.log("loginInfo",loginInfo);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo((prevInfo) => ({ ...prevInfo, ...info }));
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo((prevInfo) => ({ ...prevInfo, ...info }));
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);

      // Create FormData instance
      const formData = new FormData();
      Object.keys(registerInfo).forEach((key) => {
        if (registerInfo[key] !== null && registerInfo[key] !== undefined) {
          formData.append(key, registerInfo[key]);
        }
      });

      const response = await postRegisterRequest(`${baseUrl}/users/register`, formData);

      setIsRegisterLoading(false);
      if (response.error) {
        console.error("Registration error:", response.message);
        return setRegisterError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [registerInfo]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
    setRegisterInfo({
      name: "",
      username: "",
      image: "",
      email: "",
      password: "",
    });
    setRegisterError(null);
    setIsRegisterLoading(false);
  }, []);

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);
  
      try {
        const response = await postLoginRequest(
          `${baseUrl}/users/login`,
          JSON.stringify(loginInfo),
          { "Content-Type": "application/json" }
        );
  
        setIsLoginLoading(false);
  
        if (response.error) {
          console.error("Login error:", response.message);
          setLoginError(response);  // response.message should be displayed in the UI
        } else {
          localStorage.setItem("User", JSON.stringify(response));
          setUser(response);
        }
      } catch (error) {
        setIsLoginLoading(false);
        console.error("Login failed:", error);
        setLoginError({ error: true, message: "An error occurred." });
      }
    },
    [loginInfo]
  );
  

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        setRegisterInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
