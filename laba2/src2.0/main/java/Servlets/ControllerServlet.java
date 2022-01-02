package Servlets;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "ControllerServlet", value = "/ControllerServlet")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            if (Integer.parseInt(request.getParameter("c")) == 1)
                request.getServletContext().getRequestDispatcher("/clear").forward(request, response);
            float x = Float.parseFloat(request.getParameter("x"));
            float y = Float.parseFloat(request.getParameter("y"));
            float r = Float.parseFloat(request.getParameter("r"));
            request.getServletContext().getRequestDispatcher("/checker").forward(request, response);
        } catch (NullPointerException | NumberFormatException e){
            request.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        }
    }
}
