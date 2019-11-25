var xmlhttp;
if (window.XMLHttpRequest)
    xmlhttp=new XMLHttpRequest();
else
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

////////////////////////////创建文件//////////////////////////////////
/*
* 弹出创建文件夹对话框
* */
function createFold(){
    var overlay = document.getElementById("overlay");
    if(null != overlay){
        overlay.setAttribute("createType","fold");
        var inputName = overlay.getElementsByTagName("input")[0];
        if(null != inputName)
            inputName.value = "";
        overlay.children[0].children[1].children[0].children[1].style.display = 'none';
        overlay.children[0].children[1].children[0].children[0].style.display = '';
        // overlay.getElementById("add-wenjianjia").style.display='';
        // overlay.getElementById("add-wenjian").style.display='none';
        overlay.style.display = "block";
    }

}
/*
* 弹出创建文件对话框
* */
function createFile(){
    var overlay = document.getElementById("overlay");
    if(null != overlay){
        overlay.setAttribute("createType","file");
        var inputName = overlay.getElementsByTagName("input")[0];
        if(null != inputName)
            inputName.value = "";
        overlay.children[0].children[1].children[0].children[0].style.display = 'none';
        overlay.children[0].children[1].children[0].children[1].style.display = '';
        overlay.style.display = "block";
    }
}
/*
* 清除蒙层
* */
function clearOverlay(){
    var overlay = document.getElementById("overlay");
    if(null != overlay){
        overlay.style.display = "none";
    }
}
/*
* 取消请求
* */
function cancleReq(){
    clearOverlay();
}
/*
* 提交创建请求
* */
function submitReq(){
    var overlay = document.getElementById("overlay");
    var inputName = overlay.getElementsByTagName("input")[0];
    if(inputName.value == "")return;
    if(overlay != null && inputName != null) {
        var path = undefined;
        if (typeof(preTarget) != "undefined" && preTarget != "" && preTarget != "root-fold")
            path = "/" + preTarget.replace(/-/g, "/");
        else
            path = "";
        if (overlay != null) {
            if (null != inputName) {
                path += "/" + inputName.value;
                // var __reg = new RegExp("\\-/g");
                var urlPath = '/explorer/createFileServlet?usrName=God&fileName='+path+"&createType="+overlay.getAttribute("createType");
                xmlhttp.open("GET",urlPath,true);
                xmlhttp.send();
                xmlhttp.onreadystatechange = callbackGetUploadState;
            }
        }
    }
    clearOverlay();
}
/*
* 获取服务器端创建的结果
* */
function callbackGetUploadState(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        var resp = xmlhttp.responseText;
        var fileMsg = JSON.parse(resp);
        if(fileMsg.fileName == ""){
            alert("Create File/Fold failed...");
            return;
        }
        else{
            console.log(preTarget);
            addFileToList(preTarget,fileMsg.fileName,fileMsg.isDirectory);
            updateMainView(preTarget);
        }
    }
}
////////////////////////////文件上传//////////////////////////////////
function uploadFile(){
    var _ef = document.getElementById('_ef');
    if(null != _ef){
        _ef.value = "";
        _ef.click();
    }
}
function upload(){
    var _ef = document.getElementById('_ef');
    if(null != _ef) {
        var originPath = _ef.value;
        var pos = originPath.lastIndexOf('\\');
        if(-1 == pos){
            pos = originPath.lastIndexOf('/');
            if(pos == -1)return;
        }
        var path = originPath.substring(pos + 1);
        var prePath = '/';
        if(preTarget != 'root-fold' && preTarget != '')
            prePath += preTarget.replace(/-/g,'/') + '/';
        var urlPath = '/explorer/createFileServlet?usrName=God&fileName='+prePath+path+"&createType=file";
        console.log(urlPath);
        xmlhttp.open("GET",urlPath,true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = callbackGetUploadState;
    }
}
//////////////////////////////删除文件////////////////////////////////
/*
* 选中文件
* */
function setAsActive(obj){
    var preActive = document.getElementById('current-active');
    if(null != preActive){
        preActive.removeAttribute('id');
    }
    obj.setAttribute('id','current-active');
}
/*
* 删除选中的文件
* */
function deleteOpt(){
    var currentActive = document.getElementById('current-active');
    if(null == currentActive)return;
    // 在列表中删除
    var parent = document.getElementById(preTarget);
    if(null == parent)return;
    var num = parent.children.length;
    if(3 > num)return;
    var list = parent.children[2];
    num = list.children.length;
    for(var i = num-1;i>=0;i--){
        if(list.children[i].getAttribute('name') ==
        currentActive.children[2].innerHTML){
            list.children[i].remove();
            break;
        }
    }
    // 在主界面中删除(不显示)
    currentActive.remove();
}
