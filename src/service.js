import Cookies from 'js-cookie'

class BlogService {
    _baseUrl = 'https://nurkadyrnur.pythonanywhere.com'
    getResource = async (url) => {
        const res = await fetch(`${this._baseUrl}${url}`)
        if (!res.ok) {
            if (res.status === 401) {
                Cookies.remove('token')
            }
            throw new Error('Error ' + res.status)
        }
        return await res.json()
    }

    setResource = async (url, body) => {
        let auth = {}
        if (Cookies.get('token')) {
            auth = {'Authorization': `Token ${Cookies.get('token')}`}
        }
        const res = await fetch(`${this._baseUrl}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...auth
            },
            body: JSON.stringify(body)
        })
        if (!res.ok) {
            if (res.status === 401) {
                Cookies.remove('token')
            }
            const err = new Error(res.statusText || res.status)
            err.res = res
            throw err
        }
        return await res.json()
    }

    login = (body) => {
        return this.setResource('/auth/token/login/', body)
    }
    register = (body) => {
        return this.setResource('/auth/users/', body)
    }

    getBlogs = async (page) => {
        const json = await this.getResource(`/news/?page=${page}`)
        return {...json, results: json.results.map(this._transformBlog)}
    }

    setBlog = (body) => {
        return this.setResource('/news/', body)
    }

    _transformBlog = (item) => {
        return {
            id: item.id,
            title: item.title,
            author: item.author,
            imageBlog: `${this._baseUrl}${item['image_blog']}`,
            body: item.body,
            createAt: item['created_at'],
            updateAt: item['updated_at'],
        }
    }
}

export default BlogService;
