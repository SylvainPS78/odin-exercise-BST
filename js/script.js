class Node {
  constructor(data, left = null, rigth = null) {
    this.data = data;
    this.left = left;
    this.right = rigth;
  }
}

function _buildTreeRecursive(arr, start, end) {
  if (start > end) {
    return null;
  }

  const mid = Math.floor((start + end) / 2);
  const node = new Node(arr[mid]);

  node.left = _buildTreeRecursive(arr, start, mid - 1);
  node.right = _buildTreeRecursive(arr, mid + 1, end);

  return node;
}

function buildTree(array) {
  const uniqueSortedArr = [...new Set(array)].sort((a, b) => a - b);

  return _buildTreeRecursive(uniqueSortedArr, 0, uniqueSortedArr.length - 1);
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    let currNode = this.root;

    while (true) {
      if (value < currNode.data) {
        if (currNode.left === null) {
          currNode.left = new Node(value);
          return;
        }
        currNode = currNode.left;
      } else if (value > currNode.data) {
        if (currNode.right === null) {
          currNode.right = new Node(value);
          return;
        }
        currNode = currNode.right;
      } else {
        console.log("Key already exist");
        return;
      }
    }
  }

  deleteItem(value) {}
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// ------------- Exemple -------------------

const numbers = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 10, 20, 15];

const myTree = new Tree(numbers);

prettyPrint(myTree.root);

myTree.insert(2332);
myTree.insert(2);

prettyPrint(myTree.root);
