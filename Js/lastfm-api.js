class LastfmAPI
{
    constructor(apiKey)
    {
        this.apiKey = apiKey;
        this.baseUrl = "http://ws.audioscrobbler.com";
        
        this.loginLink = `http://www.last.fm/api/auth/?api_key=${this.apiKey}&cb=http://localhost:5500/lastfm.html`
    }

    getTopArtists()
    {
        let s = "";
        let url = `${this.baseUrl}/2.0/?method=chart.gettopartists&api_key=${this.apiKey}&format=json`;
        return fetch(url);
    }

    getTopAlbums()
    {

    }

    saveToken(token)
    {
        window.sessionStorage.setItem("lastfm_token", token);
    }

    getToken()
    {
        return window.sessionStorage.getItem("lastfm_token");
    }

    getArtistTags(artistName)
    {
        let artist = encodeURI(artistName);
        let url = this.baseUrl + `/2.0/?method=artist.getTags&artist=${artist}&user=omarmok&api_key=${this.apiKey}&format=json`
        return fetch(url);
    }

    addArtistTags(artistName, tags)
    {
        let artist = encodeURI(artistName);
        let obj = {
            api_key: this.apiKey,
            artist: artistName,

            method: "artist.addTags",
            sk: this.getSessionKey(),
            tags: tags,
            token: this.getToken()
            
        }

        let body = {
            artist: artist,
            tags: tags,
            api_key: this.apiKey,
            api_sig: this.signCall(obj),
            sk: this.getSessionKey(),
            method: "artist.addTags",
            format: "json",
            token: this.getToken()
        }

        return fetch("http://ws.audioscrobbler.com/2.0/", {method: "POST", body: this.genPostBodyString(body),  mode: "no-cors",  headers: {
            //"Content-Type": "application/json",
             "Content-Type": "application/x-www-form-urlencoded",
        }});
    }

    saveSessionKey(key)
    {
        window.sessionStorage.setItem("session_key", key);
    }

    getSessionKey()
    {
        return window.sessionStorage.getItem("session_key");
    }

    signCall(obj)
    {
        var string = "";
        for(let i = 0; i < Object.keys(obj).length; i++)
        {
            string += Object.keys(obj)[i] + obj[Object.keys(obj)[i]]
        }
        string += "f4455cd43a01eb531c9bfa03595ad5b3";
        console.log(string);
        string = MD5(unescape(encodeURIComponent(string)))
        console.log(string);
        return string;
    }

    genPostBodyString(obj)
    {
        let string = "";
        for(let i = 0; i < Object.keys(obj).length; i++)
        {
            if(i == Object.keys(obj).length - 1)
            {
                string += Object.keys(obj)[i] + "=" + obj[Object.keys(obj)[i]];
            }
            else
            {
                string += Object.keys(obj)[i] + "=" + obj[Object.keys(obj)[i]] + "&";
            }
            
        }
        console.log(string)
        return string;
    }

    createSessionKey()
    {
        let obj={
            api_key: this.apiKey,
            method: "auth.getSession",
            token: this.getToken()
        }
        return fetch(this.baseUrl + `/2.0/?method=auth.getSession&api_key=${this.apiKey}&api_sig=${this.signCall(obj)}&token=${this.getToken()}&format=json`)

    }



}