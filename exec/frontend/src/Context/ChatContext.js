import React, { createContext, useReducer } from "react";

const initialState = { isDrawerOpen: false, isChatOpen: false, roomId: null };
const ChatContext = createContext(initialState);

const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "clickMatchBtn":
        return {
          isDrawerOpen: action.drawer,
          isChatOpen: action.chat,
          roomId: action.roomId,
        };
      default:
        throw new Error();
    }
  }, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
