
function IndexArticleInit() {

    var CurPage = "艺术";
    var CurPageItemNum = 3;

    //初始化编辑框
    $('.ArticleEdit').xheditor({ tools: 'full',
        width: 645,
        height: $(window).height() - 20 - 160 - 90,
        upImgUrl: 'WebFunModule/UpLoadArticleImgFile.ashx?immediate=1',
        upImgExt: "jpg,jpeg,gif,bmp,png",
        html5Upload: false,
        dataType: 'json',
        urlType: 'root',
        onUpload: insertUpload
    });
    //编辑框的上传处理结果
    function insertUpload(sResult) {
        var sData = sResult;        
        var fileimg = "PageArticle/PageArticleImg/";
        fileimg = sData.toString().substring(fileimg.length);
        $('.ArticlePublicImg').html(fileimg);
        
    }

    var $ArticleLbut = $('.ArticleLbut');
    var $ArticleRbut = $('.ArticleRbut');
    var $ArticleTagBrowser = $('.ArticleTagBrowser');
    //序列按钮事件
    $ArticleLbut.mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexLLbut.png')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexLbut.png ')");
    });
    $ArticleRbut.mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexRLbut.png ')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexRbut.png ')");
    });
    //点击滚动事件    
    var $ArticleTagBrowser_ul = $ArticleTagBrowser.find('ul');
    var $ArticleTagBrowser_li = $ArticleTagBrowser.find('li');

    var nWidthBrowser_ul = $ArticleTagBrowser.width();
    var nNumBrowserImg = $ArticleTagBrowser_li.length;
    $ArticleTagBrowser_ul.width(nWidthBrowser_ul * nNumBrowserImg);

    var nIndex = 0;
    $ArticleLbut.click(function () {
        if (nIndex <= 11 && nIndex >= 0) {
            var nvhoffset = -$ArticleTagBrowser_li.width();
            $ArticleTagBrowser_ul.animate({ left: '+=' + nvhoffset });
            nIndex++;
        }
    });
    $ArticleRbut.click(function () {
        if (nIndex >= 1 && nIndex <= 12) {
            var nvhoffset = -$ArticleTagBrowser_li.width();
            $ArticleTagBrowser_ul.animate({ left: '-=' + nvhoffset });
            nIndex--;
        }
    });
    //索引的数据处理
    var nbrowserI = 0;
    $ArticleTagBrowser_li.each(function () {
        $(this).click(function () {
            $ArticleTagBrowser_li.each(function () {
                $(this).css("background-color", "White");
                $(this).css("color", "#666666");
            });

            $(this).css("background-color", "Red");
            $(this).css("color", "White");

            //状态值赋值并清空元素
            CurPage = $(this).html();
            $('.ArticleArea').find('ul').empty();
            CurPageItemNum = 0;
            //加载文件列表
            var datap = "{" + "'sType':'" + CurPage + "'," + "'nItemNum':" + CurPageItemNum.toString() + " }";

            $.ajax({
                type: "post",
                contentType: "application/json",
                url: "WebSeverice/PageArticleChange.asmx/PageArticleChangeData",
                data: datap,
                dataType: 'json',
                success: function (result) {
                    var loadresult = eval('(' + result.d + ')');
                    if (loadresult.sState == "LoadOk!") {
                        var loaddata = eval('(' + loadresult.sdata + ')');

                        for (var i = 0; i < loaddata.length; i++) {

                            var sData = loaddata[i];
                            sData = sData.replace(/#/g, ",");
                            var datalist = sData.split(',');

                            var nodedivT = "<div class='ArticleAreaT'>" + datalist[0] + "</div>";
                            var nodedivImg = "<div class='ArticleAreaImg'>" + "<img src ='" + "PageArticle/PageArticleImg/" + datalist[2] + "'/img>" + "</div>";
                            var nodedivp = "<div class='ArticleAreaC'>" + "<p>" + datalist[1] + "</p>" + "</div>";
                            var nodedivB = "<div class='ArticleAreaShoucB'>" + "</div>";
                            var nodedivM = "<div class='ArticleAreaReadMore'>" + "仔细阅读" + "</div>";
                            var nodedivInf = "<div class='ArticleInfo'>" + datalist[3] + "</div>";

                            var nodeTli = "<li>" + nodedivT + nodedivImg + nodedivp + nodedivp + nodedivB + nodedivM + nodedivInf + "</li>";

                            $('.ArticleArea').find('ul').append(nodeTli);

                            var vMore = $('.ArticleArea').find('.ArticleAreaReadMore').last();
                            vMore.bind("mouseover", function () { $(this).css("color", "Red"); });
                            vMore.bind("mouseleave", function () { $(this).css("color", "#aaaaaa"); });
                            vMore.bind("click", function () {
                                $(".ArticleAreaArticleBK").css("display", "block");
                                $(".ArticleAreaArticleBK").height($(window).height());
                                $(".ArticleAreaArticleBK").width($(window).width());

                                $(".ArticleAreaArticleC").css("display", "block");
                                $(".ArticleAreaArticleC").height($(window).height() - 20);
                                $(".ArticleAreaArticleC").width(1000);
                                $(".ArticleAreaArticleC").css("left", ($(window).width() - 1000) / 2);
                                $(".ArticleAreaArticleC").css("top", 10);

                                $(".ArticleFrameC").attr("src", $(this).parent().find('.ArticleInfo').html());
                            });

                        }
                        CurPageItemNum = CurPageItemNum + loaddata.length;

                    }
                }
            });
                    

        });
        nbrowserI++;
    });


    //序列热点事件
    $('.ArticleRank').find('li').each(function(){
            $(this).mouseover(function () {
                    $(this).css("background-color", "Red");
             }).mouseleave(function () {
                    $(this).css("background-color", "White");
             });
    });
    //仔细阅读事件
    $('.ArticleAreaReadMore').each(function () {
        $(this).click(function () {
            $(".ArticleAreaArticleBK").css("display", "block");
            $(".ArticleAreaArticleBK").height($(window).height());
            $(".ArticleAreaArticleBK").width($(window).width());

            $(".ArticleAreaArticleC").css("display", "block");
            $(".ArticleAreaArticleC").height($(window).height() - 20);
            $(".ArticleAreaArticleC").width(1000);
            $(".ArticleAreaArticleC").css("left", ($(window).width() - 1000) / 2);
            $(".ArticleAreaArticleC").css("top", 10);

            $(".ArticleFrameC").attr("src", $(this).parent().find('.ArticleInfo').html());

        });
        $(this).mouseover(function () {
            $(this).css("color", "Red");
        });
        $(this).mouseleave(function () {
            $(this).css("color", "#aaaaaa");
        });
    });

    $('.ArticleAreaArticleClose').mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/CloseButL.png ')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/CloseBut.png ')");
    }).click(function () {
        $(".ArticleAreaArticleBK").css("display", "none");
        $(".ArticleAreaArticleC").css("display", "none");
        return false;
    });

    //滚动加载
    $(window).scroll(function () {
        // 当滚动到最底部以上100像素时， 加载新内容
        if ($(document).height() - $(this).scrollTop() - $(this).height() < 200)
            LoadContent();
    });
    function LoadContent() {

        var datap = "{" + "'sType':'" + CurPage + "'," + "'nItemNum':" + CurPageItemNum.toString() + " }";

        $.ajax({
            type: "post",
            contentType: "application/json",
            url: "WebSeverice/PageArticleLoad.asmx/PageArticleLoadData",
            data: datap,
            dataType: 'json',
            success: function (result) {
                var loadresult = eval('(' + result.d + ')');
                if (loadresult.sState == "LoadOk!") {
                    var loaddata = eval('(' + loadresult.sdata + ')');

                    //alert(loaddata.length);

                    for (var i = 0; i < loaddata.length; i++) {

                        var sData = loaddata[i];
                        sData = sData.replace(/#/g, ",");
                        var datalist = sData.split(',');

                        var nodedivT = "<div class='ArticleAreaT'>" + datalist[0] + "</div>";
                        var nodedivImg = "<div class='ArticleAreaImg'>" + "<img src ='" + "PageArticle/PageArticleImg/" + datalist[2] + "'/img>" + "</div>";
                        var nodedivp = "<div class='ArticleAreaC'>" + "<p>" + datalist[1] + "</p>" + "</div>";
                        var nodedivB = "<div class='ArticleAreaShoucB'>" + "</div>";
                        var nodedivM = "<div class='ArticleAreaReadMore'>" + "仔细阅读" + "</div>";
                        var nodedivInf = "<div class='ArticleInfo'>" + datalist[3] + "</div>";

                        var nodeTli = "<li>" + nodedivT + nodedivImg + nodedivp + nodedivp + nodedivB + nodedivM + nodedivInf + "</li>";

                        $('.ArticleArea').find('ul').append(nodeTli);

                        var vMore = $('.ArticleArea').find('.ArticleAreaReadMore').last();
                        vMore.bind("mouseover", function () { $(this).css("color", "Red"); });
                        vMore.bind("mouseleave", function () { $(this).css("color", "#aaaaaa"); });
                        vMore.bind("click", function () {
                            $(".ArticleAreaArticleBK").css("display", "block");
                            $(".ArticleAreaArticleBK").height($(window).height());
                            $(".ArticleAreaArticleBK").width($(window).width());

                            $(".ArticleAreaArticleC").css("display", "block");
                            $(".ArticleAreaArticleC").height($(window).height() - 20);
                            $(".ArticleAreaArticleC").width(1000);
                            $(".ArticleAreaArticleC").css("left", ($(window).width() - 1000) / 2);
                            $(".ArticleAreaArticleC").css("top", 10);

                            $(".ArticleFrameC").attr("src", $(this).parent().find('.ArticleInfo').html());
                        });

                    }
                    CurPageItemNum = CurPageItemNum + loaddata.length;

                }
            }
        });
               
    }

    //浏览层关闭
    $('.ArticlePublicArticleClose').mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/CloseButL.png ')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/CloseBut.png ')");
    }).click(function () {
        $(".ArticleAreaArticleBK").css("display", "none");
        $(".ArticlePublicArticle").css("display", "none");
        return false;
    });

    //发布按钮状态
    $(".ArticlePublic").click(function () {
        $(".ArticleAreaArticleBK").css("display", "block");
        $(".ArticleAreaArticleBK").height($(window).height());
        $(".ArticleAreaArticleBK").width($(window).width());

        $(".ArticlePublicArticle").css("display", "block");
        $(".ArticlePublicArticle").css("display", "block");
        $(".ArticlePublicArticle").height($(window).height() - 20);
        $(".ArticlePublicArticle").css("top", 10);
        $(".ArticlePublicArticle").css("left", 10);

        $(".ArticleContent").height($(window).height() - 20 - 160);
        $(".ArticleContentCC").height($(window).height() - 20 - 160 - 40);

        $(".ArticlePreview").height($(window).height() - 20 - 20);

        //加载文章数据
        $('.ArticlePreviewTitle').html("文章标题内容");
        $('.ArticlePreviewTag').html("标签：标签1 标签2 标签3");
        $('.ArticlePreviewContent').html("");

        $('#ArtilceTitle').val("");
        $('#ArtilceTag').val("");
        $('.ArticleEdit').val("");
    });

    //预览事件
    $('.ArticlePreviewBtn').click(function () {
        //获取数据
        $('.ArticlePreviewTitle').html($('#ArtilceTitle').val());
        $('.ArticlePreviewTag').html("标签：" + $('#ArtilceTag').val());
        $('.ArticlePreviewContent').html($('.ArticleEdit').val());
    });

    //文章上传
    $('.ArticleSubmitBtnOk').click(function () {
        var ParaName = $.cookies.get('allwithmeuser');
        var sContent = $('.ArticleEdit').val();
        var regSL = new RegExp("<", "gi");
        var regSR = new RegExp(">", "gi");
        sContent = sContent.replace(regSL, "$@$");
        sContent = sContent.replace(regSR, "$#$");
        
        //获取提交内容
        $(".ArticleForm").ajaxSubmit({
            type: "post",  //提交方式  
            data: { 'PName': ParaName, 'AContent': sContent, 'ArtilceTitle': $('#ArtilceTitle').val(), 'ArtilceTag': $('#ArtilceTag').val(), 'ArtilceImg': $('#ArticlePublicImg').html() },
            dataType: "text", //数据类型  
            url: "WebFunModule/UpLoadArticleContentFile.ashx", //请求url  
            success: function (sResult) { //提交成功的回调函数                       
                var Uploadresult = $.parseJSON(sResult);
                if (Uploadresult.sState == "UpLoadArticleOk") {
                    alert("上传成功！");
                    $('#ArtilceTitle').val("");
                    $('#ArtilceTag').val("");
                    $('.ArticleEdit').val("");
                }
                else if (Uploadresult.sState == "UpLoadArticleTitleNull") {
                    alert("请输入您的标题！");
                }
                else if (Uploadresult.sState == "UpLoadArticleTagNull") {
                    alert("请输入您的标签！");
                }
                else if (Uploadresult.sState == "UpLoadArticleContentNull") {
                    alert("请输入您的内容！");
                }
                else if (Uploadresult.sState == "UpLoadArticleUserNull") {
                    alert("请您先登录！");
                }
            }
        });
    });


};


