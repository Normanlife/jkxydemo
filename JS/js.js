$(document).ready(function() {
    //首页--导航条效果
    $('.firstpage').hover(function() { $('.navpanel').show(); }, function() { $('.navpanel').hide(); }) //除BUG
        //滑过导航时背景变灰，并且出现尖角，鼠标移走后消失
    $('.firstpage li').each(function(index) {
        $(this).mousemove(function() {
            $('.navpanel').show();
            if (index == 0) {
                $('.panel-item').removeClass('graybgcolor');
                return;
            }
            $('.angle').eq(index - 1).show();
            $('.panel-item').eq(index - 1).addClass('graybgcolor').siblings().removeClass('graybgcolor');
        }).mouseout(function() {
            $('.angle').eq(index - 1).hide();
        })
    });
    //滑过导航项目时，背景变灰并且出现尖角，移走后消失
    $('.navpanel').mousemove(function() {
            $(this).show();
        }).mouseout(function() {
            $(this).hide();
        })
        //滑过导航项目时，背景变灰并且出现尖角，移走后消失
    $('.panel-item').mousemove(function() {
        var index = $(this).index();
        // console.log(index)
        $('.panel-item').eq(index).addClass('graybgcolor');
        $('.panel-item').eq(index).find('.angle').show();
    }).mouseout(function() {
        var index = $(this).index();
        $('.panel-item').eq(index).removeClass('graybgcolor');
        $('.panel-item').eq(index).find('.angle').hide();
    });

    //导航条滑过出现项目事件！
    $('#fbox-nav>li').hover(function() {
        var index = $(this).index()
            // console.log(index)
        $('#fbox-nav>li').eq(index).addClass('fbnav-active').siblings().removeClass('fbnav-active');
        $('.fbox-nav-menu').eq(index).show();
    }, function() {
        var index = $(this).index();
        $('.fbox-nav-menu').eq(index).hide();
        $('#fbox-nav>li').eq(index).removeClass('fbnav-active');
    });

    //livelesson事件
    $('.livebox-week li').eq(0).addClass('weekactive');
    $('.livebox-lesson>div').eq(0).show();
    $('.livebox-week li').hover(function(){
        var index=$(this).index();
        $('.livebox-week li').eq(index).addClass('weekactive').siblings().removeClass('weekactive');
        $('.livebox-lesson>div').eq(index).show().siblings().hide();
    },function(){
        
    })

    //问答--导航效果事件
    $('.start-list .hoverGone').hover(function(){
        $('.start-list').hide();
        $('.move-list').show();
        var index=$(this).index();
        // console.log(index)
        $('.type-list li').eq(index).addClass('active1').siblings().removeClass('active1');
        $('.content>div').eq(index).show().siblings().hide();
    },function(){});

    $('.move-list').hover(function(){},function(){
        $('.start-list').show();
        $('.move-list').hide();
    })

    $('.type-list li').hover(function(){
        var index=$(this).index();
        // console.log(index);
        $('.type-list li').eq(index).addClass('active1').siblings().removeClass('active1');
        $('.content>div').eq(index).show().siblings().hide();
    },function(){});


    //滚动广告手动控制事件
    $('.fbm-advul li').eq(0).show(); //运行之前显示第一张图
    $('.fbm-adv-bottom li').eq(0).addClass('active'); //运行之前显示第一个按钮颜色

    $('.fbm-adv-bottom li').mouseover(function() {
        var index = $(this).index();
        i = index; //解决手动控制与轮播不同步的BUG
        $(this).addClass('active').siblings().removeClass('active'); //选择框变色
        $('.fbm-advul li').eq(index).stop().fadeIn(700).siblings().stop().fadeOut(700); //广告图根据变化
    });

    //图片自动播放
    var i = 0;
    var t = setInterval(move, 2000); //自动播放函数
    var a = $('.fbm-advul li').size(); //获取图片总张数

    //自动向右播放核心函数
    function move() {
        i++;

        if (i == a) {
            i = 0;
        }
        // console.log(a + "---" + i)
        // console.log($('.fbm-advul li').length)
        $('.fbm-advul li').eq(i).stop().fadeIn(700).siblings().stop().fadeOut(700); //广告图
        $('.fbm-adv-bottom li').eq(i).addClass('active').siblings().removeClass('active'); //按钮
    }

    //向左播放核心函数
    function moveL() {
        i--;

        if (i == -1) {
            i = a - 1;
        }

        $('.fbm-advul li').eq(i).stop().fadeIn(700).siblings().stop().fadeOut(700); //广告图
        $('.fbm-adv-bottom li').eq(i).addClass('active').siblings().removeClass('active'); //按钮
    }

    //鼠标移到广告时取消自动播放
    $('.fbox-middle-adv').hover(function() {
        clearInterval(t); //取消
    }, function() {
        t = setInterval(move, 2000); //重新执行
    });

    //点击左右按钮控制播放
    $('#banner-left').click(function() {
        moveL();
    });

    $('#banner-right').click(function() {
        move();
    });

    //热门推荐处标签切换
    $('.sec-box nav ul li').eq(0).addClass('active');
    $('.sec-box nav ul li').each(function(index) {
        $(this).mousemove(function() {
            // console.log(index)
            $('.sbc-box').eq(index).addClass('show').siblings().removeClass('show');
            $(this).siblings().removeClass('active');

        }).mouseout(function() {
            $(this).addClass('active').siblings().removeClass('active');
        });

    });

    //热门推荐课程下面课程动画
    $('.lesson-content').each(function(index) {
        // console.log(index);
        // console.log($(this).index())

        $(this).mouseover(function() {
            $(this).find('.playericon').stop().show();
            $(this).find('.lesson-hover').stop().show();
            // $(this).find('.lesson-box').css('height','175px');
            $(this).find('#lesson-dl dd').stop().slideDown(300);
        }).mouseout(function() {
            $(this).find('.playericon').stop().hide();
            $(this).find('.lesson-hover').stop().hide();
            // $(this).find('.lesson-box').css('height','88px');
            $(this).find('#lesson-dl dd').stop().slideUp(300);
        });

    })

    //sevbox 旋转木马效果
    $('.sev-box>.arrow-right').click(function() {
        slide_next();
    })
    $('.sev-box>.arrow-left').click(function() {
        slide_prev();
    })

    //旋转木马的核心函数
    var seg = $('.sevbox-img ul li').outerWidth(true); //获取每个icon的宽度（包括margin）
    var li = $('.sevbox-img ul li');

    function slide_next() {

        set_pos('next');
        $('.sevbox-img ul').animate({
            left: '-=' + seg
        }, 500, function() {
            // $('.sevbox-img ul').find('li').slice(0, 1).remove();
            // $('.sevbox-img ul').css('left', -(seg));
            get_a();
        })
    }

    function slide_prev() {

        set_pos('prev');
        $('.sevbox-img ul').animate({
            left: '+=' + seg
        }, 500, function() {
            $('.sevbox-img ul').find('li').slice(-1).remove();
            $('.sevbox-img ul').css('left', -(seg));
            get_p();

        })
    }

    //给最后一个复制头的icon

    var first = 0;
    var last = 5;

    function get_a() {
        var str = new Array();
        var lix = li.clone();
        le = last; //最后一个icon
        for (i = 0; i < 1; i++) {
            le++
            if (lix[le] != undefined) {
                str[i] = $(lix[le]);
            } else {
                le = 0;
                str[i] = $(lix[le]);
            }
        }
        $.each(str, function(index) {
            $('.sevbox-img ul').append(str[index][0]);
        }); //??
    }

    function get_p() {
        var str = new Array();
        var lix = li.clone();
        fe = first;
        for (i = 0; i < 1; i++) {
            fe--
            if (lix[fe] != undefined) {
                str[i] = $(lix[fe]);
            } else {
                fe = li.length - 1;
                str[i] = $(lix[fe]);
            }
        }
        $.each(str, function(index) {
            $('.sevbox-img ul').prepend(str[index][0]);
        });
    }

    function set_pos(dir) {
        if (dir == 'next') {
            first += 1;
            if (first >= li.length) {
                first = first % li.length;
            }
            last += 1;
            if (last >= li.length) {
                last = last % li.length;
            }
        } else if (dir == 'prev') {
            first -= 1;
            if (first < 0) {
                first = li.length + first;
            }
            last -= 1;
            if (last < 0) {
                last = li.length + last;
            }
        }
    }
});
