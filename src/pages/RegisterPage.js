import axios from "axios";
import { useContext, useState } from "react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import driven from "../assets/driven.png"
import { apiURL, AuthContext, Loading } from "../components/Globlal";



export default function RegisterPage(){
    const [email, setEmail] = useState("")
    const [cpf, setCPF] = useState("")
    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const [load, setLoad] = useState(false)
    const [, setUser] = useContext(AuthContext)
    const navigate = useNavigate()

    function submit(e){
        e.preventDefault()
        setLoad(true)
        const URL = apiURL+"auth/sign-up"
        const body = {
            email: email,
            name: name,
            cpf: cpf,
            password: pass
        }
        const promise = axios.post(URL, body)
        
        promise.then((a)=>{
            setUser(a.data)
            setTimeout(() => {
               navigate("/home")
            }, 500);
        })
        promise.catch((a)=>{
            setLoad(false)
            const msg = a.response.data.message
            alert(msg)
            setPass("")
        })
    }



    return( 
    <LoginPageStyle>
        <img src={driven} alt="" />
        <form onSubmit={submit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={e=> setName(e.target.value)}
                    required
                    disabled={""}
                />
                <InputMask
                    mask="999.999.999-99"
                    placeholder="CPF"
                    value={cpf}
                    onChange={e=> setCPF(e.target.value)}
                    required
                    disabled={""}
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    required
                    disabled={""}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={pass}
                    onChange={e=> setPass(e.target.value)}
                    required
                    disabled={""}
                />
                <button 
                    type="submit"
                    disabled={""}
                >{load ? <Loading height={22} width={50} radius={9}/> : "Entrar"}</button>
            </form>
            <h3 onClick={()=>{navigate("/")}}>Não possuí uma conta? Cadastre-se</h3>
    </LoginPageStyle>
    )
}

const LoginPageStyle = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #0E0E13;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    form{
        width: 80%;
        margin-top: 60px;
        display: flex;
        flex-direction: column;
    
        input{
            border-radius: 8px;
            padding: 16px;
            border: none;
            margin-bottom: 7px;
        }
        button{
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            padding: 14px;
            border: none;
            margin-top: 14px;
            color: white;
            background-color: #FF4791;
            font-weight: 700;
            font-size: 18px;
        }
    }
    h3{
        margin-top: 30px;
        color: white;
        font-weight: 400;
        text-decoration-line: underline;
    }
`