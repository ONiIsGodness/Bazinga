package pro.bazinga.service.explorer;

import java.io.File;
import java.io.IOException;

public class FileOperator {
    public String fileName;
    public String filePath;
    public boolean isDir = false;
    protected File fileObj = null;

    public FileOperator(String fileFullPath){
        fileObj = new File(fileFullPath);
        fileName = fileObj.getName();
        filePath = fileObj.getParent();
    }
    public FileOperator(String fileFullPath,boolean isDir){
        this(fileFullPath);
        this.isDir = isDir;
    }

    public boolean optDelete(){

        return true;
    }
    public boolean optCreate(){
        if(fileObj.exists())
            return true;
        if(!fileObj.getParentFile().exists()){
            return false;
        }
        try {
            if(false == isDir)
                fileObj.createNewFile();
            else
                fileObj.mkdir();
        } catch (IOException e) {
            return false;
        }
        return  true;
    }
    public boolean optRename(){
        return true;
    }
}
