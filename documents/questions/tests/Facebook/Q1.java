// Welcome to Facebook!

// This is just a simple shared plaintext pad, with no execution capabilities.

// When you know what language you would like to use for your interview,
// simply choose it from the dropdown in the top bar.

// Enjoy your interviwe!

// input (BST)  
//               6
//             /   \
//            4     8
//           / \   / \
//          3   5 7   9
//         /
//        2

// input [low,high]      output
// [3, 10]                42
// [2, 5]                 14
// [8, 9]                 17
// [4, 6]                 15

class Solution {
  
  private class Answer {
    int answer = 0;
  }
  
  public int sumBetweenLowAndHigh(TreeNode root, int low, int high) {
    Answer answer = new Answer();
    
    if (root == null) {
      return 0;
    }
    
    sumBetweenLowAndHighUtil(root, low, high, answer);
    
    return answer.answer;
  }
  
  public void sumBetweenLowAndHighUtil(TreeNode node, int low, int high, Answer answer) {
    
    if (node != null) {
      int data = node.data;
      if ((data >= low) && (data <= high)) {
        answer.answer += data;
      }
      if (data >= low) {
        sumBetweenLowAndHighUtil(node.left, low, high, answer);
      }
      if (data <= high) {
        sumBetweenLowAndHighUtil(node.right, low, high, answer);
      }
    }
    
  }
  
}

