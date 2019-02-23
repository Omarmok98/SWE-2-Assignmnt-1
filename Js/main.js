
const lastfmAPI = new LastfmAPI("c76192f9bfbb17ecd6ec7ded484997ab");
const news = new NewsAPI("743874e824444e1c9cd34e35356c3ae7");
var lastfmLoginLink = document.getElementById('lastfm-login-link');
console.log(lastfmAPI.loginLink);
lastfmLoginLink.href = lastfmAPI.loginLink;


var artists = [];

var urlParams = new URLSearchParams(location.search);
if(urlParams.has("token"))
{
    lastfmAPI.saveToken(urlParams.get("token"));

    lastfmAPI.createSessionKey().then(response => response.json()).then(json => {

        lastfmAPI.saveSessionKey(json.session.key);
    }).catch(err => {
        console.log(err);
    })
    
    
    lastfmAPI.getTopArtists().then(response => response.json()).then(jsonResponse => {
        var listItems = "";
        var listArtistNews = "";
        for(let i = 0; i < 5; i++)
        {
            
            let artistWithoutSpaces = jsonResponse.artists.artist[i].name.replace(' ', '');

            lastfmAPI.getArtistTags(jsonResponse.artists.artist[i].name).then(res => res.json()).then(resJson => {
                console.log(jsonResponse.artists.artist[i].name, resJson);  //de betget el tags 3awzak te5ale yedisplay fel html
            }).catch(err => {
                console.log(err);
            })
            listItems += 
            `<li id=${artistWithoutSpaces}>
                <b>${jsonResponse.artists.artist[i].name}</b>   
                <button id="${artistWithoutSpaces}-btn" style="margin-left: 250px" style="margin-right: 5px">add tag</button>
                <input class="form-control" placeholder = "tag name" type = "text" id = "${artistWithoutSpaces}-text" readonly></input>
                <br>
                <br>
            </li>`
            console.log("BEFORE",jsonResponse.artists.artist[i].name);
            news.getArtistNews(jsonResponse.artists.artist[i].name).then(res => res.json()).then(resJson =>
            {   
                console.log("AFTER",jsonResponse.artists.artist[i].name);
                for(let j = 0 ; j < 2 ; j++ )
                {
                    let articles = resJson.articles[j].source.name.replace(' ', '');
                    listArtistNews += `<strong>${jsonResponse.artists.artist[i].name}</strong><br>
                    <li class=${articles}><a href = "${resJson.articles[j].url}">${resJson.articles[j].url}</a></li>`
                    
                }
                listArtistNews += `<br>`;
                document.getElementById('news').innerHTML = listArtistNews;
            });
        }
        document.getElementById("top-artists").innerHTML = listItems;
        
 /*       lastfmAPI.addArtistTags("Ariana Grande", "rock,shit").then(res => console.log(res)).catch(err => { //de enta zabtha w 7otlha addevent listener de ta2reban hateb2 as3ab 7aga
            console.log(err);
        });*/

    }).catch(err => {
        console.log(err);
    });
}

