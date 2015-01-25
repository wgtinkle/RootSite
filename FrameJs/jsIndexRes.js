
function IndexResInit() {


    var CurPage = "宠物";
    var CurPageItemNum = 6;

    var $ResImgLbut = $('.ResImgLbut');
    var $ResImgRbut = $('.ResImgRbut');
    var $ResImgTagBrowser = $('.ResImgTagBrowser');

    //序列按钮事件
    $ResImgLbut.mouseover(function () {
        $(this).css( "background-image","url('./FrameImg/sitelogo/ResIndexLLbut.png')");
    }).mouseleave(function () {
        $(this).css("background-image","url('./FrameImg/sitelogo/ResIndexLbut.png ')");
    });
    $ResImgRbut.mouseover(function () {
        $(this).css("background-image","url('./FrameImg/sitelogo/ResIndexRLbut.png ')");
    }).mouseleave(function () {
        $(this).css( "background-image", "url('./FrameImg/sitelogo/ResIndexRbut.png ')" );
    });
    //点击滚动事件    
    var $ResImgTagBrowser_ul = $ResImgTagBrowser.find('ul');
    var $ResImgTagBrowser_li = $ResImgTagBrowser.find('li');

    var nWidthBrowser_ul = $ResImgTagBrowser.width();
    var nNumBrowserImg = $ResImgTagBrowser_li.length;
    $ResImgTagBrowser_ul.width(nWidthBrowser_ul * nNumBrowserImg);

    var nIndex = 0;
    $ResImgLbut.click(function () {
        if (nIndex >= 1&& nIndex<=12) {
            var nvhoffset = -$ResImgTagBrowser_li.width()-1;
            $ResImgTagBrowser_ul.animate({ left: '-=' + nvhoffset });
            nIndex--;
        }       
    });
    $ResImgRbut.click(function () {
        if (nIndex <= 11 && nIndex >= 0) {
            var nvhoffset = -$ResImgTagBrowser_li.width()-1;
            $ResImgTagBrowser_ul.animate({ left: '+=' + nvhoffset });
            nIndex++;
        }
    });

    var nbrowserI = 0;
    $('.ResImgTagBrowser').find('li').each(function () {
        $(this).click(function () {
            $('.ResImgTagBrowser').find('li').each(function () {
                $(this).css("background-color", "White");
                $(this).css("color", "#666666");
            });

            $(this).css("background-color", "Red");
            $(this).css("color", "White");

            //状态值赋值并清空元素
            CurPage = $(this).html();
            $('.ResImgArea').find('.ResImgAreaUl').empty();


            CurPageItemNum = 0;
            //加载文件列表
            var datap = "{" + "'sType':'" + CurPage + "'," + "'nItemNum':" + CurPageItemNum.toString() + " }";

            $.ajax({
                type: "post",
                contentType: "application/json",
                url: "WebSeverice/PageResLoad.asmx/PageResLoadData",
                data: datap,
                dataType: 'json',
                success: function (result) {
                    var loadresult = eval('(' + result.d + ')');
                    if (loadresult.sState == "LoadOk!") {
                        var loaddata = eval('(' + loadresult.sdata + ')');

                        for (var i = 0; i < loaddata.length; i++) {

                            var strC = loaddata[i];

                            var strT = strC.substring(0, strC.indexOf('#'));
                            var strI = strC.substring(strC.indexOf('#') + 1);
                            var listImg = strI.split(",");

                            var nodeli = "";
                            var nodeInfo = "";
                            var nodeTli = "";
                            if (listImg.length <= 6) {
                                for (var j = 0; j < 6; j++) {
                                    nodeli = nodeli + "<li>" + "<img src='" + "PageResImg/" + listImg[j] + "'>" + "</img>" + "</li>";
                                };
                            }
                            else {
                                for (var j = 0; j < 6; j++) {
                                    nodeli = nodeli + "<li>" + "<img src='" + "PageResImg/" + listImg[j] + "'>" + "</img>" + "</li>";
                                };
                                for (var j = 6; j < listImg.length - 1; j++) {
                                    nodeInfo = nodeInfo + listImg[j] + ",";
                                };
                                nodeInfo = nodeInfo + listImg[listImg.length - 1];
                            }

                            var nodeul = "<ul>" + nodeli + "</ul>";
                            var nodeimgul = "<div class='ResImgAreaImgUl'>" + nodeul + "</div>"
                            var nodedivT = "<div class='ResImgAreaTitle'>" + strT + "</div>";
                            var nodedivb = "<div class='ResImgAreaBut'>" + "</div>";
                            var nodedivp = "<div class='ResImgAreaPartPerson'>" + "24977参与" + "</div>";
                            var nodedivinfo = "<div class='ResImgAreaInfo'>" + nodeInfo + "</div>"

                            nodeTli = "<li>" + nodedivT + nodedivb + nodedivp + nodeimgul + nodedivinfo + "</li>";

                            $('.ResImgArea').find('.ResImgAreaUl').append(nodeTli);

                            var $Resultemp = $('.ResImgArea').find('.ResImgAreaImgUl').last();

                            $Resultemp.find('img').each(function () {
                                $(this).bind("click", function () {
                                    var vdatalist = "";

                                    $(this).parent().parent().find('img').each(function () {
                                        vdatalist = vdatalist + $(this).attr("src") + ",";

                                    });

                                    if ($(this).parent().parent().parent().parent().find('.ResImgAreaInfo').html() != null) {

                                        var str = $(this).parent().parent().parent().parent().find('.ResImgAreaInfo').html();
                                        var strlist = str.split(',');
                                        for (var k = 0; k < strlist.length - 1; k++) {
                                            vdatalist = vdatalist + "PageResImg/" + strlist[k] + ",";
                                        }
                                        vdatalist = vdatalist + "PageResImg/" + strlist[strlist.length - 1];
                                    }
                                    else {
                                        vdatalist = vdatalist.substring(0, vdatalist.length - 1);
                                    }

                                    ImgPrew("{ 'cursrc':'" + $(this).attr("src") + "' ,'dlist':'" + vdatalist + "'}");
                                });
                            });

                        }
                        CurPageItemNum = CurPageItemNum + loaddata.length;
                    }
                    else if (loadresult.sState == "LoadAll!") {
                        //alert("没有更多了！");
                    }
                }
            });
            


            nbrowserI++;
        });
    });

    //收藏按钮事件
    $('.ResImgAreaBut').mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ShouCangLbut.png')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ShouCangbut.png ')");
    });
    //发表按钮事件
    $('.ResImgPublic').mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/imgShareL.png')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/imgShare.png ')");
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
            url: "WebSeverice/PageResLoad.asmx/PageResLoadData",
            data: datap,
            dataType: 'json',
            success: function (result) {
                var loadresult = eval('(' + result.d + ')');
                if (loadresult.sState == "LoadOk!") {
                    var loaddata = eval('(' + loadresult.sdata + ')');

                    for (var i = 0; i < 2; i++) {

                        var strC = loaddata[i];

                        var strT = strC.substring(0, strC.indexOf('#'));
                        var strI = strC.substring(strC.indexOf('#') + 1);
                        var listImg = strI.split(",");

                        var nodeli = "";
                        var nodeInfo = "";
                        var nodeTli = "";
                        if (listImg.length <= 6) {
                            for (var j = 0; j < 6; j++) {
                                nodeli = nodeli + "<li>" + "<img src='" + "PageResImg/" + listImg[j] + "'>" + "</img>" + "</li>";
                            };
                        }
                        else {
                            for (var j = 0; j < 6; j++) {
                                nodeli = nodeli + "<li>" + "<img src='" + "PageResImg/" + listImg[j] + "'>" + "</img>" + "</li>";
                            };
                            for (var j = 6; j < listImg.length - 1; j++) {
                                nodeInfo = nodeInfo + listImg[j] + ",";
                            };
                            nodeInfo = nodeInfo + listImg[listImg.length - 1];
                        }

                        var nodeul = "<ul>" + nodeli + "</ul>";
                        var nodeimgul = "<div class='ResImgAreaImgUl'>" + nodeul + "</div>"
                        var nodedivT = "<div class='ResImgAreaTitle'>" + strT + "</div>";
                        var nodedivb = "<div class='ResImgAreaBut'>" + "</div>";
                        var nodedivp = "<div class='ResImgAreaPartPerson'>" + "24977参与" + "</div>";
                        var nodedivinfo = "<div class='ResImgAreaInfo'>" + nodeInfo + "</div>"



                        nodeTli = "<li>" + nodedivT + nodedivb + nodedivp + nodeimgul + nodedivinfo + "</li>";

                        $('.ResImgArea').find('.ResImgAreaUl').append(nodeTli);

                        var $Resultemp = $('.ResImgArea').find('.ResImgAreaImgUl').last();

                        $Resultemp.find('img').each(function () {
                            $(this).bind("click", function () {
                                var vdatalist = "";

                                $(this).parent().parent().find('img').each(function () {
                                    vdatalist = vdatalist + $(this).attr("src") + ",";

                                });

                                if ($(this).parent().parent().parent().parent().find('.ResImgAreaInfo').html() != null) {

                                    var str = $(this).parent().parent().parent().parent().find('.ResImgAreaInfo').html();
                                    var strlist = str.split(',');
                                    for (var k = 0; k < strlist.length - 1; k++) {
                                        vdatalist = vdatalist + "PageResImg/" + strlist[k] + ",";
                                    }
                                    vdatalist = vdatalist + "PageResImg/" + strlist[strlist.length - 1];
                                }
                                else {
                                    vdatalist = vdatalist.substring(0, vdatalist.length - 1);
                                }                                

                                ImgPrew("{ 'cursrc':'" + $(this).attr("src") + "' ,'dlist':'" + vdatalist + "'}");
                            });
                        });
                    }
                    CurPageItemNum = CurPageItemNum + 2;
                }
                else if (loadresult.sState == "LoadAll!") {
                    //alert("没有更多了！");
                }
            }
        });
        
        
    };
    //图片预览按钮
    $('.ResAreTopBut').mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/UpthinButL.png')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/UpthinBut.png ')");
    });
    $('.ResAreBotBut').mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/BottomthinButL.png')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/BottomthinBut.png ')");
    });

    //图片排行
    $('.ResRankImg').find('img').each(function () {
        var vdatalist = "";

        if ($(this).parent().parent().find('.ResImgAreaInfo').html() != null) {
            var str = $(this).parent().parent().find('.ResImgAreaInfo').html();
            var strlist = str.split(',');
            for (var k = 0; k < strlist.length - 1; k++) {
                vdatalist = vdatalist + "PageResImg/" + strlist[k] + ",";
            }
            vdatalist = vdatalist + "PageResImg/" + strlist[strlist.length - 1];
        }
        else {
            vdatalist = vdatalist.substring(0, vdatalist.length - 1);
        }
        //alert(vdatalist);
        $(this).click(function () {
            ImgPrew("{ 'cursrc':'" + $(this).attr("src") + "' ,'dlist':'" + vdatalist + "'}");
        });
    });
    
    //图片预览
    $('.ResImgAreaImgUl').find('li').each(function () {
        var vdatalist = "";
        
        $(this).parent().find('img').each(function () {
            vdatalist = vdatalist + $(this).attr("src") + ",";

        });

        if ($(this).find('.ResImgAreaInfo').html() != null) {
            vdatalist = vdatalist + $(this).find('.ResImgAreaInfo').html();
        }
        else {
            vdatalist = vdatalist.substring(0, vdatalist.length - 1);
        }

        $(this).find('img').each(function () {
            $(this).click(function () {
                ImgPrew("{ 'cursrc':'" + $(this).attr("src") + "' ,'dlist':'" + vdatalist + "'}");
            });
        });
    });

    var nListIndex = 0; //左侧列表的序号
    var nHeightBrowser_ul = 0; //左侧列表的ul
    var nNumBrowser = 0; //左侧列表的个数
    var nliHeight = 0;
    function ImgPrew(srcimg) {

        var sdata = eval('(' + srcimg + ')');
        
        //背景
        $('.ResAreImgImg').attr("src", "");
        $(".ResAreImgBK").css("display", "block");
        $(".ResAreImgBK").height($(window).height());
        $(".ResAreImgBK").width($(window).width());
        //图片层位置
        $(".ResAreImgC").css("display", "block");
        $(".ResAreImgC").height($(window).height() - 20);
        $(".ResAreImgC").width($(window).width());
        $(".ResAreImgC").css("top", 10);
        //右侧的列表
        $('.ResAreImgList').height($(window).height() - 20);
        $(".ResAreImgList").css("left", 10 + 800 + 20 + ($(window).width()-800-200-20)/2);
        $('.ResAreTopBut').css("top", 5);
        $('.ResAreListC').css("top", 35);
        $(".ResAreListC").height($(window).height() - 20 - 60 - 15);
        $('.ResAreBotBut').css("top", 35 + 10 + $(window).height() - 20 - 60 - 15);
        //左侧的预览
        $(".ResAreImgImg").css("left", ($(window).width() - 800 - 200 - 20) / 2);
        $('.ResAreImgImg').attr("src", sdata.cursrc);
        $(".ResAreImgImg").height($(window).height() - 20);
        $(".ResAreImgImg").width(800);
        //关闭
        $(".ResAreImgClose").css("left", $(window).width() - 45);
        //加载图片
        
        $('.ResAreListC').find('ul').empty();

        var listimg = sdata.dlist.split(",");        

        for (var i = 0; i < listimg.length; i++) {
            var simg = listimg[i];
            var nodeli = "<li>" + "<img src='" + simg + "'>" + "</img>" + "</li>";
            $('.ResAreListC').find('ul').append(nodeli);
        }
        //调整图片大小
        $('.ResAreListC').find('ul').height($(window).height() - 20 - 60 - 15);
        $('.ResAreListC').find('li').each(function () {
            $(this).height(($(window).height() - 20 - 60 - 15) / 4 - 10);
            $(this).bind("click", function () {
            $('.ResAreImgImg').attr("src", $(this).find('img').attr("src"));
            });

        });
        //图片查看预览
        var $ResAreListC = $('.ResAreListC');
        var $ResAreListC_ul = $('.ResAreListC').find('ul');
        var $ResAreListC_li = $('.ResAreListC').find('li');

        nHeightBrowser_ul = $ResAreListC.height();
        nNumBrowser = $ResAreListC_li.length;
        $ResAreListC_ul.height(nHeightBrowser_ul * nNumBrowser);

        nliHeight = $('.ResAreListC').find('li').height();


        $('.ResAreBotBut').bind("click", function () {
            if ((nListIndex <= nNumBrowser - 5) && (nNumBrowser >= 3)) {
                var nvhoffset = -nliHeight - 10;
                $('.ResAreListC').find('ul').animate({ top: '+=' + nvhoffset });
                nListIndex++;
            };
        });
        $('.ResAreTopBut').bind("click", function () {
            if (nListIndex >= 1 && nListIndex <= nNumBrowser && nNumBrowser >= 3) {
                var nvhoffset = -nliHeight - 10;
                $('.ResAreListC').find('ul').animate({ top: '-=' + nvhoffset });
                nListIndex--;
            };
        });
    };


    //关闭
    $('.ResAreImgClose').mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/CloseButL.png ')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/CloseBut.png ')");
    }).click(function () {
        $(".ResAreImgBK").css("display", "none");
        $(".ResAreImgC").css("display", "none");
        return false;
    });

    //图片预览
    $(".ResImgPublic").click(function () {
        $(".ResAreImgBK").css("display", "block");
        $(".ResAreImgBK").height($(window).height());
        $(".ResAreImgBK").width($(window).width());

        $(".ResAreImgUpload").css("display", "block");
        $(".ResAreImgUpload").height($(window).height() - 20);
        $(".ResAreImgUpload").width($(window).width() - 20);

        $(".ResAreImgPreview").css("left", 10 + $(window).width() - 20 - 850);
        $(".ResAreImgPreview").css("top", 10);

        $(".ResAreImgPreview").height($(window).height() - 20);
        $(".ResAreImgUploadImgPreview").height($(window).height() - 20 - 100);

        $(".ResAreImgUploadImgPlist").height($(window).height() - 35);
        $(".ResAreImgUploadImgPlist").width($(window).width() - 20 - 900);
        $(".ResAreImgUploadImgPlist").css("left", 10);
        $(".ResAreImgUploadImgPlist").css("top", 20);

        $('.ResAreImgUploadImgClose').css("left", $(window).width() - 50);

        $('.ResAreImgUploadImgPathimg').val("");
        $('.ResAreImgUploadImgPathPath').val("");
        $('.ResAreImgUploadTitleInput').val("");
        $('.ResAreImgUploadImgPlist').find('ul').empty();

    });

    $('.ResAreImgUploadImgPathimg').change(function () {

        var img = document.getElementById('ResAreImgUploadImgPathimg');
        var filePath = getPath(img);
        var sImg = "<img src='" + filePath + "'" + " />"

        $('.ResAreImgUploadImgPreview').empty();
        $('.ResAreImgUploadImgPreview').append(sImg);
    });
    function getPath(obj) {  //获取图片路径
        if (obj) {
            if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
                obj.select();
                return document.selection.createRange().text;
            } else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
                if (obj.files) {
                    return obj.files.item(0).getAsDataURL();
                }
                return obj.value;
            }
            return obj.value;
        }
    }

    //关闭
    $('.ResAreImgUploadImgClose').mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/CloseButL.png ')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/CloseBut.png ')");
    }).click(function () {
        $(".ResAreImgBK").css("display", "none");
        $(".ResAreImgUpload").css("display", "none");

        $('.ResAreImgUploadImgPathimg').val("");
        $('.ResAreImgUploadImgPathPath').val("");
        $('.ResAreImgUploadTitleInput').val("");
        $('.ResAreImgUploadImgPlist').find('ul').empty();

        return false;
    });

    $('.ResAreImgUploadImgPathimg').change(function () {
        $('.ResAreImgUploadImgPathPath').val($(this).val());
    });
    //图片上传
    $('.ResAreImgUploadTitleUpBtn').click(function () {
        var ImgTitle = $('.ResAreImgUploadTitleInput').val();

        var ParaName = $.cookies.get('allwithmeuser');

        $(".UpLoadForm").ajaxSubmit({
            type: "post",  //提交方式  
            data: { 'PName': ParaName, 'ImgTitle': $('.ResAreImgUploadTitleInput').val() },
            dataType: "text", //数据类型  
            url: "WebFunModule/UpLoadResImgFile.ashx", //请求url  
            success: function (sResult) { //提交成功的回调函数                       
                var Uploadresult = $.parseJSON(sResult);
                if (Uploadresult.sState == "SizeTooLarge") {
                    $('.UploadImgTitle').text("文件太大，请重新上传！");
                }
                else if (Uploadresult.sState == "UploadOk") {

                    var nodedivI = "<li>" + "<img src ='" + Uploadresult.sPath + "'/img>" + "</li>";

                    $('.ResAreImgUploadImgPlist').find('ul').append(nodedivI);

                    $(".ResAreImgUploadImgPlist").find('li').each(function () {

                        $(this).height(($('.ResAreImgUploadImgPlist').height() - 20) / 3);
                        $(this).width(($('.ResAreImgUploadImgPlist').width() - 35) / 2);

                    });


                    return false;
                }

                $('.ResAreImgUploadImgPathimg').val("");
                $('.ResAreImgUploadImgPathPath').val("");

            }
        });
    });



};
