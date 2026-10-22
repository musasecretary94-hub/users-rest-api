import express from "express";
import Joi from "joi";

const app = express();
app.use(express.json());

const userSchema = Joi.object({
    name: Joi.string().trim().min(3).required()
}).required();

let Users = [
    {id: 1, name: "Abubakar"},
    {id: 2, name: "Buhari"},
    {id: 3, name: "Daud"},
    {id: 4, name: "Mahmud"}
];

app.post("/users/api/user", (req, res) =>{

    const nextId = Math.max(0, ...Users.map(user => user.id)) + 1;
    

    const {error, value} = userSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        });
    }
 const user = {
        id: nextId,
        name: value.name
};


  Users.push(user);
  res.status(201).json(user);

 });


app.get("/users/api/user", (req, res) =>{
    res.send(Users);
});

app.get("/users/api/user/:id", (req, res) =>{
    const userId = Users.find(e => e.id === parseInt(req.params.id));
    
    if(!userId) return res.status(404).send("User Not Found");
    res.send(userId);
});

app.put("/users/api/user/:id", (req, res) =>{
    const user = Users.find(e => e.id === parseInt(req.params.id));
  
    
    const {error, value} = userSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    
    if(!user){
       return res.status(404).json({
            message: "Not Found!"
        });
    };

/*
    if(typeof req.body.name !== "string" || req.body.name.trim().length < 3){
       return res.status(400).json({
            message: "Bad Requst Or Name must be atleast 3 characters long."
        });
    }
        */
     user.name = value.name;
    res.json(user);
});

app.delete("/users/api/user/:id", (req, res) =>{
    const user = Users.find(e => e.id === parseInt(req.params.id));
 if(!user) return res.status(404).json({
    message: "User Not Found"
   });
    Users = Users.filter(u => u.id !== user.id);
    /*
   // const index = Users.indexOf(user);
   // Users.splice(index, 1); */
  
   res.send(user);
});


const port =  process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
});