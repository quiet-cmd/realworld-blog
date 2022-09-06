export default class blogServices {
  _baseUrl = 'https://blog.kata.academy/api/';

  async getResourse(url, method = 'GET', data = {}) {
    const token = localStorage.getItem('token') === null ? '' : localStorage.getItem('token');
    const body = Object.keys(data).length ? { body: JSON.stringify(data) } : {};
    const auth = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      const res = await fetch(`${this._baseUrl}${url}`, {
        method: method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...auth,
        },
        ...body,
      });
      if (!res.ok) throw new Error(res.status);
      return await res.json();
    } catch (e) {
      return e.message;
    }
  }

  async getArticles(offset) {
    const url = `articles?offset=${offset}`;
    const result = await this.getResourse(url);
    return result;
  }

  async getPageArticles(slug) {
    const result = await this.getResourse(`articles/${slug}`);
    return result;
  }

  async registerUser(data) {
    const { username, email, password } = data;
    const user = {
      user: {
        username: username,
        email: email,
        password: password,
      },
    };
    const res = await this.getResourse('users', 'POST', user);
    return res;
  }

  async loginUser(data) {
    const user = {
      user: {
        ...data,
      },
    };
    const res = await this.getResourse('users/login', 'POST', user);
    return res;
  }

  async updateUser(data) {
    const user = {
      user: {
        ...data,
      },
    };
    const res = await this.getResourse('user', 'PUT', user);
    return res;
  }

  async getUser() {
    const res = await this.getResourse('user');
    return res;
  }

  async createArticle(data) {
    const article = {
      article: {
        ...data,
      },
    };
    const res = await this.getResourse('/articles', 'POST', article);
    return res;
  }

  async editArticle(data, slug) {
    const article = {
      article: {
        ...data,
      },
    };
    const res = await this.getResourse(`/articles/${slug}`, 'PUT', article);
    return res;
  }

  async deleteArticle(slug) {
    const res = await this.getResourse(`/articles/${slug}`, 'DELETE');
    return res;
  }

  async addFavofite(slug) {
    const res = await this.getResourse(`/articles/${slug}/favorite`, 'POST');
    return res;
  }

  async deleteFavofite(slug) {
    const res = await this.getResourse(`/articles/${slug}/favorite`, 'DELETE');
    return res;
  }
}
