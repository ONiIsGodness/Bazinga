package pro.bazinga.web.explorer;

import com.fasterxml.jackson.databind.ObjectMapper;
import pro.bazinga.domain.FileMsg;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/getTargetFileServlet")
public class GetTargetFileServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String path = request.getParameter("loadfile");
        ServletContext servletContext = request.getServletContext();
        String realPath = servletContext.getRealPath("/home/God/" + path);
        File file = new File(realPath);
        File[] files = file.listFiles();
        List<FileMsg> retFiles = new ArrayList<FileMsg>();
        if(files != null){
            for(File f: files){
                String fileName = f.getName();
                if(fileName.startsWith("."))  continue;
                if(f.isDirectory()){
                    retFiles.add(0,new FileMsg(f.getName(),true));
                }
                else{
                    retFiles.add(retFiles.size(),new FileMsg(f.getName(),false));
                }
            }
        }
        ObjectMapper mapper = new ObjectMapper();
        String out = mapper.writeValueAsString(retFiles);
        response.getWriter().write(out);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request,response);
    }
}
