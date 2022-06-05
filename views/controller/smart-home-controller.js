'use strict';

/** You can define other models as well, e.g. postgres */
const model = require('../model/postgres-model.js');



const store = require("store2");
const { request } = require('coap');
const { response } = require('express');
var alert = require('alert');
const Pool = require("pg").Pool;

require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;



exports.index=(request,response)=>{
    response.render('index');
}


exports.user_homes=(request,response)=>{
    console.log(request.session)
    const pool1 = new Pool({
        connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    if(request.session.loggedin===undefined){
        request.session.loggedin=false
    }


    if(request.session.loggedin===true){
        var id_user=request.session.user_id
        
    }
    else{
        response.redirect('/login')
    }
    //  console.log(request.session)
    model.get_user_homes(pool1,id_user,(err,devices)=>{
       
                if (err) {
                    response.send(err);
                }
                
                
                // let d1={data:devices}
                // var data=JSON.parse(JSON.stringify(d1))
                console.log('1',devices)
                // renders the hbs file home_page and gives it the data for the page
                response.render('user', devices);
                // response.send(data)
            })
}

exports.home_living=(request,response)=>{
    const pool1 = new Pool({
        connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    console.log(request.params.id)
    
    model.get_home_living(pool1,request.params.id,(err,devices)=>{
       
        if (err) {
            response.send(err);
        }
        // var sizeof = require('object-sizeof');
        var devs=[]
        console.log("amee",devices.devices.length)
        // devices = this.devices.filter((obj, pos, arr) => {
        //     return arr.map(mapObj =>
        //           mapObj.name).indexOf(obj.name) == pos;
        //     });
        //   console.log(devices);

        // or(let i=0;i<Object.keys(devices.devices).length;i++){

        // console.log(devices.devices[0].lamp)
        // console.log(Object.keys(devices.devices).length)
        for(let i=0;i<devices.devices.length;i++){
            let device_add
           
            // console.log("=====================================")
            // console.log(devices.devices.length)
            // console.log(devices.devices[i])
            if(devices.devices[i].state===0){
                var temp="OFF"
            }
            else{
                var temp="ON"
            }
            // console.log(devices.devices[i].lamp)
            if(devices.devices[i].id_device===1){
                
                let color=devices.devices[i].color.toString()
                device_add={"id" : devices.devices[i].id_device,
                            "lamp" : 1,
                            "username":  devices.devices[i].name,
                            "state":temp,
                            "brint":devices.devices[i].brightness};

                device_add[devices.devices[i].color]=1;
                device_add["home"]=request.params.id;
                devs.push( device_add)
                console.log(device_add)
            }
            else {
                let device_add
                device_add={"id" : devices.devices[i].id_device,
                            "socket" : 1,
                            "username":  devices.devices[i].name,
                            "state":temp};
                
                device_add["home"]=request.params.id;


                devs.push( device_add)
            }
        }

        // }
        // console.log(devices.devices[1].color)
        // console.log(devs)
        let devs2={home:request.params.id,devices:devs}
        // console.log("XYN",devs2)
        var data=JSON.parse(JSON.stringify(devs2))
        // // console.log(data)
        // //renders the hbs file home_page and gives it the data for the page
        response.render('home_living', data);
    })
}

exports.room=(request,response)=>{


    const pool1 = new Pool({
        connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    // console.log(request.params.id)
    // console.log(request.params.id)
    // console.log(request.params.room)

    model.get_room(pool1,request.params.id,request.params.room,(err,devices)=>{
       
        if (err) {
            response.send(err);
        }
        console.log("amee ",devices)
        console.log("amee ",devices.devices.length)
        // var sizeof = require('object-sizeof');
        var devs=[]

        for(let i=0;i<devices.devices.length;i++){
            let device_add
           
            // console.log("=====================================")
            // console.log(devices.devices.length)
            // console.log(devices.devices[i])
            if(devices.devices[i].state===0){
                var temp="OFF"
            }
            else{
                var temp="ON"
            }
            // console.log(devices.devices[i].lamp)
            if(devices.devices[i].id_device===1){
                
                let color=devices.devices[i].color.toString()
                device_add={"id" : devices.devices[i].id_device,
                            "lamp" : 1,
                            "username":  devices.devices[i].name,
                            "state":temp,
                            "brint":devices.devices[i].brightness};

                device_add[devices.devices[i].color]=1;
                device_add["home"]=request.params.id;
                devs.push( device_add)
                console.log(device_add)
            }
            else {
                let device_add
                device_add={"id" : devices.devices[i].id_device,
                            "socket" : 1,
                            "username":  devices.devices[i].name,
                            "state":temp};
                
                device_add["home"]=request.params.id;


                devs.push( device_add)
            }
        }

        let devs2={home:request.params.id,devices:devs}
        devs2[request.params.room]=1
        // console.log("XYN",devs2)
        var data=JSON.parse(JSON.stringify(devs2))
        // //renders the hbs file home_page and gives it the data for the page
        response.render(`home_living`, data);

    })
}


exports.tog=(request,response)=>{
    const pool1 = new Pool({
        connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    // console.log(request)
    // response.send(request.body)
    if(Object.keys(request.body)[0]==="ON"){
        let temp=request.body
        temp["OFF"]=temp["ON"]
        delete temp["ON"]
        
        console.log(Object.keys(temp)[0])

    }
    else{
        let temp=request.body
        temp["ON"]=temp["OFF"]
        delete temp["OFF"]

        console.log(Object.keys(temp)[0])
    }

    model.insrt_top(pool1,request.body,request.params.home,(err,devices)=>{
       
        if (err) {
            response.send(err);
        }
        
        
        // let d1={data:devices}
        // var data=JSON.parse(JSON.stringify(d1))
        console.log('1',devices)
        // renders the hbs file home_page and gives it the data for the page
        response.redirect(`/home_living/${request.params.home}`)
        // response.send(data)
    })


    
}


exports.tog_ran=(request,response)=>{
    if(Object.keys(request.body)[0]==='rang'){
        console.log(request.body.rang)

    }
    else{
        if(Object.keys(request.body)[0]==="ON"){
            let temp=request.body
            temp["OFF"]=temp["ON"]
            delete temp["ON"]
            
            console.log(Object.keys(temp)[0])
    
        }
        else{
            let temp=request.body
            temp["ON"]=temp["OFF"]
            delete temp["OFF"]
    
            console.log(Object.keys(temp)[0])
        }
    }
    response.send(request.body)

}

exports.color_post=(request)=>{
    console.log(Object.keys(request.body)[0])
    response.send(request.body)

}

exports.add_device=(req)=>{
    console.log(req)
    response.send(request.body)

}


exports.signUser=(request,response)=>{
    
    
    const pool1 = new Pool({
        connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    //checks the login data with the users data
    model.signUser(pool1,request.body.email,request.body.password,(err,user_det)=>{
        console.log('have accessed postgress')
        //console.log(user_det)
        if (err) {
            console.log(err)
            response.send(err)
        }
        //for wrong login doesn't login and redirects to /login
        else if(user_det.length==0){
            
            alert('O Xrhsths Den Yparxei');
            response.redirect('/login')
            
        }
        else{
            //successfull login ,parsing the user in cookies 
            console.log('returning authenticated user')
            
           // let authenticated_user = user_det
           console.log(user_det)
           request.session.loggedin = true;
           request.session.onoma =user_det[0].Onoma;
           request.session.user_id =user_det[0].user_id;
           request.session.admin =user_det[0].admin;
        //    console.log('sign in',request.session.user_id)

        if(request.session.admin==true){
            response.redirect('/admin')
        }
        else{
            response.redirect('/user_homes')
        }
            
            
            

        }

    })
    
    
    


}

exports.registerUser=(request,response)=>{
    console.log(request.body)
    const pool1 = new Pool({
        connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    });
        //checks if the email exists
        model.EmailExists(pool1,request.body.email,(err,return_message)=>{
            console.log(return_message)
            if (err) {
                console.log("aslkdj")
                response.send(err)
            }
            else if(return_message.length==0){
                 //if it doesn't exists creates the new user
                model.AddUser(pool1,request,(err,return_message)=>{
        
                    if (err) {
                        console.log('all nice')
                        response.send(err)
                    }

                    
                    //if it exists redirects to /login
                   response.redirect('/login')
                   //response.send('all nice')
                 
                    
                })


            }
            else{
               //if exists ,redirects to register page
               
                
                response.render('register',{register:1})
            }

        })

}








// //1 getting the last collection data for each device and creates the homepage 
// exports.getAllWeights=(request,response)=>{
//     console.log('get all weights')
//     //console.log(request.user)
//     /*var user=request.user
//     store.setAll({name: 'Adam', age: 34})
//     const pool1 = new Pool({
//         connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });
    
//     model.getAllWeights(pool1,(err,devices)=>{
       
//         if (err) {
//             response.send(err);
//         }
        
        
//         var a
//         //checking if user is signed in/admin or not to create the json
//         if(user!=undefined){
           
//             if(user.admin==1){
//                 a={
//                     'username':user.name,
//                     'id1':user.id,
//                     'admin':1,
//                     devices
//                 }

//             }
//             else{
//                 a={
//                     'username':user.name,
//                     'id1':user.id,
//                     devices
//                 }

//             }
    
//     }
//         else{
//             a={
//                 devices
//             }
//         }
        
//         var data=JSON.parse(JSON.stringify(a))
//         //renders the hbs file home_page and gives it the data for the page
//         response.render('user', data);
//     })*/
//     data={}
//     var data=JSON.parse(JSON.stringify(data))
//     response.render('user', data);
// }
// //2 for certain device ,gets the 10 last data and creates the device page 
// exports.getID=(request,response)=>{
   
//       const pool = new Pool({
//     connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//     ssl: {
//         rejectUnauthorized: false,
//     },
//     });
//      var limit
//      limit=10
     
//      var user=request.user
     
//     //gets from the database the data
//     model.getID(request.params.device_id,limit,pool,(err,device)=>{
//         if (err) {
//             response.send(err);
//         }
//         //pool.end();
        
//         device['limit']=limit
//         var a
//         if(user!=undefined){
//          a={
//             'username':user.name,
//             'id1':user.id,
//             device
//         }
        
//         device['username']=user.name
//         device['id1']=user.id
//         if(user.admin==1){
//             device['admin']=1
//         }
//     }
//         else{
//             a={
//                 device
//             }
//         }
//         var data=JSON.parse(JSON.stringify(a))
//         //renders the hbs file devices with data device
//         response.render('devices',device)
//     })
   

// }
// //3 handles when a new collection data have been sent for the device
// exports.AddWeight=(io,request,response)=>{
//     //checks if the password is correct
//     if(request.body.password=="arduino"){
//         //sends from sockets for updating the pages, homepage and device history 
//         io.emit('change_weight', request.body);
//         var string1='new_weight'+request.body.device_id
        
//         io.emit(string1,request.body)
//     const pool1 = new Pool({
//         connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//         });
//     //updating the database
//     model.add_weight(request.body,pool1,(err,okay)=>{
        
//         if(err){
//             response.send(err);
//         }
//         //if everything is alright it responds
//         response.send(okay)


//     })
//     }
//     else{
//         //if the wrong password is given it sends the proper respond
//         response.send('wrong password')
//     }
// }

// //4 checks the device state
// exports.seeConnectivity=(request,response)=>{
//     var id=request.params.id;
//     console.log(id)
//     const pool1 = new Pool({
//         connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//         });
//     model.seeConnectivity(id,pool1,(err,activity)=>{
//         if(err){
//             response.send(err);
//         }
//         response.send(activity)


//     })

// }

// //5 closes or opens the device
// exports.ChangeDeviceState=(request,response)=>{
//     var id=request.params.id;
//     //checks if the password is correct
//     if(request.body.password=="arduino"){
//         const pool1 = new Pool({
//             connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//             ssl: {
//                 rejectUnauthorized: false,
//             },
//             });
//         //updates the database with the new state
//         model.ChangeDeviceState(id,pool1,(err,okay)=>{
//             //pool1.end()
//             if(err){
//                 response.send(err);
//             }
//             //gives the proper respond
//             response.send(okay)
    
    
//         })
//         }
//         else{
//             //if the password is wrong ,gives the proper respond
//             response.send('wrong password')
//         }

// }
// //6 gets the state of all the devices 
// exports.getDevicesData=(request,response)=>{
//     const pool1 = new Pool({
//         connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });
//     //gets from the database the devices data
//     model.getDevicesData(pool1,(err,devices)=>{
       
//         if (err) {
//             response.send(err);
//         }
   
//         //changing the device mode from string to integers
//         for(var i=0;i<devices.devices.length;i++){
//             if(devices.devices[i].mode=='psm'){
//                 devices.devices[i].mode=1
//             }
//             else if(devices.devices[i].mode=='reqular'){
//                 devices.devices[i].mode=0

//             }
//             else if(devices.devices[i].mode=='press_mode'){
//                 devices.devices[i].mode=2

//             }
//         }
      
//         //responds with a json
//         response.send(devices);
//     })
// }

// //7 changes the device settings from the homepage 
// exports.Change_Device_Setting =(io,req,res)=>{
//     var sample_rate2
//     const pool1 = new Pool({
//         connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });
//     var change_state
//     //console.log(req.body)
//     if(req.body.mode=="press_mode"){
//         req.body.sample_rate=0
//     }
//     if(req.body.change_state!=undefined){
//         change_state=req.body.change_state
//     }
//     else{
//         change_state='hello'
//     }
    
//     io.emit('change_state', req.body);
//         var string1='new_state'+req.body.device_id
//         console.log('STRING1-->'+string1)
//         io.emit(string1,req.body)
//     model.ChangeDeviceSettings(req.body.device_id,req.body.sample_rate,change_state,req.body.mode,pool1,(err,message)=>{
//         if (err) {
//             res.send(err);
//         }
        
//         //pool1.end();
//         //pool1.
//         res.redirect('/')

//     })
    
    
    
//   }

//   //8 changes the device settings from the device page
// exports.Change_Device_Setting2 =(io,req,res)=>{
//     var sample_rate2
//     const pool1 = new Pool({
//         connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });
//     var change_state
//     console.log(req.body)
//     if(req.body.mode=="press_mode"){
//         req.body.sample_rate=0
//     }
//     if(req.body.change_state!=undefined){
//         change_state=req.body.change_state
//     }
//     else{
//         change_state='hello'
//     }
    
//     io.emit('change_state', req.body);
//         var string1='new_state'+req.body.device_id
        
//         io.emit(string1,req.body)
//     model.ChangeDeviceSettings(req.body.device_id,req.body.sample_rate,change_state,req.body.mode,pool1,(err,message)=>{
//         if (err) {
//             res.send(err);
//         }
        
       
//         //redirects to the device page
//         res.redirect(`/device/${req.body.device_id}`)

//     })
    
    
    
//   }

//   //9 gets the device data for certain limit 
// exports.DataPlot=(request,response)=>{
//     const pool = new Pool({
//         connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//         });
//          var limit
//          limit=request.params.lim
         
//          var user=request.user
       
//         //gets from database the data with limit
//         model.getID(request.params.id,limit,pool,(err,device)=>{
//             if (err) {
//                 response.send(err);
//             }
//             //pool.end();
//             //console.log(device)
//             var a
//             //checks if the user is signed in
//             if(user!=undefined){
//              a={
//                 'username':user.name,
//                 'id1':user.id,
//                 device
//             }
//             device['username']=user.name
//             device['id1']=user.id
//             if(user.admin==1){
//                 device['admin']=1
//             }
//         }
//             console.log(device.username)
//            console.log(device.lim)
//            //renders the hbs file devices with the limit
//             response.render('devices',device)
//         })
       
       
// }

// //10 checks the sum of the collection data
// //to see if there is new data to refresh the homepage
// exports.RefreshHomepage=(request,response)=>{
//     const pool1 = new Pool({
//         connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });
//     model.Refresh_Homepage(pool1,(err,devices)=>{
       
//         if (err) {
//             response.send(err);
//         }
        
//         //pool1.end();
//         //pool1.
//         //console.log(devices)
//         response.send( devices);
//     })//*/
// }

// exports.loginUser=(request,response)=>{

//     console.log(request)
//     response.send('okay')
// }
// //11 adding new user 
// exports.registerUser=(request,response)=>{
    
//     const pool1 = new Pool({
//         connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });
//         //checks if the email exists
//         model.EmailExists(pool1,request.body.email,(err,return_message)=>{
//             console.log(return_message)
//             if (err) {
//                 response.send(err)
//             }
//             else if(return_message.length==0){
//                  //if it doesn't exists creates the new user
//                 model.AddUser(pool1,request,(err,return_message)=>{
        
//                     if (err) {
//                         response.send(err)
//                     }
//                     //if it exists redirects to /login
//                    response.redirect('/login')
                 
                    
//                 })


//             }
//             else{
//                //if exists ,redirects to register page
//                 var a
//                     if(user!=undefined){
//                         a={
//                         'username':user.name,
//                         'id1':user.id,
//                         email:1
//                     }}
//                     else{
//                             a={
//                                 email:1
//                                 }
//                         }
                
//                 response.render('register',a)
//             }

//         })

// }
// //12 handles when a user login
// exports.signUser=(user,password,callback)=>{
    
  
//     const pool1 = new Pool({
//         connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });
//     //checks the login data with the users data
//     model.signUser(pool1,user,password,(err,user_det)=>{
//         console.log('have accessed postgress')
//         //console.log(user_det)
//         if (err) {
//             console.log(err)
//             return callback(null,null)
//         }
//         //for wrong login doesn't login and redirects to /login
//         else if(user_det.length==0){
//             return callback(null,null)
            
//         }
//         else{
//             //successfull login ,parsing the user in cookies 
//             console.log('returning authenticated user')
            
//             let authenticated_user = user_det
            
            
//             return callback(null,authenticated_user[0])
            

//         }

//     })
    
    
    


// }
// //13 json to return the devices names
// exports.NameDevices=(request,response)=>{
//     console.log(request.body)
//     const pool1 = new Pool({
//         connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });
//     model.NameDevices(pool1,(err,devices_name)=>{
//         if(err){
//             response.send(err)

//         }
//         response.send(devices_name)

//     })
    
// }
// //14 checks if a user is admin
// exports.CheckAdmin=(request,response)=>{
//     console.log(request.body)
//     const pool1 = new Pool({
//         connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });
//     model.check_admin(pool1,2,(err,is_admin)=>{
//         if(err){
//             response.send(err)

//         }
//         console.log(is_admin[0].admin)
//         response.send(is_admin)

//     })
    
// }
// //15 gets from database all the data and return json
// exports.JsonDeviceWeight=(request,response)=>{
//     const pool = new Pool({
//         connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//         });
//          var limit
//          limit=10
        
//          //var user=request.user
         
//         console.log(request.params.device_id)
//         model.JsonDeviceData(request.params.device_id,pool,(err,device)=>{
//             if (err) {
//                 response.send(err);
//             }
            
           
            
//             response.send(device)
//         })
       
    

// }
// //16 gets from database the device data with limit and returns json
// exports.JsonDeviceWeightLimit=(request,response)=>{
//     const pool = new Pool({
//         connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//         });
//          var limit
//          limit=10
        
//          //var user=request.user
         
//         console.log(request.params.device_id)
//         model.JsonDeviceDataLimit(request.params.device_id,request.params.limit,pool,(err,device)=>{
//             if (err) {
//                 response.send(err);
//             }
           
           
            
//             response.send(device)
//         })

    
// }
