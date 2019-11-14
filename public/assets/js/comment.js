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