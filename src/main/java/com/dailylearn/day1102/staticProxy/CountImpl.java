package com.dailylearn.day1102.staticProxy;

/**
 * Created by zhongya on 2017/11/3.
 */
public class CountImpl implements Count{
    public void queryCount() {
        System.out.println("查看账户...");
    }

    public void updateCount() {
        System.out.println("更新账户...");
    }
}