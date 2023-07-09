        window.onload = function () {
            var flag = 0;
            var table = document.getElementsByTagName('table')[0];
            if (typeof table !== "undefined" && !table.tHead) {
                $('table').remove();
            }
            var credit = document.getElementById("credit-card-input");
            credit.addEventListener('blur',
                function () {
                    getJ2Data();
                },
                false
            );

            //====================== copy

            var userIdCheck = $('#UserId').val();
            if (userIdCheck != undefined) {

                var pageLang = document.getElementsByName("PageLang")[0].value;
                var removeVal = true;
                switch (pageLang) {
                    case "_eng":
                        removeVal = false;
                        break;
                    default:
                        removeVal = true;
                }

                if (userIdCheck.indexOf('L') == 0) {
                    if (removeVal == false) {
                        setElementVisibility("userId-container", "hide");
                    } else {
                        document.getElementById("userId-input").value = "";
                        setElementVisibility("userId-container", "show");
                    }

                } else if (userIdCheck == "000000000") {
                    setElementVisibility("userId-container", "hide");
                }
                //====================== copy-end

            }
            credit.style.backgroundRepeat = "no-repeat";
            var tash = document.getElementsByName("Tash")[0];
            var price = document.getElementById("Price");
            if (price.children.length == 1) {
                //$('#existsPrice').remove();
                price.className = "";
                price.setAttribute("style", "text-align:center");
                var amount = document.getElementsByName("Amount")[0];
                if (tash && tash.type == "select-one") {
                    amount.addEventListener('blur', function () {
                            updatePayments();
                        },
                        false
                    );
                }
                amount.id = "totalPrice";
                amount.style.width = "70%";
                amount.className = amount.className + " required";
                flag = 1;
            } //else {
            //$('#dontexistsPrice').remove();
            //$('#totalPrice').css('width','75%');
            //$('#totalPrice').css('font-size', 'inherit');
            //}

            if (tash && tash.type == "select-one") {
                tash.className = "input-text sml";
                tash.disabled = true;
                tash.addEventListener('change',
                    function () {
                        updatePayments();
                    },
                    false
                );
                updatePayments();
            } else {
                setElementVisibility("payments-container2", "hide");
            }

        }
        var ajax = new sack();
        var currentClientID = false;
        var currentCC = false;

        var localUserId_bypass

        function showClientData() {
            localUserId_bypass = document.getElementById('userId-input').value;
            eval(ajax.response);
            if ($('#userId-container').is(':visible')) {
                if (localUserId_bypass == "000000000") {
                    document.getElementById('userId-input').value = ""
                } else {
                    document.getElementById('userId-input').value = localUserId_bypass
                }
            }
        }

        function getJ2Data() {
            var clientCC = document.getElementById('credit-card-input').value;
            document.getElementById('creditError').innerHTML = "";
            //alert(clientCC);
            if (clientCC != currentCC) {
                document.getElementById('credit-card-input').style.backgroundImage = "URL('https://yaadpay.co.il/yaadpay/tmp/yaadfull/img/j2/LOADER-2.gif')";
                currentCC = clientCC
                ajax.requestFile = 'YP-formurl-SC?Masof=YP-Lmasof-SC&action=J2Leumi&CC=' + clientCC + '&text=';
                ajax.method = 'GET';
                ajax.onCompletion = showClientData;
                ajax.runAJAX();
            }

        }

        function setElementVisibility(elemID, visibility) {
            if (elemID == "userId-container" && visibility == "hide") {
                $('#userId-input').removeClass('requierd');
            } else if (document.getElementById('userId-input').className.indexOf('requierd') == -1) {
                $('#userId-input').addClass('requierd');
            }
            switch (visibility) {
                case "hide":
                    $("#" + elemID).hide();
                    break;

                case "show":
                    $("#" + elemID).show();
            }
        }