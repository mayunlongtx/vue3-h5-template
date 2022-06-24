import AxiosApi from '@/server/index';

export function login(data) {
  return AxiosApi({
    url: 'login',
    method: 'post',
    data,
  });
}

export function currentInfo() {
  return AxiosApi({
    url: `currentUserInfo`,
    method: 'post',
  });
}

export function zlbLogin(data) {
  return AxiosApi({
    url: 'loginByTicket',
    method: 'post',
    data,
  });
}

export function staffDetail(data: any) {
  return AxiosApi({
    url: `serviceServiceStaffStaffDetail`,
    method: 'post',
    data,
  });
}

export function changeCurrentProvider(data) {
  return AxiosApi({
    url: `serviceServiceProviderChangeCurrentProvider`,
    method: 'post',
    data,
  });
}

export function serviceServiceStaffClockInRecord(data) {
  return AxiosApi({
    url: `serviceServiceStaffClockInRecord`,
    method: 'post',
    data,
  });
}

export function serviceServiceStaffClockIn(data) {
  return AxiosApi({
    url: `serviceServiceStaffClockIn`,
    method: 'post',
    data,
  });
}

export function changeUserType(data) {
  return AxiosApi({
    url: `changeUserType`,
    method: 'post',
    data,
  });
}
