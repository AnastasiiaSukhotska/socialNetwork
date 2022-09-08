import * as axios from 'axios';
const instance = axios.create({
     withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "730c097e-1e08-4e82-a1cc-213046eea73e"
    }
});

export const userAPI = {
    getUsers(pageSize = 10, currentPage = 1) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(res =>{
            return res.data
        })
        
    },

    followUser(userId) {
        return instance.post(`follow/${userId}`)
    },

    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`)
    },

    getUserProfile(profileId) {
        return instance.get(`profile/${profileId}`)
    }
           
}

export const authAPI = {
    authMe() {
       return instance.get('auth/me')
 
    }
}
