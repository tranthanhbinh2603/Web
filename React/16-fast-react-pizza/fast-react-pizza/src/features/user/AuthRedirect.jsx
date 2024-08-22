/* eslint-disable react/display-name */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";

const withAuthRedirect = (Component) => {
  return (props) => {
    const [checkingAuth, setCheckingAuth] = useState(true);
    const navigate = useNavigate();
    const username = useSelector((state) => state.user.userName);

    useEffect(() => {
      if (!username) {
        navigate("/");
      } else {
        setCheckingAuth(false);
      }
    }, [username, navigate]);

    if (checkingAuth) {
      return <Loader />;
    }

    return <Component {...props} />;
  };
};

export default withAuthRedirect;
