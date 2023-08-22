
var jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.send({type:'error', message:'Token expired'})

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return  res.send({type:'error', message:'Token expired'})

    next()
  })
}

module.exports = function(app, connection){    
    app.post('/fetchSqlQuery', authenticateToken, (req, res)=>{ 
      connection.getConnection(function(err, con) {
        if(err){
            return JSON.stringify(err, null, 2)
        }else{
            con.query(req.body.sql, (err, result)=>{
              con.release();
                if(err){
                    return res.send(JSON.stringify(err, null, 2))
                }else{
                    return res.send(result)
                }
            })
          }
        })
    })
}