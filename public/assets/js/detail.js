
let id =getId('id')
var preview;
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
$.ajax({
    type: "get",
    url: "/settings",  
    success: function (response) {
        preview=response.preview
        if(response.comment){
        var html=template('commentTpl')
        $('#commentBox1').html(html)
        }
    }
});
$('.content').on('submit','form',function(){
    var content = $(this).find('textarea').val();
	// 代表评论的状态
	var state;
		
	if (preview) {
		// 要经过人工审核
		state = 0;
	}else {
		// 不需要经过人工审核
		state = 1;
	}

	// 向服务器端发送请求 执行添加评论操作
	$.ajax({
		type: 'get',
		url: '/comments',
		data: {
			content: content,
			post: id,
			state: state
		},
		success: function () {
			alert('评论成功')
			location.reload();
		},
		error: function () {
			alert('评论失败')
		}
	})

	// 阻止表单默认提交行为
	return false;
})