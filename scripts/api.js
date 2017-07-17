/*
 * Here you can find ready to use scripts transversal for any project you may have
 * 
 */
var author;
var permlink;
var buddies_list = [];
var bad_buddies_list = [];
var still_buddies = 0;

function init_regist() {
	parse_link(document.getElementById('link').value);
	read_users_from_file(document.getElementById('file'));

	steem.api.getContent(author, permlink, function(err, result) {
		console.log(err, result);
		console.log("Init reading contente from @" + author + " post-->"
				+ permlink);
		console.log("Number of upvotes: " + result.net_votes);

		for (x = 0; x < buddies_list.length; x++) {
			console.log("X = " + x + "Checking buddie : @" + buddies_list[x]);
			for (y = 0; y < result.net_votes; y++) {
				console.log("X = " + x + ",Y = " + y + "Checking buddie : @"
						+ buddies_list[x] + "for @"
						+ result.active_votes[y].voter);

				if (result.active_votes[y].voter == buddies_list[x]) {
					console.log("@" + buddies_list[x] + " OK");
					still_buddies++;
					break;
				}
				if (y == 24) {
					bad_buddies_list.push(buddies_list[x]);
				}
			}
		}
	});

}

// passa conteudo do ficheiro txt para uma matriz
function openFile() {

	var x = document.getElementById("file");
	console.log(x);
	var input = x.target;

	var reader = new FileReader();
	reader.onload = function() {
		var text = reader.result;
		var node = document.getElementById('output');
		node.innerText = text;
		console.log(reader.result.substring(0, 500));
	};
	reader.readAsText(input.files[0]);
}

// extrai do link do artigo o autor e o permlink
// parse_link(document.getElementById('link').value); ---> put where to run it
function parse_link(link) {
	var at = link.indexOf("@");
	var p = link.substring(at, at.length);

	var slash = p.indexOf("/");
	author = p.substring(1, slash);
	permlink = p.substring(slash + 1, p.length);
}

// cria uma lista de utilizadores a partir de um ficheiro
function read_users_from_file(file) {

	var x = file.files[0];
	console.log("File" + x);

	var reader = new FileReader();
	reader.onload = function(event) {
		console.log("reader: " + event.target.result + " + length: "
				+ event.target.result.length);
	}
	reader.readAsText(file.files[0]);
	// var fs = require("fs");
	// var text = fs.readFileSync(file).toString('utf-8');

	var textByLine = file.toString('utf-8').split("\n")
	console.log("textbyline" + textByLine);

	buddies_list = [ 'pavezi', 'thinkagain', 'userperson321', 'cryptopet',
			'chinuxristo', 'kelvanis', 'soo.chong163', 'cgame', 'arunava',
			'badastroza', 'rzzk', 'floprime', 'sportsenthusiast', 'sam99',
			'yushkov', 'Zebbad', 'luxurious', 'iobates', 'timbalabuch',
			'carlos-fernando', 'invest4you', 'hzavarce', 'harja', 'bitrus2yk',
			'makshay5', 'munchmunch', 'polaleye50', 'robertolopez',
			'andreanoronha', 'mysterion' ]

	console.log("Buddies list size: " + buddies_list.length);
}

// verifica se o artigo foi criado à mais horas do que as passadas em

function show_report() {
	document.getElementById("comments").innerHTML = "Nº de buddies maus : "
			+ (buddies_list.length - still_buddies);
	document.getElementById("playerlist").innerHTML = bad_buddies_list;

}