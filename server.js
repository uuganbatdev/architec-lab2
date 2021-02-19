let http = require('http');
let fs = require('fs')
let port = 3001

let server = http.createServer((req,res) => {
	res.writeHead(200, { 'Cotent-Type': 'text/html' })
	switch (req.url) {
		case '/':
			fs.readFile('./index.html', (error, data) => {
				if (error) {
					res.writeHead(404);
					res.write('Uuchlarai huselt amjiltgui');
				} else {
					res.write(data);
				}
				res.end();
			})
			break;
		case '/lab1':
			let body = '';
			let data;
			let saveData;
			req.on('data', chunk => {
				body += chunk.toString();
				data = JSON.parse(body);
				saveData = `\n${data.firstName}\n${data.lastName}`;
				fs.appendFile('fullNames.txt', saveData, (err) => {
					if (err) {
						console.log(err);
					} else {
						console.log('uploaded fullname');
					}
				})
			});
			res.end();
			break;
		 default:
			res.writeHead(404);
			res.write('oldsongui');
			res.end();
			break;
	}
	
})


server.listen(port, (error) => {
	if (error) {
		console.log('Server ajillaj chadsangui')
	} else {
		console.log('Server amjilttai holbogdloo ', port )
	}
})
