class SpotifyAPI {

    constructor(clientID) {

        this.baseUrl = 'https://accounts.spotify.com/authorize';
        this.clientID = clientID;
        this.response_type = 'code';
        this.redirect_uri = 'http://127.0.0.1:5500/apis/SWE-2-Assignmnt-1-last-fm-api-design-to-be-cont/';
        this.scope = 'user-read-private%20user-read-email';
        this.url = '';
    }

    reqAuth() {

        this.url += `${this.baseUrl}?client_id=${this.clientID}&response_type=${this.response_type}&redirect_uri=${this.redirect_uri}&scope=${this.scope}`;
        $('.btn').click(function() {
            $.get(url, function(data, status) {
                console.log(`${data}`);
            });
        });
        console.log("asdadasd");
        return fetch(this.url); //.then(data => { return data.json() }).then(res => { console.log(res) });
    }

}
Spotify = new SpotifyAPI('e23a7bf8f32f4ce094ce52a69647c4f4');
var spotifyloginlink = document.getElementById('spotify-loging-link');
spotifyloginlink.href += Spotify.reqAuth();