package pro.bazinga.web.explorer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import pro.bazinga.domain.FileMsg;
import pro.bazinga.service.explorer.FileOperator;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;

@WebServlet("/explorer/createFileServlet")
public class CreateFileServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        String userName = request.getParameter("usrName");
        String fileName = request.getParameter("fileName");
        ServletContext servletContext = request.getServletContext();
        String realPath = servletContext.getRealPath("/home/"+ userName + fileName);
        FileOperator fileOperator = new FileOperator(realPath,"fold".equals(request.getParameter("createType")));
        ObjectMapper mapper = new ObjectMapper();
        try {
            String out = "";
            if (fileOperator.optCreate())
                out = mapper.writeValueAsString(new FileMsg(fileOperator.fileName,fileOperator.isDir));
            else
                out = mapper.writeValueAsString(new FileMsg("",false));
            response.getWriter().write(out);
        } catch (IOException e) {
            e.printStackTrace();
        }


    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request,response);
    }
}

