const express = require("express");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

let users = [
  { id: 1, name: "Saurav", age: 16, description: "Pursuing master's degree" },
  { id: 2, name: "Aarav", age: 22, description: "Software developer" },
  { id: 3, name: "Riya", age: 19, description: "Engineering student" },
  { id: 4, name: "Meera", age: 25, description: "Graphic designer" },
  { id: 5, name: "Kabir", age: 21, description: "Freelance photographer" },
  { id: 6, name: "Neha", age: 23, description: "Digital marketer" },
  { id: 7, name: "Vikram", age: 24, description: "UI/UX designer" },
  { id: 8, name: "Ananya", age: 20, description: "Aspiring journalist" },
  { id: 9, name: "Raj", age: 27, description: "Entrepreneur" },
  { id: 10, name: "Tanya", age: 18, description: "Medical student" },
];

let Authusers = [];


//signup

app.post('/signup', (req, res)=>{
  const {username, email, password} = req.body;
  if(users.find((user)=>user.email===email)){
    return res.status(400).json({message: "User Already Exsists"});
  }
  const hashedPassword = bcrypt.hash(password, 10);
  const newUser = {id:users.length+1, username, email, password: hashedPassword};
  users.push(newUser);
  res.status(201).json({message:"User Registered", newUser});
})

//signin

app.post('/login',(req, res)=>{
  const {email, password} = req.body;
  const user = users.find((user)=>user.email===email);
  if(!user) return res.status(404).json({message: "User does not exsist"});
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  res.json({message: "Login SuccessFully", user});
})

app.delete('/delete', (req, res)=>{
  const {email} = req.body;
  users = users.filter((user)=>user.email!==email);
  res.json({message: "User Deleted SuccessFully"});
})


app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  res.status(201).json({ message: "User fetched Successfully", user });
});

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    ...req.body,
  };
  users.push(newUser);
  res.status(201).json({ message: "User Created Successfully", newUser });
});

app.put('/users/:id', (req, res)=>{
  const user = users.find((u)=>u.id===parseInt(req.params.id));
  const {name, age, description} = req.body;
  if(name) user.name = name;
  if(age) user.age = age;
  if(description)  user.description = description;
  res.status(201).json({message: "User Update SuccessFully", user});
});

app.delete('/users/:id', (req, res)=>{
  users = users.filter((u)=>u.id!==parseInt(req.params.id));
  res.json({message: "User Deleted SuccesFully"});
})

const PORT = 5000;
app.listen(PORT, (req, res) => {
  console.log(`Sever is Running on the ${PORT}`);
});
