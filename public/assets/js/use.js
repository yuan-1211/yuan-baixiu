$('#user-form').on('submit',function(){
    let userData=$(this).serialize();
 $.ajax({
     type: "post",
     url: "/users",
     data: userData,
     success: function (response) {
         //刷新页面
         location.reload()
     },
     error:function(){
         alert('添加失败')
     }
 });
    return false
});

$('#modifyBox').on('change','#avatar',function(){
    let formData=new FormData();
    formData.append('avatar',this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        //告诉$.ajax方法不要解析请求参数
        processData:false,
        //告诉$.ajax方法不要设置请求参数的类型
        contentType:false,
        success: function (response) {
            $('#preview').attr('src',response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });
});
$.ajax({
    type: "GET",
    url: "/users",
    success: function (response) {
        let html =template('userTpl',{data:response});
        $('#userBox').html(html)
        
    }
});
$('#userBox').on('click','.edit',function(){
    let id=$(this).attr('data-id');
    $.ajax({
        type: "get",
        url: `/users/${id}`,
        success: function (response) {
         
        let html=template('modifyTpl',response)
        

        
        $('#modifyBox').html(html)
        
        }
    });
})
$('#modifyBox').on('submit','#user-form',function(){
    let modifyData=$(this).serialize()
    let id=$(this).attr('data-id')

    
   $.ajax({
       type: "put",
       url: `/users/${id}`,
       data: modifyData,
       success: function (response) {
           console.log(1);
           location.reload()
           
           
       }
   });
    return false;
    
})