import axios from "axios";

const baseUrl = '/api/login'

/**
 * It sends a POST request to the backend with the given credentials, and returns the response data
 * The response.data is being returned.
 */
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}


export default login