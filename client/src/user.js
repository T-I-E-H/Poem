import axios from "./axios.js"

function userINFO(){
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    function user(){
        this.nickname = "Гость"
        this.mail = null
        this.regdate = null
        this.authorized = false
    }
    user.prototype.change = function(nickname, mail, regdate){
        if(nickname==null) {
            this.authorized = false
            this.nickname = "Гость"
            this.mail = null
            this.regdate = null
        }
        else {
            this.authorized = true
            this.nickname = nickname
            this.mail = mail
            this.regdate = regdate
        }
    } 

    async function getUser(login){
        let response = await axios.get("/user/"+login)
        const attempt = await response.data;
        return attempt;
    }
    async function getMail(mail){
        let response = await axios.get("/mail/"+mail)
        const attempt = await response.data;
        return attempt;
    }
    user.prototype.tryAuthorize = async function(login, password){
        let attempt = null
            await getUser(login).then(data=>{
                attempt = data
                if (attempt[0]!=undefined){
                    if(attempt[0].nickname === login && attempt[0].password === password){
                        this.authorized = true
                        this.nickname = attempt[0].nickname
                        this.mail = attempt[0].mail
                        this.regdate = attempt[0].regdate

                        return attempt
                    }
                    else{
                        alert("Неверные данные")
                        return attempt
                    }
                }
                else {
                    alert("Ошибка")
                    this.authorized = attempt

                    return attempt
                }
            })
            

        return 0

        }
    user.prototype.registration = async function(login, mail, password){
        await getUser(login).then(data =>{
            if(data[0]==undefined){
                
                getMail(mail).then(mdata =>{
                    if(mdata[0] == undefined){
                        
                        if(mail.match(pattern)){
                            const fields = {
                                login,
                                mail,
                                password
                            }
                            axios.post("/user/create", fields)
                            alert("Регистрация прошла успешно")
                        }
                        else{
                            alert("Неверно введена почта")
                        }
                    } else alert("Пользователь с таким email существует")
                })
            } else alert("Пользователь с таким именем существует")
        })
    }
        
        
    const currentUser = new user();
    return currentUser
}
export default userINFO