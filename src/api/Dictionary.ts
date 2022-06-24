import AxiosApi from '@/server/index';

// 查询字典项
export function dictionaryPage(data) {
  return AxiosApi({
    url: 'authorityDictionaryPage',
    method: 'post',
    data,
  });
}
