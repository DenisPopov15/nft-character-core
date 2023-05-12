const fetch = require('node-fetch')

const bodyRequiredMethods = ['POST', 'PATCH', 'PUT']
const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

class ApiService {
  constructor(baseUrl, headers, logger) {
    this._logger = logger
    this.baseUrl = baseUrl
    this.headers = Object.assign(defaultHeaders, headers)
  }

  async execute(url, method, bodyParams) {
    const request = {
      method,
      headers: this.headers,
    }

    if (bodyRequiredMethods.includes(method)) {
      if (!bodyParams) {
        return Error(`bodyParams argument is required for ${method} method.`)
      }

      const body = JSON.stringify(bodyParams, null, 2)

      request.body = body
    }

    const fullUrl = `${this.baseUrl}${url}`
    const response = await fetch(fullUrl, request)
    const jsonResponse = await response.json()

    if (!response.ok) {
      this._logger.error(jsonResponse)
      throw new Error(jsonResponse)
    }

    return jsonResponse
  }
}

module.exports = ApiService