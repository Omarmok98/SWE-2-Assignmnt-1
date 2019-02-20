
const lastfmAPI = new LastfmAPI("c76192f9bfbb17ecd6ec7ded484997ab");
var lastfmLoginLink = document.getElementById('lastfm-login-link');
console.log(lastfmAPI.loginLink);
lastfmLoginLink.href = lastfmAPI.loginLink;

var artists = [];

var urlParams = new URLSearchParams(location.search);
if(urlParams.has("token"))
{
    console.log(urlParams.get("token"))
    lastfmAPI.saveToken(urlParams.get("token"));

    lastfmAPI.createSessionKey().then(response => response.json()).then(json => {
        console.log(json.session.key);
        lastfmAPI.saveSessionKey(json.session.key);
    }).catch(err => {
        console.log(err);
    })
    
    
    lastfmAPI.getTopArtists().then(response => response.json()).then(jsonResponse => {
        console.log(jsonResponse);
        var listItems = "";
        for(let i = 0; i < 5; i++)
        {
            
            let artistWithoutSpaces = jsonResponse.artists.artist[i].name.replace(' ', '');
            artists.push(jsonResponse.artists.artist[i].name);
            listItems += `<li id=${artistWithoutSpaces}>${jsonResponse.artists.artist[i].name}</li>`
        }
        document.getElementById("top-artists").innerHTML = listItems;

        for(let i = 0; i < 5; i++)
        {
            var tags = "<br>";
            lastfmAPI.getArtistTags(artists[i]).then(res => res.json()).then(resJson => {
                console.log(artists[i], resJson)
            }).catch(err => {
                console.log(err);
            })
        }
        lastfmAPI.addArtistTags("Ariana Grande", "rock,shit").then(res => console.log(res)).catch(err => {
            console.log(err)
        });

    }).catch(err => {
        console.log(err);
    });



}




