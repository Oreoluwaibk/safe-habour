export const createErrorMessage = (data: any) => {
    console.log("data", data);
    
    if(data){
        return data.error || data.message || data.detail
    }
    let str = '';

    if (Array.isArray(data)) {
        return data.toString()
    } else if (typeof data === 'object' && data !== null) {
        // Check if the key exists in the object
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                str += `${key}: ${data[key]},`;
            }
        }
        return str.slice(0, -2); 
    } else {
        console.log('Invalid data type. Must be an array or an object.');
        return "Unable to complete request, something went wrong";
    }
}

