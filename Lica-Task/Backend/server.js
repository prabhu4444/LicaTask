import express from 'express';
// import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import https from 'https';
import http from 'http'; // WARNING: createServer without SSL for testing ONLY
import url from 'url';
import fs from 'fs';
dotenvConfig();


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
