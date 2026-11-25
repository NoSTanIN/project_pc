emailjs.init({
    publicKey: "-wrcuDwEZLuXr-NPL",
});

$(function() {
    $('#contact-form').on('submit', function(event) {
        event.preventDefault(); 

        emailjs.sendForm('service_9ovcw9y', 'template_6l6nh4l', this)
            .then(function() {
                console.log('SUCCESS!');
                alert('메일 전송에 성공하였습니다.');

                $('#contact-form')[0].reset(0);

            }, function(error) {
                console.log('FAILED...', error);
                alert('메일 전송에 실패하였습니다.');
            });
    });
});