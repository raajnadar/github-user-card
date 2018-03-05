document.onreadystatechange = function () {
	
	function getLocation(data) {
		if (data.location != 'null') {
			return `lives in ${ data.location }`;
		} else {
			return '';
		}
	}
	
	/* wait for the contents to load */
	if (document.readyState === 'complete') {
		var query = document.querySelector('#retrieve');
		var result = document.querySelector('#result');
		
		query.addEventListener('click', function () {
			// Get username from input box
			var username = document.querySelector('#username').value;
			
			// Ajax call
			var request = new XMLHttpRequest();
			request.open('GET', 'https://api.github.com/users/' + username);
			request.onload = function () {
				var data = JSON.parse(request.responseText);
				result.innerHTML =`
					<div class="row">
						<div class="col-3">
							<img class="img-fluid" src="${ data.avatar_url }" />
						</div>
						<div class="col-9">
							<h3 class="data-title">${ data.name } ${ getLocation(data) }</h3>
						</div>
					</div>
				`;
			}
			request.send();
		});
	}
}