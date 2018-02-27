'use strict'

$(document).ready(function() {
    var imgArr = [
            'https://kde.link/test/1.png',
            'https://kde.link/test/2.png',
            'https://kde.link/test/9.png',
            'https://kde.link/test/7.png',
            'https://kde.link/test/6.png',
            'https://kde.link/test/3.png',
            'https://kde.link/test/4.png',
            'https://kde.link/test/0.png',
            'https://kde.link/test/5.png',
            'https://kde.link/test/8.png'
        ],
        idArr = [],
        selectedItems = [],
        score = 0;

    $.getJSON('https://kde.link/test/get_field_size.php',
        function(response) {
            initField(response.width, response.height);
            addPictures();
        });

    function initField(width, height) {
        var tableContainer = '<table id="ourTable">';
        for (var i = 1; i <= height; i++) {
            tableContainer += '<tr>';
            for (var j = 1; j <= width; j++) {
                var newId = '' + i + j;
                tableContainer += '<td class="cell hidden-img" id="' + newId + '"></td>';
                idArr.push(newId);
            };
            tableContainer += '</tr>'
        };
        tableContainer += '</table>';
        $('body').append(tableContainer);
        $('#ourTable').attr('border', '1px');
        $("td.hidden-img").click(turnImg);
    };

    function randomInteger(max) {
        return Math.floor(Math.random() * max);
    };

    function addPictures() {
        var idArrLength = idArr.length;
        for (var i = 0; i < idArrLength / 2; i++) {
            var n1 = randomInteger(imgArr.length - 1);
            $('#' + idArr[idArr.length - 1]).html('<img src="' + imgArr[n1] + '">');
            idArr.pop();
            var n2 = randomInteger(idArr.length - 1);
            $('#' + idArr[n2]).html('<img src="' + imgArr[n1] + '">');
            idArr.splice(n2, 1);
        };
    };

    function turnImg() {
        if (selectedItems.length < 2) {
            if ($(this).hasClass('hidden-img')) {
                $(this).removeClass('hidden-img');
                if (selectedItems.length == 0) {
                    selectedItems.push(this);
                } else {
                    if ($(selectedItems[0]).find('img').attr('src') == $(this).find('img').attr('src')) {
                        score++;
                        $("#score").text(`Привильных ответов : ${score}`);
                        checkWin();
                        selectedItems.splice(0, 1);
                    } else {
                        selectedItems.push(this);
                    }
                }
            }
        } else {
            for (var i = 0; i < selectedItems.length; i++) {
                $(selectedItems[i]).addClass('hidden-img');
            }
            selectedItems = [];
        }
    };

    function checkWin() {
        if (score == $('#ourTable td').length / 2) {
            alert("Congratulations!");
        }
    };
});