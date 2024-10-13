import { useState } from "react";
import { Button } from "../components/Button";
import { Form, Label, Input } from "../components/Form";
import NavBar from "../components/NavBar";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Select from "react-select";

import "../styles/Search.css";

const Search = ({user, checked, setChecked}) => {
    const [valueUser, setValueUser] = useState("");
    const [keyUser, setKeyUser] = useState("");

    const [valueSubscription, setValueSubscription] = useState("");
    const [keySubscription, setKeySubscription] = useState("");

    const [subscriptions, setSubscriptions] = useState([]);
    const [users, setUsers] = useState([]);



    
    const {t} = useTranslation();

    const optionsSubscription = [
        {label : "GET All" , value : "GETAll"},
        {label : "id" , value : "id"},
        {label : "course Id" , value : "courseId"},
        {label : "course Topic" , value : "courseTopic"},
        {label : "user Id" , value : "userId"},
        {label : "user name" , value : "userName"},

        {label : "user Email" , value : "userEmail"},
        {label : "user Phone" , value : "userPhone"},
        {label : "user Gender" , value : "userGender"},
        {label : "user Address" , value : "userAddress"},
        
        {label : "user subscriptionDate" , value : "subscriptionDate"},
        {label : "user confirmed" , value : "confirmed"},





    ];

    const optionsUser = [
        {label : "GET All" , value : "GETAll"},
        {label : "user Id" , value : "id"},
        {label : "user username" , value : "username"},
        {label : "user full name" , value : "fullname"},
        {label : "user Email" , value : "email"},
        {label : "user Phone" , value : "phone"},
        {label : "user Gender" , value : "gender"},
        {label : "user Address" , value : "address"},
        {label : "user signup date" , value : "subscriptionDate"},
        {label : "user verified" , value : "verified"},
        {label : "user birthdate" , value : "birthDate"},
    ];

    const styles = {
        control: (styles, {isFocused}) => ({
            ...styles,
            backgroundColor: 'var(--input-background-color)',
            border: isFocused ? '3px solid #7cb9cd' : '3px solid #ccc',
            outline: isFocused ? '3px solid #7cb9cd' : 'none',
            cursor : "pointer",
            margin : "0px 10px",
            padding : "5px", 
            '&:hover': {
                border: '5px solid #7cb9cd', 
            },
            
        }),
        option: (styles, {isSelected, isFocused}) => {
            return {
                ...styles,
                backgroundColor: 'var(--input-background-color)', 
                color: 'var(--color)',
                cursor: 'pointer',
                ...(isSelected && {
                    backgroundColor: '#7cb9cd', 
                    
                }),  
                ...(isFocused && {
                    backgroundColor: '#c6d6db',    
                }),  
                      
            };
        },
        placeholder: (styles) => ({
            ...styles,
            color: 'var(--color)',  // Set placeholder color to red
        }),
    };
    
    const handleSubmitSubscription = async(e)=>{
        e.preventDefault();
        const data = {
            value : valueSubscription,
            key : keySubscription
        }
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/getSubscriptions`, data)
        .then((res)=>{
            setSubscriptions(res.data.subscriptions);
            setUsers([]);

        })
        .catch((err)=>{
            console.log(err);
        });
    }
    const handleSubmitUser= async(e)=>{
        e.preventDefault();
        const data = {
            value : valueUser,
            key : keyUser
        }
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/getUser`, data)
        .then((res)=>{
            setSubscriptions([]);
            setUsers(res.data.users);

        })
        .catch((err)=>{
            console.log(err);
        });
    };

    const handleConfime = async(e, id)=>{
        e.preventDefault();
        const data = {
            id,
        }
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/confirmSubscription`, data)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div>
            <NavBar user={user} checked={checked} setChecked={setChecked}></NavBar>
            <div className="search-field">
                <Form onSubmit={handleSubmitUser}>
                    <Label>Get Users Info:</Label>
                    <Select options={optionsUser} styles={styles} onChange={(e)=>setKeyUser(e.value)}/>
                    <Input type="search" onChange={(e)=>setValueUser(e.target.value)}/>
                    <Button  type="submit">{t('Search')}</Button>
                </Form>
                <Form onSubmit={handleSubmitSubscription}>
                    <Label>Get Subscriptions Info:</Label>
                    <Select options={optionsSubscription} styles={styles} onChange={(e)=>setKeySubscription(e.value)}/>
                    <Input type="search" onChange={(e)=>setValueSubscription(e.target.value)}/>
                    <Button  type="submit">{t('Search')}</Button>
                </Form>
            </div>
            <div>
                <div className="count">
                    <h1>Count : </h1>
                    <p>{subscriptions.length > 0 ? subscriptions.length : users.length > 0 ? users.length : 0}</p>
                </div>
                {Array.isArray(subscriptions) && subscriptions.length > 0 ? (
                    subscriptions.map((subscription) => (
                        <div key={subscription.id} className="subscriptions-container">
                                <div><h4>Id :</h4>
                                    <p>{subscription.id}</p>
                                </div>   
                                <div><h4>User id :</h4>
                                    <p>{subscription.userId}</p>
                                </div>             
                                <div><h4>User Fullname :</h4>
                                    <p>{subscription.userName}</p>
                                </div>            
                                <div><h4>User Email :</h4>
                                    <p>{subscription.userEmail}</p>
                                </div>
                                <div><h4>User Phone :</h4>
                                    <p>{subscription.userPhone}</p>
                                </div>  
                                <div><h4>User Gender :</h4>
                                    <p>{subscription.userGender}</p>
                                </div>  

                                <div><h4>Course id :</h4>
                                    <p>{subscription.courseId}</p>
                                </div>             
                                <div><h4>Course Topic :</h4>
                                    <p>{subscription.courseTopic}</p>
                                </div> 
                                <div><h4>Subscription date :</h4>
                                    <p>{subscription.subscriptionDate}</p>
                                </div> 
                                       
                                <div><h4>Confirmed :</h4>
                                    <p>{subscription.confirmed ? "Yes" : "No"}</p>
                                </div> 

                                <div>
                                    <Button $Height={"80px"} onClick={(e)=>handleConfime(e, subscription._id)}>Confirmed</Button>
                                </div>
                                                      
                        </div>

                    ))
                ) : Array.isArray(users) && users.length > 0 ? (
                    users.map((user) => (
                        <div key={user.id} className="subscriptions-container">
                            
                            <div><h4>User id :</h4>
                                <p>{user.id}</p>
                            </div>             
                            <div><h4>User Username :</h4>
                                <p>{user.username}</p>
                            </div>  
                            <div><h4>User Fullname :</h4>
                                <p>{user.fullname}</p>
                            </div>              
                            <div><h4>User Email :</h4>
                                <p>{user.email}</p>
                            </div>
                            <div><h4>User Phone :</h4>
                                <p>{user.phone}</p>
                            </div>  
                            <div><h4>User Gender :</h4>
                                <p>{user.gender}</p>
                            </div> 

                                <div><h4>User Address :</h4>
                                <p>{user.address}</p>
                            </div> 
                            <div><h4>User birth date :</h4>
                                <p>{user.birthDate}</p>
                            </div> 
                            
                            <div><h4>User Signup date :</h4>
                                <p>{user.subscriptionDate}</p>
                            </div> 
                                    
                            <div><h4>Verified :</h4>
                                <p>{user.verified ? "Yes" : "No"}</p>
                            </div> 

                        </div>
                    )
                )) : <div></div> }
            </div>
        </div>
    );
}
 
export default Search;