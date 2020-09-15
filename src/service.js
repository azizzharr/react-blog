import Cookies from 'js-cookie'

class BlogService {
    _baseUrl = 'https://nurkadyrnur.pythonanywhere.com'

    request = async (method, url, body) => {
        let auth = {}
        if (Cookies.get('token')) {
            auth = {'Authorization': `Token ${Cookies.get('token')}`}
        }
        const res = await fetch(`${this._baseUrl}${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...auth
            },
            body: JSON.stringify(body)
        })
        return this.getResult(res)
    }

    requestForm = async (method, url, body) => {
        let auth = {}
        if (Cookies.get('token')) {
            auth = {'Authorization': `Token ${Cookies.get('token')}`}
        }
        const form = new FormData();
        for (const item of Object.entries(body)) {
            form.append(...item)
        }
        const res = await fetch(`${this._baseUrl}${url}`, {
            method,
            headers: {
                ...auth
            },
            body: form
        })
        return this.getResult(res)
    }

    getResult = async (res) => {
        if (!res.ok) {
            if (res.status === 401) {
                Cookies.remove('token')
            }
            const err = new Error(res.statusText || res.status)
            err.res = res
            throw err
        }
        const contentType = res.headers.get("content-type");
        if (contentType === 'application/json') {
            return await res.json()
        }
    }

    getResource = (url) => {
        return this.request('GET', url)
    }
    setResource = (url, body) => {
        return this.request('POST', url, body)
    }

    updateResource = (url, body) => {
        return this.request('PUT', url, body)
    }

    deleteResource = (url) => {
        return this.request('DELETE', url)
    }

    getOptions = (url) => {
        return this.request('OPTIONS', url)
    }

    deleteBlog = (id) => {
        if (!id) {
            throw new Error('ID undefined, please give me id number, ')
        }
        return this.deleteResource(`/news/${id}/`)
    }

    getUser = () => {
        return this.getResource('/auth/users/me/')
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

    updateBlog = async (id, data) => {
        return this.requestForm('PUT',`/news/${id}`, data)
    }

    getBlog = async (id) => {
        const json = await this.getResource(`/news/${id}/`)
        return this._transformBlog(json)
    }

    setBlog = (body) => {
        return this.requestForm('POST', '/news/', body)
    }

    _transformBlog = (item) => {
        return {
            id: item.id,
            title: item.title,
            author: item.author,
            shortBody: item.short_body,
            type: item.type,
            imageBlog: item['image_blog'] ? `${this._baseUrl}${item['image_blog']}` : null,
            body: item.body,
            createAt: item['created_at'],
            updateAt: item['updated_at'],
        }
    }
}

export default BlogService;
