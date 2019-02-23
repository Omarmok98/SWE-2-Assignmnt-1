class NewsAPI
{
    constructor(apiKey)
    {
        this.apiKey = apiKey;
        this.baseURL = "https://newsapi.org/v2/everything";
    }
    getArtistNews(artistName)
    {
        let url = `${this.baseURL}?q=${artistName}&apiKey=${this.apiKey}&limit=1`;

        return fetch(url);
    }
}
