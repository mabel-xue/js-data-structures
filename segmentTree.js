/**
 * 线段树
 */
class SegmentTree {
  constructor() {
    this.segmentTree = [];
  }

  /**
   * 创建线段树
   * @param {array} originalArr 输入数组(线段树叶子结点的集合)
   * @param {number} min 区间上限
   * @param {number} max 区间下限
   * @param {number} pos 
   */
  constructTree(originalArr, min, max, pos) {
    if (min === max) {
      this.segmentTree[pos] = originalArr[min];
      return;
    }
    const mid = Math.floor((min + max)/2);
    // 2 * pos + 1 left child；2 * pos + 2 right child
    this.constructTree(originalArr, min, mid, 2 * pos + 1);
    this.constructTree(originalArr, mid + 1, max, 2 * pos + 2);
    // 为 Math.max 时为最大区间线段树
    this.segmentTree[pos] = Math.min(this.segmentTree[2 * pos + 1], this.segmentTree[2 * pos + 2]);
  }

  /**
   * 区间最小值(最大值)查询
   * 遍历树结点，结点对应区间为[low, high]，如果：
   * ① [rangeLow, rangeHigh]完全包含[low, high], 返回该结点值;
   * ② [rangeLow, rangeHigh]不包含[low, high], 返回 max;
   * ③ [rangeLow, rangeHigh]部分包含[low, high], 继续向下遍历;
   * @param {number} rangeLow 查询线段的左端点
   * @param {number} rangeHigh 查询线段的右端点
   * @param {number} low 遍历结点的左端点
   * @param {number} high 遍历结点的右端点
   * @param {number} pos 
   */
  rangeQuery(rangeLow, rangeHigh, low, high, pos) {
    if (rangeLow <= low && rangeHigh >= high) {
      return this.segmentTree[pos];
    }
    if (rangeLow > high || rangeHigh < low) {
      return Number.MAX_VALUE;
    }
    const mid = Math.floor((low + high)/2);
    // 为 Math.max 时为最大区间查询
    return Math.min(
      this.rangeQuery(rangeLow, rangeHigh, low, mid, 2 * pos + 1),
      this.rangeQuery(rangeLow, rangeHigh, mid + 1, high, 2 * pos + 2)
    );
  }

}


// 示例
const st = new SegmentTree();
st.constructTree([-1, 2, 4, 0], 0, 3, 0);

console.log(st.segmentTree); // [-1, -1, 0, -1, 2, 4, 0]

console.log(st.rangeQuery(1, 3, 0, 3, 0)); // 0