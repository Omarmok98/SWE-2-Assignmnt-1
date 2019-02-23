class GiphyAPI
{
    constructor(apiKey)
    {
        this.apiKey = apiKey;
        this.baseURL = "http://api.giphy.com/v1/gifs/search";
    }
    getArtistGIF(artistName)
    {
        let url = `${this.baseURL}?q=${artistName}&apiKey=${this.apiKey}`;

        return fetch(url);
    }
}