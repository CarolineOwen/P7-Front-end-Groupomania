import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


//Fonction pour se connecter sur le site quand les utilisateurs ont déjà un login et un mot de passe

const Connexion = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId")
  

  useEffect(() => {
    userId && navigate('/home')
  }, [])
    


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = (e) => {
    e.preventDefault();
    const passwordError = document.querySelector('.password-error');

    axios({
      method: "post",
      url: 'http://localhost:3000/api/auth/login',
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        const token = res.data.token;
        const userId = res.data.userId;
        const role = res.data.role;
        const email = res.data.email;
        const pseudo = res.data.pseudo;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);
        localStorage.setItem("pseudo", pseudo);
        navigate('/home');
      }
      )
      .catch((err) => {
        console.log(err.message)
        passwordError.innerHTML = "Paire login/mot de passe incorrecte. Pas de compte? Veuillez en créer un.";
      });
  };



  return (
    <>
      <main className='main-container'>
        <h1>Se connecter</h1>
        <form action="" onSubmit={handleLogin} id="login" method='post'>
          <label htmlFor='email'>Utilisateur:
            <input className='champs' type="email" name="email" id="email" autoFocus placeholder='Entrez votre email'
              onChange={(e) => setEmail(e.target.value)} value={email} required />
          </label>
          <div className="email-error"></div>
          <br />
          <label htmlFor='password'>Mot de passe :
            <input type="password" name="password" id='password' placeholder='Entrez votre mot de passe'
              onChange={(e) => setPassword(e.target.value)} value={password} required />
          </label>
          <div className="password-error"></div>
          <br />
          <input className='btn' type="submit" value="Connexion" />
        </form>
        <p>Pour créer un compte c'est par içi <a href="/signup"><i className="fa-solid fa-hand-pointer"></i></a></p>
      </main>
    </>
  );
};

export default Connexion;