
function IndexPersonInit() {

    var $PersonLbut = $('.PersonLbut');
    var $PersonRbut = $('.PersonRbut');
    var $PersonTagBrowser = $('.PersonTagBrowser');

    //序列按钮事件
    $PersonLbut.mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexLLbut.png')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexLbut.png ')");
    });
    $PersonRbut.mouseover(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexRLbut.png ')");
    }).mouseleave(function () {
        $(this).css("background-image", "url('./FrameImg/sitelogo/ResIndexRbut.png ')");
    });
    //点击滚动事件    
    var $PersonTagBrowser_ul = $PersonTagBrowser.find('ul');
    var $PersonTagBrowser_li = $PersonTagBrowser.find('li');

    var nWidthBrowser_ul = $PersonTagBrowser.width();
    var nNumBrowserImg = $PersonTagBrowser_li.length;
    $PersonTagBrowser_ul.width(nWidthBrowser_ul * nNumBrowserImg);

    var nIndex = 0;
    $PersonLbut.click(function () {
        if (nIndex >= 1 && nIndex <= 12) {
            var nvhoffset = -$PersonTagBrowser_li.width() - 1;
            $PersonTagBrowser_ul.animate({ left: '-=' + nvhoffset });
            nIndex--;
        }
    });
    $PersonRbut.click(function () {
        if (nIndex <= 11 && nIndex >= 0) {
            var nvhoffset = -$PersonTagBrowser_li.width() - 1;
            $PersonTagBrowser_ul.animate({ left: '+=' + nvhoffset });
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

//            $.ajax({
//                type: "post",
//                contentType: "application/json",
//                url: "WebSeverice/PageResLoad.asmx/PageResLoadData",
//                data: datap,
//                dataType: 'json',
//                success: function (result) {
//                    var loadresult = eval('(' + result.d + ')');
//                    if (loadresult.sState == "LoadOk!") {
//                        var loaddata = eval('(' + loadresult.sdata + ')');

//                        for (var i = 0; i < loaddata.length; i++) {

//                            var strC = loaddata[i];

//                            var strT = strC.substring(0, strC.indexOf('#'));
//                            var strI = strC.substring(strC.indexOf('#') + 1);
//                            var listImg = strI.split(",");

//                            var nodeli = "";
//                            var nodeInfo = "";
//                            var nodeTli = "";
//                            if (listImg.length <= 6) {
//                                for (var j = 0; j < 6; j++) {
//                                    nodeli = nodeli + "<li>" + "<img src='" + "PageResImg/" + listImg[j] + "'>" + "</img>" + "</li>";
//                                };
//                            }
//                            else {
//                                for (var j = 0; j < 6; j++) {
//                                    nodeli = nodeli + "<li>" + "<img src='" + "PageResImg/" + listImg[j] + "'>" + "</img>" + "</li>";
//                                };
//                                for (var j = 6; j < listImg.length - 1; j++) {
//                                    nodeInfo = nodeInfo + listImg[j] + ",";
//                                };
//                                nodeInfo = nodeInfo + listImg[listImg.length - 1];
//                            }

//                            var nodeul = "<ul>" + nodeli + "</ul>";
//                            var nodeimgul = "<div class='ResImgAreaImgUl'>" + nodeul + "</div>"
//                            var nodedivT = "<div class='ResImgAreaTitle'>" + strT + "</div>";
//                            var nodedivb = "<div class='ResImgAreaBut'>" + "</div>";
//                            var nodedivp = "<div class='ResImgAreaPartPerson'>" + "24977参与" + "</div>";
//                            var nodedivinfo = "<div class='ResImgAreaInfo'>" + nodeInfo + "</div>"

//                            nodeTli = "<li>" + nodedivT + nodedivb + nodedivp + nodeimgul + nodedivinfo + "</li>";

//                            $('.ResImgArea').find('.ResImgAreaUl').append(nodeTli);

//                            var $Resultemp = $('.ResImgArea').find('.ResImgAreaImgUl').last();

//                            $Resultemp.find('img').each(function () {
//                                $(this).bind("click", function () {
//                                    var vdatalist = "";

//                                    $(this).parent().parent().find('img').each(function () {
//                                        vdatalist = vdatalist + $(this).attr("src") + ",";

//                                    });

//                                    if ($(this).parent().parent().parent().parent().find('.ResImgAreaInfo').html() != null) {

//                                        var str = $(this).parent().parent().parent().parent().find('.ResImgAreaInfo').html();
//                                        var strlist = str.split(',');
//                                        for (var k = 0; k < strlist.length - 1; k++) {
//                                            vdatalist = vdatalist + "PageResImg/" + strlist[k] + ",";
//                                        }
//                                        vdatalist = vdatalist + "PageResImg/" + strlist[strlist.length - 1];
//                                    }
//                                    else {
//                                        vdatalist = vdatalist.substring(0, vdatalist.length - 1);
//                                    }

//                                    ImgPrew("{ 'cursrc':'" + $(this).attr("src") + "' ,'dlist':'" + vdatalist + "'}");
//                                });
//                            });

//                        }
//                        CurPageItemNum = CurPageItemNum + loaddata.length;
//                    }
//                    else if (loadresult.sState == "LoadAll!") {
//                        //alert("没有更多了！");
//                    }
//                }
//            });



            nbrowserI++;
        });
    });

    var nbrowserI = 0;
    $('.PersonTagBrowser').find('li').each(function () {
        $(this).click(function () {
            $('.PersonTagBrowser').find('li').each(function () {
                $(this).css("background-color", "White");
                $(this).css("color", "#666666");
            });

            $(this).css("background-color", "Red");
            $(this).css("color", "White");
        });
    })

};
