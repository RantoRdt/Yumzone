export default content =>{
    const formData = new FormData()
    for (const key in content) if (content[key]){
        const value = content[key]
        if (Array.isArray(value))
            value.forEach(item => {
                if (typeof item === 'object') Object.keys(item).forEach(subKey => formData.append(subKey, item[subKey]))
                else formData.append(key, item)      
            })
        else formData.append(key, value)
    }
    return formData
}