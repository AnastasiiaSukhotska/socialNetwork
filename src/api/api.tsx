import axios from 'axios';
import { ProfileType } from '../redux/reducers/profilePageReducer';
import { PhotosType, UserType } from '../redux/reducers/usersPageReducer';
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "730c097e-1e08-4e82-a1cc-213046eea73e"
    }
});

export type APIResponeType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodesWithCaptchaEnum {
    captchaNeeded = 10
}

type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

type StatusType = {
    status: string
}

export const userAPI = {
    getUsers(pageSize = 10, currentPage = 1, term = '', friend: null|boolean = null) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`+(friend === null ? '' : `&friend=${friend}` ))
            .then(res => {
                return res.data
            })

    },

    followUser(userId: number) {
        return instance.post<APIResponeType>(`follow/${userId}`)
            .then(res => {
                return res.data
            })

    },

    unfollowUser(userId: number) {
        return instance.delete<APIResponeType>(`follow/${userId}`)
            .then(res => {
                return res.data
            })

    },

    getUserProfile(profileId: number) {
        return profileAPI.getUserProfile(profileId);
    }

}


type PhotoDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data);
    },

    updateUserStatus(status: string) {
        return instance.put<APIResponeType>(`/profile/status`, { status }).then(res => res.data);
    },
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },
    savePhoto(photo: File) {
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put<APIResponeType<PhotoDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfileData(profileData: ProfileType) {
        return instance.put<APIResponeType<ProfileType>>(`/profile`, profileData).then(res => res.data)
    }

}

type AuthMeResponseType = {
    id: number
    email: string
    login: string
}

type LoginResponseType = {
    userId: number
}

type CaptchaType = {
    url: string
}

export const authAPI = {
    authMe() {
        return instance.get<APIResponeType<AuthMeResponseType>>('auth/me').then(res => res.data)

    },

    login(email: string, password: string, rememberMe: boolean, captcha: null | string = null) {
        return instance.post<APIResponeType<LoginResponseType, ResultCodesEnum | ResultCodesWithCaptchaEnum>>('auth/login', { email, password, rememberMe, captcha }).then(res => res.data)
    },

    logout() {
        return instance.delete('auth/login')
    },

    getCaptcha() {
        return instance.get<CaptchaType>('security/get-captcha-url').then(res => res.data)
    },

}
