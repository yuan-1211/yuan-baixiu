//提交表单数据
$('#addCategroy').on('submit', function () {
    let formData=$(this).serialize();
    $.ajax({
        type: "POST",
        url: "/categories",
        data: formData,
        success: function (response) {
            location.reload()
        }
    });
    return false
    
});
//获取分类信息然后渲染到页面
$.ajax({
    type: "GET",
    url: "/categories",
    success: function (response) {
        let html =template('categroyTpl',{data:response});
        $('#categroyBox').html(html);
    }
});
//点击编辑按钮修改
$('#categroyBox').on('click','#edit',function(){
    let id=$(this).attr('data-id')
    $.ajax({
        type: "get",
        url: `/categories/${id}`,
        success: function (response) {
            let html=template('modifyCategroyTpl',response)
            $('#formData').html(html)      
        }
    });  
});
//修改后的数据提交
$('#formData').on('submit','#modifyCategroy',function(){
    let id=$(this).attr('data-id');
    let formData=$(this).serialize()
    console.log(id);
    $.ajax({
        type: "put",
        url: `/categories/${id}`,
        data: formData,
        success: function (response) {
            location.reload()
        }
    });
    return false
});
//删除分类
$('#categroyBox').on('click','#delete',function(){
    if(confirm('确定删除？')){
        let id=$(this).attr('data-id')
    $.ajax({
        type: "delete",
        url: `/categories/${id}`,
        success: function (response) {
            location.reload()    
        }
    });  
    }
    
});