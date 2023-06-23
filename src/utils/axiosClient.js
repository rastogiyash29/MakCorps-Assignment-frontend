import axios from 'axios';

// const base_url='https://assignment-server-render.onrender.com';
const base_url='http://localhost:4001';

export const axiosClient=axios.create({
    baseURL: base_url,
    withCredentials:true
});

axiosClient.interceptors.request.use(
    async(request)=>{
        //We can modify our here such as adding headers
        console.log(request);
        return request;
    }
)

axiosClient.interceptors.response.use(
    async (response)=>{
        const data=response.data;
        if(data.statusCode===500){
            window.location.replace('/error','_self');
        }
        return data;
    },
    (e)=>{
        console.log("Inside axiosClient catch-> ",e.message);
        window.location.replace('/error','_self');
    }
)