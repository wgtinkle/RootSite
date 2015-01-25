
function UserManageInit() {

    //获取各对象
    var $ContentIndex_li = $('.ContentIndex').find('li');
    //初始化各标签页内容
    $('.ArticleEdit').xheditor({ tools: 'full',
        width: 645,
        height: 415,
        upImgUrl: 'WebFunModule/UpLoadArticleImgFile.ashx?immediate=1',
        upImgExt: "jpg,jpeg,gif,bmp,png",
        html5Upload: false,
        dataType: 'json',
        urlType: 'root',
        onUpload: insertUpload
    });
    //编辑框的上传处理结果
    function insertUpload(sResult) {
        alert(sResult);
    }

    

    //标签的切换效果
    var nContentIndex = 0;
    $ContentIndex_li.each(function () {
        var $this = $(this);
        $this.bind("click", { num: nContentIndex }, PageCursorOver);
        if (nContentIndex == 0) {
            $this.css({ "background-color": "White", "color": "Red" });
        }

        nContentIndex++;

    });
    function PageCursorOver(e) {
        var nIndext = 0;
        $ContentIndex_li.each(function () {
            if (e.data.num == nIndext) {
                $(this).css({ "background-color": "White", "color": "Red" });

            }
            else {
                $(this).css({ "background-color": "Orange", "color": "Black" });
            }

            nIndext++;
        });
        switch(e.data.num)
        {
            case 0:
                $('.PageZone').css("display","block");
                $('.PageArticle').css("display","none");
                $('.PageOpinion').css("display","none");
                $('.PageData').css("display","none");
                $('.PageRes').css("display","none");
                $('.PageRelation').css("display","none");
                $('.PageFlow').css("display","none");
                break;
            case 1:
                $('.PageZone').css("display","none");
                $('.PageArticle').css("display","block");
                $('.PageOpinion').css("display","none");
                $('.PageData').css("display","none");
                $('.PageRes').css("display","none");
                $('.PageRelation').css("display","none");
                $('.PageFlow').css("display","none");
                break;
            case 2:
                $('.PageZone').css("display","none");
                $('.PageArticle').css("display","none");
                $('.PageOpinion').css("display","block");
                $('.PageData').css("display","none");
                $('.PageRes').css("display","none");
                $('.PageRelation').css("display","none");
                $('.PageFlow').css("display","none");
                break;
            case 3:
                $('.PageZone').css("display","none");
                $('.PageArticle').css("display","none");
                $('.PageOpinion').css("display","none");
                $('.PageData').css("display","block");
                $('.PageRes').css("display","none");
                $('.PageRelation').css("display","none");
                $('.PageFlow').css("display","none");
                break;
            case 4:
                $('.PageZone').css("display","none");
                $('.PageArticle').css("display","none");
                $('.PageOpinion').css("display","none");
                $('.PageData').css("display","none");
                $('.PageRes').css("display","block");
                $('.PageRelation').css("display","none");
                $('.PageFlow').css("display","none");
                break;
            case 5:
                $('.PageZone').css("display","none");
                $('.PageArticle').css("display","none");
                $('.PageOpinion').css("display","none");
                $('.PageData').css("display","none");
                $('.PageRes').css("display","none");
                $('.PageRelation').css("display","block");
                $('.PageFlow').css("display","none");
                break;
            case 6:
                $('.PageZone').css("display","none");
                $('.PageArticle').css("display","none");
                $('.PageOpinion').css("display","none");
                $('.PageData').css("display","none");
                $('.PageRes').css("display","none");
                $('.PageRelation').css("display","none");
                $('.PageFlow').css("display","block");
                break;
        };


    };

    //修改头像
    $('.HeadMotifyBut').click(function () {
        $('.HeadUploadPage').css('display', 'block');
        var vWindowWidth = $(window).width();
        var vWindowHeight = $(window).height();
        $('.HeadUploadPage').css('left', (vWindowWidth - 400) / 2);
        $('.HeadUploadPage').css('top', (vWindowHeight - 225) / 2);
    });
    $('.UpLoadButCancle').click(function () {
        $('.HeadUploadPage').css('display', 'none');
        return false;
    });
    //头像上传
    $('.UpLoadButSubmit').click(function () {
        if ($('.ImgBrowser').val() != null) {

            var ParaName = $.cookies.get('allwithmeuser');

            $(".UpLoadForm").ajaxSubmit({
                type: "post",  //提交方式  
                data: { 'PName': ParaName },
                dataType: "text", //数据类型  
                url: "WebFunModule/UpLoadHeadImgFile.ashx", //请求url  
                success: function (sResult) { //提交成功的回调函数                       
                    var Uploadresult = $.parseJSON(sResult);
                    if (Uploadresult.sState == "SizeTooLarge") {
                        $('.UploadImgTitle').text("文件太大，请重新上传！");
                    }
                    else if (Uploadresult.sState == "UploadOk") {
                        alert("上传成功！");                        
                        $('.UploadImgTitle').text("上传成功！");
                        $('.HeadUploadPage').css('display', 'none');
                        $('#UploadPic').attr("src", Uploadresult.sPath);
                        $('.PersonHeadImg').attr("src", Uploadresult.sPath);
                        $('#UploadPic').attr("src", Uploadresult.sPath);
                        $(".UpLoadForm").clearForm();
                        return false;
                    }

                }
            });
        }


    });

//    //文章上传
//    $('.ArticleSubmitBtnOk').click(function () {
//        var ParaName = $.cookies.get('allwithmeuser');
//        var sContent = $('.ArticleEdit').val();
//        var regSL = new RegExp("<", "gi");
//        var regSR = new RegExp(">", "gi");
//        sContent = sContent.replace(regSL, "$@$");
//        sContent = sContent.replace(regSR, "$#$");

//        //获取提交内容
//        $(".ArticleForm").ajaxSubmit({
//            type: "post",  //提交方式  
//            data: { 'PName': ParaName, 'AContent': sContent, 'ArtilceTitle': $('#ArtilceTitle').val(), 'ArtilceTag': $('#ArtilceTag').val() },
//            dataType: "text", //数据类型  
//            url: "WebFunModule/UpLoadArticleContentFile.ashx", //请求url  
//            success: function (sResult) { //提交成功的回调函数                       
//                var Uploadresult = $.parseJSON(sResult);
//                if (Uploadresult.sState == "UpLoadArticleOk") {
//                    alert("上传成功！");
//                    $('#ArtilceTitle').val("");
//                    $('#ArtilceTag').val("");
//                    $('.ArticleEdit').val("");
//                }
//                else if (Uploadresult.sState == "UpLoadArticleTitleNull") {
//                    alert("请输入您的标题！");
//                }
//                else if (Uploadresult.sState == "UpLoadArticleTagNull") {
//                    alert("请输入您的标签！");
//                }
//                else if (Uploadresult.sState == "UpLoadArticleContentNull") {
//                    alert("请输入您的内容！");
//                }
//                else if (Uploadresult.sState == "UpLoadArticleUserNull") {
//                    alert("请您先登录！");
//                }
//            }
//        });
//    });

    //文章的鼠标效果
    $('.SelfArticleList').find('li').each(function () {
        $(this).mouseover(function () {
            $(this).css("border", "1px solid Blue");
            $(this).css("background-color", "#ededef");
        }).mouseleave(function () {
            $(this).css("border", "1px solid #ededef");
            $(this).css("background-color", "White");
        });
    });

    $('.ColectArticleList').find('li').each(function () {
        $(this).mouseover(function () {
            $(this).css("border", "1px solid Blue");
            $(this).css("background-color", "#cdedef");
        }).mouseleave(function () {
            $(this).css("border", "1px solid #ededef");
            $(this).css("background-color", "White");
        });
    });

    //加载头像    
    //$('#PersonHeadImg').attr("src", $('#MenuUserImg').attr("src"));
    if ($.cookies.get('allwithmeuser') != null) {
        var Cookpara = "{" + "'userpassport':'" + $.cookies.get('allwithmeuser') + "' }";
        $.ajax({
            type: "post",
            contentType: "application/json",
            url: "WebSeverice/UserLoad.asmx/UserIsOnline",
            data: Cookpara,
            dataType: 'json',
            success: function (result) {
                var loadresult = eval('(' + result.d + ')');
                if (loadresult.sState == "Online") {
                    $('#PersonHeadImg').attr("src", loadresult.sPath);                    
                }
                else if (loadresult.sState == "Offlined")
                    $.cookies.del('allwithmeuser');
            }
        });
    }
}

