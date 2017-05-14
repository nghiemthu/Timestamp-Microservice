var express = require("express");
var app = express();

app.set("view engine", "ejs");

//////////////////////
//ROUTES
///////////////////

// Homepage 
app.get("/", function(req, res){
   res.render("index"); 
});

// Get time
app.get("/:time", function(req, res){

    //Declare variables
    var time = req.params.time;
    var unix = null, date = null;
    var object;

    // Check if input is a number
    if (Math.abs(time) >= 0){                       
         date = formatDate(new Date(time * 1000));
         if (date != null)
            unix = time;
    }  // Else it is string
    else {                                      
        var dateString = time.replace('%20', ' ');
        unix = getUnix(dateString);
        //Unit is valid
        if (Math.abs(unix) >= 0)
            date = dateString;
    }
    
    //Return the object
    object = {"unix": unix, "natural": date};
    
    //Send the data
    res.send(object); 
});


// Functions 
function formatDate(date) {
     var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    // if cannot define monthNames
    if (monthNames[monthIndex] == undefined) return null;

    return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

function getUnix(dateString){
    var date = new Date(dateString);
    return date.getTime() / 1000;
}

// Start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server stated!");
});