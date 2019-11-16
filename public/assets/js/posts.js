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

