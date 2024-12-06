import { connect } from "./connect";
const token = JSON.parse(localStorage.getItem("taskDutyToken"));
export const registerUser = async (formData) => {
  return await connect.post("/user/register", formData);
};
export const loginUser = async (formData) => {
  return await connect.post("/user/login", formData);
};

export const authenticateUser = async () => {
  return await connect.get("/user", {
    headers: { Authorization: `Bearer: ${token}` },
  });
};
