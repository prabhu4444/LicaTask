import express from 'express';
// import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import https from 'https';
import http from 'http'; // WARNING: createServer without SSL for testing ONLY
import url from 'url';
import fs from 'fs';
dotenvConfig();


// const app = express();





// app.get('/api/auth', (req,res)=>{
//     const { CLIENT_ID, REDIRECT_URI, AUTH_BASE_URL } = process.env;
//     const response_type = 'code';
//     const scope = 'r_liteprofile r_emailaddress w_member_social';
//     const state = Math.random(); // Generate a random state value
//     const redirectUrl = `${AUTH_BASE_URL}?response_type=${response_type}&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}&scope=${encodeURIComponent(scope)}`;
//   // Redirect to the LinkedIn sign-in page
//   console.log(redirectUrl);

//   // Redirect to the LinkedIn sign-in page
//   res.redirect(redirectUrl);
    
// });

// const port = process.env.PORT || 3000;

// app.listen(port,()=>{
//     console.log(`server is running on ${port}`)
// });
// const auth_base_url = process.env.AUTH_BASE_URL;
// const client_id = process.env.CLIENT_ID;
// const client_secret = process.env.CLIENT_SECRET;
// const redirect_uri = process.env.REDIRECT_URI;
// const response_type = 'code';
// const state = Math.random(); // WARNING: using weak random value for testing ONLY
// const scope = 'r_liteprofile r_emailaddress w_member_social';

// const app = http.createServer(function (req, res) {
    

// 	let req_pathname = url.parse(req.url, true).pathname;
// 	let req_query = url.parse(req.url, true).query;

// 	let redirect_uri_pathname = (new URL(redirect_uri)).pathname;
	
// 	// get authorization code - the server redirects to the linkedin sign-in page
// 	if(req_pathname == '/api/auth') {
// 		let auth_url = auth_base_url + '?response_type=' + response_type + '&client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&state=' + state + '&scope=' + encodeURIComponent(scope);
// 		res.writeHead(302, {'Location': auth_url})
// 		res.end();
// 	}
// 	// get access token - after sign-in linkedin redirects to redirect_uri_pathname
// 	else if(req_pathname == redirect_uri_pathname){

// 		let req_code = req_query.code;
// 		let req_state = req_query.state;

// 		// WARNING: test req_state == state to prevent CSRF attacks

// 		let path_query = 
// 			"grant_type=authorization_code&"+
// 			"code=" + req_code + "&" +
// 			"redirect_uri=" + encodeURIComponent(redirect_uri) + "&" + // will redirect here if authentication fails
// 			"client_id=" + client_id + "&" +
// 			"client_secret=" + client_secret;

// 		let method = 'POST';
// 		let hostname = 'www.linkedin.com';
// 		let path = '/oauth/v2/accessToken?' + path_query;
// 		let headers = {
// 			"Content-Type": "x-www-form-urlencoded"
// 		};
// 		let body = '';
// 		_request(method, hostname, path, headers, body).then(r => {
// 			if(r.status == 200){
// 				let access_token = JSON.parse(r.body).access_token;
// 				let expires_in = Date.now() + (JSON.parse(r.body).expires_in * 1000); // token expiry in epoc format
// 				token_json = '{"access_token":"' + access_token + '","expires_in":"' + expires_in + '"}';
// 				fs.writeFile("./token.json", token_json, e => {if(e){console.log('ERROR - ' + e)}});
// 				res.writeHead(200, {'content-type': 'text/html'});
// 				res.write('Access token retrieved. You can close this page');
// 				console.log('Access token retrieved. You can stop this app listening.');
// 				res.end();
// 			}
// 			else {
// 				console.log('ERROR - ' + r.status + JSON.stringify(r.body))
// 				res.writeHead(r.status, {'content-type': 'text/html'});
// 				res.write(r.status + ' Internal Server Error');
// 				res.end();
// 			}

// 		}).catch(e => {
// 			console.log('ERROR - ' + e);
// 			res.writeHead(500, {'content-type': 'text/html'});
// 			res.write('500 Internal Server Error');
// 			res.end();
// 		});
// 	}

// 	else {
// 		console.log('ERROR - 404 Not found')
// 		res.writeHead(404, {'content-type': 'text/html'});
// 		res.write('404 Not Found');
// 		res.end();
// 	}
// })

// app.listen(3000)
// // app.use(cors());
// app.on('error', e => console.log('Error on port ' + 3000 + ' - ' + e));
// app.on('listening', () => console.log('Listening on port ' + 3000));

// // https request wrapper
// function _request(method, hostname, path, headers, body){
// 	return new Promise((resolve,reject) => {
// 		let reqOpts = {
// 			method,
// 			hostname,
// 			path,
// 			headers,
// 			"rejectUnauthorized": false // WARNING: accepting unauthorized end points for testing ONLY
// 		};
// 		let resBody = "";
// 		let req = https.request(reqOpts, res => {
// 			res.on('data', data => {
// 				resBody += data.toString('utf8');
// 			});
// 			res.on('end', () => {
// 				resolve({
// 					"status": res.statusCode, 
// 					"headers": res.headers, 
// 					"body": resBody
// 				})
// 			});
// 		});
// 		req.on('error', e => {
// 			reject(e);
// 		});
// 		if (method !== 'GET') {
// 			req.write(body);
// 		}
// 		req.end();
// 	})
// }

const app = express();

const auth_base_url = process.env.AUTH_BASE_URL;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const response_type = 'code';
const state = Math.random(); // WARNING: using weak random value for testing ONLY
const scope = 'r_liteprofile r_emailaddress w_member_social';

app.get('/api/auth', (req, res) => {
    let auth_url = auth_base_url + '?response_type=' + response_type + '&client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&state=' + state + '&scope=' + encodeURIComponent(scope);
    res.redirect(auth_url);
});

app.get('/callback', (req, res) => {
    let req_code = req.query.code;
    let req_state = req.query.state;

    // WARNING: test req_state == state to prevent CSRF attacks

    let path_query =
        "grant_type=authorization_code&" +
        "code=" + req_code + "&" +
        "redirect_uri=" + encodeURIComponent(redirect_uri) + "&" + // will redirect here if authentication fails
        "client_id=" + client_id + "&" +
        "client_secret=" + client_secret;

    let options = {
        method: 'POST',
        hostname: 'www.linkedin.com',
        path: '/oauth/v2/accessToken?' + path_query,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };

    let request = https.request(options, linkedinResponse => {
        let data = '';

        linkedinResponse.on('data', chunk => {
            data += chunk;
        });

        linkedinResponse.on('end', () => {
            let response = JSON.parse(data);
            if (response.statusCode === 200) {
                let access_token = response.access_token;
                let expires_in = Date.now() + (response.expires_in * 1000); // token expiry in epoch format
                let token_json = '{"access_token":"' + access_token + '","expires_in":"' + expires_in + '"}';
                fs.writeFile("./token.json", token_json, e => {
                    if (e) {
                        console.log('ERROR - ' + e);
                    }
                });
                res.status(200).send('Access token retrieved. You can close this page');
                console.log('Access token retrieved. You can stop this app listening.');
            } else {
                console.log('ERROR - ' + response.statusCode + JSON.stringify(response.body));
                res.status(response.statusCode).send('Internal Server Error');
            }
        });
    });

    request.on('error', e => {
        console.log('ERROR - ' + e);
        res.status(500).send('Internal Server Error');
    });

    request.end();
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
