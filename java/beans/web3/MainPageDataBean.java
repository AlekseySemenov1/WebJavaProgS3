package beans.web3;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.context.FacesContext;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@ManagedBean(eager = true)
public class MainPageDataBean implements Serializable {
    private double x;
    private double y;
    private double r;
    private List<Point> pointList;
    private DataBaseWorker dbw;
    private String ownerSessionId;

    @PostConstruct
    public void init() {
        pointList = new ArrayList<>();
        ownerSessionId = FacesContext.getCurrentInstance().getExternalContext().getSessionId(false);
        dbw = new DataBaseWorker();
        pointList = dbw.selectPoints(ownerSessionId);
    }

    private boolean checkResult(double x, double y, double r) {
        if (x >= 0 && y >= 0) {
            return y <= (r - x) / 2;

        }
        if (x >= 0) {
            return x <= r / 2 && y >= -r;
        }
        if (y >= 0) {
            return x * x + y * y <= r * r / 4;
        }
        return false;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void addPoint() {
        if (validateValue(x,y,r)) {
            Point point = new Point(x, y, r, checkResult(x, y, r), ownerSessionId);
            pointList.add(point);
            dbw.setPoint(point);
        }
    }


    public List<Point> getPointList() {
        return pointList;
    }

    public void setPointList(List<Point> pointList) {
        this.pointList = pointList;
    }

    public void clearList() {
        this.pointList.clear();
        dbw.clearPoints();
    }

    private boolean validateValue(double x, double y, double r){
        return -4 <= x && x <= 4 && -3 <= y && y <= 3 && r >= 1;
    }
}