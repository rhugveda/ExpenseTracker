const data = require("./get-data");
class Items{

    add_items(item,cost,quantity)
    {
        // data.getData(item,cost,quantity).then((result)=>{
            
        // }).catch((error)=>{
            
        // });
       var result = data.getData(item,cost,quantity);
       return result;
        
    }//add-items

   


}//class
module.exports = { Items };