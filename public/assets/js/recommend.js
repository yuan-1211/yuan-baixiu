$.ajax({
    type: "GET",
    url: "/posts/recommend",
    success: function (response) {
        let recommendTpl=`
        {{each data}}
         <li>
            <a href="detail.html?id={{$value._id}}">
              <img src="{{$value.thumbnail}}" alt="">
              <span>{{$value.title}}</span>
            </a>
          </li>
          {{/each}}
        `
        let html=template.render(recommendTpl,{data:response})
        $('#recommendBox').html(html)
        
    }
});