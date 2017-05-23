/**
 * Created by rpowar on 5/2/17.
 */
function makeRequest(val){
    if(val === 'restaurantList'){
        request('/queued/restaurantList/', val);
        //postData('/queued/restaurantList/');
        document.getElementById("searchRestaurants").style.display = "none";
        document.getElementById("showRestaurantsList").style.display = "block";
        document.getElementById("reservationPage").style.display = "none";
    }else if(val === 'reservationPage'){
        // request('/queued/restaurantList/', val);
        document.getElementById("searchRestaurants").style.display = "none";
        document.getElementById("showRestaurantsList").style.display = "none";
        document.getElementById("reservationPage").style.display = "block";
    }else{
        document.getElementById("searchRestaurants").style.display = "block";
        document.getElementById("showRestaurantsList").style.display = "none";
        document.getElementById("reservationPage").style.display = "none";
    }
}

function request(url, val){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200){
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            if(val === "restaurantList"){
                viewRestaurantList('showRestaurantsList', response);
            }
        }
    };

    xhr.open("GET", url, true);
    xhr.send();
}

/*function postData(url){
    var xhr = new XMLHttpRequest();
    var form = document.getElementById("search");
    console.log(form);
    var formData = new FormData(form);
    console.log(formData);
    var data = document.getElementById('example-text-input').value;
    console.log(data);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log(xhr.responseText);
        }
    };
    xhr.open("POST", url , true);
    xhr.send(data);
    return false;
}*/

function viewRestaurantList(element, response){
    var elementList = document.getElementById(element);
    //var newElement = "<h3 class='panel-heading'>Search Results</h3>";
    var newElement = "<div>";
    for(var i = 0; i < response.length; i++){
        newElement += "<div class='card card-inverse' style='background-color: #333; border-color: #333; margin-bottom: 10px;'>";
        newElement += "<div class='card-block'>";
        newElement += "<h3 class='card-title'>" + response[i].name + "</h3>";
        newElement += "<p class='card-text' style='margin-bottom: 0px;'>" + "<span>Address: " + "</span>" + response[i].address + ", " + response[i].city + ", " + response[i].state + "</p>";
        newElement += "<p class='card-text' style='margin-bottom: 0px;'>" + "<span>Phone:   " + "</span>" + response[i].phone + "</p>";
        newElement += "<p class='card-text' style='margin-bottom: 0px;'>" + "<span>Cuisine: " + "</span>" + response[i].cuisine + "</p>";
        newElement += "<p class='card-text' style='margin-bottom: 0px;'>" + "<span>Budget:  " + "</span>" + response[i].budget + "</p>";
        newElement += "<p class='card-text'>" + "<span>Wait Time: " + "</span>" + response[i].lowWait + "<span>-</span>" + response[i].highWait  + "<span>  mins</span>" + "</p>";
        newElement += "<form method='post'>";
        newElement += "<a href=\"javascript:makeRequest('reservationPage')\" class='btn btn-primary' role='button'>Queue Me</a>";
        newElement += "</form>";
        newElement += "</div>";
        newElement += "</div>";
    }
    newElement += "</div>";

    elementList.innerHTML= newElement;
}