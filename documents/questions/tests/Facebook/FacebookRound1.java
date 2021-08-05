// Welcome to Facebook!

// This is just a simple shared plaintext pad, with no execution capabilities.

// When you know what language you would like to use for your interview,
// simply choose it from the dropdown in the top bar.

// Enjoy your interview!

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
        sumBetweenLowAndHighUtil(node.left, low, high);
      }
      if (data <= high) {
        sumBetweenLowAndHighUtil(node.right, low, high);
      }
    }
    
  }
  
}

//   Input:
//     words = ['cc', 'cb', 'bc', 'ac', 'acb']      
//     ordering = ['c', 'b', 'a']  
//   Output: True

//   Input:
//     words = ['cc', 'cb', 'bc', 'ac', 'acb']
//     ordering = ['b', 'c', 'a']
//   Output: False



class Solution {
  
  
  public boolean areWordsSorted(String[] words, char[] ordering) {
    
    int[] ord = new int[256];
    
    for (int i = 0; i < 256; i++) {
      ord[ordering[i]] = i + 1;
    }
    
    int n = words.length;
    
    for (int i = 1; i < n; i++) {
      if (customCompare(words[i - 1], words[i], ord) > 0) {
        return false;
      }
    }
    
    return true;
  }
  
  public int customCompare(int[] a, int[] b, int[] ord) {
  
    int m = a.length, n = b.length;
    int min = Math.min(m, n);
    
    for (int i = 0; i < min; i++) {
      if (ord[a[i]] > ord[b[i]]) {
        return 1;
      } else if (ord[a[i]] < ord[b[i]]) {
        return -1;
      }
    }
    
    return (m > n) ? 1: -1;
  }
  
}

