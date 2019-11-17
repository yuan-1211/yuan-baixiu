$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
     
        
        let html=template('commentTpl',response)
        $('#commentBox').html(html)
        let page=template('pageTpl',response);
        $('#pageBox').html(page)
        
    }
});
function changePage(page){
    $.ajax({
        type: "get",
        url: "/comments",
        data:{
            page
        },
        success: function (response) {
            let html=template('commentTpl',response)
            $('#commentBox').html(html)
            let page=template('pageTpl',response);
            $('#pageBox').html(page)
            
        }
    })
}
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
};
$('#commentBox').on('click','#state',function(){
    let state=$(this).attr('data-state')==0?1:0;
    let id=$(this).attr('data-id')
    $.ajax({
        type: "PUT",
        url: `/comments/${id}`,
        data:{
            state
        },
        success: function (response) {
            location.reload()
        }
    });
});
$('#commentBox').on('click','.delete',function(){
    let id=$(this).attr('data-id')
    $.ajax({
        type: "DELETE",
        url: `/comments/${id}`,
        success: function (response) {
            location.reload()
        }
    });
})