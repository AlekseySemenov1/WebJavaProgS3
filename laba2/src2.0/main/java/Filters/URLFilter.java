package Filters;

import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter(filterName = "URLFilter")
public class URLFilter implements Filter {
    public void init(FilterConfig config) throws ServletException {
    }

    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        if (((HttpServletRequest) request).getRequestURI().equals("/web2/clear") || ((HttpServletRequest) request).getRequestURI().equals("/web2/checker") || ((HttpServletRequest) request).getRequestURI().equals("/web2/clear")) {
            request.getServletContext().getRequestDispatcher("/controller").forward(request, response);
            return;
        }
        chain.doFilter(request, response);
    }
}
