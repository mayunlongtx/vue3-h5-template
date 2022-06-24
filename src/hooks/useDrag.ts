import { ref, onMounted } from 'vue';
interface UseDragOptions {
  moveEndCallback?: (offsetDirection: string, e: MouseEvent) => void;
  moveStartCallback?: (e: MouseEvent) => void;
}
// 拖动操作
export function useDrag(options?: UseDragOptions) {
  const { moveEndCallback, moveStartCallback } = options || {};
  // 1. 根据传入的ref 选择对应实例
  const el = ref<any>(null);
  // 2. 创建一个ref 存储当前的位置
  const currentPosition = ref({
    x: 0,
    y: 0,
  });
  onMounted(() => {
    // 3. 监听当前实例的移动
    el.value && el.value.addEventListener('touchmove', onMove);
    // 4. 监听移动开始、结束
    moveStartCallback && el.value.addEventListener('touchstart', moveStartCallback);
    moveEnd && el.value.addEventListener('touchend', moveEnd);
  });

  // 监听实例移动函数
  function onMove(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('移动了吗');
    // 获取当前的位置
    const { clientX, clientY, scrollHeight } = e.targetTouches[0];
    // 这里获取到页面被卷去的高度，解决滚动后 Y 值错误问题
    const { scrollTop, scrollLeft } = document.body;
    const sTop = scrollTop + document.documentElement.scrollTop;
    // 改变当前的位置
    currentPosition.value = {
      x: clientX - el.value.offsetWidth / 2 + scrollLeft,
      y: clientY - el.value.offsetHeight / 2 + sTop,
    };
    // 将边界值进行处理 防止超出边界
    processingBoundaries(e);
    // 设置当前实例的位置
    el.value.style.left = `${currentPosition.value.x}px`;
    el.value.style.top = `${currentPosition.value.y}px`;
  }
  // 5.边缘判断 ，防止超出边界
  function processingBoundaries(e) {
    // 1. 判断是不是到了 x 最左侧
    // 这里获取el的宽高
    const { clientX, clientY } = e.targetTouches[0];
    // 这里获取可视区域的宽高
    const { offsetWidth, offsetHeight, scrollHeight } = document.body;
    // 处理到达 X 轴最左侧的情况
    if (clientX - el.value.offsetWidth / 2 <= 0) {
      currentPosition.value.x = 0;
    }
    // 处理到达 X 轴最右侧的情况
    if (clientX + el.value.offsetWidth / 2 >= offsetWidth) {
      currentPosition.value.x = offsetWidth - el.value.offsetWidth;
    }
    // 处理到达 Y 轴 最上侧的情况
    if (clientY - el.value.offsetHeight / 2 <= 0) {
      currentPosition.value.y = 0;
    }
    // 处理到达 Y 轴 最下侧的情况
    if (clientY + el.value.offsetHeight / 2 >= scrollHeight) {
      currentPosition.value.y = scrollHeight - el.value.offsetHeight;
    }
  }
  /**
   *  移动结束处理函数
   */
  function moveEnd(e) {
    // 偏移方向变量
    let offsetDirection = '';
    // 1. 需要判断当前位置在x轴位置
    const { clientX, clietY } = e.changedTouches[0];
    // 获取屏幕的宽高
    const { offsetWidth, offsetHeight } = document.body;
    // 是不是位于屏幕偏左侧
    if (clientX <= offsetWidth / 2) {
      offsetDirection = 'left';
      currentPosition.value.x = 0;
    }
    // 是不是位于屏幕偏右侧
    if (clientX >= offsetWidth / 2) {
      offsetDirection = 'right';
      currentPosition.value.x = offsetWidth - el.value.offsetWidth;
    }
    // 是不是位于屏幕中间
    if (clientX == offsetWidth / 2) {
      offsetDirection = 'center';
      currentPosition.value.x = 0;
    }
    moveEndCallback && moveEndCallback(offsetDirection, e);
  }

  return {
    el,
    currentPosition,
  };
}
