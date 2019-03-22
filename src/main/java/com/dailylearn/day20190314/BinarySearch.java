package com.dailylearn.day20190314;

import java.util.Arrays;

/**
 * Demo
 *
 * @author zhongya
 * @date 2019/03/14
 */
public class BinarySearch {
    public static void main(String[] args) {
        int[] nums = new int[]{1, 4};
        //int[] nums = {1};
        Arrays.sort(nums);
        for (int num : nums) {
            System.out.println(num);
        }
        System.out.println("------------");
        int l = nums.length - 1;
        int index = binarySearchRecursively(nums, 0, 0, l);
        System.out.println(index);
    }

    private static int binarySearch(int[] nums, int i, int low, int high) {
        int index = 0;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] < i) {
                low = mid + 1;
            } else if (nums[mid] > i) {
                high = mid;
            } else {
                index = mid;
                return index;
            }
        }
        return index;
    }

    private static int binarySearchRecursively(int[] nums, int i, int low, int high) {
        int mid = low + (high - low) / 2;
        if (i == nums[mid]) {
            return mid;
        }
        if (low >= high) {
            return -1;
        }
        if (i < nums[mid]) {
            return binarySearchRecursively(nums, i, low, mid - 1);
        }
        if (i > nums[mid]) {
            return binarySearchRecursively(nums, i, mid + 1, high);
        }
        return -1;
    }
}
