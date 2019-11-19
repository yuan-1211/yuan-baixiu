let key=getId('key')
$.ajax({
    type: "GET",
    url: `/posts/search/${key}`,
    success: function (response) {
            let html=template('listTpl',{data:response})
            $('#listBox').html(html)    
    }
});
