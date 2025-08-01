class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
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
  deleteItem(value) {
    this.root = this._deleteNodeRecursive(this.root, value);
  }

  _deleteNodeRecursive(node, value) {
    // Base Case: If the tree is empty or the value is not found
    if (node === null) {
      console.log(`The value : ${value} is not in the tree, nothing to delete`);
      return null;
    }

    // Traverse the tree to find the node to delete
    if (value < node.data) {
      node.left = this._deleteNodeRecursive(node.left, value);
    } else if (value > node.data) {
      node.right = this._deleteNodeRecursive(node.right, value);
    } else {
      // Node to be deleted found!

      // Case 1: Node has no children or only one child
      if (node.left === null) {
        console.log(`The value : ${value} has been deleted`);
        return node.right;
      } else if (node.right === null) {
        console.log(`The value : ${value} has been deleted`);
        return node.left;
      }

      // Case 2: Node has two children
      // Find the in-order successor (smallest node in the right subtree)
      // Integrate _findMin logic directly
      let successor = node.right;
      while (successor.left !== null) {
        successor = successor.left;
      }

      // Replace the current node's data with the successor's data
      node.data = successor.data;
      // Delete the in-order successor from the right subtree
      node.right = this._deleteNodeRecursive(node.right, successor.data);
      console.log(`The value : ${value} has been deleted`);
    }
    return node;
  }

  find(value) {
    let currNode = this.root;
    if (currNode === null) {
      console.log(`The value : ${value} is not in the tree (empty tree)`);
      return null;
    }

    while (currNode !== null) {
      if (value < currNode.data) {
        currNode = currNode.left;
      } else if (value > currNode.data) {
        currNode = currNode.right;
      } else {
        console.log(`Found Node with value = ${value} !`);
        return currNode;
      }
    }

    console.log(`The value: ${value} is not in the tree.`);
    return null;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    if (this.root === null) {
      console.log(`Can't execute ${callback} function, tree is empty`);
      return null;
    }

    let nodeQueue = [];
    nodeQueue.push(this.root);

    try {
      while (nodeQueue.length > 0) {
        let currNode = nodeQueue.shift();
        callback(currNode);
        if (currNode.left !== null) {
          nodeQueue.push(currNode.left);
        }
        if (currNode.right !== null) {
          nodeQueue.push(currNode.right);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  preOrderForEach(callback) {
    //root left right
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    try {
      if (this.root === null) {
        console.log(`Can't execute ${callback} function, tree is empty`);
        return null;
      }

      this._preOrderEachRecursive(this.root, callback);
    } catch (e) {
      console.error("Error :", e);
    }
  }

  _preOrderEachRecursive(node, callback) {
    if (node === null) {
      return;
    } else {
      callback(node);
      this._preOrderEachRecursive(node.left, callback);
      this._preOrderEachRecursive(node.right, callback);
    }
  }

  inOrderForEach(callback) {
    //left root right

    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    try {
      if (this.root === null) {
        console.log(`Can't execute ${callback} function, tree is empty`);
        return null;
      }

      this._inOrderEachRecursive(this.root, callback);
    } catch (e) {
      console.error("Error :", e);
    }
  }

  _inOrderEachRecursive(node, callback) {
    if (node === null) {
      return;
    } else {
      this._inOrderEachRecursive(node.left, callback);
      callback(node);
      this._inOrderEachRecursive(node.right, callback);
    }
  }

  postOrderForEach(callback) {
    //left right root

    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    try {
      if (this.root === null) {
        console.log(`Can't execute ${callback} function, tree is empty`);
        return null;
      }

      this._postOrderEachRecursive(this.root, callback);
    } catch (e) {
      console.error("Error :", e);
    }
  }

  _postOrderEachRecursive(node, callback) {
    if (node === null) {
      return;
    } else {
      this._postOrderEachRecursive(node.left, callback);
      this._postOrderEachRecursive(node.right, callback);
      callback(node);
    }
  }

  height(value) {
    //distance from leaf
    const targetNode = this.find(value);
    if (targetNode === null) {
      return null;
    }

    return this._calculateHeight(targetNode);
  }

  _calculateHeight(node) {
    if (node === null) {
      return -1;
    }
    const leftHeight = this._calculateHeight(node.left);
    const rightHeight = this._calculateHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value) {
    if (this.root === null) {
      return null;
    }

    if (this.root.data === value) {
      return 0;
    }

    let currNode = this.root;
    let depthCount = 0;

    while (currNode !== null && currNode.data !== value) {
      if (value < currNode.data) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
      depthCount++;
    }
    if (currNode === null) {
      return null;
    }
    return depthCount;
  }

  isBalanced() {
    const result = this._checkBalanceAndHeightRecursive(this.root);
    return result.isBalanced;
  }

  _checkBalanceAndHeightRecursive(node) {
    if (node === null) {
      return { isBalanced: true, height: -1 };
    }

    const leftResult = this._checkBalanceAndHeightRecursive(node.left);
    const rightResult = this._checkBalanceAndHeightRecursive(node.right);

    if (!leftResult.isBalanced || !rightResult.isBalanced) {
      return { isBalanced: false, height: 0 };
    }

    const heightDifference = Math.abs(leftResult.height - rightResult.height);
    const isCurrentNodeBalanced = heightDifference <= 1;
    const currentHeight = Math.max(leftResult.height, rightResult.height) + 1;

    return {
      isBalanced: isCurrentNodeBalanced,
      height: currentHeight,
    };
  }

  rebalance() {
    let newArray = [];
    this._inOrderTreeRecursive(this.root, newArray);
    this.root = buildTree(newArray);
    return;
  }

  _inOrderTreeRecursive(node, array) {
    if (node === null) {
      return;
    }

    this._inOrderTreeRecursive(node.left, array);
    array.push(node.data);
    this._inOrderTreeRecursive(node.right, array);
    return;
  }
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

function randomArray(size) {
  let randomArray = [];
  for (let i = 0; i < size; i++) {
    randomArray.push(Math.floor(Math.random() * (100 + 1)));
  }
  return randomArray;
}

// ------------- Exemple -------------------

const numbers = randomArray(10);

const myTree = new Tree(numbers);

prettyPrint(myTree.root);
console.log(myTree.isBalanced());

console.log(`\n level order values`);
myTree.levelOrderForEach((node) => {
  console.log(node.data);
});

console.log(`\n pre order values`);
myTree.preOrderForEach((node) => {
  console.log(node.data);
});

console.log(`\n post order values`);
myTree.postOrderForEach((node) => {
  console.log(node.data);
});

console.log(`\n in order values`);
myTree.inOrderForEach((node) => {
  console.log(node.data);
});

myTree.insert(104);
myTree.insert(153);
myTree.insert(235);
myTree.insert(532);
myTree.insert(325);

prettyPrint(myTree.root);
console.log(myTree.isBalanced());

myTree.rebalance();

prettyPrint(myTree.root);
console.log(myTree.isBalanced());

console.log(`\n level order values`);
myTree.levelOrderForEach((node) => {
  console.log(node.data);
});

console.log(`\n pre order values`);
myTree.preOrderForEach((node) => {
  console.log(node.data);
});

console.log(`\n post order values`);
myTree.postOrderForEach((node) => {
  console.log(node.data);
});

console.log(`\n in order values`);
myTree.inOrderForEach((node) => {
  console.log(node.data);
});
