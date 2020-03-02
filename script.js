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
        },
        {
        "hour": "1AM", 
        "data": "1", 
        },
        {
        "hour": "2AM", 
        "data": "2", 
        },
        {
        "hour": "3AM", 
        "data": "3", 
        },
        {
        "hour": "4AM", 
        "data": "4", 
        },
        {
        "hour": "5AM", 
        "data": "5", 
        },
        {
        "hour": "6AM", 
        "data": "6", 
        },
        {
        "hour": "7AM", 
        "data": "7", 
        },
        {
        "hour": "8AM", 
        "data": "8", 
        },
        {
        "hour": "9AM", 
        "data": "9", 
        },
        {
        "hour": "10AM", 
        "data": "10", 
        },
        {
        "hour": "11AM", 
        "data": "11", 
        },
        {
        "hour": "12PM", 
        "data": "12", 
        },
        {
        "hour": "1PM", 
        "data": "13", 
        },
        {
        "hour": "2PM", 
        "data": "14", 
        },
        {
        "hour": "3PM", 
        "data": "15", 
        },
        {
        "hour": "4PM", 
        "data": "16", 
        },
        {
        "hour": "5PM", 
        "data": "17", 
        },
        {
        "hour": "6PM", 
        "data": "18", 
        },
        {
        "hour": "7PM", 
        "data": "19", 
        },
        {
        "hour": "8PM", 
        "data": "20", 
        },
        {
        "hour": "9PM", 
        "data": "21", 
        },
        {
        "hour": "10PM", 
        "data": "22", 
        },
        {
        "hour": "11PM", 
        "data": "23", 
        },
    ];

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
                // give the hours to the 1st <td>
                tdEl01.text(hours[globalVariable].hour);
                // set the type for the input and give it placeholder text
                inputEl.attr({"type":"text","placeholder":"Add an event"});
                // append the input as a child the the 2nd <td>
                tdEl02.addClass("td2");
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

    var addEvent = function() {
        // console.log($(this).parent().siblings($("td")).children($("input")).val())
        var targetInput = $(this).parent().siblings($("td")).children($("input"));

        if (targetInput.val() === "") {
            alert("can not add blank event.")
        } else {
            var eventEl = $("<h5>");
            eventEl.text(targetInput.val());
            eventEl.prependTo($(this).parent().siblings(".td2"));
            // targetInput.val("");
        }
    }
    
    // if ($("#get").val() === "") {
    //     alert("Can not add blank event. ")
    // } else { 
    //     var tdEl = $("<h5>");
    //     console.log($("#get").val())

    //     tdEl.text($("#get").val());
    //     tdEl.prependTo($("#td-events"));
    //     $("#get").val("");
    // }

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
    

    // OLD ROWCOLOR STUFF
    // if(parseInt($("tr").data().hour) === parseInt(moment().format('h'))) {
    //     $("tr").addClass("table-success");
    // } else {
    //     $("tr").addClass("table-warning");
    // }
    
    
    // console.log(parseInt($("tr").data().hour) === parseInt(moment().format('h')))
    
    // console.log($("#test").data().hour);
    // console.log(parseInt($("#test").data().hour) == moment().format('h'))
    // console.log(parseInt($("#test").data().hour) == moment().format('h'))
    // console.log(parseInt(moment().format('h')));
    // console.log(hours[0] === moment().format('h'))
    // console.log(hours[0] > moment().format('h'))
    // console.log(hours[0] < moment().format('h'))

    createTable();

    rowColor();
    updatecolor();
    updateTime();
    
    $(".saveBtn").on("click", addEvent);
// END DOCUMENT READY...
});