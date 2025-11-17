import axios from "axios";
const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.content;

export const register = async (data) => {
    try{
        const res = await axios.post('/register', data);
    return res;
    }catch(err){
        console.error('Something Went Wrong', err);
        throw err;
    }

}

export const Login = async (data) => {
    try {
        const response = await axios.post('/auth/check', {
                _token: csrfToken, // Automatically include the CSRF token
                ...data
        });
        return response; // Directly returning the data
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error for handling in the component
    }
};

export const Category = async () => {
  try{
    const res = await axios.get('/article/category');
    return res
  }catch(err){
    console.error(err);
    throw err;
  }
}

export const categoryAdd = async (data) => {
  try{
    const res = await axios.post('/article/category/add', data)
    return res;
  }catch (err){
    console.error(err);
    throw err;
  }
}

export const categoryUpdate = async (id, data) => {
  try{
    const res = await axios.post(`/article/category/update/${id}`, data);
    return res;
  }catch (err){
    console.error(err);
    throw err;
  }
}

export const categoryRemove = async (id) => {
  try{
    const res = await axios.post(`/article/category/remove/${id}`);
    return res;
  }catch (err){
    console.error(err);
    throw err;
  }
}

export const Article = async () => {
  try{
    const res = axios.get('/article/data');
    return res
  }catch(err){
    console.error(err);
    throw err;
  }
}

export const articleAdd = async (data) => {
  try{
    const res = axios.post('/article/add', data)
    return res;
  }catch (err){
    console.error(err);
    throw err;
  }
}

export const articleRemove = async (data) => {
  try{
    const res = axios.post('/article/remove', data)
    return res;
  }catch (err){
    console.error(err);
    throw err;
  }
}
