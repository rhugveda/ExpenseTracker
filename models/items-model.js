
     var admin = require('firebase-admin');
     var firebase = require('firebase');
     var serviceAccount = require('D:/ExpenseTracker/expensetracker-951e5-firebase-adminsdk-5tl1x-0717ef971c.json');
    

    async function add_items(item,cost,quantity)
    {
        var result = await getData(item,cost,quantity);
        return result;
        
    }//add-items

   

    async function getData(item,cost,quantity)
    {
       
        var snapshot;
       
        var items = await firebase.database().ref("/items");
        const snap = await items.child(item).once('value');
        var result = 0;
        if(snap.val())
        {
             result = 0;
        }
        else{
           
                    firebase.database().ref('/items/'+item).set({
                        
                        item_name: item,
                        item_cost: cost,
                        item_quantity:quantity
                    });
                  
              result = 1;
                   
                
        }//else
    
    return result;
    
    }//async function

    async function display_all_items()
    {

        var items = await firebase.database().ref("/items");
        const snap = await items.once('value');
        return snap.val();

    }

    async function edit_items(item_name,item_cost,item_quantity){
        firebase.database().ref('/items/' + item_name).set({
            item_name: item_name,
            item_cost: item_cost,
            item_quantity : item_quantity
          });
    }

    async function delete_items(item_name){
        var items = await firebase.database().ref('/items');
        items.child(item_name).remove();
    }

    async function place_order(item_name,item_cost,item_quantity){
        
        var total_cost = item_cost * item_quantity ; 
        var date = new Date();

        firebase.database().ref('/users/' + uid + '/ordered_items' ).push({
            ordered_item_name: item_name,
            ordered_item_cost: item_cost,
            ordered_item_quantity : item_quantity,
            ordered_item_total_cost : total_cost,
            ordered_time:new Date(Date.now()).toLocaleString(),
          });
          var plotly = require('plotly')("rhugveda", "PNaObyGKnhqD7E3Pj0Az")
          var data = [{x:[0,1,2], y:[3,2,1], type: 'bar'}];
          var layout = {fileopt : "overwrite", filename : "simple-node-example"};
          
          plotly.plot(data, layout, function (err, msg) {
              if (err) return console.log(err);
              console.log(msg);
          });
        return 1;
    }

    async function add_user(email,first_name,last_name,idToken)
    {
        firebase.database().ref('/users/'+idToken + '/details/').push({
                "email": email, 
                "first_name":first_name,
                "last_name":last_name
         });
    return 1;
    
    }//async function

    async function show_all_orders(idToken)
    {
        var orders = await firebase.database().ref("/users/"+idToken + '/ordered_items');
        const snap = await orders.once('value');
        return snap.val();
    
    }//async function

    async function show_all_users_orders()
    {
        var orders = await firebase.database().ref("/users");
        const snap = await orders.once('value');
        return snap.val();
    }
    
    async function single_user_order(email)
    {
       
        got_email = await getEmail(email);
            return got_email;
      
    }

    async function getEmail(email) {
        var orders = await firebase.database().ref("/users/");
        const snap = await orders.once('value');

        required_data = await get_required_data(snap,email);
            return required_data;
        
    }

    async function get_required_data(snap,email) {

        var childKey,unique,uid,dataValue,ref_ordered_items,ordered_items,ordered;
        var final_data; 
       
       values = [];
            snap.forEach(async function(childSnapshot) {
                uid = childSnapshot.key;
                childSnapshot.forEach(async function(keys) {
                   
                        console.log("hi");
                        childKey = keys.key;
                        var childData = keys.val();
                        // console.log(" o key ",childKey);
                        // console.log("o val ",childData);
                        
                        if(childKey == 'details' ) {
                            
                            for(i in childData) {
                               unique = i;
                               
                                //values.push(childData);
                            }
                            
                             dataValue = await get_required_data2(uid,unique);
                                if( email == dataValue.val()) {
                                    console.log("hello");
                                    got_data = await get_required_data3(uid);
                                        console.log("got ",got_data );
                                        final_data = got_data;
                                        return final_data;
                                        
                                   

                                   
                                }//if 

                           
                         
                        }//if
              
           
            }); //for 2
        });//for 1
      
    }

    async function get_required_data2 (uid,unique) {
        var data = await firebase.database().ref("/users/"+uid +"/details/" + unique +"/"+ "email");
        const dataValue =  await data.once('value');
        return dataValue;
    }

    async function get_required_data3(uid){
        ref_ordered_items = await firebase.database().ref("/users/"+uid +"/ordered_items"); 
        
         ordered_items =  await ref_ordered_items.once('value'); 
         
         return ordered_items.val();
    }
    module.exports = { add_items,getData,display_all_items,edit_items,delete_items,place_order,add_user,show_all_orders,show_all_users_orders,single_user_order };


