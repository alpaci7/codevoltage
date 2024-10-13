import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Particles from "react-tsparticles";
import Loading from "../components/Loading";

const Register = ({user, setCourse}) => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const course = searchParams.get('course');

    useEffect(()=>{
        setCourse(course);
        const subscribe = async()=>{
            const data = {
                user,
                course
            };
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/subscribe`,data)
            .then((res)=>{
                if(res.data.message === "success"){
                   navigate("/home/register/success"); 
                }
            })
            .catch((err)=>{
                if(err.response.data.message === "error"){
                    navigate("/home");
                }
            })
        }
        subscribe();
    },[course, user, navigate, setCourse])
    return (
        <div>
            <Particles/>
            <Loading/>
            

        </div>
    );
}
 
export default Register;