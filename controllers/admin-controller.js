const { Items } = require("../models/items-model");
class AdminController 
{
    show_add_items(req,res){
        res.render("add-items");
    }

    add_items(req,res){
        var item = req.body.item;
        var cost = req.body.cost;
        var quantity = req.body.quantity;
        var response = new Items().add_items(item,cost,quantity);
        console.log(response);
        if(response == 1)
        {
            res.send("added successfully!!");
        }
        else{
            res.send("already exists!!!");
        }
    }   

}
module.exports = {AdminController};