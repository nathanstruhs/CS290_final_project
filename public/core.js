function user_chose_rock() {
	document.getElementById("user_display").style.backgroundImage = "url(./images/rock.png)";
}

function user_chose_paper() {
	document.getElementById("user_display").style.backgroundImage = "url(./images/paper.jpeg)";
}

function user_chose_scissors() {
	document.getElementById("user_display").style.backgroundImage = "url(./images/scissors.png)";
}

function randomize_computer_choice() {
	var images = ['./images/rock.png', './images/paper.jpeg', './images/scissors.png'];
	var num = Math.floor(Math.random() * 3);
	document.getElementById("computer_display").style.backgroundImage =  "url('" + images[num] + "')";
}

$(document).ready( function() {
	$.ajax({ url: "http://localhost:8080/findUsers"}).done(function(data) {
		var stringyfied_data = String(data);
		var username_and_cwc = stringyfied_data.split('\n');
		for (var i = 0; i < username_and_cwc.length; ++i) {
			$('#leaderboard-ol').append('<li class="leaderboard-li" >' + username_and_cwc[i] + '</li>');
		}
	});
});

