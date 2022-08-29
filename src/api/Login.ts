import { ServicePrefixEnum } from '@/enums/commonEnum';
import AxiosApi from '@/server/index';

export function login(data) {
  return AxiosApi({
    url: `${ServicePrefixEnum.OAUTH}/noToken/login`,
    method: 'post',
    data,
  });
}
