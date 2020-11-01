import axios from 'axios';
import {BaseService, FiliereDoc} from './BaseService';

export default class FianarakoService extends BaseService {
  constructor() {
    super();
    this.name = 'Fianarako';
    this.baseUrl =
      'https://by4tg2z1s4.execute-api.eu-central-1.amazonaws.com/dev';
  }

  async getAll(): Promise<FiliereDoc[]> {
    const result = await axios.get(this.baseUrl + '/api/v1/filiere/');
    return result.data;
  }
}
