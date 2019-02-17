
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
        console.log("hello bhbf"+item_name);
        var items = await firebase.database().ref('/items');
        items.child(item_name).remove();
     

        var items = await firebase.database().ref("/items");
        const snap = await items.once('value');
        return snap.val();
    }

    module.exports = { add_items,getData,display_all_items,edit_items,delete_items };