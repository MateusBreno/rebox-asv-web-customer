// ./src/services/apis/apiViaCep.ts
import axios from 'axios';

import { ConfigBase } from '@config/index';

const apiViaCep = axios.create({
  baseURL: ConfigBase.viaCep.baseUrls.address,
});

export default apiViaCep;
