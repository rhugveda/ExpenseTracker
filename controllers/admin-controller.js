const Items  = require("../models/items-model");
class AdminController 
{
    login(req,res) {
        Items.login(req.body.email,req.body.password).then((items)=>{
            //items.forEach(element =>(console.log("hello")));
           
                res.redirect("show-all-items")
     
           
        }).catch((error)=>{
           res.redirect("login");
        });
    }

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

    token(req,res){
        global.uid = req.body.token;
        console.log("uid: ",uid);
        // Items.display_all_items().then((items)=>{
        //     //items.forEach(element =>(console.log("hello")));
        //   res.render("user-show-all-items",{items:items})
        // }).catch((error)=>{
        //     console.log(error);
        // });
    }

    edit_items(req,res){
        Items.edit_items(req.body.item_name,req.body.item_cost,req.body.item_quantity).then((items)=>{
        //items.forEach(element =>(console.log("hello")));
        res.redirect('/show-all-items');
        //res.render("show-all-items",{items:items})
    }).catch((error)=>{
        console.log(error);
    });
    }

    delete_items(req,res){
        Items.delete_items(req.body.item_name_delete).then((items)=>{
        res.redirect('/show-all-items');
    }).catch((error)=>{
        console.log(error);
    });
    }

    place_order(req,res){
       Items.place_order(req.body.item_name,req.body.item_cost,req.body.item_quantity).then((items)=>{
        res.redirect('/user-show-all-items');
    }).catch((error)=>{
        console.log(error);
    });

    }

    add_user(req,res){
       global.uid = req.body.token;
       Items.add_user(req.body.user_info,req.body.first_name,req.body.last_name,req.body.token).then((items)=>{
    }).catch((error)=>{
        console.log(error);
    });

    }

    show_all_orders(req,res){
        
        Items.show_all_orders(uid).then((orders)=>{
            res.render("user-show-all-orders",{orders:orders})
        }).catch((error)=>{
            console.log(error);
        });
    }

    show_all_users_orders(req,res) {
        Items.show_all_users_orders(uid).then((all_users)=>{
           res.render("show-all-users-orders",{all_users:all_users})
        }).catch((error)=>{
            console.log(error);
        });
    }

    single_user_order(req,res) {
        Items.single_user_order(req.query.email).then((single_user_order)=>{
            console.log("final: ",single_user_order)
            res.render("show-single-user-order",{single_order:single_user_order})
         }).catch((error)=>{
             console.log(error);
         });
        
    }

}
module.exports = {AdminController};