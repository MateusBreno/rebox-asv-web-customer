// ./src/services/apis/apiRebox.ts
import axios from 'axios';

import { ConfigBase, ConfigAuth } from '@config/index';

const apiRebox = axios.create({
  baseURL: ConfigBase.rebox.baseUrls.carAssistance,
  headers: {
    Authorization: `Bearer ${ConfigAuth.rebox.api.authentication.token.bearer}`,
  },
});

export default apiRebox;
