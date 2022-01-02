package Servlets;

public class Point {
    float x;
    float y;
    float r;
    boolean result;

    public Point(float x, float y, float r, boolean result) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public float getR() {
        return r;
    }

    public boolean isResult() {
        return result;
    }
}
