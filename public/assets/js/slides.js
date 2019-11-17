$('#image').on('change',function(){
    let formData=new FormData();
    formData.append('image',this.files[0]);
    $.ajax({
        type: "POST",
        url: "/upload",
        data: formData,
        processData:false,
        contentType:false,
        success: function (response) {
        //    console.log(response[0].image);
           $('#images').val(response[0].image);
        }
    });
});
$('#slidesForm').on('submit',function(){
    let formData=$(this).serialize();
    $.ajax({
        type: "POST",
        url: "/slides",
        data: formData,
        success: function (response) {
            location.reload()
        }
    });
    return false
});
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        let html=template('slidesTpl',{data:response});
        $('#slidesBox').html(html)
        
    }
});
$('#slidesBox').on('click','.delete',function(){
    let id=$(this).attr('data-id')
    $.ajax({
        type: "DELETE",
        url: `/slides/${id}`,
        success: function (response) {
            location.reload()
        }
    });
});
