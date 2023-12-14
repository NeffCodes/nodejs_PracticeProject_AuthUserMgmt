const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
  res.send(JSON.stringify(friends,null,4))
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
  const existingUser = friends[email];
  existingUser ? 
    res.send(existingUser) :
    res.send("User does not exist");
});


// POST request: Add a new friend
router.post("/",(req,res)=>{
  const newUser = req.body;
  if(newUser.email) {
    friends[newUser.email] = {
      'firstName': newUser.firstName,
      'lastName' : newUser.lastName,
      'DOB' : newUser.DOB
    }
    res.send(`User ${newUser.firstName} ${newUser.lastName} has been added:\n ${JSON.stringify(newUser, null,4)}`)
  }
  res.send(`Did not add user.\n ${JSON.stringify(req.body, null, 4)}`)
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  const email = req.params.email;
  const friend = friends[email];

  if(friend){
    const newDetails = req.body;
    const updatedFriend = {
      ...friend,
      ...newDetails
    }
    
    friends[email] = updatedFriend;
    res.send(`User at ${email} has been updated: \n ${JSON.stringify(updatedFriend,null,4)}`)
  }
  res.send("This user does not exist")
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  if(email && friends[email]){
    delete friends[email];
    res.send(`Removed user with address: ${email}`)
  }
  res.send(`Could not remove user at ${email}. User does not exist`)
});

module.exports=router;
