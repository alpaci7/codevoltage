import axios from "axios";
import { useEffect, useState} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";

const Auth = ({setUser, setIsAuthenticated, setCourse}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [load, setLoad] = useState(true);


  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    const fetchProfile = async () => {
      setLoad(false);
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/google/redirect?code=${code}&state=${state}`);
      if(response.data.message === "login"){
        setLoad(true);
        setIsAuthenticated(true);
        setUser(response.data.user);
        setCourse(state);
        if(response.data.subscribe){
          navigate("/home/welcome/subscribe");
        }
        else{
         navigate("/home/welcome");

        }
      }else if(response.data.message === "editProfile"){
        setLoad(true);
        setIsAuthenticated(true);
        setUser(response.data.user);
        navigate(`/editProfile?course=${state}`); 
      }
    };

    if (code) {
      fetchProfile();
    }
  }, [searchParams, navigate, setIsAuthenticated, setUser, setCourse]);
  return (
    <div>
      {load ? <div></div> : <Loading/>}
    </div>
  );
}
 
export default Auth;