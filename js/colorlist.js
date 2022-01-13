$(document).ready(function() {
    let i = 0;
    let br = document.createElement('br');
    for (let j = 0;j<16;j++) {
        $('div.colorlist').append(`<div id=\"car${j}\" class='car'></div>`)
        if (j != 0 & j % 4 == 3) {$('div.colorlist').append("<br>")}
    }
    do {
        $(`div#car${i % 16}`).append(`<div class='color_node' style='background-color:#${DecimalToColorFormat(i)}'><\/div>`)
        if (i % 256 == 255 ) {
            $('div.car').append(`<br>`)
        }
        i ++
    } while (i < 16*16*16)


    $('div.color_node').hover(function () {
        $('div.colorcode span')[0].innerHTML = $( this ).css( "background-color" );
        $('div.colorcode').css('top',$(this).position().top + 10)
        $('div.colorcode').css('left',$(this).position().left + 10)
    })

    $('div.color_node').click(function () {
        let h =  $(this).css('height')
        let w =  $(this).css('width')
        $(this).animate({width:10,height:10},1000, function() {
            $(this).animate({width:w,height:h},1000)
        })
    })
    // TODO fix mousemove event no trigger use another funciont
    //$(window).mousemove(MouseMoveInColorList(e));

    $(window).mousemove(function(e) {
        $('div.colorcode').css('display', 'inline-block')
        let d = $('div.colorlist')
        let minx = d.position().left
        let miny = d.position().top
        let maxx = d.width() + minx
        let maxy = d.height() + miny
    
        if (e.pageX < minx | e.pageX > maxx) {
            $('div.colorcode').css('display', 'none')
        } else if (e.pageY < miny | e.pageY > maxy) {
            $('div.colorcode').css('display', 'none') 
        } else {
            $('div.colorcode').css('display', 'inline-block')
        }
    });
})



function MouseMoveInColorList(e) {
    $('div.colorcode').css('display', 'inline-block')
    let d = $('div.colorlist')
    let minx = d.position().left
    let miny = d.position().top
    let maxx = d.width() + minx
    let maxy = d.height() + miny

    if (e.pageX < minx | e.pageX > maxx) {
        $('div.colorcode').css('display', 'none')
    } else if (e.pageY < miny | e.pageY > maxy) {
        $('div.colorcode').css('display', 'none') 
    } else {
        $('div.colorcode').css('display', 'inline-block')
    }
}

// 數字轉顏色格式
function DecimalToColorFormat(number){
    if (number < 0)
    {number = 0xFFFFFFFF + number + 1;}
  
    let colorstr = number.toString(16).toUpperCase()
    colorstr = ("000" + colorstr).substr(-3)
    let colorarr = colorstr.split("")
    let colorFormat = `${colorarr[2]}0${colorarr[1]}0${colorarr[0]}0`
    return colorFormat
}