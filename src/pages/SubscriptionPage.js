import styled from "styled-components";
import { ReactComponent as Logo } from '../assets/Vector.svg';
import plus from "../assets/Plus.svg"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { apiURL, AuthContext } from "./Globlal";
import { useNavigate } from "react-router-dom";


export default function SubscriptionPage (){
    const navigate = useNavigate()
    const [user,] = useContext(AuthContext)
    const [subsList, setSubsList] = useState("")

    const antiServerBugList = ["white", "#FFF16F", "#56D59F"]
    
    useEffect(()=>{

        const URL = apiURL + "subscriptions/memberships"

        const config = {
            headers: {'Authorization': 'Bearer ' + user.token}
        }

        const promise = axios.get(URL, config)

        promise.then((a)=>{
            setSubsList(a.data)
        })
        promise.catch(()=>{
            
        })
    },[])
    
    function Subscription(){
        if (subsList.length < 1) {
            return
        }
        return subsList.map((item)=>(
        <div
            key={item.id}
            onClick={()=>{navigate("/subscriptions/"+item.id)}}
            className="subscriptions">
            <div>
                <Logo fill={antiServerBugList[item.id -1]}/>
                <img src={plus} alt=""/>
            </div>
            <h2>R$ {item.price}</h2>
        </div>
        ))
    }

    return (
    <SubscriptionStyle>
        <h1>Escolha seu Plano</h1>
        <Subscription />
    </SubscriptionStyle>
    )
}

const SubscriptionStyle = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #0E0E13;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1{
        color: white;
        margin-bottom: 120px;
    }

    .subscriptions{
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 12px;
        width: 80%;
        border: 3px solid white;
        padding: 20px;
    }

    h2{
        color: white;
    }

`