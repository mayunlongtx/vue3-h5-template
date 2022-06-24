import { ref } from 'vue';
import { MAP_CENTER_LON_LAT } from '@/helpers';
import MarkerImg from '@/assets/map/marker.png';
export function useMap({ centerPoint = MAP_CENTER_LON_LAT, markerFn }) {
  let map = ref<any>(null);
  function initMap() {
    map.value = new BMapGL.Map('map'); // 创建Map实例
    // map.setMapStyleV2({ styleJson: CUSTOM_MAP_CONFIG });
    const point = conversion(centerPoint[0], centerPoint[1]);
    map.value?.centerAndZoom(point, 12); // 初始化地图,设置中心点坐标和地图级别
    map.value.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    addMarker(point);
    // let geolocation = new BMapGL.Geolocation();
    // 开启SDK辅助定位
    // geolocation.enableSDKLocation();
    // geolocation.getCurrentPosition(function (r: any) {
    //   if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //     var mk = new BMapGL.Marker(r.point);
    //     map.addOverlay(mk);
    //     map.panTo(r.point);
    //     // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
    //   } else {
    //     Dialog({
    //       message: '定位失败',
    //       title: '温馨提示',
    //       theme: 'round-button',
    //       confirmButtonColor: '#FF9542',
    //     });
    //   }
    //   console.log(r, 'e');
    // });
  }

  function conversion(lng: number | string, lat: number | string) {
    return new BMapGL.Point(lng, lat);
  }
  function addMarker(point: any, data?) {
    // 创建图标
    var myIcon = new BMapGL.Icon(MarkerImg, new BMapGL.Size(26, 26));
    // console.log(myIcon);
    let mk = new BMapGL.Marker(point, {
      icon: myIcon,
    });
    if (data) {
      mk.info = data;
    }
    if (markerFn) {
      mk.addEventListener('click', markerFn);
    }
    mk.myType = 'marker';
    map.value.addOverlay(mk);
    panTo(point);
  }
  function removeMarker(id?: string) {
    const overlays = map.value.getOverlays();
    const markers = overlays.filter((item) => item.myType == 'marker');
    for (let i = 0; i < markers.length; i++) {
      const mk = markers[i];
      map.value.removeOverlay(mk);
    }
  }

  function panTo(point: any) {
    map.value.panTo(point);
  }

  return {
    initMap,
    conversion,
    addMarker,
    panTo,
    removeMarker,
  };
}

export function useConvertor() {
  /**
   * 坐标常量说明：
   * COORDINATES_WGS84 = 1, WGS84坐标
   * COORDINATES_WGS84_MC = 2, WGS84的平面墨卡托坐标
   * COORDINATES_GCJ02 = 3，GCJ02坐标
   * COORDINATES_GCJ02_MC = 4, GCJ02的平面墨卡托坐标
   * COORDINATES_BD09 = 5, 百度bd09经纬度坐标
   * COORDINATES_BD09_MC = 6，百度bd09墨卡托坐标
   * COORDINATES_MAPBAR = 7，mapbar地图坐标
   * COORDINATES_51 = 8，51地图坐标
   */
  enum Type {
    WGS = COORDINATES_WGS84,
    WGSMC = COORDINATES_WGS84_MC,
    GCJ = COORDINATES_GCJ02,
    GCJMC = COORDINATES_GCJ02_MC,
    BD09 = COORDINATES_BD09,
    BD09MC = COORDINATES_BD09_MC,
    MAPBAR = COORDINATES_MAPBAR,
    MAPBAR51 = COORDINATES_51,
  }
  function convertor(lon, lat, from, to, translateCallback) {
    var convertor = new BMapGL.Convertor();
    var pointArr: any = [];
    var ggPoint: any = new BMapGL.Point(lon, lat);
    pointArr.push(ggPoint);
    convertor.translate(pointArr, Type[from], Type[to], translateCallback);
  }
  return { convertor };
}
