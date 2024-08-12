
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/banner';

export const getBannerData = () => axios.get(API_URL);

export const updateBannerData = (data) => axios.post(API_URL, data);
