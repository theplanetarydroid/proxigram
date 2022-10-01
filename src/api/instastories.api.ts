import { InstaStoriesResponse } from '../interfaces/ig_response';
import { API } from './index.api';

class InstaStoriesAPI extends API {
  async getProfileContent(username: string): Promise<InstaStoriesResponse> {
    return await this.apiCall(() =>
      this.api.get(`/profile?username=${username.toLowerCase()}`)
    )
  }
}

export default new InstaStoriesAPI();
