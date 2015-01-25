
function IndexOpinionInit() {

    var CurPage = "宠物";
    var CurPageItemNum = 5;

    var $OpinionLbut = $('.OpinionLbut');
    var $OpinionRbut = $('.OpinionRbut');
    var $OpinionTagBrowser = $('.OpinionTagBrowser');

    //序列按钮事件
    $OpinionLbut.mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexLLbut.png')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexLbut.png ')");
    });
    $OpinionRbut.mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexRLbut.png ')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexRbut.png ')");
    });
    //点击滚动事件    
    var $ResImgTagBrowser_ul = $OpinionTagBrowser.find('ul');
    var $ResImgTagBrowser_li = $OpinionTagBrowser.find('li');

    var nWidthBrowser_ul = $OpinionTagBrowser.width();
    var nNumBrowserImg = $ResImgTagBrowser_li.length;
    $ResImgTagBrowser_ul.width(nWidthBrowser_ul * nNumBrowserImg);

    var nIndex = 0;
    $OpinionLbut.click(function () {
        if (nIndex <= 11 && nIndex >= 0) {
            var nvhoffset = -$ResImgTagBrowser_li.width();
            $ResImgTagBrowser_ul.animate({ left: '+=' + nvhoffset });
            nIndex++;
        }
    });
    $OpinionRbut.click(function () {
        if (nIndex >= 1 && nIndex <= 12) {
            var nvhoffset = -$ResImgTagBrowser_li.width();
            $ResImgTagBrowser_ul.animate({ left: '-=' + nvhoffset });
            nIndex--;
        }
    });

     var nbrowserI = 0;
     $('.OpinionTagBrowser').find('li').each(function () {
         $(this).click(function () {
             $('.OpinionTagBrowser').find('li').each(function () {
                 $(this).css("background-color", "White");
                 $(this).css("color", "#666666");
             });

             $(this).css("background-color", "Red");
             $(this).css("color", "White");

             //状态值赋值并清空元素
             CurPage = $(this).html();
             $('.OpinionContent').find('.OpinionContentUL').empty();
             CurPageItemNum = 0;

             var datap = "{" + "'sType':'" + CurPage + "'," + "'nItemNum':" + CurPageItemNum.toString() + " }";

             $.ajax({
                 type: "post",
                 contentType: "application/json",
                 url: "WebSeverice/PageOpinionChange.asmx/PageOpinionChangeData",
                 data: datap,
                 dataType: 'json',
                 success: function (result) {
                     var loadresult = eval('(' + result.d + ')');
                     if (loadresult.sState == "LoadOk!") {
                         var loaddata = eval('(' + loadresult.sdata + ')');

                         for (var i = 0; i < loaddata.length; i++) {
                             var strC = loaddata[i];

                             var sAuthor = strC.substring(0, strC.indexOf('$'));
                             sAuthor = sAuthor.replace(/#/g, ",");
                             var data = sAuthor.split(',');
                             var strTitle = data[0];
                             var strAbs = data[1];
                             var strImg = data[2];
                             var strTime = data[3];
                             var strId = data[4];

                             var nodedivT = "<div class='OpinionCT'>" + strTitle + "</div>";
                             var nodedivImg = "<div class='OpinionCimg'>" + "<img src ='" + "PageOpinion/" + strImg + "' /img>" + "</div>";
                             var nodedivp = "<div class='OpinionCC'>" + "<p>" + strAbs + "</p>" + "</div>";
                             var nodedivM = "<div class='OpinionCMore'>" + "仔细阅读" + "</div>";

                             var strContent = strC.substring(strC.indexOf('$') + 1);

                             var nodedivInfo = "<div class='OpinionC'>" + strC + "</div>";


                             var strContentlist = strContent.split(',');


                             var vSCC = "";
                             for (var j = 0; j < 3; j++) {
                                 var strInfo = strContentlist[j];
                                 strInfo = strInfo.replace(/@/g, ",");
                                 var strInfoList = strInfo.split(',');

                                 var nodedivHeadImg = "<div class='OpinionCHead'>" + "<img src ='" + "FrameImg/UserHead/" + strInfoList[2] + "' /img>" + "</div>";
                                 var nodedivCC = "<div class='OpinionCCT'>" + strInfoList[3] + "</div>";
                                 vSCC += "<li>" + nodedivHeadImg + nodedivCC + "</li>";
                             }

                             var nodeCC = "<ul>" + vSCC + "</ul>";
                             var nodedivL = "<div class='OpinionCList'>" + nodeCC + "</div>";
                             var nodeTli = "<li>" + nodedivT + nodedivImg + nodedivp + nodedivL + nodedivM + nodedivInfo + "</li>";



                             $('.OpinionContent').find('.OpinionContentUL').append(nodeTli);

                             var vMore = $('.OpinionContent').find('.OpinionCMore').last();
                             vMore.bind("mouseover", function () { $(this).css("color", "Red"); });
                             vMore.bind("mouseleave", function () { $(this).css("color", "#aaaaaa"); });
                             vMore.bind("click", function () {                                 
                                 FuncReadMore($(this).parent().find('.OpinionC').html());
                             });

                             var vLi = $('.OpinionContent').find('.OpinionContentUL').children('li').last();
                             vLi.bind("mouseover", function () { $(this).css("border", "1px solid Blue"); $(this).css("background-color", "#ededef"); });
                             vLi.bind("mouseleave", function () { $(this).css("border", "1px solid #ededef"); $(this).css("background-color", "White"); });


                         }


                     }
                     else if (loadresult.sState == "LoadAll!") {
                         //alert("没有更多了！");
                     }

                 }
             });

             CurPageItemNum = CurPageItemNum + loaddata.length;

         });

     });

    //序列热点事件
    $('.OpinionRank').find('li').each(function () {
        $(this).mouseover(function () {
            $(this).css("background-color", "Red");
        }).mouseleave(function () {
            $(this).css("background-color", "White");
        }).click(function () {
            FuncReadMore($(this).find('.OpinionC').html());
        });
    });

     //滚动加载
    $(window).scroll(function () {
        // 当滚动到最底部以上100像素时， 加载新内容
        if ($(document).height() - $(this).scrollTop() - $(this).height() < 100)
            LoadContent();
    });
    function LoadContent() {
        
        //加载数据
        var datap = "{" + "'sType':'" + CurPage + "'," + "'nItemNum':" + CurPageItemNum.toString() + " }";

        $.ajax({
            type: "post",
            contentType: "application/json",
            url: "WebSeverice/PageOpinionLoad.asmx/PageOpinionLoadData",
            data: datap,
            dataType: 'json',
            success: function (result) {
                var loadresult = eval('(' + result.d + ')');
                if (loadresult.sState == "LoadOk!") {
                    var loaddata = eval('(' + loadresult.sdata + ')');

                    for (var i = 0; i < 3; i++) {
                        var strC = loaddata[i];

                        var sAuthor = strC.substring(0, strC.indexOf('$'));
                        sAuthor = sAuthor.replace(/#/g, ",");
                        var data = sAuthor.split(',');
                        var strTitle = data[0];
                        var strAbs = data[1];
                        var strImg = data[2];
                        var strTime = data[3];
                        var strId = data[4];

                        var nodedivT = "<div class='OpinionCT'>" + strTitle + "</div>";
                        var nodedivImg = "<div class='OpinionCimg'>" + "<img src ='" + "PageOpinion/" + strImg + "' /img>" + "</div>";
                        var nodedivp = "<div class='OpinionCC'>" + "<p>" + strAbs + "</p>" + "</div>";
                        var nodedivM = "<div class='OpinionCMore'>" + "仔细阅读" + "</div>";

                        var strContent = strC.substring(strC.indexOf('$') + 1);

                        var nodedivInfo = "<div class='OpinionC'>" + strC + "</div>";

                        var strContentlist = strContent.split(',');


                        var vSCC = "";
                        for (var j = 0; j < 3; j++) {
                            var strInfo = strContentlist[j];
                            strInfo = strInfo.replace(/@/g, ",");
                            var strInfoList = strInfo.split(',');

                            var nodedivHeadImg = "<div class='OpinionCHead'>" + "<img src ='" + "FrameImg/UserHead/" + strInfoList[2] + "' /img>" + "</div>";
                            var nodedivCC = "<div class='OpinionCCT'>" + strInfoList[3] + "</div>";
                            vSCC += "<li>" + nodedivHeadImg + nodedivCC + "</li>";
                        }

                        var nodeCC = "<ul>" + vSCC + "</ul>";
                        var nodedivL = "<div class='OpinionCList'>" + nodeCC + "</div>";
                        var nodeTli = "<li>" + nodedivT + nodedivImg + nodedivp + nodedivL + nodedivM + nodedivInfo + "</li>";



                        $('.OpinionContent').find('.OpinionContentUL').append(nodeTli);

                        var vMore = $('.OpinionContent').find('.OpinionCMore').last();
                        vMore.bind("mouseover", function () { $(this).css("color", "Red"); });
                        vMore.bind("mouseleave", function () { $(this).css("color", "#aaaaaa"); });
                        vMore.bind("click", function () { FuncReadMore($(this).parent().find('.OpinionC').html()); });

                        var vLi = $('.OpinionContent').find('.OpinionContentUL').children('li').last();
                           vLi.bind("mouseover", function () { $(this).css("border", "1px solid Blue"); $(this).css("background-color", "#ededef"); });
                        vLi.bind("mouseleave", function () { $(this).css("border", "1px solid #ededef"); $(this).css("background-color", "White"); });


                    }
                }
                else if (loadresult.sState == "LoadAll!") {
                    //alert("没有更多了！");
                }

            }
        });

        CurPageItemNum = CurPageItemNum + 3;

    }

    //仔细阅读事件
    $('.OpinionCMore').each(function () {
        $(this).click(function () {
            FuncReadMore($(this).parent().find('.OpinionC').html());
        });
        $(this).mouseover(function () {
            $(this).css("color", "Red");
        });
        $(this).mouseleave(function () {
            $(this).css("color", "#aaaaaa");
        });
    });
    //仔细阅读窗
    function FuncReadMore( strdata) {
        $(".OpinionAreaOpinionBK").css("display", "block");
        $(".OpinionAreaOpinionBK").height($(window).height());
        $(".OpinionAreaOpinionBK").width($(window).width());

        $(".OpinionAreaOpinionC").css("display", "block");
        $(".OpinionAreaOpinionC").height($(window).height() - 20);
        $(".OpinionAreaOpinionC").width(800);
        $(".OpinionAreaOpinionC").css("left", ($(window).width() - 800) / 2);
        $(".OpinionAreaOpinionC").css("top", 10);

        $(".OpinionAreaOpinionList").height($(window).height() - 20 - 185);
        $(".OpinionAreaOpinionList").find("ul").height($(window).height() - 20 - 225);

        //清数据
        $(".OpinionAreaOpinionList").find("ul").empty();
        //加载数据
        
        var sAuthor = strdata.substring(0, strdata.indexOf('$'));
        sAuthor = sAuthor.replace(/#/g, ",");
        var data = sAuthor.split(',');
        var strTitle = data[0];
        var strAbs = data[1];
        var strImg = data[2];
        var strTime = data[3];
        var strId = data[4];       

        $('.OpinionAreaOpinionT').html(strTitle);
        $('.OpinionAreaOpinionCC').find('p').html(strAbs);
        $('#OpinionAreaSubmitId').html(data[4]);        

        var strC = strdata.substring(strdata.indexOf('$') + 1);
        
        var strContentlist = strC.split(',');
        

        for (var j = 0; j < strContentlist.length; j++) {
            var vSCC = "";
            var strInfo = strContentlist[j];
            strInfo = strInfo.replace(/@/g, ",");
            
            var strInfoList = strInfo.split(',');

            var nodedivHeadImg = "<div class='OpinionAreaOpinionHead'>" + "<img src ='" + "FrameImg/UserHead/" + strInfoList[2] + "' /img>" + "</div>";
            var nodedivCC = "<div class='OpinionAreaOpinionInnerC'>" + strInfoList[3] + "</div>";
            var nodedivZan = "<div class='OpinionAreaOpinionZan'><div class='OPzan'>" + strInfoList[4] + "</div></div>";
            var nodedivFdui = "<div class='OpinionAreaOpinionFandui'><div class='OpFandui'>" + strInfoList[5] + "</div></div>";
            vSCC += "<li>" + nodedivHeadImg + nodedivCC + nodedivZan + nodedivFdui + "</li>";

            $(".OpinionAreaOpinionList").find("ul").append(vSCC);
        }
        
    };

    //浏览层关闭
    $('.OpinionAreaOpinionClose').mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/CloseButL.png ')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/CloseBut.png ')");
    }).click(function () {
        $(".OpinionAreaOpinionBK").css("display", "none");
        $(".OpinionAreaOpinionC").css("display", "none");
        return false;
    });

    //发布按钮状态
    $(".OpinionPublic").click(function () {
        $(".OpinionAreaOpinionBK").css("display", "block");
        $(".OpinionAreaOpinionBK").height($(window).height());
        $(".OpinionAreaOpinionBK").width($(window).width());

        $(".OpinionAreaQuickPublish").css("display", "block");
        $(".OpinionAreaQuickPublish").css("display", "block");
        $(".OpinionAreaQuickPublish").height($(window).height() - 20);
        $(".OpinionAreaQuickPublish").width(800);
        $(".OpinionAreaQuickPublish").css("left", ($(window).width() - 800) / 2);
        $(".OpinionAreaQuickPublish").css("top", 10);

        $(".OpinionAreaQPContentEdit").height($(window).height() - 20 - 195);
        $(".OpinionAreaOpinionEEARea").height($(window).height() - 20 - 225);

        //清除数据
        $('.OpinionAreaOpinionTEInput').val("");
        $('.OpinionAreaOpinionEEIimgPath').val("");
        $('.OpinionAreaOpinionEEARea').val("");
    });

    //发表层关闭
    $('.OpinionAreaQPClose').mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/CloseButL.png ')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/CloseBut.png ')");
    }).click(function () {
        $(".OpinionAreaOpinionBK").css("display", "none");
        $(".OpinionAreaQuickPublish").css("display", "none");
        return false;
    });
    //发表看法
    $('.OpinionAreaSubmit').click(function () {        
        var datap = "{" + "'id':" + $('#OpinionAreaSubmitId').html() + "," + "'sContent':'" + $('.OpinionAreaInput').val() + "'," + "'passport':'" + $.cookies.get('allwithmeuser') + "' }";

        $.ajax({
            type: "post",
            contentType: "application/json",
            url: "WebSeverice/PageOpinionSOpPublic.asmx/PageOpinionSOp",
            data: datap,
            dataType: 'json',
            success: function (result) {
                var loadresult = eval('(' + result.d + ')');
                if (loadresult.sState == "PublicOK!") {
                    alert("OK!");
                    $('.OpinionAreaInput').val("");
                }
            }
        });
    });

    //发布说说
    $('.OpinionAreaOpinionEEIimg').change(function () {        
        $('.OpinionAreaOpinionEEIimgPath').val($(this).val());
    });
    //上传数据
    $('.OpinionAreaQPButSubmit').click(function () {
        var ParaName = $.cookies.get('allwithmeuser');
        
        $(".OpinionPublishForm").ajaxSubmit({
            type: "post",  //提交方式  
            data: { 'PName': ParaName, 'STitle': $('.OpinionAreaOpinionTEInput').val(), 'SContent': $('.OpinionAreaOpinionEEARea').val(), 'STypeTag': "宠物" },
            dataType: "text", //数据类型  
            url: "WebFunModule/UpLoadPublicOpinion.ashx", //请求url  
            success: function (sResult) { //提交成功的回调函数                       
                var Uploadresult = $.parseJSON(sResult);
                if (Uploadresult.sState == "SizeTooLarge") {
                    $('.UploadImgTitle').text("文件太大，请重新上传！");
                }
                else if (Uploadresult.sState == "PublishOK!") {
                    alert("发布成功！");
                    $(".OpinionAreaOpinionBK").css("display", "none");
                    $(".OpinionAreaQuickPublish").css("display", "none");
                    return false;
                }

            }
        });
    });

    //鼠标动作
    $('.OpinionCli').each(function () {
        $(this).mouseover(function () {
            $(this).css("border", "1px solid Blue");
            $(this).css("background-color", "#ededef");
        }).mouseleave(function () {
            $(this).css("border", "1px solid #ededef");
            $(this).css("background-color", "White");
        });
    });

}

