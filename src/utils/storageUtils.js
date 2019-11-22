import store from 'store'
const USER_KEY = "user_key"

export default{
    //保存user
    setUser(user){
        //localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user)
    },
    //获取user
    getUser(){
        //return JSON.parse(localStorage.getItem(USER_KEY) || "{}")
        return store.get(USER_KEY) || {}
    },
    //删除指定的user
    removeUser(){
        //localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}