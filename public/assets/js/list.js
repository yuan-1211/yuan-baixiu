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
 let id=getId('categoryId');
 console.log(id);
 $.ajax({
     type: "GET",
     url: `/posts/category/${id}`,
     success: function (response) {
         let html=template('listTpl',{data:response})
         $('#listBox').html(html)
         
     }
 });
 $.ajax({
     type: "GET",
     url: `/categories/${id}`,
     success: function (response) {
        $('#categoryTitle').html(response.title)
     }
 });