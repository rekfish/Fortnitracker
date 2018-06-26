$(function(){
    var submitBtn = $('#submit');
    var platfromDropDownBtn = $('#platform a');
    var epicNickName = $('#epicNickName');
    var results = $('#results');
    var ctx = $('#myChart');
    // var addStreamnNmeBtn=document.getElementById("addStreamnNmeBtn");
    // var streamname =$('streamname');
    var users = [ "thelostgamers_", "JohnnyLocksmith", "ninja", "highdistortion", "TSM_Daequan", "tfue", "drakekilla69","dakotaz"];
    

    submitBtn.click(function(){
        var data = {};
        data.epicNickName = epicNickName.val().toLowerCase();
        data.dropDownValue = dropDownValue.toLowerCase();
        $.ajax({
            type: "POST",
            url: '/',
            dataType: 'json',
            data : data,
            success: function(data){
                data = JSON.parse(data);
                displayData(data);
            }
        });
    

        resetResult();
    });

    platfromDropDownBtn.click(function(){
        dropDownValue = $(this).text();
    });

    function resetResult(){
        results.html('');
        epicNickName.val('');
    }


    function displayData(data){

        var epicUserHandle = data.epicUserHandle;
        var list = '<ul class="list-group">' +
            '<li class="list-group-item">' + 'Solo: ' + data.stats.p2.top1.value + '</li>' +
            '<li class="list-group-item">' + 'Duos: ' + data.stats.p10.top1.value + '</li>' +
            '<li class="list-group-item">' + 'Teams: ' + data.stats.p9.top1.value + '</li>' +
            '<button tag="submit" onclick="showGraph()">Show/Hide Graph</button>';
        var template = '<div class="card text-center">' +
            '<h5 class="card-header">' + epicUserHandle + '</h5>' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + 'Wins' + '</h5>' +
            '<p class="card-text">' + list + '</p>' +
            '</div>' +
            '</div>';
        results.html(template);

        
        var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Solo", "Duos", "Squads" ],
        datasets: [{
            label: 'Breakdown of wins for '+epicUserHandle,
            data: [data.stats.p2.top1.value, data.stats.p10.top1.value, data.stats.p9.top1.value, ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },

});

    }



  var baseurl = "https://wind-bow.gomix.me/twitch-api/";

  var twitch_url = "https://www.twitch.tv/";

  var userLogo, userProfile, userFollowers, userStatus, userActivity, userUrl;

  var html = " ";

  users.forEach(function(user) {

    //calling api
    //getting stream status by user
    var apiurl = "https://wind-bow.gomix.me/twitch-api/" + "streams/" + user + "?callback=?";

    //getting user info
    $.getJSON(apiurl, function(json) {

        //if user is streaming live
        if (json.stream != null) { 

          //console.log(user + " online");

          userLogo = json.stream.channel.logo;
          userProfile = json.stream.channel.display_name;
          userFollowers = json.stream.channel.followers;
          userStatus = 1;
          userActivity = json.stream.channel.status;
          userUrl = twitch_url + userProfile;

          //console.log(userLogo + " " + userProfile + " " +userFollowers+ " " +userStatus + " " + userActivity);

          html+= "'<tr><th scope='row'>"

          html += "<img src='" + userLogo + "'></th>";
            
          html += "<td><a href='https://twitch.tv/" + userProfile + "' target='_blank'>" + userProfile + "</a></td>";
              
          html += `<td><button class="btn btn-success" id="load_home`+userProfile+`">Watch Live Now!</button></td><script>$(document).ready( function() {$("#load_home`+userProfile+`").on("click", function() {$("#content").load("`+userProfile+`");});});</script>`;

          html += "<td>" + userActivity + "</td>";

          html += "<td>" + userFollowers + "</td></tr>";
    
          $("table tbody").html(html);

          
        }
        else {
           //if the user isn't streaming right now, getting the info from the channel

          var channelurl = baseurl + "channels/" + user + "?callback=?";

          //console.log(channelurl);

          $.getJSON(channelurl, function(json) {

            userLogo = json.logo;
            userProfile = json.display_name;
            userFollowers = json.followers;
            userStatus = 0;
            userActivity = json.status;


            html += "'<tr><th scope='row'>"

            html += "<img src='" + userLogo + "'></th>";
              
            html += "<td><a href=https://www.twitch.tv/" + userProfile + " target='_blank'>" + userProfile + "</a></td>";
  
            html += "<td><span class='offline'>Offline</span></td>";
  
            html += "<td>" + userActivity + "</td>";
  
            html += "<td>" + userFollowers + "</td></tr>";

            $("table tbody").html(html);


          });

          
        }

     });

     

  });


});


$(document).ready(function() {
  getData();
  $("div").each(function() {
    console.log($(this).text());
  });
});
    function showGraph() {
    	///tried to use the $('#mychart') but failed to hide the graph....
    var x = document.getElementById("myChart");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
};
