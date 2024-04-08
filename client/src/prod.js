import axios from "./axios.js"
function prodINFO(){
    function prod(){
        this.id = null
    }
    prod.prototype.addWork = async function(nickname,name,tags ,content){
        const fields = {nickname,name,tags ,content}
        console.log(fields)
        if(!fields.nickname|| !fields.name || !fields.tags) alert("Не все поля заполнены")
        else
        await axios.post("/prod/create", fields).then(data =>{
            alert("Произведение добавлено")
            return data
        })

    }
    prod.prototype.addFeedback = async function(nickname,grade, comment){
        const id = this.id
        const fields = {id ,nickname, grade, comment}
        console.log(fields)
        await axios.post("/feedback/add", fields).then(data =>{
            alert("Произведение добавлено")
            return data
        })

    }
    async function getUserRating(data){
        var users = await axios.get("/users")
        var users = await users.data
        var result = []
        console.log(data)
        await users.forEach((element,i)=>{
            var tmp = {}
            tmp.count = 0
            tmp.mid = 0
            data.forEach((element1, k) => {
                if(element.nickname == element1.nickname) {tmp.count += 1;tmp.mid += element1.mid}
                k++
            });
            tmp.nickname = element.nickname
            {tmp.count !=0 ? tmp.mid = tmp.mid/tmp.count : tmp.mid = 0}
            result.push(tmp)
            i++
        })
        return result
    }
    prod.prototype.getAuthWorks = async function(nickname){
        let response = await axios.get("/user/prods/"+nickname)
        
        const attempt = await response.data
        return attempt;
    }
    prod.prototype.getAllWorks = async function(){
        let response = await axios.get("/user/prods")
        const sor = async function(arr) {
            for (let j = arr.length - 1; j > 0; j--) {
                for (let i = 0; i < j; i++) {
                    if (arr[i].mid < arr[i + 1].mid) {
                    let temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    }
                }
            }
            return arr
        }
        
        
        const attempt = await sor(response.data)
        console.log(attempt)
        return attempt;
    }
    prod.prototype.getAllAuthors = async function(){
        let response = await axios.get("/user/prods")
        const sor = async function(arr) {
            for (let j = arr.length - 1; j > 0; j--) {
                for (let i = 0; i < j; i++) {
                    if (arr[i].mid < arr[i + 1].mid) {
                    let temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    }
                }
            }
            return arr
        }
        
        
        var attempt = await getUserRating(response.data)
        attempt=await sor(attempt)
        console.log(attempt)
        return attempt;
    }
    prod.prototype.getThisWork = async function(id){
        let response = await axios.get("/prods/"+id)
        const attempt = await response.data[0];
        console.log(attempt)
        this.id = attempt.id
        return attempt;
    }
    prod.prototype.getFeedback = async function(id){
        let response = await axios.get("/prod/feedback/"+id)
        const attempt = await response.data;
        console.log(attempt)
        return attempt;
    }

    const res = new prod()
    return res
}

export default prodINFO
 