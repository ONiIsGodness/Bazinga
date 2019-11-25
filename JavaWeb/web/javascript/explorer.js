var explorer = undefined;

var cursorPosition = [-1,-1];
var fullscreen = false;

function getCursorPosition(pos){
    cursorPosition[0] = pos.clientX;
    cursorPosition[1] = pos.clientY;
}
function setWindowPosition(pos){
    if(cursorPosition[0]!=-1 && cursorPosition[1] != -1){    
        if(true == fullscreen){
            explorer.style.width = '90%';
            explorer.style.height = '70%';
            explorer.style.top = '0';
            explorer.style.left = '0';
            fullscreen = false;
        }
        moveX = pos.clientX - cursorPosition[0];
        moveY = pos.clientY - cursorPosition[1];
        if(moveX + explorer.offsetLeft >= 0 && moveY + explorer.offsetTop >= 0) {
            explorer.style.top = explorer.offsetTop + moveY + 'px';
            explorer.style.left = explorer.offsetLeft + moveX + 'px';
        }
            cursorPosition[0] = pos.clientX;
            cursorPosition[1] = pos.clientY;
    }
}

function maxWindow(){
    explorer.style.width = '100%';
    explorer.style.height = '100%';
    explorer.style.top = '0';
    explorer.style.left = '0';
    fullscreen = true;
}
function recoverWindow(){
    explorer.style.width = '90%';
    explorer.style.height = '70%';
    explorer.style.top = '10%';
    explorer.style.left = '5%';
    fullscreen = false;
}
window.onload = function(){
    explorer = document.getElementById('explorer');
    if(null == explorer){
        return;
    }
    var messageTag = explorer.getElementsByClassName('message')[0];
    messageTag.onmousedown = getCursorPosition;
    
    window.onmousemove = setWindowPosition;
    window.onmouseup = function(){
        cursorPosition[0] = -1;
        cursorPosition[1] = -1;
    }
    messageTag.dbclick = function(){
        if(fullscreen == false)maxWindow();
        else recoverWindow();
    }
    var functionTags = explorer.getElementsByClassName('function')[0];
    var maxTag = functionTags.getElementsByClassName('max')[0];
    maxTag.onclick = function(){
        if(fullscreen == false)maxWindow();
        else recoverWindow();
    }
    var minTag = functionTags.getElementsByClassName('min')[0];
    minTag.onclick = function(){
        explorer.style.display = 'none';
        
    }
    var closeTag = functionTags.getElementsByClassName('close')[0];
    closeTag.onclick = function () {
        explorer.style.display = 'none';
    }
}