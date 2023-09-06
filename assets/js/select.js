// @codekit-prepend  "formular/_jquery.nice-select.js", "formular/_fastclick.js";

$(document).ready(function() {
    $("[name='anrede']").niceSelect();
    FastClick.attach(document.body);
});