import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      const [response] = await getUserByUserId(user.uid);
      // data query
      setActiveUser({ ...response }); // pass the user response to the state of activeuser
    }
    if (user && user.uid) {
      getUserObjByUserId(); //return activeuser as user to the hook when called
    }
  }, [user]);

  return { user: activeUser };
}
