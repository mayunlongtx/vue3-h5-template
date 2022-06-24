import ZlbHttpServer from './zlb';
import axiosHttpServer from './axiosServer';
import { isDev } from '@/utils/is';

let exportServer = ZlbHttpServer;
isDev() && (exportServer = axiosHttpServer);
export default exportServer;
