$(document).ready(function () {
	$("#searchUser").on("keyup", function (event) {
		let userName = event.target.value;
		$.ajax({
			url: "https://api.github.com/users/" + userName,
			data: {
				client_id: "0c6b940d3ce5ae8ccbbc",
				client_secret: "64305ad45becd15b1c539fcd49a48160ca64fa30"
			}
		}).done(function (user) {
			
			$.ajax({
				url: "https://api.github.com/users/" + userName + "/repos",
				data: {
					client_id: "0c6b940d3ce5ae8ccbbc",
					client_secret: "64305ad45becd15b1c539fcd49a48160ca64fa30",
					sort: "created: asc",
					per_page: 5
				}
			}).done(function(repos){
				$.each(repos, function(index, repo){
					$("#repos").append(`
						<div class="well">
							<div class="row">
								<div class="col-md-7">
									<strong>${repo.name}</strong>
								</div>
								<div class="col-md-3">
									<span class="label label-default">Repos: ${repo.forks_count}</span>
									<span class="label label-primary">Gists: ${repo.watchers_count}</span>
									<span class="label label-success">${repo.stargazers_count}</span>
								</div>
								<div class="col-md-2">
									<a href="${repo.html_url}" target="_blank" class="btn btn-default">Go To Repo</a>
								</div>
							</div>
						</div>
					`)
				})
			})		
			
			$("#profile").html(`
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">${user.name}</h3>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-md-3">
								<img class="thumbnail avatar" src="${user.avatar_url}">
								<a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">Profile</a>
							</div>
							<div class="col-md-9">
								<span class="label label-default">Repos: ${user.public_repos}</span>
								<span class="label label-primary">Gists: ${user.public_gists}</span>
								<span class="label label-success">${user.followers}</span>
								<span class="label label-info">${user.following}</span>
								<br><br>
								<ul class="list-group">
									<li class="list-group-item">Company: ${user.company}</li>
									<li class="list-group-item">Website: ${user.blog}</li>
									<li class="list-group-item">Location: ${user.location}</li>
									<li class="list-group-item">Member Since: ${user.created_at}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<h3 class="page-header">Latest Repos</h3>
				<div id="repos"></div>
			`)
		});
	});
});
