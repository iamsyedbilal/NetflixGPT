import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((store) => store.auth.userStatus);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
      return;
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
      return;
    }
  }, [navigate, authStatus, authentication]);

  return <>{children}</>;
}

export default AuthLayout;
