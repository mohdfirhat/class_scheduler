import { createContext, useState } from "react";

// Default State for Logged in User (Manager)
const defaultUser = {
  id: 1,
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada.lovelace@gmail.com",
  leaveDays: 28,
  avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
  manager: null,
  sections: [],
  teacherLeaves: [],
  department: {
    id: 1,
    name: "Computer Science",
  },
  courses: [],
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // State for Logged in User (Manager)
  const [user, setUser] = useState(defaultUser);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
