$('#logout').on('click',function(){
    var isconfirm=  confirm('你要退出码');
    if (isconfirm) {
      $.ajax({
        type: "post",
        url: "/logout",
        success: function (response) {
          location.href='./login.html'
        },
        error:function(){
          alert('退出失败');
          
        }
      });
    }
   })
   $.ajax({
     type: "get",
     url: `/users/${userId}`,
     success: function (response) {
      $('.avatar').attr('src',response.avatar)
      $('.profile .name').html(response.nickName)
     }
   });
   function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }