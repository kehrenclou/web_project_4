const baseUrl = "https://around.nomoreparties.co/v1/group-12";
const token = "72dee144-4e03-4ccf-86c7-08640cb55eca";

/* ---------------------------------- class --------------------------------- */
class Api {
  constructor({ baseUrl, headers }) {
    //constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  _handleErrorResponse(err) {
    console.log("Err status code", err.status);
  }

  getInfo() {
   //get user info from server
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "GET",
    })
      .then(this._handleResponse)
      .catch(this._handleErrorResponse);
  }

  getInitialCards() {
    //get cards ? from server
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "GET",
    })
      .then(this._handleResponse)
      .catch(this._handleErrorResponse);
  }

  getAppInfo() {
    return Promise.all([this.getInfo(), this.getInitialCards()]);
  }

  //other methods
}

//where does new api get called in index.js or in Api

// const api = new Api({
//   baseUrl: baseUrl,
//   headers: { authorization: token, "Content-Type": "application/json" },
// });

// api.getInitialCards();

/* --------------------------------- export --------------------------------- */
export { Api, baseUrl, token };
