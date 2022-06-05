'use strict';
const e = require('express');


exports.insrt_top=function(pool,body,home,callback){
    console.log(body)
    if(Object.keys(body)[0]=="ON"){
        var temp=1
    }
    else{
        var temp=0
    }

    var quer=` INSERT INTO "USERSDEVIS" (id_device, id_home , room , name , state , brightness , color , "Time" )
    VALUES (2,${home},'Living Room' ,'lel',${temp}, '0' , '0' ,CURRENT_TIMESTAMP)
    `;
            (async function() {
                const client = await pool.connect()
                await client.query(quer,(err,res)=>{
                    if(!err){
                    
                    var devices='all good'
        
                    callback(null, devices)
                    client.end()
                    
                    }
                    else{
        
                    console.log(err.message);
                    callback(err, null)
                    
        
                    }
                    console.log('hello')
                    })
                client.release()
                return
            })()

}
//---From here we access the database to get or give data -----//
exports.get_user_homes=function(pool,id_user,callback){



    var quer=` select "Home_name",id_home,"Kw"
                from public."HOMES"
                where id_user=${id_user}
                group by id_home,"Home_name","Kw"
                `;
    (async function() {
                const client = await pool.connect()
                await client.query(quer,(err,res)=>{
                    if(!err){
                    
                   console.log(res.rows)
                    var data={
                        devices:res.rows
                    }
                    var devices=JSON.parse(JSON.stringify(data))
        
                    callback(null, devices)
                    client.end()
                    
                    }
                    else{
        
                    console.log(err.message);
                    callback(err, null)
                    
        
                    }
                    console.log('hello')
                    })
                client.release()
                return
            })()
        
}

exports.get_home_living=function(pool,id,callback){


    var quer=`  select id_device,u.name,"state","color","brightness","Time"
    from(
    select "name", max("Time") as max_time from "USERSDEVIS"
    where id_home='${id}' AND room='Living Room'
    group by "name") s join "USERSDEVIS" u
    on s.name=u.name AND s.max_time = u."Time"
    `;
(async function() {
    const client = await pool.connect()
    await client.query(quer,(err,res)=>{
        if(!err){
        
       console.log(res.rows)
        var data={
            
            devices:res.rows
        }
        console.log("temp",data)
        var devices=JSON.parse(JSON.stringify(data))

        callback(null, devices)
        client.end()
        
        }
        else{

        console.log(err.message);
        callback(err, null)
        

        }
        console.log('hello')
        })
    client.release()
    return
})()
      
}



exports.get_room=function(pool,id,room,callback){

    if(room=="living_room"){
        room="Living Room"
    }
    console.log(id,room)

    var quer=`  select id_device,u.name,"state","color","brightness","Time"
    from(
    select "name", max("Time") as max_time from "USERSDEVIS"
    where id_home='${id}' AND room='${room}'
    group by "name") s join "USERSDEVIS" u
    on s.name=u.name AND s.max_time = u."Time"
    `;
(async function() {
    const client = await pool.connect()
    await client.query(quer,(err,res)=>{
        if(!err){
        
       console.log(res.rows)
        var data={
            
            devices:res.rows
        }
        console.log("temp",data)
        var devices=JSON.parse(JSON.stringify(data))

        callback(null, devices)
        client.end()
        
        }
        else{

        console.log(err.message);
        callback(err, null)
        

        }
        console.log('hello')
        })
    client.release()
    return
})()
    // var devices={room:room,devices:{
    //     0:{
    //         id:0,
    //         lamp:0,
    //         socket:1,
    //         username:'Socket1',
    //         state:"OFF",
    //         brint:0,
    //         color:0
    //         },
    //         1:{
    //             id:1,
    //             lamp:1,
    //             socket:0,
    //             username:'Lamp1',
    //             state:"ON",
    //             brint:100,
    //             color:"orange"}
    //         ,
    //         2:{
    //             id:2,
    //             lamp:1,
    //             socket:0,
    //             username:'Lamp2',
    //             state:"ON",
    //             brint:50,
    //             color:"white"}
    //         }}
    //         var devices=JSON.parse(JSON.stringify(devices))
    //         callback(null, devices)
        
    }


    exports.signUser=(pool,user,password,callback)=>{

        console.log('getting data')
        
        var quer=
        ` SELECT "Onoma",user_id,admin
        FROM "USER"
        WHERE email = '${user}'
        AND password = '${password}';`;
        console.log(quer)
        
        
        ;(async function() {
            const client = await pool.connect()
            await client.query(quer,(err,res)=>{
                if(!err){
                
               console.log(res.rows)
               console.log('getting data from postgress')
                
                callback(null, res.rows)
                client.end()
                
                }
                else{
    
                console.log(err.message);
                callback(err, null)
                
    
                }
                console.log('hello')
                })
            client.release()
            return
        })()
    
    }

    exports.EmailExists=(pool,email,callback)=>{
    
        const quer1=`SELECT "Onoma"
        FROM "USER"
       WHERE email = '${email}' `
    
        
        //console.log(data)
        
        ///*
        ;(async function() {
            const client = await pool.connect()
            await client.query(quer1,(err,res)=>{
                if(!err){
                    
                    callback(null,res.rows)
        
                    }
                    else{
        
                    //console.log(err.message);
                    callback(err, null)
                    
                }
                console.log('hello email ex')
                })
            client.release()
            return
        })()
    
    }


exports.AddUser=(pool,req,callback)=>{
    console.log(req.body)
    const quer1=`
    INSERT INTO "USER"(email, password, "Onoma", "Epwnumo", "Phone", admin)
    VALUES ('${req.body.email}', '${req.body.password}',  '${req.body.first_name}',  '${req.body.last_name}', ${req.body.phone}, false);`
    console.log(quer1)
    ;(async function() {
        const client = await pool.connect()
        await client.query(quer1,(err,res)=>{
            if(!err){
                console.log('no err')
                callback(null, 'success')
    
            }
            else{
                console.log('err')
                console.log(res)
                console.log(err.message);
                callback(err, null)
                
            }
            console.log('hello1')
            })
        client.release()
        return
    })()



}




