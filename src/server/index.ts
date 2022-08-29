import axiosHttpServer from './axiosServer';
import { isDev } from '@/utils/is';

let exportServer =axiosHttpServer;
isDev() && (exportServer = axiosHttpServer);
export default exportServer;
