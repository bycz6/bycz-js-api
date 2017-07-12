var pAuthor = "";
var permlink = "";
var players = [];
var nPlayers = 0;
var registering = true;
var nComment = 0;
var timeout = 24; // default 24 horas de registo

var registerdate;
var release_time;

// *************** Funções ******************

// construtor jogador
function player(name, team, life, money, resources) {
	this.team = null; // if null solo player; else is name of the team
	this.name = name; // lista de nomes jogadore(s)
	this.life = life;
	this.money = money;
	this.resources = resources; // lista de armas + utensilios
}

// verificar todos os comentários e sub-comentários recursivamente e submete os
// utilizadores para inscrição
function ver_users_replies(author, link) {
	steem.api.getContentReplies(author, link, function(err, result) {
		// console.log(err, result);
		if (result.length > 0) {
			for (x = 0; x < result.length; x++) {
				nComment++;
				console.log("Reading comment nº" + nComment + "; from @"
						+ result[x].author);

				// acções a realizar com o comentário
				if (ver_date_post(result[x])) {
					register_player(result[x].author);
				}

				ver_users_replies(result[x].author, result[x].permlink);
			}
		}

	});
	registering = false;
}

// regista os jogadores e garante que não há repetidos
function register_player(username) {
	if (ver_player(username)) {
		players.push(username);
		nPlayers++;
		console.log("@" + username + " - Registado com sucesso!")
	}
}

// verifica se jogador está na lista
function ver_player(username) {
	for (i = 0; i < players.length; i++) {
		if (players[i] == username) {
			console.log("User @" + username + " already registered!");
			return false;
		} else if (username == pAuthor) {
			console.log("User @" + username + " is the author of the game!");
			return false;
		}
	}
	return true;
}

// coloca as @ nos utilizadores, para ficarem prontos para colar
function parse_user(username) {
	return " @" + username + " ";
}

// devolve a lista de jogadores passada em função embelezada
function parse_players(list) {
	var pPlayers = [ "" ];

	for (x = 0; x < list.length; x++) {
		pPlayers[x] = parse_user(list[x]);
	}
	return pPlayers;
}

// extrai do link do artigo o autor e o permlink
function parse_link(link) {
	var at = link.indexOf("@");
	var p = link.substring(at, at.length);

	var slash = p.indexOf("/");
	pAuthor = p.substring(1, slash);
	permlink = p.substring(slash + 1, p.length);
}

// inicia o registo dos jogadores
function init_regist() {
	while (registering) {
		if (document.getElementById('timeout').value != 0) {
			timeout = document.getElementById('timeout').value;
			console.log("Registration timout: " + timeout + " horas");
		} else {
			console.log("Registration timout: " + timeout + " horas (default)");
		}

		parse_link(document.getElementById('link').value);
		console.log("Parsing game's link: "
				+ document.getElementById('link').value);

		ver_date(timeout);
		console.log("Registering started! - " + parse_user(pAuthor)
				+ "inited a new game! Name: " + permlink);

		ver_users_replies(pAuthor, permlink);

		console.log("Registering finished! " + parse_user(pAuthor))
				+ "just copy past to your content!";

		// if (ver_date(timeout)) {
		// console.log("Registering started! - " + parse_user(pAuthor)
		// + "inited a new game! Name: " + permlink);
		//
		// ver_users_replies(pAuthor, permlink);
		//
		// console.log("Registering finished! " + parse_user(pAuthor))
		// + "just copy past to your content!";
		// } else {
		// console
		// .log("Cannot register player, do not pass 24H since sign-up post!");
		// registering = false;
		// }

	}
}

// verifica se o artigo foi criado à mais horas do que as passadas em
// atributo-->
function show_report() {
	document.getElementById("comments").innerHTML = "Comments: " + nComment;
	document.getElementById("nplayers").innerHTML = "Players registered: "
			+ nPlayers;
	document.getElementById("playerlist").innerHTML = parse_players(players);

}

// Verifica se o post foi dentro do periodo de inscrição
// é passado o post em atributo
function ver_date_post(result) {
	// release_time = new Date(result.created);
	// console.log("Post time: " + release_time);
	// registerdate = release_time.setHours(release_time.getHours() + timeout);
	// console.log("Register end date: " + new Date(registerdate));
	console.log("Post from @" + result.author + " - Time: " + result.created);

	if (result.created < registerdate) {
		console.log("Post from @" + result.author + " in time!");
		return true;
	} else {
		console.log("Post from @" + result.author + " NOT in TIME!");
		return false;
	}

}

// verifica se o artigo foi criado à mais horas do que as passadas em
// atributo
function ver_date(time) {
	// return true;
	steem.api.getContent(pAuthor, permlink,
			function(err, result) {

				release_time = new Date(result.created);
				console.log("Post time: " + release_time);
				registerdate = release_time.setHours(release_time.getHours()
						+ timeout);
				console.log("Register end date: " + new Date(registerdate));

				// console.log("Bypass ver_date activated!");
				// return true; // #### bypass ####

				// if (new Date() > release_time.setHours(release_time
				// .getHours()
				// + timeout)) {
				// console
				// .log("Time ok! Passed - Could start registering");
				// return true;
				// } else {
				// console
				// .log("Do not pass the deadline! - Please try again in xpto
				// horas!");
				// return false;
				//
				// }

			});
}
/*
 * Zona de testes
 * 
 * Funções em teste! Não estão no código central
 * 
 */

// função para mostrar data de um post
function show_date() {

}

// função para extrair data de um post
function init_date() {
	/*
	 * steem.api.getContent(pAuthor, permlink, function(err, result) {
	 * 
	 * var release_time = new Date(result.created); console.log("post time
	 * (blockchain): " + result.created); console.log("post time (bycz): " +
	 * release_time); console.log("hora actual: " + new Date()); var maishora =
	 * release_time; var inchour = 24; console.log("aumento de 24h: " + new
	 * Date(maishora.setHours(maishora.getHours() + inchour)));
	 * 
	 * });
	 */

	steem.api
			.getContent(
					pAuthor,
					permlink,
					function(err, result) {

						var release_time = new Date(result.created);
						console.log("Post time: " + release_time);
						console.log("release_time.getTime: "
								+ release_time.getTime());
						var relatime = release_time.setHours(release_time
								.getHours()
								+ timeout);
						console.log("sem new date " + relatime);
						var rel = new Date(relatime);
						console.log("release_time + timeout: " + relatime);

						if (new Date() > release_time.setHours(release_time
								.getHours()
								+ timeout)) {
							console.log("mother of god!");
							console.log("Time ok! Passed");
						}
						console
								.log("Do not pass the deadline! - Please try again in xpto horas!");
					});

}
