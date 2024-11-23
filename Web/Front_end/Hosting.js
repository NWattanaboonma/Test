
const express = require('express');


const path = require('path');

const port = 5000;

const Project_web = express();

const router = express.Router();
Project_web.use(router);



router.use(express.json());
router.use(express.urlencoded({ extended: true }));

function call(Name,file,url){
  router.use(express.static(path.join(__dirname, Name)));
  
  router.get(url, (req, res) => {
  res.sendFile(path.join(__dirname,Name, file));
  console.log(`working: Server aT ${file}`)
});
}



call('Home_page','Home_page.html', '/');

call('Search_page','Search.html','/Search');



// listen import 
Project_web.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})