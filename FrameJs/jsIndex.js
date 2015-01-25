
function IndexInit() {

    //统计访问信息
    $.ajax({
        type: "post",
        contentType: "application/json",
        url: "WebSeverice/SiteStatics.asmx/SiteVistor",
        data: "{}",
        dataType: 'json',
        success: function (result) {
        }
    });

    $('.FrameContent').css("background-color", "#ededef");

    var $NewsBrowser = $('.NewsBrowser');
    var $NewsBrowser_ul = $NewsBrowser.find('ul');
    var $NewsBrowser_li = $NewsBrowser.find('li');


    var $NewsIndex = $('.NewsIndex');
    var $NewsIndex_ul = $NewsIndex.find('ul');
    var $NewsIndex_li = $NewsIndex.find('li');

    //设置索引
    var nHeightBrowser_ul = $NewsBrowser.height();
    var nNumBrowserImg = $NewsBrowser_li.length;

    $NewsBrowser_ul.height(nHeightBrowser_ul * nNumBrowserImg);

    var nIndex = 0;
    $NewsIndex_li.each(function () {

        var $this = $(this);

        $this.bind("mouseover", { num: nIndex }, PicRollOver);
        $this.bind("mouseleave", { num: nIndex }, PicRollLeave);

        nIndex++;
    });

    var nPreIndex = 0;
    function PicRollOver(e) {        
        //移动图片
        var nvhoffset = -nHeightBrowser_ul;
        var vTopNew = nvhoffset * (e.data.num - nPreIndex);
        $NewsBrowser_ul.animate({ top: '+=' + vTopNew });

        nPreIndex = e.data.num;
        //变色
        var nIndexp = 0;
        $NewsIndex_li.find('p').each(function () {
            if (nIndexp == e.data.num)
                $(this).css('color', 'Red');
            nIndexp++;
        });
    };

    function PicRollLeave(e) {
        //变色
        var nIndexp = 0;
        $NewsIndex_li.find('p').each(function () {
            if (nIndexp == e.data.num)
                $(this).css('color', 'White');
            nIndexp++;
        });
    };

    //数据内容
    $('.CDataContent').find('li').each(function () {
        $(this).mouseover(function () {
            $(this).css("background-color", "Red");
            $(this).find('.CDataCTitle').css("color", "white");
            $(this).find('.CDataCContent').find('p').css("color", "black");
        }).mouseleave(function () {
            $(this).css("background-color", "White");
            $(this).find('.CDataCTitle').css("color", "Black");
            $(this).find('.CDataCContent').find('p').css("color", "Gray");
        });
    })
    //聊天
    $('.CPersonContent').find('li').each(function () {
        $(this).mouseover(function () {
            $(this).css("background-color", "Red");
            $(this).find('.CPersonSelfdesp').css("color", "white");
            $(this).find('.CPersonSelfInfo').find('p').css("color", "black");
        }).mouseleave(function () {
            $(this).css("background-color", "White");
            $(this).find('.CPersonSelfdesp').css("color", "Black");
            $(this).find('.CPersonSelfInfo').find('p').css("color", "Gray");
        });
    })
    //图片效果

    $('.IndexImg1').mouseover(function () {
        $(this).find('.TitleLayer').css('display', 'block');
    }).mouseleave(function () {
        $(this).find('.TitleLayer').css('display', 'none');
        $('.CResPreviewImg').css('display', 'none');
    });

    $('.IndexImg2').mouseover(function () {
        $(this).find('.TitleLayer1').css('display', 'block');
    }).mouseleave(function () {
        $(this).find('.TitleLayer1').css('display', 'none');
    });
    $('.IndexImg3').mouseover(function () {
        $(this).find('.TitleLayer1').css('display', 'block');
    }).mouseleave(function () {
        $(this).find('.TitleLayer1').css('display', 'none');
    });
    $('.IndexImg4').mouseover(function () {
        $(this).find('.TitleLayer').css('display', 'block');
    }).mouseleave(function () {
        $(this).find('.TitleLayer').css('display', 'none');
    });
    $('.IndexImg5').mouseover(function () {
        $(this).find('.TitleLayer1').css('display', 'block');
    }).mouseleave(function () {
        $(this).find('.TitleLayer1').css('display', 'none');
    });
    $('.IndexImg6').mouseover(function () {
        $(this).find('.TitleLayer1').css('display', 'block');
    }).mouseleave(function () {
        $(this).find('.TitleLayer1').css('display', 'none');
    });

    //观点
    $('.COpinionHot').find('li').each(function () {
        $(this).mouseover(function () {
            $(this).css("background-color", "#efecff");
            $(this).find('.COpinionHotT').css("color", "Red");
            $(this).find('.COpinionCC').find('p').css("color", "black");
        }).mouseleave(function () {
            $(this).css("background-color", "White");
            $(this).find('.COpinionHotT').css("color", "Black");
            $(this).find('.COpinionCC').find('p').css("color", "Gray");
        });
    })

    //文章   
    $('.CLatestContent').find('li').each(function () {
        $(this).mouseover(function () {
            $(this).css("background-color", "#efecff");
            $(this).find('.CLatestCTitle').css("color", "Red");
            $(this).find('.CLatestCContent').find('p').css("color", "black");
        }).mouseleave(function () {
            $(this).css("background-color", "White");
            $(this).find('.CLatestCTitle').css("color", "Black");
            $(this).find('.CLatestCContent').find('p').css("color", "Gray");
        });
    })
    //文章   
    $('.COpinionNew').find('li').each(function () {
        $(this).mouseover(function () {
            $(this).css("background-color", "#efecff");
            $(this).find('.COpinionNewContent').find('p').css("color", "black");
        }).mouseleave(function () {
            $(this).css("background-color", "White");
            $(this).find('.COpinionNewContent').find('p').css("color", "Gray");
        });
    })

    var ResList = new Array();
    ResList.push($('.IndexImg1').find('img').attr('src'));
    ResList.push($('.IndexImg2').find('img').attr('src'));
    ResList.push($('.IndexImg3').find('img').attr('src'));
    ResList.push($('.IndexImg4').find('img').attr('src'));
    ResList.push($('.IndexImg5').find('img').attr('src'));
    ResList.push($('.IndexImg6').find('img').attr('src'));

    var ResList2 = $('.CResImgList').html().toString().split(',');

    for (var i = 0; i < 6; i++) {
        var str = ResList2[i];
        ResList.push("PageResImg/" + ResList2[i]);
    }
    
    //图片更换效果
    $(document).ready(function () {
        setInterval(ChangeResImg, 3000);
        setInterval(ChangePersonHead, 5000);
    });
    var nCounter = 0;
    function ChangeResImg() {

        if (nCounter >= 6) {
            nCounter = 0;
        }
        else {
            if (nCounter == 0) {
                $('.IndexImg1').find('img').attr('src', ResList[0]);
                $('.IndexImg4').find('img').attr('src', ResList[9]);
            }
            else if (nCounter == 1) {
                $('.IndexImg2').find('img').attr('src', ResList[1]);
                $('.IndexImg5').find('img').attr('src', ResList[10]);
            }
            else if (nCounter == 2) {
                $('.IndexImg3').find('img').attr('src', ResList[2]);
                $('.IndexImg6').find('img').attr('src', ResList[11]);
            }
            else if (nCounter == 3) {
                $('.IndexImg4').find('img').attr('src', ResList[3]);
                $('.IndexImg1').find('img').attr('src', ResList[6]);
            }
            else if (nCounter == 4) {
                $('.IndexImg5').find('img').attr('src', ResList[4]);
                $('.IndexImg2').find('img').attr('src', ResList[7]);
            }
            else if (nCounter == 5) {
                $('.IndexImg6').find('img').attr('src', ResList[5]);
                $('.IndexImg3').find('img').attr('src', ResList[8]);
            }

            nCounter++;
        }

    }
    //改变联系人头像位置
    var AddList = $('.CPersonAdd').html().split(',');
    
    var HeadImg = AddList[0];
    var ContentPerson = AddList[1].toString().replace('$', ',');
    var Selfdesp = AddList[2].toString().replace('$', ',');

    function ChangePersonHead() {
        $('.CPersonContent').find('ul').find('li').each(function () {

            var HeadImgTemp = $(this).find('.CPersonHead').find('img').attr('src');
            var ContentPersonTemp = $(this).find('.CPersonSelfdesp').html();
            var SelfdespTemp = $(this).find('.CPersonSelfInfo').find('p').html();

            $(this).find('.CPersonHead').find('img').attr('src', HeadImg);
            $(this).find('.CPersonSelfdesp').html(ContentPerson);
            $(this).find('.CPersonSelfInfo').find('p').html(Selfdesp);

            HeadImg = HeadImgTemp;
            ContentPerson = ContentPersonTemp;
            Selfdesp = SelfdespTemp;

        });
    }

    //数据的滚动
    var $DataLbut = $('.DataLbut');
    var $DataRbut = $('.DataRbut');
    var $DataTagBrowser = $('.DataTagBrowser');

    //序列按钮事件
    $DataLbut.mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexLLbut.png')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexLbut.png ')");
    });
    $DataRbut.mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexRLbut.png ')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexRbut.png ')");
    });
    //点击标签滚动事件    
    var $CDataLeftBut = $('.CDataLeftBut');
    var $CDataRightBut = $('.CDataRightBut');
    var $CDataContent = $('.CDataContent');

    var $CDataContent_ul = $CDataContent.find('ul');
    var $CDataContent_li = $CDataContent.find('li');

    var nDataWidthBrowser_ul = $CDataContent.width();
    var nDataNumBrowserImg = $CDataContent_li.length;
    $CDataContent_ul.width(nDataWidthBrowser_ul * nDataNumBrowserImg);

    var nDataIndex = 0;
    $CDataLeftBut.click(function () {
        if (nDataIndex <= 4 && nDataIndex >= 0) {
            var nvhoffset = -$CDataContent_li.width();
            $CDataContent_ul.animate({ left: '+=' + nvhoffset });
            nDataIndex++;
        }
    });
    $CDataRightBut.click(function () {
        if (nDataIndex >= 1 && nDataIndex <= 12) {
            var nvhoffset = -$CDataContent_li.width();
            $CDataContent_ul.animate({ left: '-=' + nvhoffset });
            nDataIndex--;
        }
    });

    //动态标签
    var CloudTagIndex = 0;
    $('.CCloudTag').find('li').each(function () {
        var zIndexv = 10 * Math.random();
        $(this).css("margin-left", 800 * Math.random());
        $(this).css("margin-top", 120 * Math.random());
        $(this).css("font-size", 15 + zIndexv * 1.5);        

        $(this).css("color", '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6));

        $(this).mouseover(function () {           
           
            $(this).animate({ fontSize: '+=10px' }, "quick");

        }).mouseleave(function () {
            $(this).animate({ fontSize: '-=10px' }, "quick");
        });

        CloudTagIndex++;
    });

    $(document).ready(function () {
        setInterval(TagMov, 5000);

    });
    function TagMov() {
        $('.CCloudTag').find('li').each(function () {

            var mLop = 10 * Math.random();
            var mRop = 10 * Math.random();

            var mLeft = 50 * Math.random();
            var m_Top = 20 * Math.random();

            if (mLop >= 5) {
                mLeft = (-1) * mLeft;
                if (parseInt($(this).css("marginLeft")) + mLeft <= 0)
                    mLeft = 0;
            }
            else {
                mLeft = mLeft;
                if (parseInt($(this).css("marginLeft")) + 150 + mLeft >= 950)
                    mLeft = 0;
            }
            if (mRop >= 5) {
                m_Top = (-1) * m_Top;
                if (parseInt($(this).css("marginTop")) + m_Top <= 0)
                    m_Top = 0;                
            }
            else {
                m_Top = m_Top;
                if (parseInt($(this).css("marginTop")) + 30 + m_Top >= 150)
                    m_Top = 0;
            }
            $(this).animate({ marginLeft: "+=" + mLeft.toString() + "px", marginTop: "+=" + m_Top.toString() + "px" }, "slow");
            //$(this).animate({ marginTop: "+=" + m_Top.toString() + "px" }, "slow");
        });

    }



};

