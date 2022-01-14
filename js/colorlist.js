var pinned = false;
$(document).ready(function () {
    ToCenter()
    //產生顏色方塊
    var br = `<br>`;
    let i = 0;
    for (let j = 0; j < 16; j++) {
        $('div.colorlist').append(`<div id=\"car${j}\" class='car'></div>`)
        if (j != 0 & j % 4 == 3) {
            $('div.colorlist').append(br)
        }
    };  
    do {
        $(`div#car${i % 16}`).append(`<div class='color_node' 
                                            style='background-color:#${DecimalToColorFormat(i)}'><\/div>`)
        if (i % 256 == 255) {
            $('div.car').append(br)
        }
        i++
    } while (i < 16 * 16 * 16);
    
    // ColorTag
    $('div.color_node').on("mouseenter",ColorCodeInit);

    // 釘住ColorTag位置
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

    // 複製顏色代碼
    $('button#copy').click(function() {
        switch($( "input:checked" )[0].value){
            case 'HEX':
                navigator.clipboard.writeText(RGB2HEX($('span.rgb')[0].innerHTML))
                break
            case 'RGB':
                navigator.clipboard.writeText($('span.rgb')[0].innerHTML)
                break
        }  
    })

    // ColorTag跟隨滑鼠
    $(window).mousemove(function (e) {
        MouseMoveInColorList(e)
    });

    // 更改顏色透明度
    $('input.input-range').change(function() {
        let hexcolor =  RGB2HEX($('div.largecolor').css('background-color'))
        $('div.largecolor').css('background-color',hexcolor + DEC2HEX($(this).val()))
    }) 

    // 視窗大小改變時畫面致中
    $(window).resize(ToCenter)
})

// --------------   自訂Function    -----------------
// --------------   自訂Function    -----------------
// --------------   自訂Function    -----------------
// 數字轉顏色格式
function DecimalToColorFormat(number) {
    let colorstr = DEC2HEX(number)
    colorstr = ("000" + colorstr).substr(-3)
    let colorarr = colorstr.split("")
    let colorFormat = `${colorarr[2]}0${colorarr[1]}0${colorarr[0]}0`
    return colorFormat
}

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

// 顏色RGB格式 轉換 16進制格式
function RGB2HEX(str) {
    // TODO　FIX RGBA regex pattern
    // let regx = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/
    let regx = /^rgb.*\((\d{1,3}), (\d{1,3}), (\d{1,3}).*\)/
    let color_arr = str.match(regx)
    let res = ''
    for (let i = 1;i < color_arr.length ; i ++) {
        res = res + DEC2HEX(parseInt(color_arr[i]))
    }
    return '#' + res
}

// 10進位變16進位
function DEC2HEX(number){
  if (number < 0)
  {number = 0xFFFFFFFF + number + 1;}
  return number.toString(16).toUpperCase();
}