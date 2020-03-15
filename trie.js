// 字典树节点
class TrieNode {
  constructor(key) {
    this.key = key;
    this.children = [];
  }
}

// 字典树
class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }

  insert(stringData) {
    this._insert(stringData, this.root);
  }

  _insert(stringData, node) {
    if (!stringData) {
      return;
    }
    let children = node.children;
    let header;
    children.map(child => {
      if (child.key === stringData[0]) {
        header = child;
      }
    })
    if (header) {
      this._insert(stringData.substring(1), header);
    } else {
      if (!children.length) {
        let node = new TrieNode(stringData[0])
        children.push(node);
        this._insert(stringData.substring(1), node);
      } else {
        let position = 0;
        children.map(child => {
          if (child.key < stringData[0]) {
            position++;
          }
        })
        let node = new TrieNode(stringData[0]);
        children.splice(position, 0, node);
        this._insert(stringData.substring(1), node);
      }
    }
  }

  search(stringData) {
    if (stringData === '' || !this.root.children.length) {
      return false;
    }
    for (let i = 0; i < this.root.children.length; i++) {
      if(this._search(this.root.children[i], stringData)) {
        return true;
      }
    }
    return false;
  }

  _search(node, stringData) {
    if (node.key !== stringData[0]) {
      return false;
    }
    let children = node.children;
    if (!children.length && stringData.length === 1) {
      return true;
    }
    if (children.length > 0 && stringData.length > 1) {
      for (let i = 0; i < children.length; i++) {
        if (children[i].key === stringData[1]) {
          return this._search(children[i], stringData.substring(1));
        }
      }
    } else {
      return false;
    }

  }

  delete(stringData) {
    if (this.search(stringData)) {
      for (let i = 0; i < this.root.children.length; i++) {
        if (this._delete(this.root, i, stringData, stringData)) {
          return;
        }
      }
    }
    return this;
  }

  _delete(parent, index, stringData, delStr) {
    let node = parent.children[index];
    let children = node.children;
    if(!children.length && stringData.length === 1) {
      parent.children.splice(index, 1);
      this.delete(delStr.substring(0, delStr.length - 1))
    } else if (children.length && stringData.length > 1) {
      for (let i = 0; i < children.length; i++) {
        if (children[i].key === stringData[1]) {
          return this._delete(node, i, stringData.substring(1), delStr)
        }
      }
    }
  }

  show() {
    this._show(this.root);
  }

  _show(node) {
    node.children.map(child => {
      console.log('parent: ' + node.key + '; node:', child);
      if (child.children.length) {
        this._show(child);
      }
    })
  }
}