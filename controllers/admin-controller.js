const Items  = require("../models/items-model");
class AdminController 
{
    show_add_items(req,res){
        res.render("add-items");
    }

    add_items(req,res){
        var item = req.body.item;
        var cost = req.body.cost;
        var quantity = req.body.quantity;
        var response = Items.add_items(item,cost,quantity).then((response)=>{
            
            if(response == 1)
            {
                res.send("added successfully!!");
            }
            else{
                res.send("already exists!!!");
            }
        }).catch((error)=>{
            console.log(error);
        });
       
    }   

    show_all_items(req,res){
        Items.display_all_items().then((items)=>{
            //items.forEach(element =>(console.log("hello")));
          res.render("show-all-items",{items:items})
        }).catch((error)=>{
            console.log(error);
        });
    }

    user_show_all_items(req,res){
        Items.display_all_items().then((items)=>{
            //items.forEach(element =>(console.log("hello")));
          res.render("user-show-all-items",{items:items})
        }).catch((error)=>{
            console.log(error);
        });
    }

    edit_items(req,res){
        Items.edit_items(req.body.item_name,req.body.item_cost,req.body.item_quantity).then((items)=>{
        //items.forEach(element =>(console.log("hello")));
      res.redirect("show-all-items",{items:items})
    }).catch((error)=>{
        console.log(error);
    });
    }

    delete_items(req,res){
        Items.delete_items(req.body.item_name).then((items)=>{
        //items.forEach(element =>(console.log("hello")));
        res.redirect("show-all-items",{items:items})
    }).catch((error)=>{
        console.log(error);
    });
    }

    place_order(req,res){
       Items.place_order(req.body.item_name,req.body.item_cost,req.body.item_quantity).then((items)=>{
        //items.forEach(element =>(console.log("hello")));
        res.redirect("show-all-items",{items:items})
    }).catch((error)=>{
        console.log(error);
    });

    }

    add_user(req,res){
       Items.add_user(req.body.user_info).then((items)=>{
        //items.forEach(element =>(console.log("hello")));
        //res.redirect("show-all-items",{items:items})
    }).catch((error)=>{
        console.log(error);
    });

    }
}
module.exports = {AdminController};