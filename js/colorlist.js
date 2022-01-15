var pinned = false;
$(document).ready(function () {
    // div.main置中，產生顏色方塊
    ToCenter()
    let i = 0;
    for (let j = 0; j < 16; j++) {
        $('div.colorlist').append(`<div id=\"car${j}\" class='car'></div>`)
        if (j != 0 & j % 4 == 3) {
            $('div.colorlist').append(`<br>`)
        }
    };  
    do {
        $(`div#car${i % 16}`).append(`<div class='color_node' 
                                            style='background-color:#${NodeColorGen(i)}'><\/div>`)
        if (i % 256 == 255) {
            $('div.car').append(`<br>`)
        }
        i++
    } while (i < 16 * 16 * 16);
    
    // 移動ColorTag，並設定顏色
    $('div.color_node').on("mouseenter",function() {
        if (!pinned) {
            SetColorTagPosition($(this));
            SetLargeColor(
                RGB2HEX($('div.color_node:hover').css("background-color")) 
                + DEC2HEX(parseInt($('input.input-range').val()))
            );
            SetSpanInnerHtml($('div.largecolor').css("background-color"))
        }
    });

    // ColorTag顯示（判斷滑鼠位置是否在div.colorlist內）
    $(window).mousemove(function (e) {SetColorTagDisplay(e)});

    // 釘住ColorTag位置
    $('div.color_node').click(function () {
        pinned = !pinned;
        if (pinned) {
            $('div#copy').css('display','inline-block')
        } else {
            $('div#copy').css('display','none')
            SetColorTagPosition($(this))
            SetLargeColor(
                RGB2HEX($('div.color_node:hover').css("background-color")) 
                + DEC2HEX(parseInt($('input.input-range').val()))
            );
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

    // 更改顏色透明度
    $('input.input-range').change(function() {
        let hexcolor =  RGB2HEX($('div.largecolor').css('background-color'))
        SetLargeColor(hexcolor + DEC2HEX($(this).val()))
        SetSpanInnerHtml($('div.largecolor').css('background-color'))
    }) 

    // 視窗大小改變時畫面致中
    $(window).resize(ToCenter)
})

// --------------   自訂Function    -----------------
// --------------   自訂Function    -----------------
// --------------   自訂Function    -----------------
// 數字轉顏色格式
function NodeColorGen(number) {
    if (number < 0)
    {number= 0xFFFFFFFF + num + 1;}
    let colorstr = number.toString(16).toUpperCase();
    colorstr = ("000" + colorstr).substr(-3)
    let colorarr = colorstr.split("")
    let colorFormat = `${colorarr[2]}${colorarr[1]}${colorarr[0]}`
    return colorFormat
}

// 顯示ColorTag
function SetColorTagDisplay(e) {
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
    } else if ($('div.color_node:hover').length == 0 & !pinned) {
        $('div.colortag').css('display','none')
    } else {
        $('div.colortag').css('display', 'inline-block')
    }
}

// 顏色展示區塊移動
// TODO to make ColorTag moving smoothly...
function SetColorTagPosition(node) {
    let top_v;
    let left_v;
    if (pinned) {return}
    $('div.colortag span')[0].innerHTML = node.css("background-color");
    // $('div.largecolor').css('background-color', $(this).css("background-color"));
    if ( node.position().top > $(window).height()/2) {
        top_v = node.position().top - 275
    } else {
        top_v = node.position().top + 20
    }
    if (node.position().left > $(window).width()/2) {
        left_v = node.position().left - 245
    } else {
        left_v = node.position().left + 25
    }

    $('div.colortag').css('top', top_v);
    $('div.colortag').css('left',left_v);
}

// 畫面致中
function ToCenter() {
    if ($(window).width() > 600 & $(window).height() > 600) {
        let body_width = $('body').width()
        let body_height =  $(window).height()
        $('div.colorlist').css('margin-top',(body_height-552)/2)
        $('div.colorlist').css('margin-left',(body_width-552)/2)
    } else {
        $('div.colorlist').css('margin',0)
    }
}

// 顏色RGB格式 轉換 16進制格式
function RGB2HEX(str) {
    // TODO　FIX RGBA regex pattern
    let rgb_reg = /^rgba{0,1}\((\d{1,3}), {0,1}(\d{1,3}), {0,1}(\d{1,3})/
    let color_arr = str.match(rgb_reg)

    let res = ''
    for (let i = 1;i < color_arr.length ; i ++) {
        res = res + DEC2HEX(parseInt(color_arr[i]))
    }
    return '#' + res
}

// 10進位變16進位
function DEC2HEX(number) {
    let num = parseInt(number)
    if (num < 0)
    {num= 0xFFFFFFFF + num + 1;}
    return ("0" + num.toString(16).toUpperCase()).substr(-2);
    // return num.toString(16).toUpperCase();
}

function SetLargeColor(HEXCOLOR) {
    $('div.largecolor').css('background-color',HEXCOLOR)
}

function SetSpanInnerHtml (str) {
    $('span.rgb').html(str)
}