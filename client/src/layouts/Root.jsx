import { useState, useEffect, useCallback } from "react";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import { authenticateUser } from "../api/user";

export default function Root() {
  const [loggedUser, setLoggedUser] = useState(null);
  const token = JSON.parse(localStorage.getItem("taskDutyToken"));

  const getUser = useCallback(async () => {
    if (!token) return;
    try {
      const res = await authenticateUser();
      setLoggedUser(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  console.log(loggedUser);

  return (
    <>
      <Nav loggedUser={loggedUser} />
      <Outlet />
    </>
  );
}
