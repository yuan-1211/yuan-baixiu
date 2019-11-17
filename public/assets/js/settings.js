$('#logo').on('change', function () {
    let formdata = new FormData();
    formdata.append('logo', this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formdata,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#site_logo').val(response[0].logo)
            $('#preview').attr('src', response[0].logo)
        }
    });
});
$('#settingForm').on('submit', function () {
    let formdata = $(this).serialize()
    $.ajax({
        type: "POST",
        url: "/settings",
        data: formdata,
        success: function (response) {
            location.reload()

        }
    });
    return false
});
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        $('#preview').attr('src', response.logo);
        $('#site_name').val(response.title);
        $('#comment_status').attr('checked', response.comment);
        $('#comment_reviewed').attr('checked', response.review);
    }
});