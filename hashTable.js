// 哈希表 (不处理冲突)
class HashTable {
  constructor() {
    this.table = new Array(1024);
  }

  // 哈希函数 - 除留余数法
  hash(key) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % this.table.length;
  }

  insert(key, value) {
    const pos = this.hash(key);
    this.table[pos] = value;

  }

  get(key) {
    return this.table[this.hash(key)];
  }

  show() {
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i] !== undefined) {
        console.log(i + ':' + this.table[i]);
      }
    }
  }

}

// 哈希表 （处理冲突）
class HashTable {
  constructor() {
    this.table = new Array(1024);
  }

  // 哈希函数 - 平方求和法
  hash(key) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    const s = total * total + '';
    return s.charAt(s.length / 2 - 1) * 10 + s.charAt(s.length / 2) * 1;
  }

  // 解决哈希冲突 - 线性开放定址法
  solveClash(index, value) {
    const table = this.table;
    for (let i = 0; index + i < table.length; i++) {
      if (table[index + 1] == null) {
        table[index + 1] = value;
        break;
      }      
    }
  }

  insert(key, value) {
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