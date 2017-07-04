var author = "";
var permlink = "";
var players = [ "" ];
var nPlayers = 0;
var registering = true;

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
		console.log(err, result);
		if (result.length > 0) {
			for (x = 0; x < result.length; x++) {
				register_player(result[x].author);
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
	} else {
		console.log("User already registered!");
	}
}

// verifica se jogador está na lista
function ver_player(username) {
	// for (i = 0; i < players.length; i++) {
	if (players[i] == username) {
		return false;
	} else if (players[i] == author) {
		return false;
	}
	// }
	return true;
}

// extrai do link do artigo o autor e o permlink
function parse_link(link) {
	var at = link.indexOf("@");
	var p = link.substring(at, at.length);

	var slash = p.indexOf("/");
	author = p.substring(1, slash);
	permlink = p.substring(slash + 1, p.length);
}

// inicia o registo dos jogadores
function init_regist() {
	while (registering) {
		parse_link(document.getElementById('link').value);
		if (ver_date(1)) { // não está a funcionar
			ver_users_replies(author, permlink);
		} else {
			console
					.log("Cannot register player, do not pass 24H since sign-up post!");
		}

	}
}

// verifica se o artigo foi criado à mais horas do que as passadas em
// atributo-->
function show_report() {
	document.getElementById("demo").innerHTML = players.toString();
	document.getElementById("initest").innerHTML = "Players registered: "
			+ nPlayers;
}

// verifica se o artigo foi criado à mais horas do que as passadas em
// atributo-->
function ver_date(time) {
	return true;

	steem.api.getContent(author, permlink, function(err, result) {
		console.log(err, result);

		var release_time = new Date();
		console.log("post time: " + result.created);
		console.log("release time: " + release_time.getDate());
		var temp = release_time + 1;
		console.log("temp: " + temp);
		return true;
		if (result.created > new Date() - time) {
			return true;
		}
		return false;
	});

}
