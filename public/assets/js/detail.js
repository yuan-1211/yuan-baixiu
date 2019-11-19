
let id =getId('id')
$.ajax({
    type: "GET",
    url: `/posts/${id}`,
    success: function (response) {
     let html = template('articleTpl',response);
     $('#articleBox').html(html)
        
    }
});
$('#articleBox').on('click', '#like',function () {
    $.ajax({
        type: "POST",
        url: `/posts/fabulous/${id}`,
        success: function (response) {
            alert('老铁，666')
        }
    });
});