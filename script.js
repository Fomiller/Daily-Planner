$(document).ready(function(){
    var day = moment().format('MMMM Do YYYY',);
    var time = moment().format('LTS'); 
    var globalVariable = 0;
    //  set Day
    $("#currentDay").text(day);
    //  set Time
    $("#currentTime").text(time);


    var hours = [
        {
        "hour": "12AM", 
        "data": "0",
        "events": []
        },
        {
        "hour": "1AM", 
        "data": "1", 
        "events": [],
        },
        {
        "hour": "2AM", 
        "data": "2", 
        "events": [],
        },
        {
        "hour": "3AM", 
        "data": "3", 
        "events": [],
        },
        {
        "hour": "4AM", 
        "data": "4", 
        "events": [],
        },
        {
        "hour": "5AM", 
        "data": "5", 
        "events": [],
        },
        {
        "hour": "6AM", 
        "data": "6", 
        "events": [],
        },
        {
        "hour": "7AM", 
        "data": "7", 
        "events": [],
        },
        {
        "hour": "8AM", 
        "data": "8", 
        "events": [],
        },
        {
        "hour": "9AM", 
        "data": "9", 
        "events": [],
        },
        {
        "hour": "10AM", 
        "data": "10",
        "events": [], 
        },
        {
        "hour": "11AM", 
        "data": "11",
        "events": [], 
        },
        {
        "hour": "12PM", 
        "data": "12",
        "events": [], 
        },
        {
        "hour": "1PM", 
        "data": "13",
        "events": [], 
        },
        {
        "hour": "2PM", 
        "data": "14",
        "events": [], 
        },
        {
        "hour": "3PM", 
        "data": "15",
        "events": [], 
        },
        {
        "hour": "4PM", 
        "data": "16",
        "events": [], 
        },
        {
        "hour": "5PM", 
        "data": "17",
        "events": [], 
        },
        {
        "hour": "6PM", 
        "data": "18",
        "events": [], 
        },
        {
        "hour": "7PM", 
        "data": "19",
        "events": [], 
        },
        {
        "hour": "8PM", 
        "data": "20",
        "events": [], 
        },
        {
        "hour": "9PM", 
        "data": "21",
        "events": [], 
        },
        {
        "hour": "10PM", 
        "data": "22",
        "events": [], 
        },
        {
        "hour": "11PM", 
        "data": "23",
        "events": [], 
        },
    ];

    if   (JSON.parse(localStorage.getItem("events")) !== null){
        hours = JSON.parse(localStorage.getItem("events"))
    }


    var storeEvents = function() {
        event.preventDefault();

        oldEvents = JSON.parse(localStorage.getItem('session')) || [];
        localStorage.setItem("events", JSON.stringify(hours))

        JSON.parse(localStorage.getItem("events"))

    };

    var createTable = function() {
        // creates <table> element and <tbody> element
        var tbl = $("<table>");
        var tblBody = $("<tbody>");
        tbl.addClass("table table-hover")

        // creating rows and cells
        for(var i = 0; i < 24; i++){
            // create table row
            var rowEl = $("<tr>");
            rowEl.attr("data-time", hours[globalVariable].data)
            
            for (var j = 0; j < 1; j++){
                // create 3 seperate td for each row
                var tdEl01 = $("<td>");
                var tdEl02 = $("<td>");
                var tdEl03 = $("<td>");
                var inputEl = $("<input>");
                var btnEl = $("<button>");
                var eventArray = hours[globalVariable].events
                    // var eventDiv = $("<div>");
                // give the hours to the 1st <td>
                tdEl01.text(hours[globalVariable].hour);
                // set the type for the input and give it placeholder text
                inputEl.attr({"type":"text","class":"event-input","placeholder":"Add an event"});
                // give attributes to event div

                // append the input as a child the the 2nd <td>
                tdEl02.addClass("td2");
                // conditional that checks if the event array in the hours obj is not empty and if it is not then it auto creates an h5 that will be filled with strings values.
                if (eventArray.length !== 0){
                    eventArray.forEach(function(element){
                        var h5El = $("<h5>");
                        // add paragraph element
                        // give paragraph element text of remove
                        // add class to paragraph element maybe give
                        // set style for pargraph element for display: "inline block", and color: "red"
                        // create a hover class in style.css that has a underline/something animation so it is clearly clickable.
                        // set h5 element to have a style of display: "inline block" and a padding right of 1em

                        
                        h5El.text(element);
                        // append the paragraph remove button to the h5 element.
                        tdEl02.prepend(h5El);
                    })
                }
                    // tdEl02.append(eventDiv);

                tdEl02.append(inputEl);
                // set attributes for the button
                btnEl.text("Add").addClass("btn-block saveBtn");
                // append btn as child to 3rd <td>
                tdEl03.append(btnEl);
                // append <td>'s as child elements to rowEl
                rowEl.append(tdEl01, tdEl02, tdEl03);
                           
            }
            // add rows to table body
            tblBody.append(rowEl)
            // increase global variable by 1
            globalVariable++;
        }
        // add table body to table
        tbl.append(tblBody);
        $(".container").append(tbl);
    }

    var updateTime = function() {
        var interval = setInterval(function() {
            $("#currentTime").text(moment().format('LTS'));
        },1000);
    }


    // after testing i am convinced that on the first click of the add button it is targeting the correct input. But upon creation of the event, and the second click of the button the button targets the newely created and returns an empty value.
    var addEvent = function(event) {

        var targetInput = $(this).parent().siblings($(".td2")).children().last();
        var targetHourRow = $(this).parent().parent("tr");
        var targetHourRowIdentifier = targetHourRow.data("time")
        console.log(targetHourRowIdentifier)

        if (targetInput.val() === "") {
            alert("can not add blank event.")
        } else {
            var eventEl = $("<h5>");
            eventEl.text(targetInput.val());
            eventEl.prependTo($(this).parent().siblings(".td2"));
            hours[targetHourRowIdentifier].events.push(targetInput.val());

            clearInputs();
        }
    }

    var rowColor = function() {
        $("tr").each(function() {
            $(this).removeClass("table-secondary table-primary table-success")
            if (parseInt($(this).data().time) < parseInt(moment().format('k'))) {
                $(this).addClass("table-secondary");

            } else if (parseInt($(this).data().time) === parseInt(moment().format('k'))) {
                $(this).addClass("table-primary");

            } else {
                $(this).addClass("table-success")
            }
        })
    }

    var updatecolor = function() {
        setInterval(function() {
            rowColor();
        },60000);
    }
    

    var clearInputs = function() {
        $("input:text").val("");
    }

    createTable();

    rowColor();
    updatecolor();
    updateTime();
    

    $(".saveBtn").on("click", addEvent);
    $(".saveBtn").on("click", storeEvents);

// END DOCUMENT READY...
});