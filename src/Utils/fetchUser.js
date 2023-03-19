export const fetchUser=()=>{
    const uerInfo=localStorage.getItem('user')
    !=="undefined"?JSON.parse(localStorage.getItem('user')):localStorage.clear()
    return uerInfo;
}