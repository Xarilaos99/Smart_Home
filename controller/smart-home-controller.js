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









