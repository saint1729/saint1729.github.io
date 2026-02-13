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
    
    int[] ord = new int[26];
    
    for (int i = 0; i < 256; i++) {
      ord[ordering[i] - 'a'] = i + 1;
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
      if (ord[a[i] - 'a'] > ord[b[i] - 'a']) {
        return 1;
      } else if (ord[a[i] - 'a'] < ord[b[i] - 'a']) {
        return -1;
      }
    }
    
    return (m > n) ? 1: -1;
  }
  
}
