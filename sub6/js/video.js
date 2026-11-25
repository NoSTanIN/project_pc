    $('.thumb').click(function() {
        // 1. [클릭한 하단 리스트]의 정보 가져오기
        var clickedId = $(this).attr('data-id');
        var clickedTitle = $(this).find('.thumb-title').text();
        var clickedDesc = $(this).find('.thumb-desc').text();
        var clickedImg = $(this).find('img').attr('src'); // 클릭한 썸네일 이미지 경로

        // 메인 영역 캐싱 (jQuery 객체로 여러 번 찾지 않기 위해)
        var $mainArea = $('#main-area');
        var $mainIframe = $('#main-iframe');
        var $mainTitle = $('#main-title');
        var $mainDesc = $('#main-desc');

        // 2. [현재 메인에 떠있는] 정보 가져오기
        var currentMainId = $mainArea.attr('data-id');
        var currentMainTitle = $mainTitle.text();
        var currentMainDesc = $mainDesc.text();
        var currentMainImg = $mainArea.attr('data-thumb'); // 메인 영역에 숨겨둔 이미지 경로

        // ==========================================
        // 3. 자리를 서로 맞바꿉니다 (Swap)
        // ==========================================

        // 메인 영역을 클릭한 영상 정보로 변경
        $mainArea.attr('data-id', clickedId);
        $mainArea.attr('data-thumb', clickedImg);
        $mainIframe.attr('src', 'https://www.youtube.com/embed/' + clickedId);
        $mainTitle.text(clickedTitle);
        $mainDesc.text(clickedDesc);

        // 클릭했던 하단 리스트 자리에 예전 메인 영상 정보 넣기
        $(this).attr('data-id', currentMainId);
        $(this).find('img').attr('src', currentMainImg);
        $(this).find('.thumb-title').text(currentMainTitle);
        $(this).find('.thumb-desc').text(currentMainDesc);
    });