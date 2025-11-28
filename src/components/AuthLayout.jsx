import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((store) => store.auth.userStatus);

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    }
  }, [navigate, authStatus, authentication]);

  return <>{children}</>;
}

export default AuthLayout;
