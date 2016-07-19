function ajaxPost(data1) {
		var url = "http://127.0.0.1:8000/api/play_count_by_month" ;
		var datahe = "hello";
		var options = {
			"show": "false"
		}
		$.ajax({
			dataType: "json",
			url: url,
			type: "POST",
			data: JSON.stringify({
				"hello": data1
			}),
			beforeSend: function (xhr) {
				  //xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
				//xhr.setRequestHeader("X-CSRF-Token", );
			},
			async: false,
			cache: false,
			contentType: 'application/x-www-form-urlencoded',
			processData: false,
			success: function (data, statusText, xhr) {
				if (xhr.status == 200) {

					var content = JSON.stringify(data);
					console.log(data.access_token);
				} else {
					var content = JSON.stringify(data);
					console.log(content);
				}
			},
			error: function (data, status) {
				if (status == 400) {
					var content = JSON.stringify(data);
					console.log(content);
				} else {
					var content = JSON.stringify(data);
					console.log(content);
				}

			}
		});
	}