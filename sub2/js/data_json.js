$(function(){
    var key, value;
  
    function getParams() {
        var url = decodeURIComponent(location.href);
        // 파라미터가 아예 없을 때 오류가 나지 않도록 조건문 추가
        if(url.indexOf('?') !== -1) {
            var params = url.substring( url.indexOf('?')+1, url.length );
            key = params.split("=")[0];
            value = params.split("=")[1];
        }
    }   
    getParams();

   // ajax 처리
   $.ajax({
       url: './js/data.json',
       dataType: 'json',
       success: function(data){
           var useData = data.products;
           
           function dataPrint(arr){
               var txt = '<ul>';
               for(var i in arr){
                   var $category = arr[i].category;
                   var $sname = arr[i].sname;
                   var $desc = arr[i].desc;
                   var $img = arr[i].img;
                   var $detail = arr[i].detail; // 💡 추가: json에서 detail(긴 설명) 가져오기

                   // 💡 li 태그 몰래 주머니(data-detail)에 긴 글을 숨겨둡니다.
                   txt+='<li data-detail="' + $detail + '">';
                   txt+='<img src="'+ $img +'" alt="">';
                   txt+='<dl>';
                   txt+='<dt>'+$category+'</dt>'; 
                   txt+='<dd>'+$sname+'</dd>'; 
                   txt+='<dd>'+$desc+'</dd>';
                   txt+='</dl>';
                   txt +='</li>';
               }
               txt += '</ul>';
               $('.product_list').html(txt);
           };
           
           var newArray = [];
            
           // 초기실행
           if(value){  
                newArray = useData.filter(function(element){
                    // 💡 제품명(sname)이나 카테고리명(category) 둘 중 하나라도 포함되면 검색되게 수정!
                    return element.sname.includes(value) || element.category.includes(value);
                });
                if(newArray.length!=0){ 
                  dataPrint(newArray);
                } else { 
                    $('.product_list').html('<span style="display:block;text-align:center; padding:50px 0; font-size:20px; color:red">검색된 상품이 없습니다</span>');
                }
           } else {  
                dataPrint(useData); 
           }
           
           // 1. 검색버튼을 클릭했을 때
           $('#btn').click(function(){
                var searchWord = $('#title').val().trim(); // 혹시 모를 띄어쓰기 공백 제거

                newArray = useData.filter(function(element){
                    // 💡 여기도 제품명(sname)이나 카테고리명(category) 모두 검사하도록 수정!
                    return element.sname.includes(searchWord) || element.category.includes(searchWord);
                });
                
                if(newArray.length!=0){
                    dataPrint(newArray);
                } else {
                      $('.product_list').html('<span style="display:block;text-align:center; padding:50px 0; font-size:20px; color:red">검색된 상품이 없습니다</span>');
                }
           });

           // 2. 카테고리 탭 클릭 시 필터링 (수정된 부분!)
           $('.serch_box_bottom li').click(function(){
               // 클릭한 탭에만 빨간색 활성화 불 들어오게 하기
               $('.serch_box_bottom li').removeClass('active');
               $(this).addClass('active');

               $('#title').val(''); // 검색창 비우기

               var tabIndex = $(this).index(); // 💡 몇 번째 탭인지 숫자로 가져오기 (0부터 시작)
               var cateName = $(this).text().trim(); // 💡 양옆의 불필요한 공백 제거(trim)

               if(tabIndex === 0){
                   // 💡 0번째(첫 번째) 탭인 전체보기를 누르면 무조건 원본 전체 출력!
                   dataPrint(useData);
               } else {
                   // 다른 탭을 누르면 JSON의 category와 이름이 똑같은 데이터만 걸러내기
                   var filteredArray = useData.filter(function(element){
                       return element.category === cateName; 
                   });
                   
                   if(filteredArray.length !== 0){
                       dataPrint(filteredArray);
                   } else {
                       $('.product_list').html('<span style="display:block;text-align:center; padding:50px 0; font-size:20px; color:red">해당 카테고리의 상품이 없습니다</span>');
                   }
               }
           });
       },
       error: function() {
           console.log("data.json 파일을 못 불러왔습니다. 경로를 확인해주세요!");
       }
   });

   // 3. 상품 리스트(li) 클릭 시 팝업 열기
   $('.product_list').on('click', 'li', function() {
       // 방금 클릭한 li 태그 안에서 이미지 주소와 글자들을 뽑아옵니다.
       var imgSrc = $(this).find('img').attr('src'); 
       var category = $(this).find('dt').text();     
       var sname = $(this).find('dd:eq(0)').text();  
       
       // 💡 영문 글자(desc) 대신 몰래 숨겨뒀던 긴 글(detail)을 꺼내옵니다.
       var detailText = $(this).attr('data-detail');   

       // 팝업 태그 조립 (영문을 없애고 긴 글 태그를 연결)
       var popHtml = '<img src="' + imgSrc + '" alt="' + sname + '">';
       popHtml += '<p>' + category + ' ' + sname + '</p>';
       popHtml += '<div class="pop_desc">' + detailText + '</div>'; // 긴 설명 추가!

       $('.pop_con').html(popHtml); 
       $('.modal_box').fadeIn('fast');
   });

   $('.close_pop, .modal_box').click(function(e) {
       e.preventDefault(); 
       $('.modal_box').fadeOut('fast');
   });

   $('.popup').click(function(e) {
       e.stopPropagation(); 
   });
});