$.ajax({
    type: "get",
    url: "/posts/random",
    success: function (response) {
        let randomTpl=`
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title">{{$value.title}}</p>
              <p class="reading">{{$value.meta.views}}</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
          </li>
          {{/each}}
        `
        let html=template.render(randomTpl,{data:response})
        $('#randomBox').html(html)
        
    }
});
$.ajax({
    type: "GET",
    url: "/comments/lasted",
    success: function (response) {
        let lastedTpl=`
        {{each data}}
			<li>
			  <a href="javascript:;">
			    <div class="avatar">
			      <img src="{{$value.author.avatar}}" alt="">
			    </div>
			    <div class="txt">
			      <p>
			        <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
			      </p>
			      <p>{{$value.content}}</p>
			    </div>
			  </a>
			</li>
			{{/each}}
        `
        let html=template.render(lastedTpl,{data:response});
        // console.log(html);
        
        $('#commentBox').html(html)
        
    }
});
$.ajax({
	type: 'get',
	url: '/categories',
	success: function (response) {
		var navTpl = `
			{{each data}}
			<li>
				<a href="list.html?categoryId={{$value._id}}">
					<i class="fa {{$value.className}}"></i>{{$value.title}}
				</a>
			</li>
			{{/each}}
		`;
		var html = template.render(navTpl, {data: response});
		$('#navBox').html(html)
		$('#topNavBox').html(html)  //顶部导航栏（缩小窗口可以看见）
	}
})