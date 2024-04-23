import axios, { AxiosRequestConfig } from 'axios'

/**
 * 
 * @param config 
 * @returns 
 */
export function request(config: AxiosRequestConfig){
    return axios.request(config)
}