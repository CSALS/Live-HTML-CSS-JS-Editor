function getUserCode() {
    return htmlEditor.getValue() + "\n" + "<style>" + "\n" + cssEditor.getValue() + "\n" + "</style>" + "\n" +  "<script>" + "\n" + jsEditor.getValue() + "\n" + "</script>";
}
function update() {
    //this is the content of iframe
    var code = document.getElementById('iframe').contentWindow.document;
    code.open();
    //getting value from editor and puts in the iframe
    code.write(getUserCode());
    code.close();
}
function loadHTMLEditor() {
    defaultHTMLValue = "<!DOCTYPE html>\n\n<html>\n\n    <!-- Your HTML code goes right here -->\n\n</html>"
    //tells ace editor to use editor element , window.editor makes it global in the javascript file
    window.htmlEditor = ace.edit("htmlEditor");
    //mode mode
    htmlEditor.setTheme("ace/theme/dracula");
    //html mode
    htmlEditor.getSession().setMode("ace/mode/html");
    //sample text
    htmlEditor.setValue(defaultHTMLValue,1); //1 = moves cursor to end
    // when something changed in editor update is called
    htmlEditor.getSession().on('change', function() {
        update();
    });
    // puts cursor in the editor
    htmlEditor.focus();
    
    //htmlEditor.setOption('showLineNumbers', true);
    htmlEditor.setOptions({
        fontSize: "12.5pt",
        showLineNumbers: true,
        vScrollBarAlwaysVisible:false,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });

    htmlEditor.setShowPrintMargin(false);
    //htmlEditor.setBehavioursEnabled(false);
}
function loadCSSEditor() {
    defaultCSSValue = "/*        Your CSS Code Goes Here           */"
    //tells ace editor to use editor element , window.editor makes it global in the javascript file
    window.cssEditor = ace.edit("cssEditor");
    cssEditor.resize();
    cssEditor.renderer.updateFull();
    //mode mode
    cssEditor.setTheme("ace/theme/dracula");
    //html mode
    cssEditor.getSession().setMode("ace/mode/css");
    //sample text
    cssEditor.setValue(defaultCSSValue,1); //1 = moves cursor to end
    // when something changed in editor update is called
    cssEditor.getSession().on('change', function() {
        update();
    });
    // puts cursor in the editor
    cssEditor.focus();

    //htmlEditor.setOption('showLineNumbers', true);
    cssEditor.setOptions({
        fontSize: "12.5pt",
        showLineNumbers: true,
        vScrollBarAlwaysVisible:true,
        // enableBasicAutocompletion: true,
        // enableSnippets: true,
        // enableLiveAutocompletion: false
    });

    cssEditor.setShowPrintMargin(false);
    //cssEditor.setBehavioursEnabled(false);
}
function loadJSEditor() {
    defaultJSValue = "/*     Your JAVASCRIPT Code Goes Here       */"
    //tells ace editor to use editor element , window.editor makes it global in the javascript file
    window.jsEditor = ace.edit("jsEditor");
    //mode mode
    jsEditor.setTheme("ace/theme/dracula");
    //html mode
    jsEditor.getSession().setMode("ace/mode/javascript");
    //sample text
    jsEditor.setValue(defaultJSValue,1); //1 = moves cursor to end
    // when something changed in editor update is called
    jsEditor.getSession().on('change', function() {
        update();
    });
    // puts cursor in the editor
    jsEditor.focus();
    
    //htmlEditor.setOption('showLineNumbers', true);
    jsEditor.setOptions({
        fontSize: "12.5pt",
        showLineNumbers: true,
        vScrollBarAlwaysVisible:true,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });

    jsEditor.setShowPrintMargin(false);
    //htmlEditor.setBehavioursEnabled(false);
}
function setupEditor() {
    loadHTMLEditor();
    loadCSSEditor();
    loadJSEditor();
}
function ready() {
    setupEditor();
}

function maximizeIFrame() {
    //First make Iframe height larger
    let iframe = document.getElementById("iframe");
    iframe.style.height = "98%";
    iframe.style.width = "100%";
    //Next equate all 3 editors dimensions to 0
    let htmlEditor = document.getElementById("htmlEditor");
    htmlEditor.style.height = "0%";
    htmlEditor.style.width = "0%";
    let cssEditor = document.getElementById("cssEditor");
    cssEditor.style.height = "0%";
    cssEditor.style.width = "0%";
    let jsEditor = document.getElementById("jsEditor");
    jsEditor.style.height = "0%";
    jsEditor.style.width = "0%";
    //Make editors height 5% which has labels and buttons
    let allEditors = document.getElementById("editors");
    allEditors.style.height = "5%";
    allEditors.style.width = "100%";
}
function minimizeIframe() {
    //Going in reverse order from maximizeFrame() to reset all elements to their original dimensions
    let editors = document.getElementById("editors");
    editors.style.height = "50%";
    editors.style.width = "100%";
    let htmlEditor = document.getElementById("htmlEditor");
    htmlEditor.style.height = "90%";
    htmlEditor.style.width = "32%";
    let cssEditor = document.getElementById("cssEditor");
    cssEditor.style.height = "90%";
    cssEditor.style.width = "32%";
    let jsEditor = document.getElementById("jsEditor");
    jsEditor.style.height = "90%";
    jsEditor.style.width = "32%";
    var iframe = document.getElementById("iframe");
    iframe.style.height = "50%";
    iframe.style.width = "100%";
}

//Download Code File
function downloadCode() {
     //1.Create a blob
     const userCode = getUserCode();
     const blob = new Blob([userCode], {type: "text/html"});
     downloadFile(blob,"index.html");
}
//2.function that accepts blob and file name
function downloadFile(blob,fileName) {
    //3.create url for blob
    const url = window.URL.createObjectURL(blob);
    //4.anchor tag to download
    const a = document.createElement('a');
    //Before click we need to add some properties to our anchorTag
    a.href = url;
    a.download = fileName;
    //click event
    a.click();
    //remove anchor tag
    a.remove();

    document.addEventListener("focus",w=>{window.URL.revokeObjectURL(url)})
}