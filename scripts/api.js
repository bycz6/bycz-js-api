/*
 * Here you can find ready to use scripts transversal for any project you may have
 * 
 */
var author;
var permlink;
var buddies_list;

function init_regist() {
	parse_link(document.getElementById('link').value);
	read_users_from_file(document.getElementById('file'));

	steem.api.getContent(author, permlink, function(err, result) {
		console.log(err, result);
		console.log("Init reading contente from @" + author + " post-->"
				+ permlink);
		console.log("Number of upvotes: " + result.net_votes);

		for (x = 0; x < result.net_votes; x++) {
			for (y = 0; y < buddies_list.length; y++) {
				if (result.active_votes[x].voter == buddies_list[y]) {
					console.log("@" + result.active_votes[x].voter + "OK");
				} else {
					console.log("@" + result.active_votes[x].voter + "FU");
				}
			}
		}
	});
}

var openFile = function(event) {
	var input = event.target;

	var reader = new FileReader();
	reader.onload = function() {
		var text = reader.result;
		var node = document.getElementById('output');
		node.innerText = text;
		console.log(reader.result.substring(0, 200));
	};
	reader.readAsText(input.files[0]);
};

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
	buddies_list = [ 'pavezi', 'thinkagain', 'userperson321', 'cryptopet',
			'chinuxristo', 'kelvanis', 'soo.chong163', 'cgame', 'arunava',
			'badastroza', 'rzzk', 'floprime', 'sportsenthusiast', 'sam99',
			'yushkov', 'Zebbad', 'luxurious', 'iobates', 'timbalabuch',
			'carlos-fernando', 'invest4you', 'hzavarce', 'harja', 'bitrus2yk',
			'makshay5', 'munchmunch', 'polaleye50', 'robertolopez',
			'andreanoronha', 'mysterion' ]

	console.log("Buddies list size: " + buddies_list.length);
}