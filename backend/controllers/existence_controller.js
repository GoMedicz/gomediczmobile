
module.exports = function(app, connection){
    app.post('/existence_controller/:table/:column', (req, res)=>{
      var sql = 'Select '+[req.params.column]+' from '+[req.params.table]+' where '+[req.params.column]+' = ?';
    
      connection.getConnection(function(err, con) {
        if(err){
            return JSON.stringify(err, null, 2)
        }else{
      con.query(sql, req.body.data, (err, result)=>{
        con.release();
        if(err){
            return res.send(JSON.stringify(err, undefined, 2))
        }else{
            if(result.length!==0){
                return res.send(true)
            }else{
                return res.send(false)
            }
        }
    })
}
})
    })
}