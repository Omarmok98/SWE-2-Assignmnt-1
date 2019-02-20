
const lastfmAPI = new LastfmAPI("c76192f9bfbb17ecd6ec7ded484997ab");
//const news = new NewsAPI("743874e824444e1c9cd34e35356c3ae7");
var lastfmLoginLink = document.getElementById('lastfm-login-link');
//var newsAPILink = document.getElementById('news-API');
console.log(lastfmAPI.loginLink);
lastfmLoginLink.href = lastfmAPI.loginLink;
//var artistNews = [];
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
            //listItems += `<li id=${artistWithoutSpaces}>${jsonResponse.artists.artist[i].name}</li>`
            //var art = document.createElement("p");
            listItems += 
            `<li id=${artistWithoutSpaces}>
                <b>${jsonResponse.artists.artist[i].name}</b>   
                <button id="${artistWithoutSpaces}-btn" style="margin-left: 250px" style="margin-right: 5px">add tag</button>
                <input class="form-control" placeholder = "tag name" type = "text" id = "${artistWithoutSpaces}-text" readonly></input>
                <br>
                <br>
            </li>`
            //var artInput = document.createElement("input");
            //artInput.setAttribute("type", "text");
            //artInput.setAttribute("id", "in");
            
            //var node = document.createTextNode(artists[i]);
            //document.body.appendChild(artInput);
            //art.appendChild(node);
            //document.body.appendChild(art);
            console.log("asdasd");
        }
        document.getElementById("top-artists").innerHTML = listItems;

        for(let i = 0; i < 5; i++)
        {
            var tags = "<br>";
            lastfmAPI.getArtistTags(artists[i]).then(res => res.json()).then(resJson => {
                console.log(artists[i], resJson);
            }).catch(err => {
                console.log(err);
            })
        }

        
        lastfmAPI.addArtistTags("Ariana Grande", "rock,shit").then(res => console.log(res)).catch(err => {
            console.log(err);
        });

    }).catch(err => {
        console.log(err);
    });
}
//console.log(artists);
/*news.getArtistNews("Drake").then(res => res.json()).then(resJson =>
{
    console.log("RUNNING");
    var listItems = "";
    for(let i = 0 ; i < 2 ; i++ )
    {
        let artistWithoutSpaces = resJson.articles[i].source.name.replace(' ', '');
        artistNews.push(resJson.articles[i].url);
        listItems += `<li class=${artistWithoutSpaces}><a href = "${resJson.articles[i].url}">${resJson.articles[i].url}</a></li>`
    }
    console.log(artistNews);
    document.getElementById('news-API').innerHTML = listItems;
});*/

