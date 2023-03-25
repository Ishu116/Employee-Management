const express = require("express"),
  bodyParser = require("body-parser"),
  tasklist = require("../model/createtask"),
  router = express.Router(),
  cors = require("cors");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/api/createtask', (req, res) => {
  const name = req.body.name,
    phone = req.body.phone,
    email = req.body.email,
    hobbies = req.body.hobbies;

  const newdata = { name: name, phone: phone, email: email, hobbies: hobbies};
  tasklist.create(newdata)
    .then((result) => {
      console.log("Data added to the database");
    })
    .catch((err) => {
      console.log(err);
    })
})

router.delete('/delete/:id', (req, res) => {
  const itemId = req.params.id;
  console.log(itemId);

  tasklist.findByIdAndDelete(itemId)
    .then(() => {
      console.log("successfully deleted");
      res.status(200).send("Item deleted successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting item");
    })
});

router.put('/update/:id',async (req,res) => {
  const itemId = req.params.id;

  // const data = {
  //   name : req.body.name,
  //   phone : req.body.phone,
  //   email : req.body.email,
  //   hobbies : req.body.hobbies,
  // }
  try {
    const task = await tasklist.findByIdAndUpdate(itemId, req.body, {new: true}) 

      console.log("successfully done");
  } catch (error) {
    console.log(error);
  }
  
})


router.get('/api/tasklist',async (req, res) => {
  try {
    const task = await tasklist.find({});
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }


  // tasklist.find({})
  //   .then((result) => {
  //     res.json(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).send('Internal Server Error');
  //   })
});

router.get('/edit/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const task = await tasklist.findById(itemId);
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
