
const express = require('express');

const path = require('path');

const port = 1234;

const Web = express();

const router = express.Router();
Web.use(router);


router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.use("/product",express.static(path.join(__dirname, 'porduct')));
function call(Name,file,url){
    router.use(express.static(path.join(__dirname, Name)));
    
    router.get(url, (req, res) => {
    res.sendFile(path.join(__dirname,Name, file));
    console.log(`working: Server AT ${file}`)
});
}

call('Home_page','Home_page.html','/Home');
call('login_page','Login_page.html','/');
call('Inventory','Inventory.html','/Home/Inventory');
call('Admins_page','Admins_Menu.html','/Admin_Menu');

call('Dev_page','Dev_Menu.html','/Dev_Menu');

call('User_list_page','User_list_page.html','/User_list');
call('User_list_page','Edit_User_page.html','/Edit_User');


call('Game_Dev_page','Game_Dev_page.html','/Game_Dev_list');

call('Virtual_Market', 'Virtual_Market.html', '/Virtual_market');

call('Game_list_page', 'Game_list_page_Admin.html', '/Admin_Game_list');

call('Game_list_page', 'Game_list_page_Dev.html', '/Dev_Game_list');

call('PurchaseConfirmation','ConfirmSuccess.html','/confirm');
call('Virtual_Market','SellSuccess.html','/SellSuccess');
call('PurchaseConfirmation','Purchase.html','/purchase');

call('Virtual_Market', 'BuyProductPage.html', '/product');

call('Virtual_Market', 'SellProductPage.html', '/sell_Items');
call('Virtual_Market', 'SellSuccess.html', '/sell_success');


call('Cart','Cart.html','/Home/Cart');

call('Product_Page','Product_Page.html','/Product_page')

// listen import 
Web.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})