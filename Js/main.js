
const lastfmAPI = new LastfmAPI("c76192f9bfbb17ecd6ec7ded484997ab");
const news = new NewsAPI("743874e824444e1c9cd34e35356c3ae7");
const gif = new GiphyAPI("AjfPT3WW8uBZ78rYt18I4ECrM9c6aP5w");
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
        var listArtistGIF = "";
        var listTopAlbums = "";
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
                <br>
                <br>
            </li>`;

            lastfmAPI.addArtistTags(artistWithoutSpaces,"test")//.then(res => console.log(res))
            .catch(err => {       
                console.log(err);
            });
            lastfmAPI.getTopAlbums(jsonResponse.artists.artist[i].name).then(res => res.json()).then(resJson =>
            {
                for(let x = 0 ; x < 2 ; x++ )
                {
                    listTopAlbums += `<strong>${jsonResponse.artists.artist[i].name}</strong><br>
                    <li>${resJson.topalbums.album[x].name}</li>`
                    
                }
                listTopAlbums += `<br>`;
                document.getElementById('top-albums').innerHTML = listTopAlbums;
                
            });
            news.getArtistNews(jsonResponse.artists.artist[i].name).then(res => res.json()).then(resJson =>
            {   
                for(let j = 0 ; j < 2 ; j++ )
                {
                    let articles = resJson.articles[j].source.name.replace(' ', '');
                    listArtistNews += `<strong>${jsonResponse.artists.artist[i].name}</strong><br>
                    <li class=${articles}><a href = "${resJson.articles[j].url}">${resJson.articles[j].url}</a></li>`
                    
                }
                listArtistNews += `<br>`;
                document.getElementById('news').innerHTML = listArtistNews;
            });

            gif.getArtistGIF(jsonResponse.artists.artist[i].name).then(res => res.json()).then(resJson =>
            {
                listArtistGIF += `<strong>${jsonResponse.artists.artist[i].name}</strong><br>
                <img class="GIF" src="${resJson.data[0].images.fixed_width.url}"`
                listArtistGIF += `<br>`;
                document.getElementById('gif').innerHTML = listArtistGIF; 
                
            });
            /*document.getElementById("top-artists").onload = function()
            {
                console.log("load");
                alert("LOADED");
                var addTagBtn = document.getElementById(`${artistWithoutSpaces}-btn`);
                addTagBtn.addEventListener("click",function()
                {   
                    alert("clicked"); 
                    var tagArea = document.getElementById(`${artistWithoutSpaces}-text`).value;
                    console.log(tagArea);
                    
                });
            };*/
        };
        document.getElementById("top-artists").innerHTML = listItems;
        


    }).catch(err => {
        console.log(err);
    });
}


