import axios from 'axios';


export const signup = async (data) => {
    const config = {
        headers: {
            'content-type': 'application/json' //telling we are sending json data
        }
    }

    const response = await axios.post('/api/auth/signup',data, config);     //end pt of post request to receive users data
    return response;
};

export const signin = async (data) => {
    const config = {
        headers: {
            'content-type': 'application/json' //telling we are sending json data
        }
    }

    const response = await axios.post('/api/auth/signin',data, config);     //end pt of post request to receive users data
    return response;
};