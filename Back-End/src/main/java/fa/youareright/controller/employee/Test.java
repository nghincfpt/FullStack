package fa.youareright.controller.employee;

public class Test {
    public static String getNextSequentialString(String input) {
        String prefix = input.substring(0, 3);  // Extract the prefix "ACC"
        int number = Integer.parseInt(input.substring(3));  // Extract the number part as an integer
        int nextNumber = number + 1;  // Increment the number by 1
        
        // Format the nextNumber to have leading zeros
        String formattedNumber = String.format("%03d", nextNumber);
        
        return prefix + formattedNumber;  // Concatenate the prefix and formatted number
    }
    
//    public static void main(String[] args) {
//        String input = "ACC009";
//        String nextString = getNextSequentialString(input);
//        System.out.println(nextString);  // Output: ACC002
//    }
}