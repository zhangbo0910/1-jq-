$('.ss_list').mouseenter(function(){
    $('.ss_list_bg').show();
}).mouseleave(function(){
    $('.ss_list_bg').hide();
});
(function(){
    var $li1 = $('#choice1 li');
    var $li2 = $('#choice2 li');
    choice($li1);
    choice($li2);
    function choice(obj){
        obj.click(function(){
            index=obj.index($(this));
            //alert(index)
            obj.eq(index).addClass('checked').siblings().removeClass('checked');
        });
    }
})();
(function(){
    var num = 1;
    $('.n_btn_1').click(function(){
        num ++;
        $('.n_ipt').val( num);
    });
    $('.n_btn_2').click(function(){
        num --;
        if(num<1){
            num = 1;
        }
        $('.n_ipt').val( num);
    });
})();
(function() {
    var recommendList = {
        list: [],
        count: 1,
        totalSum: 0
    };
    var $teamList = $('.team_list');
    var $check = $('.checkbox input');
    var $sumIpt = $('.sum_ipt');
    var $totalSum = $('.team_sum span');
    $teamList.each(function(){
        var price = $('.price span', this).text().slice(1) - 0;
        var checked = $('.checkbox input', this).is(':checked');
        recommendList.list.push({
            price: price,
            checked: checked
        })
    });
    recommendList.count = $sumIpt.val() || 1;
    $check.click(function() {
        var index = $check.index(this);
        var checked = $(this).is(':checked');
        recommendList.list[index].checked = checked;
        render()
    });
    $sumIpt.change(function(e) {
        var newCount = $(this).val();
        if(/^[1-9]\d*$/.test(newCount)) {
            recommendList.count = newCount -0
        } else {
            $(this).val(recommendList.count)
        }
        render()
    });
    function render() {
        recommendList.totalSum = recommendList.list.reduce(function(previousValue, item) {
            var price = item.checked ? item.price : 0;
            return previousValue + price
        }, 0) * recommendList.count;
        $totalSum.text(recommendList.totalSum)
    }
    render()
})();


