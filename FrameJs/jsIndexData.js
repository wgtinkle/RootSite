
function IndexDataInit() {


    //初始化编辑框
    $('.DataEdit').xheditor({ tools: 'full',
        width: 645,
        height: $(window).height() - 20 - 160 - 90,
        upImgUrl: 'WebFunModule/UpLoadDataImgFile.ashx?immediate=1',
        upImgExt: "jpg,jpeg,gif,bmp,png",
        html5Upload: false,
        dataType: 'json',
        urlType: 'root',
        onUpload: insertUpload
    });
    //编辑框的上传处理结果
    function insertUpload(sResult) {
        var sData = sResult;
        var fileimg = "PageData/PageDataImg/";
        fileimg = sData.toString().substring(fileimg.length);
        $('.DataImgInfo').html(fileimg);
    }


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
    var $DataTagBrowser_ul = $DataTagBrowser.find('ul');
    var $DataTagBrowser_li = $DataTagBrowser.find('li');

    var nWidthBrowser_ul = $DataTagBrowser.width();
    var nNumBrowserImg = $DataTagBrowser_li.length;
    $DataTagBrowser_ul.width(nWidthBrowser_ul * nNumBrowserImg);

    var nIndex = 0;
    $DataLbut.click(function () {
        if (nIndex <= 4 && nIndex >= 0) {
            var nvhoffset = -$DataTagBrowser_li.width();
            $DataTagBrowser_ul.animate({ left: '+=' + nvhoffset });
            nIndex++;
        }
    });
    $DataRbut.click(function () {
        if (nIndex >= 1 && nIndex <= 12) {
            var nvhoffset = -$DataTagBrowser_li.width();
            $DataTagBrowser_ul.animate({ left: '-=' + nvhoffset });
            nIndex--;
        }
    });
    //索引的数据处理
    var nbrowserI = 0;
    $DataTagBrowser_li.each(function () {
        $(this).click(function () {
            $DataTagBrowser_li.each(function () {
                $(this).css("background-color", "White");
                $(this).css("color", "#666666");
            });

            $(this).css("background-color", "Red");
            $(this).css("color", "White");
            
            //加载文件列表
            var datap = "{" + "'sType':'" + $(this).html() + "' }";
            $.ajax({
                type: "post",
                contentType: "application/json",
                url: "WebSeverice/PageDataLoad.asmx/PageDataLoadData",
                data: datap,
                dataType: 'json',
                success: function (result) {

                    var loadresult = eval('(' + result.d + ')');
                    if (loadresult.sState == "LoadOk!") {
                        var loaddata = eval('(' + loadresult.sdata + ')');
                        var numLi = loaddata.length;
                        $('.DataArticleListContent').find('ul').empty();
                        //添加元素                        
                        for (var i = 0; i < numLi; i++) {
                            var strC = loaddata[i];
                            var result = strC.split(",");

                            var nodedivT = "<div class='DataArticleListT'>" + result[0] + "</div>";
                            var nodedivTime = "<div class='DataArticleListTime'>" + result[4] + "</div>";
                            var nodedivI = "<div class='DataArticleListImg'>" + "<img src ='" + "PageData/PageDataImg/" + result[2] + "'/img>" + "</div>";
                            var nodedivC = "<div class='DataArticleListCC'>" + "<p>" + result[1] + "</p>" + "</div>";
                            var nodedivInfo = "<div class='DataArticleListInfo'>" + result[6] + "," + result[5] + "," + result[3] + "</div>";
                            var nodeTli = "<li>" + nodedivT + nodedivT + nodedivTime + nodedivI + nodedivC + nodedivInfo + "</li>";
                            $('.DataArticleListContent').find('ul').append(nodeTli);
                        }

                        var nListdata = 0;
                        $('.DataArticleListContent').find('li').each(function () {
                            $(this).bind("mouseover", { num: nListdata }, ListRollOver);
                            $(this).bind("mouseleave", { num: nListdata }, ListRollLeave);
                            $(this).bind("click", { num: nListdata }, ListRollclick);
                            nListdata++;
                        });

                    }
                }
            });

        });
        nbrowserI++;
    });


    //发表按钮事件
    $('.DataPublic').mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/dataShareL.png')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/dataShare.png ')");
    });

    //list按钮事件
    $('.DataArticleListTopBut').mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/UpButL.png')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/UpBut.png ')");
    });
    $('.DataArticleListBotomBut').mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/BottomButL.png')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/BottomBut.png ')");
    });

    //点击标签列表滚动事件
    var $DataArticleListContent = $('.DataArticleListContent');
    var $DataArticleListContent_ul = $('.DataArticleListContent').find('ul');
    var $DataArticleListContent_li = $('.DataArticleListContent').find('li');

    var nHeightBrowser_ul = $DataArticleListContent.height();
    var nNumBrowser = $DataArticleListContent_li.length;
    $('.DataArticleListContent').find('ul').height($('.DataArticleListContent').find('ul') * nNumBrowser);

    var nListIndex = 0;
    $('.DataArticleListTopBut').click(function () {
        nHeightBrowser_ul = $DataArticleListContent.height();
        nNumBrowser = $('.DataArticleListContent').find('li').length;
        $('.DataArticleListContent').find('ul').height($('.DataArticleListContent').find('ul') * nNumBrowser);

        if (nListIndex <= nNumBrowser - 7 && nNumBrowser >= 5) {
            var nvhoffset = -$('.DataArticleListContent').find('li').height() - 2;
            $('.DataArticleListContent').find('ul').animate({ top: '+=' + nvhoffset });
            nListIndex++;
        }
    });
    $('.DataArticleListBotomBut').click(function () {
        nHeightBrowser_ul = $DataArticleListContent.height();
        nNumBrowser = $('.DataArticleListContent').find('li').length;
        $('.DataArticleListContent').find('ul').height($('.DataArticleListContent').find('ul') * nNumBrowser);

        if (nListIndex >= 1 && nListIndex <= nNumBrowser && nNumBrowser >= 7) {
            var nvhoffset = -$('.DataArticleListContent').find('li').height() - 2;
            $('.DataArticleListContent').find('ul').animate({ top: '-=' + nvhoffset });
            nListIndex--;
        }
    });

    //鼠标事件
    var nListfuncIndex = 0;
    $DataArticleListContent_li.each(function () {
        $(this).bind("mouseover", { num: nListfuncIndex }, ListRollOver);
        $(this).bind("mouseleave", { num: nListfuncIndex }, ListRollLeave);
        $(this).bind("click", { num: nListfuncIndex }, ListRollclick);
        nListfuncIndex++;
    });
    var CurSel = -1; //当前的选择
    function ListRollOver(e) {
        //改变颜色
        if (CurSel != e.data.num) {
            $(this).css("background-color", "Red");
        }
    };
    function ListRollLeave(e) {
        //改变颜色
        if (CurSel != e.data.num) {
            $(this).css("background-color", "White");
        }
    };
    
    function ListRollclick(e) {
        $(this).css("background-color", "Orange");
        CurSel = e.data.num;
        

        var innerIndex = 0;
        $('.DataArticleListContent').find('li').each(function () {
            if (CurSel != innerIndex) {
                $(this).css("background-color", "White");
            }
            innerIndex++;
        });

        //提取数据

        var strC = $(this).find('.DataArticleListInfo').html();
        var strhead = strC.substring(0,strC.indexOf(','));

        var strNakenameO = strC.substring(strC.indexOf(',') + 1);
        var strNakename = strNakenameO.substring(0, strNakenameO.indexOf(','));

        var strhref = strNakenameO.substring(strNakenameO.indexOf(',') + 1);
                

        //加载文件
        $('.DataArticleFrameC').attr("src", "PageData/" + strhref);
        //加载头像
        $('.DataArticleHead').find('img').attr("src", "FrameImg/UserHead/" + strhead);
        $('.DataArticleUName').html(strNakename);
    };

    //浏览层关闭
    $('.DataPublicDataClose').mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/CloseButL.png ')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/CloseBut.png ')");
    }).click(function () {
        $(".DataAreaDataBK").css("display", "none");
        $(".DataPublicData").css("display", "none");
        return false;
    });

    //发布按钮状态
    $(".DataPublic").click(function () {
        $(".DataAreaDataBK").css("display", "block");
        $(".DataAreaDataBK").height($(window).height());
        $(".DataAreaDataBK").width($(window).width());

        $(".DataPublicData").css("display", "block");
        $(".DataPublicData").css("display", "block");
        $(".DataPublicData").height($(window).height() - 20);
        $(".DataPublicData").css("top", 10);
        $(".DataPublicData").css("left", 10);

        $(".DataContent").height($(window).height() - 20 - 160);
        $(".DataContentCC").height($(window).height() - 20 - 160 - 40);

        $(".DataPreview").height($(window).height() - 20 - 20);

        //加载文章数据
        $('.DataPreviewTitle').html("想法标题内容");
        $('.DataPreviewTag').html("标签：标签1 标签2 标签3");
        $('.DataPreviewContent').html("");

        $('#DataTitle').val("");
        $('#DataTag').val("");
        $('.DataEdit').val("");
    });

    //预览事件
    $('.DataPreviewBtn').click(function () {
        //获取数据
        $('.DataPreviewTitle').html($('#DataTitle').val());
        $('.DataPreviewTag').html("标签：" + $('#DataTag').val());
        $('.DataPreviewContent').html($('.DataEdit').val());
    });

    //文章上传
    $('.DataSubmitBtnOk').click(function () {
        var ParaName = $.cookies.get('allwithmeuser');
        var sContent = $('.DataEdit').val();
        var regSL = new RegExp("<", "gi");
        var regSR = new RegExp(">", "gi");
        sContent = sContent.replace(regSL, "$@$");
        sContent = sContent.replace(regSR, "$#$");

        //获取提交内容
        $(".DataForm").ajaxSubmit({
            type: "post",  //提交方式  
            data: { 'PName': ParaName, 'DContent': sContent, 'DataTitle': $('#DataTitle').val(), 'DataTag': $('#DataTag').val(), 'DataImg': $('.DataImgInfo').html() },
            dataType: "text", //数据类型  
            url: "WebFunModule/UpLoadDataContentFile.ashx", //请求url  
            success: function (sResult) { //提交成功的回调函数                       
                var Uploadresult = $.parseJSON(sResult);
                if (Uploadresult.sState == "UpLoadDataOk") {
                    alert("上传成功！");
                    $('#DataTitle').val("");
                    $('#DataTag').val("");
                    $('.DataEdit').val("");
                }
                else if (Uploadresult.sState == "UpLoadDataTitleNull") {
                    alert("请输入您的标题！");
                }
                else if (Uploadresult.sState == "UpLoadDataTagNull") {
                    alert("请输入您的标签！");
                }
                else if (Uploadresult.sState == "UpLoadDataContentNull") {
                    alert("请输入您的内容！");
                }
                else if (Uploadresult.sState == "UpLoadDataUserNull") {
                    alert("请您先登录！");
                }
            }
        });
    });

};


