<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Explorer</title>
    <link rel="stylesheet" href="../css/reset.css">
    <%--<link rel="stylesheet" href="http://at.alicdn.com/t/font_1502876_g6ld6fz77c.css">--%>
    <link rel="stylesheet" href="http://at.alicdn.com/t/font_1502876_g1mazm453g.css">
    <link rel="stylesheet" href="../css/home-file-sys.css">

    <script src="../javascript/jquery.min.js"></script>
    <script src="../javascript/explorer.js"></script>
    <script src="../javascript/explorer_ex.js"></script>
    <script src="../javascript/explorer_opt.js"></script>
    <style>
        body, html {
            height: 100%;
            width: 100%;
        }
    </style>
</head>
<body>

<div class="explorer" id="explorer">
    <header class="function">
        <div class="close"><i class="iconfont icon-guanbi"></i></div>
        <div class="min"><i class="iconfont icon-weibiaoti--"></i></div>
        <div class="max"><i class="iconfont icon-zuidahua"></i></div>

        <div class="message">
            <div class="path">/home</div>
            <div class="list"></div>
        </div>
    </header>
    <div class="address" id="address">
        <div class="action">
            <div class="back" onclick="updateBack()"><i class="iconfont icon-houtui"></i></div>
            <div class="forward" onclick="updateForward()"><i class="iconfont icon-DisclosureIndicator"></i></div>
        </div>
        <div class="addr">
            <ul>
                <li>home</li>
            </ul>
        </div>
        <div class="opt-funtion">
            <div class="update-interface" onclick="document.location.reload(true)"><i class="iconfont icon-shuaxin"></i></div>
            <div class="delete" onclick="deleteOpt()"><i class="iconfont icon-shanchuwenjian"></i></div>
            <div class="create-fold" onclick="createFold()"><i class="iconfont icon-chuangjianwenjianjia"></i></div>
            <div class="create-file" onclick="createFile()"><i class="iconfont icon-chuangjianwenjian"></i></div>
            <div class="upload-file" onclick="uploadFile()"><i class="iconfont icon-shangchuan"></i></div>
            <div class="download-file"><i class="iconfont icon-ai231"></i></div>
            <div class="clear-bin"><i class="iconfont icon-qingkonghuishouzhan"></i></div>
            <input id='_ef' type="file" onchange="upload()">
        </div>
    </div>
    <div class="view">
        <ul class="files">
            <c:if test="${empty sessionScope.my_files}">
                <p class="msg"> 当前目录为空！ </p>
            </c:if>
            <c:if test="${not empty sessionScope.my_files}">
                <c:forEach var="file" items="${my_files}">
                    <c:if test="${file.isDirectory}">
                        <li class="fold" onclick="getDocument('${file.fileName}')">
                            <i class="iconfont icon-ziyuan"></i> </br>
                            <span class="file-name">${file.fileName}</span>
                        </li>
                    </c:if>
                    <c:if test="${not file.isDirectory}">
                        <li class="file" onclick="setAsActive(this)">
                            <i class="iconfont icon-wenjian"></i><br>
                            <span class="file-name">${file.fileName}</span>
                        </li>
                    </c:if>
                </c:forEach>
            </c:if>
        </ul>
    </div>
    <aside>
        <ul>
            <li id="recycle-bin" onclick="showRecycleBin()">
                <i class="iconfont icon-huishouzhan" style="color: rgb(171,179,186)"></i>
                <span>Recycle Bin</span>
                <ul style="display: none;">
                    <li>

                    </li>
                </ul>
            </li>
            <li class="root" id="root-fold" state="open" onclick="getDocument('root-fold')">
                <i class="root iconfont icon-touxiang" style="color: #1296db"></i>
                <span>home</span>
                <ul>
                    <c:forEach var="file" items="${my_files}">
                        <c:if test="${file.isDirectory}">
                            <li onclick="getDocument('${file.fileName}')" state="close" id="${file.fileName}" name="${file.fileName}">
                                <i class="iconfont icon-ziyuan"></i>
                                <span>${file.fileName}</span>
                            </li>
                        </c:if>
                        <c:if test="${not file.isDirectory}">
                            <li onclick="getDocument('')" name="${file.fileName}">
                                <i class="iconfont icon-wenjian"></i>
                                <span>${file.fileName}</span>
                            </li>
                        </c:if>
                    </c:forEach>
                </ul>
            </li>
        </ul>
    </aside>
</div>
<div id="overlay">
    <div class="give-name">
        <div class="opt">
            <div class="close" onclick="cancleReq()">取消</div>
            <div class="confirm" onclick="submitReq()">确认</div>
        </div>
        <div class="divs">

            <div class="icon">
                <i id='add-wenjianjia' class="iconfont icon-ziyuan"></i>
                <i id='add-wenjian' class="iconfont icon-wenjian"></i>
            </div>
            <input class="name-input" type="text">

        </div>
    </div>
</div>
</body>
</html>