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

function set_cookie(cookie_name, cookie_value, days) {
	var date = new Date();
	date.setTime(date.getTime() + (days*24*60*60*1000));
	var expires = "expires=" + date.toUTCString();
	document.cookie = cookie_name + "=" + cookie_value +"; " + expires;
}

function get_cookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) {
		return parts.pop().split(";").shift();
	}
}

function remove_cookie() {
	document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}

$(document).ready( function() {
	$.ajax({ url: "http://localhost:8080/findUsers"}).done(function(data) {
		var stringyfied_data = String(data);
		var username_and_cwc = stringyfied_data.split('\n');
		for (var i = 0; i < username_and_cwc.length; ++i) {
			$('#leaderboard-ol').append('<li class="leaderboard-li" >' + username_and_cwc[i] + '</li>');
		}
	});

	$('.user_display_buttons').click(function() {
		var computer_move = $('#computer_display').css('background-image');
		var player_move = $('#user_display').css('background-image');
		var username = get_cookie('username');
		console.log("COM MOVE: " + computer_move + " Pl MOVE: " + player_move);

		$.post("http://localhost:8080/getMoves", { computer_move: computer_move, player_move: player_move, username: username })
		.done(function(data) {
			console.log(data);
			//alert(data);
			$('#computer_display_button_container').html(data);
			window.location.replace("/");
		}).fail(function() {
			console.log("getMoves failed");
		})
	})

	$('#sign_up_form').submit(function() {
		var username = $('#username').val();
		var password = $('#password').val();

		$.post("http://localhost:8080/addUsers", {username: username, password: password}, function() {window.location.replace("/");});
		alert("Added new user successfully");
	});

	$('#login_form').submit(function() {
		var username = $('#username').val();
		var password = $('#password').val();

		$.ajax({
			type: 'POST',
			url: "/loginUser",
			data: { 'username': username,
					'password': password },
			success: function(data) {
				if (data == "true") {
					alert("Logged in");
					set_cookie('username', username, 1);
					window.location.replace("/");
				} else {
					alert("Invalid login credentials");
					$('#username').removeAttr('value');
					$('#password').removeAttr('value');
				}
				
			}, error: function(errorThrown) {
				alert("error" + errorThrown);
			} 
		});
		return false;
	});

	var cookie = get_cookie("username");

	if (cookie != undefined) {
		$('#user_menu').css("display", "none");
		$('#logged_in_user_menu').css("display", "block");
	}

});


