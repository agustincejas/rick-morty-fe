import { UserLoginResponse } from "./models/user.interface";

const authHeader = () => {
  const user = localStorage.getItem('user');
  if(user) {
    const parsedUser: UserLoginResponse = JSON.parse(user);
    return { Authorization: parsedUser.token };
  } else {
    return {};
  }
}

export default authHeader;
