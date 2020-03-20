/** (不处理冲突的)哈希表 */ 
class HashTable_WithoutSolveClash {
  constructor(size) {
    this.table = new Array(size);
  }

  /** 哈希函数 - 除留余数法 */
  hash(key) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % this.table.length;
  }

  set(key, value) {
    const pos = this.hash(key);
    this.table[pos] = value;
  }

  get(key) {
    return this.table[this.hash(key)];
  }

  delete(key) {
    const pos = this.hash(key);
    delete this.table[pos];
  }

  show() {
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i] !== undefined) {
        console.log(i + ':' + this.table[i]);
      }
    }
  }
}

// 示例
const h1 = new HashTable_WithoutSolveClash(1993);
h1.set('X', 'xwz');
h1.set('H', 'hjy');
h1.set('X', 'xxs'); // 和第一条数据冲突

console.log(h1.get('X')); // xxs (冲突数据覆盖了之前的数据)

h1.delete('X');

h1.show();

/** (处理冲突的)哈希表 */
class HashTable_WithSolveClash {
  constructor(size) {
    this.table = new Array(size);
  }

  /** 哈希函数 - 平方求和法 */
  hash(key) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    const s = total * total + '';
    return s.charAt(s.length / 2 - 1) * 10 + s.charAt(s.length / 2) * 1;
  }

  /** 解决哈希冲突 - 线性开放定址法 */
  solveClash(index, value) {
    const table = this.table;
    for (let i = 0; index + i < table.length; i++) {
      if (table[index + 1] == null) {
        table[index + 1] = value;
        break;
      }      
    }
  }

  set(key, value) {
    const pos = this.hash(key);
    if (this.table[pos] == null) {
      this.table[pos] = value;
    } else {
      this.solveClash(pos, value);
    }
  }

  show() {
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i] !== undefined) {
        console.log(i + ':' + this.table[i]);
      }
    }
  }
}

// 示例
const h2 = new HashTable_WithSolveClash(1993);

h2.set('X', 'xwz');
h2.set('H', 'hjy');
h2.set('X', 'xxs');

h2.show(); // 原先被覆盖的值正常显示了