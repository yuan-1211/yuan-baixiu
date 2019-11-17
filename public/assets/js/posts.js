$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
       let html=template('postsTpl',{data:response.records});
       $('#postBox').html(html);
    //    console.log(response);
       let page=template('pageTpl',response);
       $('#pageBox').html(page)
       
    }
});
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  };
  function changePage(page){
    $.ajax({
        type: "get",
        url: "/posts",
        data:{
            page:page
        },
        success: function (response) {
            let html=template('postsTpl',{data:response.records});
            $('#postBox').html(html);
            // console.log(response);
            let page=template('pageTpl',response);
            $('#pageBox').html(page)
        }
    });
  };
  $.ajax({
      type: "get",
      url: "/categories",
      success: function (response) {
          let html=template('classifyTpl',{data:response});
          $('#classifyBox').html(html)
        //   console.log(response);
          
      }
  });
  $('#filterForm').on('submit',function(){
    let formdata=$(this).serialize()
    $.ajax({
        type: "get",
        url: "/posts",
        data:formdata,
        success: function (response) {
            let html=template('postsTpl',{data:response.records});
            $('#postBox').html(html);
            // console.log(response);
            let page=template('pageTpl',response);
            $('#pageBox').html(page)
        }
    });
    return false
  })
  $('#postBox').on('click','.delete',function(){
      let id=$(this).attr('data-id')
     if(confirm('确定要删除？')) {
          $.ajax({
          type: "DELETE",
          url: `/posts/${id}`,
          success: function (response) {
              location.reload()
          }
      });
     }
  })
        var id, userId;
        $('#postBox').on('click', ".postCom", function () {
            id = $(this).data('id')
            console.log(id, 678);
            userId = JSON.parse(localStorage.getItem('user'))._id
            console.log(userId, 444);
            $('#exampleModal').modal('show')
        })

        /* 点击发布 */
        $('.addCom').on('click', function () {
            var content = $('#message-text').val()
            console.log(content, 1111);
            $.ajax({
            type: 'post',
            url: '/comments',
            data: {
                author: userId,
                content: content,
                post: id
            },
            success: function (res) {
                console.log(res, 543);
                $('#exampleModal').modal('hide')
            }
            })
        })
   


