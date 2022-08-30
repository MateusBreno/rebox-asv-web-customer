// ./src/services/apis/apiViaCep.ts
import axios from 'axios';

import { ConfigBase } from '@config/index';

const apiViaCep = axios.create({
  baseURL: ConfigBase.ibge.baseUrls.serviceData,
});

export default apiViaCep;
