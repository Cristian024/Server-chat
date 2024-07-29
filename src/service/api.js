// DEV
const url = 'http://localhost/uniApi/api/Index.php';

// PRODUCTION
/* const url = '/api' */

const exceptionCode500 = {
    code: 500,
    error: 'Internal server error'
}

export const executeConsult = async (route, id) =>{
    return new Promise(async function (resolve, reject){
        var data;
        var consultUrl = url;

        if (id !== null) consultUrl += `/${id}`

        consultUrl += `?route=${route}`;

        try {
            const response = await fetch(consultUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'access-token': 'Fq0830jA9h5pEeAvdTW5wDglb9JFqBju5RDtls5xKGVVXJAPOwto3bB5ivvVU14E'
                }
            })

            const data_response = await response.text().then(res => {
                return JSON.parse(res);
            })

            if(data_response.code >= 400 && data_response.code <= 501){
                reject(data_response)
            }

            resolve(data_response);
        } catch (error) {
            reject(exceptionCode500)
        }
    })
}

export const executeInsert = async (route, data) =>{
    return new Promise(async function(resolve, reject){
        const insertUrl = url + `?route=${route}`;
        try {
            const response = await fetch(insertUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'access-token': 'Fq0830jA9h5pEeAvdTW5wDglb9JFqBju5RDtls5xKGVVXJAPOwto3bB5ivvVU14E'
                },
                body: JSON.stringify(data)
            })

            const data_response = await response.text().then(res => {
                return JSON.parse(res);
            })

            if(data_response.code >= 400 && data_response.code <= 501){
                reject(data_response)
            }

            resolve(data_response)
        } catch (error) {
            reject(exceptionCode500)
        }
    })
}

export const executeUpdate = async (route, data, id) =>{
    return new Promise(async function(resolve, reject){
        const updateUrl = url + `/${id}?route=${route}`;
        try {
            const response = await fetch(updateUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'access-token': 'Fq0830jA9h5pEeAvdTW5wDglb9JFqBju5RDtls5xKGVVXJAPOwto3bB5ivvVU14E'
                },
                body: JSON.stringify(data)
            })

            const data_response = await response.text().then(res => {
                return JSON.parse(res);
            })

            if(data_response.code >= 400 && data_response.code <= 501){
                reject(data_response)
            }

            resolve(data_response)
        } catch (error) {
            reject(exceptionCode500)
        }
    })
}