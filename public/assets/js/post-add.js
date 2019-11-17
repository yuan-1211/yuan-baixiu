$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        let html = template('categroyTpl', {
            data: response
        });
        $('#category').html(html)
    }
});
$('#feature').on('change',function(){
    let file=this.files[0]
    let formData = new FormData();
    formData.append('cover',file); 
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        contentType:false,
        processData:false,
        success: function (response) {
            $('#thumbnail').val(response[0].cover)
        }
    });
});
$("#addForm").on('submit',function(){
    let formData=$(this).serialize()
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function (response) {
            location.href='/admin/posts.html'
        }
    });
    return false
});

function getId(id){
   let params= location.search.substr(1).split('&')
    for (let i = 0; i < params.length; i++) {
        let arr= params[i].split('=')
        if(arr[0]==id){
            return arr[1]
        }
        return -1       
    }  
}
var id=getId('id')
if(id!=-1){
    $.ajax({
        type: "get",
        url: `/posts/${id}`,
        success: function (response) {
            $.ajax({
                type: "get",
                url: "/categories",
                success: function (categories) {
                 response.categories=categories
                 let html=template('modifyTpl',response)
                 $('#parentBox').html(html)
                
                }
            });
            
            
            
        }
    });
} ;
$('#parentBox').on('submit','#modifyForm',function(){
    let formData=$(this).serialize();
    let id=$(this).attr('data-id');
    $.ajax({
        type: "put",
        url: `/posts/${id}`,
        data: formData,
        success: function (response) {
           location.href='/admin/posts.html'   
        }
    });
    return false
})
 