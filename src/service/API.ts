const baseUrl = 'https://jsonplaceholder.typicode.com';

interface APIResponse<T> {
    data: T | null;
    error: string | null;
}

const API = {
    get: async <T>(url: string): Promise<APIResponse<T>> => {
      try {
        const response = await fetch(baseUrl + url);
        const data = await response.json()
        return {data, error: null};
      } 
      catch(error: any){ 
        return{data: null, error: error.message};
      } 
    }
}

export default API;