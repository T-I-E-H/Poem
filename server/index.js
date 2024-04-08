const express = require("express");
const mysql = require('mysql');
const cors = require('cors')


const config = {
    host: 'localhost',
    user: 'poemdb',
    password: 'Kiber_123',
    database: 'poemdb',
};
let pool = null
try{pool = mysql.createPool(config);}catch(e) {console.log(e)}


module.exports = pool;

const PORT = 3001;

const app = express();
app.use(express.json())
app.use(cors())

app.get('/users', (request, response) => {
  pool.query("SELECT * FROM authors", (error, result) => {
      if (error) {console.log(error); throw error; }
      console.log(result)
      response.send(result);
  });
});


app.get('/user/prods', (request, response) => {
  var count = 0
  var mid = 0
  try{pool.query('SELECT * FROM prods', (error, result) => {
    result.forEach((element,i) => {
      pool.query('SELECT * FROM feedback WHERE prodid = ?', element.id, (error, feed) => {
        feed.forEach(element2 =>{
          count = count + 1
          mid = mid + element2.grade
          console.log("mid"+mid+"count"+count)
        })
        if(count != 0)mid = mid/count; else mid = 0
        result[i].count=count
        result[i].mid=mid
        mid = 0
        count = 0
        console.log(result[i])
        i++
      })
    });
    if (error) throw error;
    
    setTimeout(() => {
      console.log(result)

      response.send(result)
    }, 5000)
    
  });
  }
  catch(e){
    response.send(false)
  }
});
app.get('/prods/:id', (request, response) => {
  const id = request.params.id;
  try{pool.query('SELECT * FROM prods WHERE id = ?', id, (error, result) => {
      if (error) throw error;
      console.log(result)
      response.send(result);
  });
  }
  catch(e){
    response.send(false)
  }
});
app.get('/prod/feedback/:id', (request, response) => {
  const id = request.params.id;
  try{pool.query('SELECT * FROM feedback WHERE prodid = ?', id, (error, result) => {
      if (error) throw error;
      console.log(result)
      response.send(result);
  });
  }
  catch(e){
    response.send(false)
  }
});
app.get('/user/prods/:id',  (request, response) => {
  const id = request.params.id;
  var count = 0
  var mid = 0
  try{pool.query('SELECT * FROM prods WHERE nickname = ?', id, (error, result) => {
    result.forEach((element,i) => {
      pool.query('SELECT * FROM feedback WHERE prodid = ?', element.id, (error, feed) => {
        feed.forEach(element2 =>{
          count = count + 1
          mid = mid + element2.grade
          console.log("mid"+mid+"count"+count)
        })
        if(count != 0)mid = mid/count; else mid = 0
        result[i].count=count
        result[i].mid=mid
        mid = 0
        count = 0
        console.log(result[i])
        i++
      })
    });
    if (error) throw error;
    
    setTimeout(() => {
      console.log(result)

      response.send(result)
    }, 5000)
    
  });
  }
  catch(e){
    response.send(false)
  }
});
app.get('/users/prods', (request, response) =>  {
  var count = 0
  var mid = 0
  try{
    pool.query('SELECT * FROM authors', async(error, result) => {
      await result.forEach((element0,i)=>{
        pool.query('SELECT * FROM prods WHERE nickname = ?', element0.nickname, async (error, prod) => {
          await prod.forEach((element,k) => {
            pool.query('SELECT * FROM feedback WHERE prodid = ?', element.id, async (error, feed) => {
              await feed.forEach((element2,j) =>{
                count = count + 1
                mid = mid + element2.grade
                console.log("mid"+mid+"count"+count)
              })
              
              
              
              
            })
          });
      })
        //console.log(result)
        
        if(count != 0)mid = mid/count; else mid = 0
        result[i].count=count
        result[i].mid=mid
        console.log(result[i])
        mid = 0
        count = 0
        i++

      
    })
    
    if (error) throw error;
  
    

      response.send(result)

    
  });
  }
  catch(e){
    response.send(false)
  }
});
app.get('/user/:id', (request, response) => {
  const id = request.params.id;
  try{pool.query('SELECT * FROM authors WHERE nickname = ?', id, (error, result) => {
      if (error) throw error;
      console.log(result)
      response.send(result);
  });
  }
  catch(e){
    response.send(false)
  }
});
app.get('/mail/:id', (request, response) => {
  const id = request.params.id;
  pool.query('SELECT * FROM authors WHERE mail = ?', id, (error, result) => {
      if (error) throw error;
      console.log(result)
      response.send(result);
  });
});
app.get('/feedback/:id', (request, response) => {
  const id = request.params.id;
  pool.query('SELECT * FROM feedback WHERE mail = ?', id, (error, result) => {
    if (error) throw error;
    console.log(result)
    response.send(result);
});
});

app.post('/user/create', (req,res) => {
  const nickname = req.body.login;;
  const mail = req.body.mail;
  const password = req.body.password;
  var today = new Date();
  
  pool.query("INSERT INTO authors (nickname, mail, password, regdate) VALUES (?,?,?,?)",[nickname,mail,password, today], (err,result)=>{
     if(err) {
     console.log(err)
     res.send(result)
     } 
     console.log(result)
     res.send(result)
  });   })
app.post('/prod/create', (req,res) => {
  console.log(req.body)
  const nickname = req.body.nickname
  const name = req.body.name
  const tags = req.body.tags
  const content = req.body.content
  var today = new Date();
  pool.query("INSERT INTO prods (nickname, name, date, tags, content) VALUES (?,?,?,?,?)",[nickname,name,today, tags, content], (err,result)=>{
      if(err) {
      console.log(err)
      res.send(result)
      } 
      console.log(result)
      res.send(result)
  });   
})
app.post('/feedback/add', (req,res) => {
  console.log(req.body)
  const id = req.body.id
  const nickname = req.body.nickname
  const grade = req.body.grade
  const comment = req.body.comment
  var today = new Date();
  pool.query("INSERT INTO feedback (prodid, nickname, grade, comment, date) VALUES (?,?,?,?,?)",[id,nickname,grade, comment, today], (err,result)=>{
      if(err) console.log(err)
      res.send(result)
      
  });   
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});