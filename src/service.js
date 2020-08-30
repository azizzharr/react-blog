class BlogService {
    _baseUrl = 'http://localhost:8000'
    getResource = async (url) => {
        const res = await fetch(`${this._baseUrl}${url}`)
        if (!res.ok) {
            throw new Error('Error ' + res.status)
        }
        return await res.json()
    }

    getBlogs = async () => {
        return await this.getResource('/news')
    }
}

export default BlogService;
