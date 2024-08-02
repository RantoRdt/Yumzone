export const subdomainsList = {
    home: '',
    admin: 'admin',
}
export const isAdminSubdomain = () =>{
    const hostname = window.location.hostname
    return hostname.split('.')[0] == subdomainsList.admin
}