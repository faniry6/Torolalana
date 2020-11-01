import {BaseService} from './BaseService';
import FianarakoService from './FianarakoService';

export const services: BaseService[] = [new FianarakoService()];
export const getService = (serviceName: string) => {
  return services.find(s => s.name == serviceName);
};
