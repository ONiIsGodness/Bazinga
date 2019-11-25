var preTarget = "root-fold";
var forwardDir = undefined;
function getDocument(id){
    if(id != "") {
        // 获取目标标签
        var item = document.getElementById(id);
        if (item == null) {
            console.log("tag" + id + "is not found!");
        }
        setColor(id);
        if (item.children[2] == undefined) {
            //向服务器请求目录的信息，更新到列表
            addRemoteDir2list(id);
        }
        else {
            if (id != "root-fold") {
                // 反转显示的状态
                if (item.getAttribute("state") == "close") {
                    item.children[2].style.display = "";
                    item.setAttribute("state", "open");
                }
                else {

                    item.children[2].style.display = "none";
                    item.setAttribute("state", "close");
                }
            }
            // 根据列表中的信息更新主界面
            updateMainView(id);
        }
        var fun = document.getElementsByClassName("function")[0];
        var msg = fun.getElementsByClassName("message")[0];
        var path = msg.getElementsByClassName("path")[0];
        var currentDir = id.split("-");
        if (id != 'root-fold' && id != '') {
            // path.innerHTML = "/home/" + id.replace(/-/g, "/");
            path.innerHTML = currentDir[currentDir.length - 1];
        }
        else {
            path.innerHTML = "home";
        }
        updateAddr(id);
    }
    event.stopPropagation();
}

function setColor(id){
    if(preTarget == "")
        preTarget = "root-fold";
    if(typeof(preTarget)!= "undefined" && preTarget != "root-fold") {
        var pathDirs = preTarget.split("-");
        var _id = "";
        pathDirs.forEach(function (value) {
            _id += value;
            var item = document.getElementById(_id);
            _id += "-";
            item.children[0].style.color = 'lightcoral';
        });
    }
    preTarget = id;
    if(id == 'root-fold' || id == ""){
        return;
    }

    var pathDirs = id.split("-");
    var _id = "";
    pathDirs.forEach(function (value) {
        _id += value;
        var item = document.getElementById(_id);
        if(null == item){
            console.log('element`s id == ' + _id +' is not exists...');
            return;
        }
        _id += "-";

        item.children[0].style.color = 'lightblue';
    });
}
function updateBack(){
    var address = document.getElementById("address");
    var addr = address.getElementsByClassName("addr")[0];
    var list = addr.getElementsByTagName("ul")[0];
    var nums = list.children.length;
    if(nums > 1) {
        var tail = "-"+list.children[nums-1].innerHTML;
        list.removeChild(list.children[nums - 1]);
        var _id = "";
        for (var i = 1;i < nums-1;i++){
            _id += list.children[i].innerHTML;
            if(i != nums - 2)
                _id += "-";
        }
        if(_id != "") {
            getDocument(_id);
            forwardDir = _id + tail;
        }
        else{
            getDocument("root-fold");
        }
        setColor(_id);
    }
}

function addFileToList(parentId,fileName,isDir){
    if(parentId == "")parentId = "root-fold";
    if(fileName == "")return;
    var parent = document.getElementById(parentId);
    if (null == parent)return;
    // 判断parent是不是一个目录
    if (!parent.hasAttribute("state"))return;
    if (parent.children[2] == undefined){
        var ulTag = document.createElement("ul");
        ulTag.style.display = "";
        parent.appendChild(ulTag);
    }
    console.log(parentId);
    var list = parent.children[2];
    var liTag = document.createElement("li");
    var iTag = document.createElement("i");
    var spanTag = document.createElement("span");
    spanTag.innerHTML = fileName;
    if(isDir){
        liTag.setAttribute("state","close");
        if(parentId == 'root-fold')
            liTag.setAttribute("onclick",'getDocument('+fileName+')');
        else
            liTag.setAttribute("onclick",'getDocument('+parentId+'-'+fileName+')');
        iTag.setAttribute("class","iconfont icon-ziyuan");
        liTag.setAttribute("id",parentId+'-'+fileName);
    }
    else{
        liTag.setAttribute("onclick","getDocument('')");
        iTag.setAttribute("class","iconfont icon-wenjian");
        liTag.setAttribute("name",fileName);
    }
    liTag.appendChild(iTag);
    liTag.appendChild(spanTag);
    if(list.children.length == 0 || !isDir){
        list.appendChild(liTag);
    }
    else
        list.insertBefore(liTag,list.children[0]);
}
function updateForward(){
    console.log(forwardDir);
    if (typeof(forwardDir) != "undefined"){
        getDocument(forwardDir);
    }
}
// 更新地址栏
function updateAddr(id){
    if(id == 'root-fold') id = "";
    var address = document.getElementById("address");
    var addr = address.getElementsByClassName("addr")[0];
    var list = addr.getElementsByTagName("ul")[0];
    list.innerHTML = "";
    var liTag = document.createElement("li");
    liTag.innerHTML = "home";
    liTag.setAttribute("onclick","getDocument('root-fold');updateAddr('');");
    list.appendChild(liTag);
    if(id == '')return;
    var pathDirs = id.split('-');
    var target = "";
    pathDirs.forEach(function (value) {
        var liTag = document.createElement("li");
        target += value;
        liTag.setAttribute("onclick","getDocument('"+target+"')");
        target += "-";
        liTag.innerHTML = value;
        list.appendChild(liTag);
    });
}

function updateMainView(id){
    if(id == "")id = "root-fold";
    var item = document.getElementById(id);
    var view = document.getElementsByClassName("view")[0];
    if(null == view)return;
    var viewFiles = view.getElementsByClassName("files")[0];
    if(null == viewFiles)return;
    viewFiles.innerHTML = "";

    var list = item.getElementsByTagName("ul")[0];
    if(typeof(list) == "undefined" || list.children.length == 0){
        var spanTag = document.createElement("span");
        spanTag.innerHTML = "Directory: /" + id.replace(/-/g,"/") + " is empty...";
        viewFiles.appendChild(spanTag);
        return;
    }
    var num = list.children.length;
    for( var i = 0 ;i < num ; i++){
        var liTag = document.createElement("li");
        var iTag = document.createElement("i");
        var fileName = list.children[i].children[1].innerHTML;
        if(list.children[i].hasAttribute("state")){
            liTag.setAttribute("class","fold");
            iTag.setAttribute("class","iconfont icon-ziyuan");
            if(id == 'root-fold')
                liTag.setAttribute("onclick","getDocument('"+fileName+"')");
            else if(list.children[i].hasAttribute("state"))
                liTag.setAttribute("onclick","getDocument('"+id+"-"+fileName+"')");
        }
        else{
            liTag.setAttribute("class","file");
            iTag.setAttribute("class","iconfont icon-wenjian");
            liTag.setAttribute('onclick','setAsActive(this)');
        }
        var spanTag = document.createElement("span");
        spanTag.innerHTML = fileName;
        spanTag.setAttribute("class","file-name");
        liTag.appendChild(iTag);
        liTag.appendChild(document.createElement("br"));
        liTag.appendChild(spanTag);
        viewFiles.appendChild(liTag);
    }
}
function addRemoteDir2list(id){
    var item = document.getElementById(id);
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp=new XMLHttpRequest();
    else
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    // var __reg = new RegExp("\\-/g");
    var urlPath = '/getTargetFileServlet?loadfile=/'+id.replace(/-/g,"/");
    xmlhttp.open("GET",urlPath,true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var resp = xmlhttp.responseText;
            if (resp == "[]"){
                return;
            }
            var fileList = JSON.parse(resp);
            var reg = new RegExp("\\.");

            var ul = document.createElement("ul");
            fileList.forEach(function (file) {
               var li = document.createElement("li");
               var i = document.createElement('i');
               var span = document.createElement("span");
               var strID = id+"-"+file.fileName.replace(reg,"_");
               span.innerHTML = file.fileName;
               if(file.isDirectory == true){
                   li.setAttribute("id",strID);
                   li.setAttribute("state",'close');
                   li.setAttribute("onclick","getDocument('"+strID+"')");
                   i.setAttribute("class","iconfont icon-ziyuan");
               }
               else{
                   i.setAttribute("class","iconfont icon-wenjian");
                   li.setAttribute("onclick","getDocument('')");
                   li.setAttribute("name",file.fileName);
               }
               li.appendChild(i);
               li.appendChild(span);
               ul.appendChild(li);
            });
            item.appendChild(ul);
            item.children[2].style.display = "";
            item.setAttribute("state","open");
        }
        updateMainView(id);
    };
}

function showRecycleBin(){
    //在主界面中删除
    var view = document.getElementsByClassName("view")[0];
    if(null == view)return;
    var viewFiles = view.getElementsByClassName("files")[0];
    if(null == viewFiles)return;
    viewFiles.innerHTML = "";
}