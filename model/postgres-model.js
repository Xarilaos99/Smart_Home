'use strict';
const e = require('express');

//---From here we access the database to get or give data -----//
exports.get_user_homes=function(callback){
    var data={data:{
        0:{
            id:1,
            username:'Home1',
            kw:23.5
            },
            1:{
            id:2,
            username:'Home2',
            kw:43.5}
            }}
            var devices=JSON.parse(JSON.stringify(data))
            callback(null, devices)
        
}

exports.get_home_living=function(id,callback){
    var devices={devices:{
        0:{
            id:1,
            lamp:0,
            socket:1,
            username:'Socket1',
            state:"OFF",
            brint:0,
            color:0
            },
            1:{
                id:1,
                lamp:1,
                socket:0,
                username:'Lamp1',
                state:"ON",
                brint:100,
                color:"orange"}
            }}
            var devices=JSON.parse(JSON.stringify(devices))
            callback(null, devices)
        
    }


//1 gets the device state from database and returns the rows 
// exports.getDevicesData=function(pool,callback){
//     console.log('getting data')
//     var quer=
//     ` select device_id,is_on,sample_rate,mode from public.device order by device_id ASC;`;
    
//     ;(async function() {
//         const client = await pool.connect()
//         await client.query(quer,(err,res)=>{
//             if(!err){
            
//            console.log(res.rows)
//             var data={
//                 devices:res.rows
//             }
//             var devices=JSON.parse(JSON.stringify(data))

//             callback(null, devices)
//             client.end()
            
//             }
//             else{

//             console.log(err.message);
//             callback(err, null)
            

//             }
//             console.log('hello')
//             })
//         client.release()
//         return
//     })()

// }
