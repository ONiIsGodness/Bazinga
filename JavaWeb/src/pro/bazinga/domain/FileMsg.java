package pro.bazinga.domain;

public class FileMsg {
    String fileName;
    boolean isDirectory;
    int fileSize = 0;

    public FileMsg(String fileName, boolean isDirectory) {
        this.fileName = fileName;
        this.isDirectory = isDirectory;
    }

    public String getFileName() {
        return fileName;
    }

    public boolean getIsDirectory() {
        return isDirectory;
    }

    public int getFileSize() {
        return fileSize;
    }
}
