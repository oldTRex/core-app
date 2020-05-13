export const changeJsonToFormData = (data) =>{
    const formData = new FormData();
    Object.entries(data).map(([key, value]) => formData.append(key, value))
    
    return formData;
}