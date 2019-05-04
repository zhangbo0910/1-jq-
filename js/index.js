$('.ss_list').mouseenter(function(){
    $('.ss_list_bg').show();
}).mouseleave(function(){
    $('.ss_list_bg').hide();
});
$(function(){
    $(".leftNav ul li").hover(
        function(){
            $(this).find(".fj").addClass("nuw");
            $(this).find(".zj").show();
        }
        ,
        function(){
            $(this).find(".fj").removeClass("nuw");
            $(this).find(".zj").hide();
        }
    )
});
function changeImg(){
    var index =0;
    var stop = false;
    var $imgLi = $('.slide_box').children('li');
    var $numLi = $('.num').children('li');
    $numLi.mouseover(function(){
        stop = true;
        index=$numLi.index($(this));
        $imgLi.eq(index).stop(true,true).fadeIn().siblings().fadeOut();
        $(this).addClass("active").stop(true,true).siblings().removeClass('active');
    }).mouseout(function(){
        stop =false;
    });
    setInterval(function(){
        if(stop) return;
        index ++;
        if(index>=$imgLi.length){
            index = 0;
        }
        $imgLi.eq(index).stop(true,true).fadeIn().siblings().fadeOut();
        $numLi.eq(index).addClass("active").stop(true,true).siblings().removeClass('active');
    },3000);
}
changeImg();
$(function(){
    function movedown(){
        var marginTop = 0 ;
        var stop =false;
        var interval = setInterval(function(){
            if(stop) return;
            $('#express').children('li').first().animate({
                    'margin-top':marginTop--},
                0,
                function(){
                    var $first =$(this);
                    if(!$first.is(':animated')){
                        if((-marginTop)>$first.height()){
                            $first.css({'margin-top':0}).appendTo($('#express'));
                            marginTop = 0;
                        }
                    }
                });
        },50);
        $('#express').mouseover(function(){
            stop = true;
        }).mouseout(function(){
            stop = false;
        });
    }
    movedown();
});
(function(){
    var timeoutId;
    var $last = $('.last');
    function fadeOut() {
        timeoutId = setTimeout(function() {
            $last.fadeOut('slow');
        }, 500)
    }
    $('.car_t').hover(function() {
        clearTimeout(timeoutId);
        $last.fadeIn('slow');
    }, fadeOut);
    $last.hover(function() {
        clearTimeout(timeoutId)
    }, fadeOut);
    var catObj = {
        list: [
        ],
        totalPrice: 0,
        totalCount: 0
    };
    var $totalPrice = $('.J_totalPrice');
    var $totalCount = $('.J_totalCount');
    var $noshop = $('.noshop');
    var $shop = $('.shop');
    $shop.on('onInit', function(){
        render(-1)
    }).on('onDelete', function(e, index) {
        catObj.list.splice(index, 1);
        if(!catObj.list.length) {
            $shop.hide();
            $noshop.show()
        }
        render(-1)
    }).on('onChange', function(e, index) {
        render(index)
    });
    function render(index) {
        if (index > -1) {
            var $item = $('li', $shop).eq(index);
            var item = catObj.list[index];
            $('.J_inputCount', $item).val(item.count);
            $('.J_count', $item).text('共'+item.count+'件商品');
            $('.J_smallTotalPrice', $item).text('￥'+item.smallTotalPrice)
        }
        catObj.totalCount = 0;
        catObj.totalPrice = 0;
        $.map(catObj.list, function(item) {
            catObj.totalCount += item.count;
            catObj.totalPrice += item.smallTotalPrice
        });
        $totalPrice.text('￥'+ catObj.totalPrice);
        $totalCount.text('(' + catObj.totalCount +')')
    }
    function setInputCount (index, count) {
        var price = catObj.list[index].price;
        count = count - 0;
        catObj.list[index] = {
            count: count,
            price: price,
            smallTotalPrice: count * price
        };
        $shop.trigger('onChange', index)
    }
    (function() {
        var $li = $('li', $shop);
        if (!$li.length) {
            $shop.hide();
            $noshop.show();
            return
        }
        $li.each(function(index) {
            var smallTotalPrice;
            var price = $('.J_smallTotalPrice', this).text();
            var count = $('.J_inputCount', this).val();
            price = price.slice(1) - 0;
            count = count - 0;
            smallTotalPrice = price * count;
            catObj.list.push({
                price: price,
                count: count,
                smallTotalPrice: smallTotalPrice
            })
        });
        $shop.trigger('onInit')
    })();
    $('.J_btnDelete').click(function() {
        if (!window.confirm('确定要删除吗？')) return;
        var $li = $('li', $shop);
        var index = $li.index($(this).parents('li'));
        $li.eq(index).remove();
        $shop.trigger('onDelete', [index])
    });
    $('.J_btnAddCount').click(function() {
        var $li = $('li', $shop);
        var index = $li.index($(this).parents('li'));
        var count = $('.J_inputCount', $li.eq(index)).val();
        setInputCount(index, ++count)
    });
    $('.J_btnDelCount').click(function() {
        var $li = $('li', $shop);
        var index = $li.index($(this).parents('li'));
        var count = $('.J_inputCount', $li.eq(index)).val();
        if (--count < 1) {
            if (!window.confirm('确定要删除吗？')) return;
            $li.eq(index).remove();
            $shop.trigger('onDelete', [index])
        } else {
            setInputCount(index, count)
        }
    });
    $('.J_inputCount').change(function(e) {
        var $li = $('li', $shop);
        var index = $li.index($(this).parents('li'));
        var newCount = $(this).val();
        if(/^[1-9]\d*$/.test(newCount)) {
            setInputCount(index, newCount)
        } else {
            $(this).val(catObj.list[index].count)
        }
    })
})();
