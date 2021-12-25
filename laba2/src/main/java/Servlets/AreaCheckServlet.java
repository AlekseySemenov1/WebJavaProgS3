package Servlets;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "AreaCheckServlet", value = "/AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        float x = Float.parseFloat(request.getParameter("x"));
        float y = Float.parseFloat(request.getParameter("y"));
        float r = Float.parseFloat(request.getParameter("r"));
        String a = createTableRow(x, y, r, shotCheck(x, y, r));
        writeResponse(response, a+=(String) request.getSession().getAttribute("table"));
        request.getSession().setAttribute("table", a);
    }

    private boolean shotCheck(float x, float y, float r) {
        if (x >= 0 && y >= 0) {
            return x * x + y * y <= r * r;
        }
        if (x >= 0) {
            return x <= r / 2 && y >= -r;
        }
        if (y >= 0) {
            return y <= (x+r)/2;
        }
        return false;
    }

    private void writeResponse(HttpServletResponse response, String answer) throws IOException {
        response.getWriter().println(answer);
    }

    private String createTableRow(float x, float y, float r, boolean result) {
        if (result)
            return "<tr class='answerRow'><td>" + x + "</td><td>" + y + "</td><td>" + r + "</td><td class='result'>Great</td></tr>";
        else
            return "<tr class='answerRow'><td>" + x + "</td><td>" + y + "</td><td>" + r + "</td><td class='result'>Miss</td></tr>";
    }
}
