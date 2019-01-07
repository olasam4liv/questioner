const express = require('express');
const bodyParser = require('body-parser');
//const uniqId = require('uniqid');
const app = express();
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let meetups = [];
let upcomingMeetups = [];
let users = [];
let questions = [];

app.post('/login',(req, res)=>{
const user ={
    id:1,
    username: 'sam',
    email: 'olasam4liv@gmail.com'
}
jwt.sign({user}, 'secretkey', (req, token)=>{
    res.json({
        token
    });
});
});

app.get('/', (req, res) => {
    res.status(200).json({
        status: 1,
        data: "Welcome to questioner app"
    })
});
//user registration
app.post('/api/v1/users', (req, res, ) => {
    // extract data from request object
    const { firstname, 
        lastname, 
        othername, 
        email, 
        phoneNumber, 
        username, 
        registered = new Date(), 
        isAdmin = new Boolean(1,0)
    } = req.body;
    
   // check if any one does not exist
if (!(firstname)){
    return res.status(404).json({
        status: 404,
        error: "Firstname is Required"
    });
} else if (!(lastname)){
    return res.status(404).json({
        status: 404,
        error: "Lastname is Required"
    });
}else if (!(email)){
    return res.status(404).json({
        status: 404,
        error: "Email is Required"
    });
}else if (!(phoneNumber)){
    return res.status(404).json({
        status: 404,
        error: "Phone Number is Required"
    });
    }
   
// save all variables in an object and push into the users array
const user = {
    id: users.length + 1,
    userid,
    firstname,
    lastname,
    othername,
    phoneNumber,
    username,
    registered: registered.toDateString(),
    isAdmin 
    }
users.push(user);

res.status(200).json({
    status: 201,
    data: user
})
});

//get all registered users
app.get('/api/v1/users/allusers', (req, res)=>{ 
    res.status(200).json({
        status: 201,
        data: users
    })
});

//meetup post
app.post('/api/v1/meetups', (req, res) => {
    // extract data from request object
    const { location, happeningOn, topic, tags} = req.body;

   // check if any one does not exist
if (!(location)){
    return res.status(404).json({
        status: 404,
        error: "Location is Required"
    });
} else if (!(happeningOn)){
    return res.status(404).json({
        status: 404,
        error: "HappeningOn is Required"
    });
}else if (!(topic)){
    return res.status(404).json({
        status: 404,
        error: "Topic is Required"
    });
}else if (!(tags)){
    return res.status(404).json({
        status: 404,
        error: "Tags is Required"
    });
}
   
    //const id = uniqId();
    const createdOn = new Date();

    // save all variables in an object and push into the meetups array
    const meetup = {
        id: meetups.length + 1,
        location,
        createdOn: createdOn.toDateString(),
        happeningOn: new Date(happeningOn).toDateString(),
        topic,
        tags
    }
    meetups.push(meetup);

    res.status(200).json({
        status: 201,
        data: meetup
    })
});

//get all meetup
app.get('/api/v1/meetups', (req, res) => {   
    res.status(200).json({
        status: 201,
        data: meetups
    })
});
 
//get meetup by id
app.get('/api/v1/meetups/:id', async (req, res) => {
    const meetup = await meetups.find(c => c.id === Number(req.params.id));  
    if(!meetup) {
        return res.status(404).json({
            status: 404,
            error: "No meetup found for the specified id"
        });
    }
    res.status(200).json({
        status: 201,
        data: meetup
    })
     
});
//delete meetup by id
app.delete('/api/v1/meetups/:id', async (req, res) => {
    const index = await meetups.findIndex(c => c.id === Number(req.params.id));
    if(index < 0) {
        return res.status(404).json({
            status: 404,
            error: "No meetup found for the specified id"
        });
    }
    meetups.splice(index, 1);
    res.status(200).json({
        status: 201,
        message: "Meetup deleted successfully"
    });
})

//Update meetup by id
app.put('/api/v1/meetups/:id', async (req, res) => {
const meetup = await meetups.find(c => c.id === Number(req.params.id));  
    if(!meetup) {
        return res.status(404).json({
            status: 404,
            error: "No Record found for the specified id"
        });
    }     
meetup.location = req.body.location;
meetup.createdOn= req.body.createdOn;
meetup.happeningOn = req.body.happeningOn;
meetup.topic = req.body.topic;
meetup.tags = req.body.tags;
    res.status(200).json({
        status: 201,
        data: meetup
    })
     
});
//upcoming meetup post
app.post('/api/v1/meetups/upcoming', (req, res) => {
    // extract data from request object
    const { location, happeningOn, topic, tags} = req.body;

   // check if any one does not exist
if (!(location)){
    return res.status(404).json({
        status: 404,
        error: "Location is Required"
    });
} else if (!(happeningOn)){
    return res.status(404).json({
        status: 404,
        error: "HappeningOn is Required"
    });
}else if (!(topic)){
    return res.status(404).json({
        status: 404,
        error: "Topic is Required"
    });
}else if (!(tags)){
    return res.status(404).json({
        status: 404,
        error: "Tags are Required"
    });
}   
    const createdOn = new Date();

    // save all variables in an object and push into the upcomingmeetups array
    const meetup = {
        id: upcomingMeetups.length +1,
        location,
        createdOn: createdOn.toDateString(),
        happeningOn: new Date(happeningOn).toDateString(),
        topic,
        tags
    }
    upcomingMeetups.push(meetup);

    res.status(200).json({
        status: 201,
        data: meetup
    })
});

//get all upcoming meetup
app.get('/api/v1/meetups/upcoming', (req, res) => {  
    res.status(200).json({
        status: 201,
        data: upcomingMeetups
    })
});
//get Upcoming meetup by id
app.get('/api/v1/meetups/upcoming/:id', async (req, res) => {
    const meetup = await upcomingMeetups.find(c => c.id === Number(req.params.id));  
    if(!meetup) {
        return res.status(404).json({
            status: 404,
            error: "No Upcoming meetup found for the specified id"
        });
    }
    res.status(200).json({
        status: 201,
        data: meetup
    })
     
});


//create a question for a specific meetup
app.post('/api/v1/question', (req, res)=>{
    const {
        user = users.username,
        meetup,
        title,
        body
    }=req.body
    if (!(user)){
        return res.status(404).json({
            status: 404,
            error: "User is Required"
        });
    }
    const question = {
        user,
        meetup,
        title,
        body        
    }
    questions.push(question);

    res.status(200).json({
        status: 201,
        data: question
    })
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server started on port ${PORT}`);
})


