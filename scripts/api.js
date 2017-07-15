/*
 * Here you can find ready to use scripts transversal for any project you may have
 * 
 */
var author;

function init_regist() {
	parse_link(document.getElementById('link').value);

	steem.api.getContent(author, permlink, function(err, result) {
		console.log(err, result);
		console.log("Init reading contente from @" + author + " post-->"
				+ permlink);
		console.log("Number of upvotes: " + result.net_votes);

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
	var permlink = p.substring(slash + 1, p.length);
}