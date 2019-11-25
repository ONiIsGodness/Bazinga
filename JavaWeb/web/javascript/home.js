
Date.prototype.format = function(fmt)
{
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

function showAppWindow(appTarget){
    var item =document.getElementById(appTarget);
    if(item != null){
        item.style.display = '';
        return;
    }
    var object = document.createElement('object');
    object.setAttribute("type","text/html");
    object.setAttribute("data","/"+appTarget);
    object.setAttribute("id",appTarget);
    var frame = document.getElementsByName("function_frame")[0];
    frame.appendChild(object);
}

function updateTime(){
    var toolbar = document.getElementById("toolbar");
    if(null == toolbar)return;
    var date = new Date();
    toolbar.setAttribute("data-text",date.format("yyyy-MM-dd hh:mm:ss"));
}