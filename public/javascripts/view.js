const config = require(path.join(__dirname,'..','config'));

$(document).ready(function () {
    $('#dtBasicExample').DataTable();
    $('.dataTables_length').addClass('bs-select');
});

document.getElementById("submit").onclick = function () {
    location.href = config.ip_addres+"/submit";
};

document.getElementById("delete").onclick = function () {
    location.href = config.ip_addres+"/delete";
};