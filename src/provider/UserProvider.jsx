import { createContext, useState } from "react";

const defaultUser = {
  id: 1,
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada.lovelace@gmail.com",
  leaveDays: 14,
  avatar: null,
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
  const [user, setUser] = useState(defaultUser);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
