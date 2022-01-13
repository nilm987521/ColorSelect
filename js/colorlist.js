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
    
    // TODO FIX .on(event,func) not work completely
    // $('div.color_node').on('hover',ColorCodeInit);
    $('div.color_node').hover(ColorCodeInit);
    $('div.color_node').click(function () {
        pinned = !pinned;
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
        $('div#copy').fadeToggle()
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
    let minx = d.position().left
    let miny = d.position().top
    let maxx = d.width() + minx
    let maxy = d.height() + miny

    if (e.pageX < minx | e.pageX > maxx) {
        $('div.colortag').css('display', 'none')
    } else if (e.pageY < miny | e.pageY > maxy) {
        $('div.colortag').css('display', 'none')
    } else {
        $('div.colortag').css('display', 'inline-block')
    }
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
    if (pinned) {return}
    $('div.colortag span')[0].innerHTML = $(this).css("background-color");
    $('div.largecolor').css('background-color', $(this).css("background-color"));
    $('div.colortag').css('top', $(this).position().top + 10);
    $('div.colortag').css('left', $(this).position().left + 10);
    $('button#copy')[0].value = $(this).attr('alt')
}