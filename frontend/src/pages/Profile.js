import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useTranslation } from "react-i18next";

import "../styles/Profile.css";

import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import SocialNetwork from "../components/SocialNetwork";
import Footer from "../components/Footer";
import axios from "axios";
const Profile = ({user, checked,setChecked}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();

    const [message , setMessage] = useState("");
    const [subscriptions , setSubscriptions] = useState("");



    useEffect(()=>{
        const fetchData = async()=>{
            const data = {
                id : user.id,
            }
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/getSubscription`, data)
            .then((res)=>{
                setSubscriptions(res.data.subscriptions);
            })
            .catch((err)=>{
                if(err.response.data.message === "No subscriptions")
                setMessage(t('You haven\'t done any subscription to a course yet'));
            })
        }
        fetchData();
    },[user.id])
    return (
        
        <div>
            <NavBar user={user} checked={checked} setChecked={setChecked}/>
            <Particles/>
            <SocialNetwork/>
            <div className="profile-info">
                <h1>{t('Profile Info')} :</h1>
                <div>
                    <h4>{t('ID')} : </h4>
                    <p>{user.id}</p>
                </div>

                <div>
                    <h4>{t('Username')} : </h4>
                    <p>{user.username}</p>
                </div>

                <div>
                    <h4>{t('Fullname')} : </h4>
                    <p>{user.fullname}</p>
                </div>

                <div>
                    <h4>{t('Email')} : </h4>
                    <p>{user.email}</p>
                </div>

                <div>
                    <h4>{t('Phone')} : </h4>
                    <p>{user.phone}</p>
                </div>

                <div>
                    <h4>{t('Gender')} : </h4>
                    <p>{user.gender}</p>
                </div>

                <div>
                    <h4>{t('Date Of Birth')} : </h4>
                    <p>{user.birthDate}</p>
                </div>
                    
            </div>
            <div className="edit-button">
                <Button onClick={()=>navigate("/editProfile")}>{t('Edit Profile')}</Button>
            </div>

           

            <div className="subscription-info">
                <h1>{t('Your Subscriptions')} : </h1>
            </div>
            {message ? <div className="warning">{message}</div> : <div></div>}
            {Array.isArray(subscriptions) && subscriptions.length > 0 ? (
                subscriptions.map((subscription) => (
                    <div key={subscription.id} className="subscriptions-profile-container">
                        <div><h4>{t('Course id')} :</h4>
                            <p>{subscription.courseId}</p>
                        </div>             
                        <div><h4>{t('Course Topic')} :</h4>
                            <p>{subscription.courseTopic}</p>
                        </div> 
                        <div><h4>{t('Subscription date')} :</h4>
                            <p>{subscription.subscriptionDate.split('T')[0]}</p>
                        </div> 
                                
                        <div><h4>{t('Confirmed')} :</h4>
                            <p>{subscription.confirmed ? "Yes" : "No"}</p>
                        </div> 
                                                
                    </div>

                ))
            ) : <div> </div>}

            <Footer/>
                
        </div>
    );
}
 
export default Profile;