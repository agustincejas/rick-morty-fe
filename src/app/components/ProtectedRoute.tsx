import { Navigate } from "react-router-dom";
import { selectToken } from "../../features/auth/authSlice";
import { useAppSelector } from "../hooks";

type Props = {
  redirectPath: string;
  outlet: JSX.Element;
};

const ProtectedRoute = ({
  redirectPath = '/',
  outlet
}: Props) => {
  const token = useAppSelector(selectToken);
  if (token) {
      return outlet;
  }
  return <Navigate to={redirectPath} replace />;

};

export default ProtectedRoute;