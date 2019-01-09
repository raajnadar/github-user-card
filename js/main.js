document.onreadystatechange = function () {
	
	function getLocation(data) {
		if (data.location != null) {
			return `lives in ${ data.location }`;
		} else {
			return '';
		}
	}
	
	/* wait for the contents to load */
	if (document.readyState === 'complete') {
		var query = document.querySelector('#retrieve');
		var result = document.querySelector('#result');
		var searchForm = document.querySelector('#search-form');
		
		query.addEventListener('click', function () {
			// Get username from input box
			var username = document.querySelector('#username').value;
			
			// Ajax call
			var request = new XMLHttpRequest();
			request.open('GET', 'https://api.github.com/users/' + username);
			request.onload = function () {
				var data = JSON.parse(request.responseText);
				searchForm.style.display = "none"
				result.innerHTML =`
					<div class="row">
						<div class="col-3">
							<img class="img-fluid" src="${ data.avatar_url }" />
						</div>
						<div class="col-9">
							<h3 class="data-title">${ data.name } ${ getLocation(data) }</h3>
							<p class="data-text">Bio : ${ data.bio }</p>
							<p class="data-text">Blog : ${ data.blog }</p>
							<div style="margin-top: 16px">
								<div class="data-badge">Repositories ${ data.public_repos }</div>
								<div class="data-badge">Followers ${ data.followers }</div>
								<div class="data-badge">Following ${ data.following }</div>
							</div>
							<div>
								<button class="btn" onClick="window.open('${ data.html_url }');">View ${ data.name }'s profile</button>
								<button class="btn btn-blue" id="searchAgain">Search Again</button>
							</div>
						</div>
					</div>
				`;
				
				var searchAgain = document.querySelector('#searchAgain');
		
				searchAgain.addEventListener('click', function () {
					searchForm.style.display = "block"

					result.innerHTML = ''
				});
			}
			request.send();
		});
	}
}