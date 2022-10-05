import * as axios from 'axios';
import LoginPage from '../components/Login/Login';
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
        return profileAPI.getUserProfile(profileId);
    }
           
}

export const profileAPI = {
    getUserStatus (userId) {
        return instance.get(`profile/status/${userId}`);
    },

    updateUserStatus (status) {
        return instance.put(`/profile/status`, {status});
    },
    getUserProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    savePhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }, 
    saveProfileData(profileData) {
        return instance.put(`/profile`, profileData)
    }

}

export const authAPI = {
    authMe() {
       return instance.get('auth/me')
 
    },

    login(email, password, rememberMe, captcha ) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
    },

    logout() {
        return instance.delete('auth/login')
    },

    getCaptcha() {
        return instance.get('security/get-captcha-url')
     },

}
