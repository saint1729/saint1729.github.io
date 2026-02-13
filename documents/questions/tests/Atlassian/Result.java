import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.*;
import java.util.regex.*;
import java.util.stream.*;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;


class Result {

    /*
     * Complete the 'mergePalindromes' function below.
     *
     * The function is expected to return a STRING.
     * The function accepts following parameters:
     *  1. STRING s1
     *  2. STRING s2
     */

    public static String mergePalindromes(String s1, String s2) {
    
        char[] c1 = s1.toCharArray();
        char[] c2 = s2.toCharArray();
        
        int n1 = c1.length, n2 = c2.length;
        
        int[] x1 = new int[26];
        int[] x2 = new int[26];
        int[] x3 = new int[26];
        
        for (int i = 0; i < n1; i++) {
            x1[c1[i] - 'a'] += 1;
        }
        
        for (int i = 0; i < n2; i++) {
            x2[c2[i] - 'a'] += 1;
        }
        
        for (int i = 0; i < 26; i++) {
            int count1 = x1[i], count2 = x2[i];
            
            x3[i] += (count1 - count1 % 2);
            x1[i] = count1 % 2;
            
            x3[i] += (count2 - count2 % 2);
            x2[i] = count2 % 2;
        }
        
        boolean found = false;
        
        
        for (int j = 0; j < 26; j++) {
            if ((x1[j] > 0) && (x2[j] > 0)) {
                x3[j] += 2;
                found = true;
                break;
            }
        }
        
        StringBuilder left = new StringBuilder();
        StringBuilder leftCopy = new StringBuilder();
        
        for (int i = 0; i < 26; i++) {
            for (int j = 0; j < (x3[i] / 2); j++) {
                left.append((char) ('a' + i));
                leftCopy.append((char) ('a' + i));
            }
        }
        
        StringBuilder right = leftCopy.reverse();
        
        if (found) {
            System.out.println("even");
            return left.append(right).toString();
        }
        
        for (int i = 0; i < 26; i++) {
            if ((x1[i] > 0) || (x2[i] > 0)) {
                left.append((char)('a' + i));
                System.out.println("odd");
                return left.append(right).toString();
            }
        }

        return left.append(right).toString();

    }
    

}
public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        String s1 = bufferedReader.readLine();

        String s2 = bufferedReader.readLine();

        String result = Result.mergePalindromes(s1, s2);

        bufferedWriter.write(result);
        bufferedWriter.newLine();

        bufferedReader.close();
        bufferedWriter.close();
    }
}
