import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((store) => store.auth.userStatus);

  useEffect(() => {
    if (authStatus !== undefined) {
      if (authentication && !authStatus) {
        navigate("/login", { replace: true });
      } else if (!authentication && authStatus) {
        navigate("/", { replace: true });
      }
    }
  }, [authStatus, authentication, navigate]);

  if (authStatus === undefined || authStatus === null) return null;

  if ((authentication && !authStatus) || (!authentication && authStatus))
    return null;

  return <>{children}</>;
}

export default AuthLayout;
