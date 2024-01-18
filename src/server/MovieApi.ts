import axios from "axios";
import { API_KEY } from "../constants";

const baseUrl = `http://www.omdbapi.com/?apikey=${API_KEY}&`
const homeUrl = `${baseUrl}s=cyber&type=movie`
const searchUrl = (query: string) => `${baseUrl}s=${query}&type=movie`
const detailsUrl = (title: string) => `${baseUrl}t=${title}`

const apiRequest = async (url: string, params: any | undefined) => {
	const config = {
		method: "get",
		url: url,
		params: params ? params : {},
	}

	try {
		const response = await axios.get(url, config)
		return response.data
	} catch (error) {
		console.error(error)
		return {}
	}
}

export const fetchHomeMovies = (params?: any) => {
  return apiRequest(homeUrl, params)
}

export const fetchSearchQuery = (query: string, params?: any) => {
  return apiRequest(searchUrl(query), params)
}

export const fetchMovieDetails = (title: string, params?: any) => {
	return apiRequest(detailsUrl(title), params)
}