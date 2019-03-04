
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


        var items = await firebase.database().ref("/items");
        const snap = await items.once('value');
        return snap.val();
    }

    async function delete_items(item_name){
        var items = await firebase.database().ref('/items');
        items.child(item_name).remove();
     

        var items = await firebase.database().ref("/items");
        const snap = await items.once('value');
        return snap.val();
    }

    async function place_order(item_name,item_cost,item_quantity){
        var items = await firebase.database().ref('/items');
        var total_cost = item_cost * item_quantity ; 
        console.log("cost: ",total_cost);
        // firebase.database().ref('/items/' + item_name).set({
        //     ordered_item_name: item_name,
        //     ordered_item_cost: item_cost,
        //     ordered_item_quantity : item_quantity,
        //     ordered_item_total_cost : total_cost,
        //   });
        
        console.log( firebase.auth().currentUser );
        var items = await firebase.database().ref("/items");
        const snap = await items.once('value');
        return snap.val();
    }

    async function add_user(email)
    {
       console.log("hello");
        firebase.database().ref('/users/'+"rhugveda").set({
                        
                        email: email,
                        
                    });
                  
            
    return 1;
    
    }//async function
    module.exports = { add_items,getData,display_all_items,edit_items,delete_items,place_order,add_user };