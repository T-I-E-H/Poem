import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import './App.css';
import './index.css';
import userINFO from "./user.js"
import prodINFO from "./prod.js"
import reportWebVitals from './reportWebVitals';

let user = userINFO()
let prod = prodINFO()
const root = ReactDOM.createRoot(document.getElementById('root'));
function App(){
  
  const {page,setPage} = useState(<Contacts/>);
  
  return (
    <div className = "root">
      <UI/>
      
    </div> 
  );
}



function UI(){
  const [page, setPage] = useState();
  const [auth, setAuth] = useState(user.authorized);
  const [verification, setVerification] = useState("auth");
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const mainPage = (event) => {
    setPage(<Profile/>);
  };
  const profile = (event) => {
    setPage(<Profile/>);
  };
  const add = (event) => {
    setPage(<Add/>);
  };
  const myRating = (event) => {
    setPage(<MyWorks/>);
  };
  const top = (event) => {
    setPage(<Top/>);
  };
  const topCat = (event) => {
    setPage(<AllWorks/>);
  };
  const topAuth = (event) => {
    setPage(<AllAuth/>);
  };

  const tryAuth = () => {
        user.tryAuthorize(username, password)
        .then((data) => {
          if (user.authorized==true)
          setPage(<Profile/>)
        });
     }
    
  const Reg = () => {
    user.registration(username, mail, password)

  }
  const authVariant = () =>{
    if(verification==="auth")  setVerification("reg") 
    else setVerification("auth") 
  }
  const exit = ()=>{
    user = new userINFO()
    setPage(<Profile/>);
  }


  const setFeedback = () =>{
    setPage(<Feedback/>)
  }
  const GetProd = (id) =>{
    
    prod.getThisWork(id).then(data => {
      prod.getFeedback(id).then(fb => {
        setPage(
          <div style = {{margin:"100px",padding: "100px", borderRadius: "15%", backgroundColor: "#99582A"}}>
          <div style={{color: "black",fontSize: "25px"}}>Название</div>
          <div>{data.name}</div>
          <div style={{color: "black",fontSize: "25px"}}>Текст</div>
          <div className="textInput" type = "text">{data.content}</div>
          <div style={{color: "black",fontSize: "25px"}}>Теги</div>
          <div>{data.tags}</div>
          <div>
            <button onClick={setFeedback}>Добавить отзыв</button>
          </div>
          
           
            {fb.map((el, index) =>(
              <table>
              <tr><td>{el.nickname}</td><td>{el.date}</td></tr>
              <tr><td>{el.grade}.</td><td>{el.comment}</td></tr>
          </table>
            ))} 
          
        </div>
      )
      })
      })
  }
  const AllAuth = () =>{
    setPage(<div>Loading...</div>)
    prod.getAllAuthors().then(data =>{
      const works = data
      console.log(works)
      setPage(
      <table>
      <tr><th>автор</th><th>кол-во оценок</th><th>средняя оценка</th></tr> 
        {works.map((el, index) =>(<tr borderRadius = "1px"><td>{el.nickname}</td><td>{el.count}</td><td>{el.mid}</td></tr>)
        )} 
      </table>
      )
    })
  }
  const AllWorks = () =>{
    setPage(<div>Loading...</div>)
    prod.getAllWorks().then(data =>{
      const works = data
      console.log(works)
      setPage(
      <table>
      <tr><th>название</th><th>автор</th><th>кол-во оценок</th><th>средняя оценка</th></tr> 
        {works.map((el, index) =>(<tr borderRadius = "1px"><td style={{cursor: "pointer"}} key = {el.id} onClick = {GetProd.bind(this, el.id)}>{el.name}</td><td>{el.nickname}</td><td>{el.count}</td><td>{el.mid}</td></tr>)
        )} 
      </table>
      )
    })
    
    
    
  }
  const Top = ()=>{
    setPage(<div>Loading...</div>)
      prod.getAllWorks().then(data =>{
        const works = data
        console.log(works)
        setPage(
        <table>
        <tr><th>название</th><th>автор</th><th>теги</th><th>средняя оценка</th></tr> 
          {works.map((el, index) =>(<tr borderRadius = "1px"><td style={{cursor: "pointer"}} key = {el.id} onClick = {GetProd.bind(this, el.id)}>{el.name}</td><td>{el.nickname}</td><td>{el.tags}</td><td>{el.mid}</td></tr>)
          )} 
        </table>
        )
      })
      
      
      
  }
  const MyWorks = () =>{
    setPage(<div>Loading...</div>)
    const login = user.nickname
    prod.getAuthWorks(login).then(data =>{
      const works = data
      console.log(works)
      setPage(
      <table>
      <tr><th>название</th><th>автор</th><th>кол-во оценок</th><th>средняя оценка</th></tr> 
        {works.map((el, index) =>(<tr borderRadius = "1px"><td key = {el.id} style={{cursor: "pointer"}} onClick = {GetProd.bind(this, el.id)}>{el.name}</td><td>{el.nickname}</td><td>{el.count}</td><td>{el.mid}</td></tr>)
        )} 
      </table>
      )
    })
    
    
  }
  const authPage = (
    <div style = {{margin:"100px",padding: "100px", borderRadius: "15%", backgroundColor: "#99582A"}}>
    <div>Имя пользователя</div>
    <input value={username} onChange={e=> setUsername(e.target.value)} type = "text" id = "login"></input>
    {verification==="reg" ? <div><div>Почта </div><input value = {mail} onChange={e=> setMail(e.target.value)}  type = "text" id = "mail"></input></div> : null}
    <div>Пароль </div>
    <input value={password} type = "password" id = "password" onChange={e=> setPassword(e.target.value)}></input>
    <div>
      <button onClick={verification==="auth" ? tryAuth : Reg}>Войти</button>
      <button onClick={authVariant}>Регистрация/Авторизация</button>
    </div>
  </div>)
  
  return(<div>
    <header>
        <div className = "headText">Тупоэзия</div>
        <div className = "profile">
        {user.authorized ? <button onClick={exit}>Выйти</button> : null}
          <div onClick = {profile} style = {{width: "50px", height: "50px", display: "inline-block"}}><UserPhoto/></div>
          <div style = {{display: "inline-block", fontSize: "25px"}}> <UserName/> </div>
        </div>
        <nav className = "menu">
          <ul>
			        <li><a onClick = {profile}> Профиль </a><ul>
			                <li><a onClick = {add}>Добавление работы</a></li>
			                <li><a onClick = {myRating}>Мой рейтинг</a></li>
			            </ul></li>
			        <li><a onClick = {top}>Топ работ</a><ul>
			                <li><a onClick = {topCat}>По количеству оценок</a></li>
			                <li><a onClick = {topAuth}>По авторам</a></li>
			            </ul></li>
			    </ul>
      </nav>
      <Contacts/>
  </header> 
  <div className = "main" id = "main">
    {!user.authorized ? authPage : page}
    </div>
  </div>);
}

function Contacts(){
  return(
    <footer>
      .       
      Telegram: @stressfuel
    </footer>
  );
}

function Profile(){
  
  return(
    <div>
      <div style = {{width: "256px", height: "256px", display: "inline-block"}}><UserPhoto/></div>
      <div style = {{display: "inline-block"}}>
        <div className="someText"> <b style = {{color: "black"}}>Имя:</b> <UserName/></div>
        <div className="someText"> <b style = {{color: "black"}}>Почта:</b> <UserMail/></div>
        <div className="someText"> <b style = {{color: "black"}}>Дата регистрации:</b> <UserDate/></div>
      </div>
      <div style = {{top:"0",display:"inline-block", marginLeft:"5%", marginRight:"5%", width: "20%"}}>
      
      </div>
    </div>);
}


function Feedback(){
  const [grade, setGrade] = useState()
  const [comment, setComment] = useState()
  const addHandler=function(){
    prod.addFeedback(user.nickname, grade, comment)
  }
  return(
    <div style = {{margin:"100px",padding: "100px", borderRadius: "15%", backgroundColor: "#99582A"}}>
      <div style={{color: "black"}}>Оценка</div>
      <select onChange={e=> setGrade(e.target.value)}>
        <option>1</option>
        <option>2</option> 
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <div style={{color: "black"}}>Комментарий</div>
      <textarea value={comment} onChange={e=> setComment(e.target.value)} className="textInput" type = "text"></textarea>
      <div>
        <button onClick={addHandler}>Отправить</button>
      </div>
    </div>
  );
}
function Add(){
  const [name, setName] = useState()
  const [content, setContent] = useState()
  const [tags, setTags] = useState()
  const addHandler=function(){
    prod.addWork(user.nickname, name, tags, content)
  }
  return(
    <div style = {{margin:"100px",padding: "100px", borderRadius: "15%", backgroundColor: "#99582A"}}>
      <div>Название</div>
      <input value={name} onChange={e=> setName(e.target.value)}></input>
      <div>Текст</div>
      <textarea value={content} onChange={e=> setContent(e.target.value)} className="textInput" type = "text"></textarea>
      <div>Теги</div>
      <input value={tags} onChange={e=> setTags(e.target.value)}></input>
      <div>
        <button onClick={addHandler}>Добавить</button>
      </div>
    </div>
  );
}
function MyRating(){

}

function UserName(){
  return(user.nickname);
}
function UserMail(){
  return(user.mail);
}
function UserPhoto(){
  return(<div className = "profilePic"></div>);
}
function UserDate(){
  return(user.regdate);
}
root.render(

    <App />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default App