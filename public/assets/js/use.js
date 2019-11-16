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
});
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
    
});
$('#userBox').on('click','.delete',function(){
    if (confirm('你确定要退出吗')){
        let id=$(this).attr('data-id')
        $.ajax({
            type: "delete",
            url: `/users/${id}`,
            success: function (response) {
                location.reload()
            }
        });
    }
});
let selectAll=$('#selectAll');
let deleteMany= $('#deleteMany')
//全选按钮状态
selectAll.on('click',function(){
    let status= $(this).prop('checked');
    if(status){
        deleteMany.show()
    }else(
        deleteMany.hide()
    )
    $('#userBox').find('input').prop('checked',status);
});
//复选框状态改变时全选框的状态
$('#userBox').on('change','#userStatus',function(){
    let inputs=$('#userBox').find('input');
    if(inputs.length==inputs.filter(':checked').length){
        selectAll.prop('checked',true)
    }else(
        selectAll.prop('checked',false)
    )
    if(inputs.filter(':checked').length>0){
        deleteMany.show()
    }else(
        deleteMany.hide()
    )
    
});
deleteMany.on('click',function(){ 
    let  id=[]
    let input=$('#userBox').find('input').filter(':checked')
    input.each( function (index, element) {  
        id.push($(element).attr('data-id'));
    });
    if(confirm('确定要删除？')){
    $.ajax({
        type: "delete",
        url: `/users/`+id.join('-'),
        success: function (response) {
            location.reload()
        }
    });
}
})
