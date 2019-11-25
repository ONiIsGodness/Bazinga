package pro.bazinga.web.explorer;

import pro.bazinga.domain.FileMsg;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/getFileSystemServlet")
public class GetFileSystemServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setCharacterEncoding("utf-8");
        String userName = req.getParameter("name");
        ServletContext servletContext = req.getServletContext();
        HttpSession httpSession = req.getSession();
        String realPath = servletContext.getRealPath("/home/"+"God");

        File file = new File(realPath);
        File[] files = file.listFiles();
        List<FileMsg> myFiles = new ArrayList<FileMsg>();
        if(files != null){
            for (File f : files){
                String fileName = f.getName();
                if(fileName.startsWith("."))continue;
                if(f.isDirectory())
                    myFiles.add(0,new FileMsg(fileName,true));
                else
                    myFiles.add(myFiles.size(),new FileMsg(fileName,false));
            }
        }
        httpSession.setAttribute("my_files",myFiles);
        resp.sendRedirect(req.getContextPath() + "/functions/explorer.jsp");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req,resp);
    }
}
