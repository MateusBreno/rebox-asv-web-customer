// ./src/services/apis/apiGoogleMaps.ts
import axios from 'axios';

import { ConfigBase } from '@config/index';

const apiGoogleMaps = axios.create({
  baseURL: ConfigBase.google.baseUrls.maps,
});

export default apiGoogleMaps;
