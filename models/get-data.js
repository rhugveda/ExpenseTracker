async function getData(item,cost,quantity)
{
    var admin = require('firebase-admin');
    var firebase = require('firebase');
    var serviceAccount = require('D:/ExpenseTracker/expensetracker-951e5-firebase-adminsdk-5tl1x-0717ef971c.json');

    
    //// 
    
  
    // As an admin, the app has access to read and write all data, regardless of Security Rules
   
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
                // firebase.database().ref('/items').push({
                //     item_name: item,
                //     item_cost: cost,
                //     item_quantity:quantity
                // });
          result = 1;
               
            
    }//else
//     items.on("value", function(snapshot)
// {
//         var data=snapshot.val();
//         console.log(data);
        
//         data.forEach(element=>{
//             if(element.item_name==item){
//                 console.log("exists!!");
//             }//if
//             else{
    
//                 try {
//                     firebase.database().ref('/items/'+item).set({
                        
//                         item_name: item,
//                         item_cost: cost,
//                         item_quantity:quantity
//                     });
//                     // firebase.database().ref('/items').push({
//                     //     item_name: item,
//                     //     item_cost: cost,
//                     //     item_quantity:quantity
//                     // });
//                 }//try
//                 catch(e){
//                     console.log(e);
//                 }//catch
//             }//else
//         });//foraech
    

// },//snpshot-function
// function(error){
// console.log("failed");
// });
return result;

}//async function
module.exports = {getData};