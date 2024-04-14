import { apiRequests, authorizedRequests } from "../httpRequest";

const loginHttpRequest = {
    getLatestCollectioData: () => apiRequests.get('api/home/GetLatestCollectionData'),
    getBestCollectionData: () => apiRequests.get('api/home/GetBestCollectionData'),
    getRecentArticleData: () => apiRequests.get('api/home/GetRecentArticlesData'),
    getSpotlightData: () => apiRequests.get('api/home/GetIntheSpotlightData'),
    getBannerCategory: () => apiRequests.get('api/home/GetBannerCatagoryData'),
    getSaleBannerData: () => apiRequests.get('api/home/GetSaleBannerData'),
    getTestimonialData: () => apiRequests.get('api/home/GetTestimonialData'),
    getBannerImages: () => apiRequests.get('api/home/GetBannerImages'),
    postLoginEvent: (name: string, pwd: string) => apiRequests.post(`api/user/Login?username=${name}&password=${pwd}`, {}),
    postRegistationDetail: (requestParam: any) => apiRequests.post('api/user/Register', requestParam)
}

export default loginHttpRequest;