
/*
Interacts with Aurora API to retrieve and send data
Importing file: 
  const { Aurora } = require('./aurora.js')
  
All functions return Promises. 
To recieve response use .then()
​
Example Call: 
  Aurora.getTenant().then(response => {
    console.log(response)
  })
*/
class AuroraAPI {
    #crypto = require('crypto')
    #axios = require('axios')
  ​
    #tenantID = "14d3f803-31ac-4ff9-a1e1-7853fec5ff6d"
    #apiKey = "e0cbdf66-764e-4a64-9db7-331478245717"
    #apiSecret = "78e5d1b3-fa8c-48cc-8a95-412b8ef75b28"
  ​
    //Create the url that will be used to call the Aurora API
    #createRequest = (requestType, endpoint, perams = "", post = false) => {
      const timestamp = this.#generateUTCTimestamp()
      const signArr = [requestType, endpoint, `AuroraKey=${this.#apiKey}`, `Timestamp=${timestamp}`]
      let strToSign = signArr.join('\n') + "\n"
      if (perams !== "")
        strToSign += `${perams}\n`
  ​
      const signature = this.#crypto.createHmac('sha256', this.#apiSecret).update(strToSign).digest("base64")
      let url = `https://api.aurorasolar.com${endpoint}?AuroraKey=${this.#apiKey}&Timestamp=${timestamp}&Signature=${signature}`
      if (perams !== "" && post === false)
        url += `&${perams}`
      return url
    }
  ​
    //Generates UTC timestamp in format Year-Month-Day Hour:Minute:Second UTC with leading 0 if required
    #generateUTCTimestamp = () => {
      const now = new Date()
      const utc_timestamp = `${now.getUTCFullYear()}-${this.#formatTimeSegment(now.getUTCMonth() + 1)}-${this.#formatTimeSegment(now.getUTCDate())} ${this.#formatTimeSegment(now.getUTCHours())}:${this.#formatTimeSegment(now.getUTCMinutes())}:${this.#formatTimeSegment(now.getUTCSeconds())} UTC`
      return encodeURI(utc_timestamp)
    }
  ​
    //Adds leading zero if necessary for selected time segment
    #formatTimeSegment = (segment) => {
      segment = segment.toString()
      if (segment.length < 2) {
        return '0' + segment
      }
      return segment
    }
  ​
    //Formats an object of perameters into query string sorted by byte order
    #formatPerameters = (perams) => {
      if (typeof perams !== "object")
        return ""
      const peramKeys = Object.keys(perams)
      peramKeys.sort()
  ​
      let peramStr = []
      peramKeys.forEach(key => {
        peramStr.push(`${key}=${perams[key]}`)
      })
  ​
      return peramStr.join('&')
    }
  ​
    //Formats and flattens an object of fields into query string sorted by byte order
    #formatPostFields = (wrapper, fields) => {
      if (!fields[wrapper] || typeof fields !== "object")
        return ""
      fields = fields[wrapper]
      const fieldKeys = Object.keys(fields)
      fieldKeys.sort()
      let postStr = []
      fieldKeys.forEach(key => {
        postStr.push(`${wrapper}.${key}=${fields[key]}`)
      })
  ​
      return encodeURI(postStr.join('&'))
    }
  ​
    //Makes request to url and return a Promise of the response
    #processRequest = async (url, method = 'GET', fields = "") => {
      return this.#axios({
        method: method,
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: JSON.stringify(fields)
      })
        .then(res => res.data)
        .catch(err => `${err.response.status}\n${err.response.statusText}`)
    }
  ​
  ​
    //Get Aurora information about Solar Company account
    getTenant = () => {
      const url = this.#createRequest('GET', `/v2/tenants/${this.#tenantID}`)
      return this.#processRequest(url)
    }
  ​
    //Get Aurora User details
    getUser = (userID) => {
      const url = this.#createRequest('GET', `/v2/tenants/${this.#tenantID}/users/${userID}`)
      return this.#processRequest(url)
    }
  ​
    //Get Aurora project details
    getProject = (projectID) => {
      const url = this.#createRequest('GET', `/v2/tenants/${this.#tenantID}/projects/${projectID}`)
      return this.#processRequest(url)
    }
  ​
    //Get project consumption profile
    getConsumptionProfile = (projectID) => {
      const url = this.#createRequest('GET', `/v2/tenants/${this.#tenantID}/projects/${projectID}/consumption_profile`)
      return this.#processRequest(url)
    }
  ​
    //Get Aurora Design system information and production information
    getDesignSummary = (designID) => {
      const url = this.#createRequest('GET', `/v2/tenants/${this.#tenantID}/designs/${designID}/summary`)
      return this.#processRequest(url)
    }
  ​
    //List all users for company
    listUsers = () => {
      const url = this.#createRequest('GET', `/v2/tenants/${this.#tenantID}/users`)
      return this.#processRequest(url)
    }
  ​
    //List all projects (paginated)
    listProjects = (page = 1, perPage = 100) => {
      const perams = { page: page, per_page: perPage }
      const url = this.#createRequest('GET', `/v2/tenants/tenant_id/projects`, this.#formatPerameters(perams))
      return this.#processRequest(url)
    }
  ​
    //List all designs for a project
    listDesigns = (projectID) => {
      const url = this.#createRequest('GET', `/v2/tenants/${this.#tenantID}/projects/${projectID}/designs`)
      return this.#processRequest(url)
    }
  ​
    //List all assets for a design
    listAssets = (designID) => {
      const url = this.#createRequest('GET', `/v2/tenants/${this.#tenantID}/designs/${designID}/assets`)
      return this.#processRequest(url)
    }
  ​
    //Update project information
    updateProject = (projectID, fields) => {
      if (!fields.project)
        return Promise.resolve(new Error(`Fields must be wrapped in 'project' object\nValue Received: ${JSON.stringify(fields)}`));
      const url = this.#createRequest('PUT', `/v2/tenants/${this.#tenantID}/projects/${projectID}`, this.#formatPostFields('project', fields), true)
      return this.#processRequest(url, 'PUT', fields)
    }
  ​
    //Create new Aurora Project
    createProject = (fields = "") => {
      if (!fields.project)
        return Promise.resolve(new Error(`Fields must be wrapped in 'project' object\nValue Received: ${JSON.stringify(fields)}`));
      const url = this.#createRequest('POST', `/v2/tenants/${this.#tenantID}/projects`, this.#formatPostFields('project', fields), true)
      return this.#processRequest(url, 'POST', fields)
    }
  ​
    //Create new Aurora Design for project
    createDesign = (fields = "") => {
      if (!fields.design)
        return Promise.resolve(new Error(`Fields must be wrapped in 'design' object\nValue Received: ${JSON.stringify(fields)}`));
      const url = this.#createRequest('POST', `/v2/tenants/${this.#tenantID}/designs`, this.#formatPostFields('design', fields), true)
      return this.#processRequest(url, 'POST', fields)
    }
  ​
    //Create new User without invite email
    createUser = (fields = "") => {
      if (!fields.user)
        return Promise.resolve(new Error(`Fields must be wrapped in 'user' object\nValue Received: ${JSON.stringify(fields)}`));
      const url = this.#createRequest('POST', `/v2/tenants/${this.#tenantID}/users`, this.#formatPostFields('user', fields), true)
      return this.#processRequest(url, 'POST', fields)
    }
  ​
  ​
    //Create new User with invite email
    inviteUser = (fields = "") => {
      if (!fields.user)
        return Promise.resolve(new Error(`Fields must be wrapped in 'user' object\nValue Received: ${JSON.stringify(fields)}`));
      const url = this.#createRequest('POST', `/v2/tenants/${this.#tenantID}/users`, this.#formatPostFields('user', fields), true)
      return this.#processRequest(url, 'POST', fields)
    }
  }
  ​
  //Creates new Aurora Object on file import
  const Aurora = new AuroraAPI()
  ​
  //Exports Aurora Object
  module.exports = { Aurora }