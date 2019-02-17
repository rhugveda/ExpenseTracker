async function getData(item,cost,quantity)
{
    var admin = require('firebase-admin');
    var firebase = require('firebase');
    var serviceAccount = require('D:/ExpenseTracker/expensetracker-951e5-firebase-adminsdk-5tl1x-0717ef971c.json');
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
module.exports = {getData};