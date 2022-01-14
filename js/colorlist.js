var pinned = false;
$(document).ready(function () {
    //產生顏色方塊
    var br = `<br>`;
    for (let j = 0; j < 16; j++) {
        $('div.colorlist').append(`<div id=\"car${j}\" class='car'></div>`)
        if (j != 0 & j % 4 == 3) {
            $('div.colorlist').append(br)
        }
    };

    let i = 0;
    do {
        $(`div#car${i % 16}`).append(`<div class='color_node' 
                                            style='background-color:#${DecimalToColorFormat(i)}' 
                                            alt='#${DecimalToColorFormat(i)}'><\/div>`)
        if (i % 256 == 255) {
            $('div.car').append(br)
        }
        i++
    } while (i < 16 * 16 * 16);
    
    // NOTION on沒有hover可以註冊，須改用mouseenter mouseleave
    $('div.color_node').on("mouseenter",ColorCodeInit);
    // $('div.color_node').hover(ColorCodeInit);
    //-----------------------------------------

    $('div.color_node').click(function () {
        pinned = !pinned;
        $('div#copy').fadeToggle(100)
        if (pinned) {
            $('div.largecolor').animate({
                width: 150,
                height: 150,
            },100)
        } else {
            $('div.largecolor').animate({
                width: 110,
                height: 110,
            },100)
        }
        
    })

    $('button#copy').click(function() {
        switch($( "input:checked" )[0].value){
            case 'HEX':
                navigator.clipboard.writeText($('button#copy')[0].value)
                break
            case 'RGB':
                navigator.clipboard.writeText($('span.rgb')[0].innerHTML)
                break
        }
        
    })

    $(window).mousemove(function (e) {
        MouseMoveInColorList(e)
    });
})

// 顯示ColorTag
function MouseMoveInColorList(e) {
    if (pinned) {
        $('div.colortag').css('display', 'inline-block')
        return;
    }
    $('div.colortag').css('display', 'inline-block')
    let d = $('div.colorlist')
    let minx = ($('body').width() -$('div.colorlist').width()) / 2
    let miny = ($(window).height() - $('div.colorlist').height()) / 2
    let maxx = ($('body').width() / 2) + ($('div.colorlist').width() / 2)
    let maxy = ($(window).height() + $('div.colorlist').height()) / 2

    if (e.pageX < minx | e.pageX > maxx) {
        $('div.colortag').css('display', 'none')
    } else if (e.pageY < miny | e.pageY > maxy) {
        $('div.colortag').css('display', 'none')
    } else {
        $('div.colortag').css('display', 'inline-block')
    }

    $(window).resize(ToCenter)

    ToCenter()
}

// 數字轉顏色格式
function DecimalToColorFormat(number) {
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    let colorstr = number.toString(16).toUpperCase()
    colorstr = ("000" + colorstr).substr(-3)
    let colorarr = colorstr.split("")
    let colorFormat = `${colorarr[2]}0${colorarr[1]}0${colorarr[0]}0`
    return colorFormat
}

// 顏色展示區塊移動
// TODO to make ColorTag moving smoothly...
function ColorCodeInit() {
    let top_v;
    let left_v;
    if (pinned) {return}
    $('div.colortag span')[0].innerHTML = $(this).css("background-color");
    $('div.largecolor').css('background-color', $(this).css("background-color"));
    if ( $(this).position().top > $(window).height()/2) {
        top_v = $(this).position().top - 150
    } else {
        top_v = $(this).position().top + 10
    }
    if ($(this).position().left > $(window).width()/2) {
        left_v = $(this).position().left - 135
    } else {
        left_v = $(this).position().left + 10
    }
    $('div.colortag').css('top', top_v);
    $('div.colortag').css('left',left_v);
    $('button#copy')[0].value = $(this).attr('alt')
}

// 畫面致中
function ToCenter() {
    let body_width = $('body').width()
    let body_height =  $(window).height()
    $('div.colorlist').css('margin-top',(body_height-552)/2)
    $('div.colorlist').css('margin-left',(body_width-552)/2)
}