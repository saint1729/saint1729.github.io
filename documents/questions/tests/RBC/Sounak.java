import java.util.*;

class Res {

  public static void main(String[] args) {
    String s = "abcd";
    List<Integer> lower = new ArrayList<>();
    lower.add(1);
    lower.add(1);
    lower.add(3);
    List<Integer> upper = new ArrayList<>();
    upper.add(3);
    upper.add(2);
    upper.add(4);
    System.out.println(howManyPalindromes(s, lower, upper));

  }

  public static List<Long> howManyPalindromes(String str, List<Integer> lower, List<Integer> upper) {
    List<Long> result = new ArrayList<>();
    String temp = "";
    StringBuffer stf;
    for (int k = 0; k < lower.size(); k++) {
      long count = 0;
      for (int i = 0; i < str.length() - lower.get(k) + 1; i++) {
        for (int j = (i + lower.get(k)); j <= str.length() && j <= (i + upper.get(k)); j++) {
          temp = str.substring(i, j);
          stf = new StringBuffer(temp);
          stf.reverse();
          if (stf.toString().compareTo(temp) == 0)
            count++;

        }
      }
      result.add(count);
    }
    return result;
  }

}

