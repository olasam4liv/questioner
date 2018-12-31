const express = require('express');
const bodyParser = require('body-parser');
//const uniqId = require('uniqid');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let meetups = [];
let upcomingMeetups=[];

app.get('/', function(res, res){
    res.status(200).json({
        status: 1,
        data: "Welcome to questioner app"
    })
});

//meetup post
app.post('/meetups', (req, res) => {
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
        status: 'false',
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

    res.status(201).json({
        status: 200,
        data: meetup
    })
});

//get all created meetup
app.get('/meetups', (req, res) => {
    res.status(200).json({
        status: 1,
        data: meetups
    })
});

 
//get meetup by id




//upcoming meetup post
app.post('/meetups/upcoming', (req, res) => {
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
        status: 'false',
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

    res.status(201).json({
        status: 200,
        data: meetup
    })
});



app.listen(3000, ()=>{
    console.log('server started on port 3000')
});

