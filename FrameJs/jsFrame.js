
function FrameInit() {

    //页面调整
    var vWindowWidth = $(window).width();
    var vWindowHeight = $(window).height();

    //调整菜单导航栏
    $('.FrameMenu').css('left', (vWindowWidth - 950) / 2);

    //验证在线    
    if ($.cookies.get('allwithmeuser') != null) {
        var Cookpara = "{" + "'userpassport':'" + $.cookies.get('allwithmeuser')+"' }";
        $.ajax({
            type: "post",
            contentType: "application/json",
            url: "WebSeverice/UserLoad.asmx/UserIsOnline",
            data: Cookpara,
            dataType: 'json',
            success: function (result) {
                var loadresult = eval('(' + result.d + ')');
                if (loadresult.sState == "Online") {
                    $('.FrameUnLoad').css("display", "none");
                    $(".FrameLoad").css("display", "block");
                    $('#MenuUserImg').attr("src", loadresult.sPath);
                    $(".RobotTalk").text("欢迎归来！");
                 }
                else if (loadresult.sState == "Offlined")
                     $.cookies.del('allwithmeuser');
                }
        });
     }


    var nPageHeight = $('.CNews').height() + $('.COpinion').height() + $('.CData').height() + $('.CRes').height() + $('.CPerson').height() + $('.CFlow').height();
    nPageHeight = nPageHeight + 150 + 100;
    //注册页
    var $UserLoad = $('.UserLoad');
    var $UserLoadPage = $('.UserLoadPage');
    var $LoadRegBk = $('.LoadRegBk');

    $UserLoad.click(function () {
    $LoadRegBk.css('display', 'block');
    $LoadRegBk.width(950);
    $LoadRegBk.height(nPageHeight);
    $UserLoadPage.css('display', 'block');

    $UserLoadPage.css('left', (vWindowWidth - 400) / 2);
    $UserLoadPage.css('top', (vWindowHeight - 225) / 2);

    });

    //确定、取消按钮
    var $UserLoadBut = $('.UserLoadBut');
    var $UserLoadCancle = $('.UserLoadCancle');

    $UserLoadBut.click(function () {
        //验证用户        

        var datapara = "{" + "'userpassport':'" + $('#UserNameL').val().toString() + "'," + "'userpswd':'" + $('#UserPwdL').val().toString() + "' }";
        $.ajax({
            type: "post",
            contentType: "application/json",
            url: "WebSeverice/UserLoad.asmx/UserLoadVerify",
            data: datapara,
            dataType: 'json',
            success: function (result) {
                var loadresult = eval('(' + result.d + ')');
                if (loadresult.sState == "Online") {
                    $LoadRegBk.css('display', 'none');
                    $UserLoadPage.css('display', 'none');
                    alert("已登录");
                    $('.UserLoadPageTitle').text("已登录");
                    $('.FrameUnLoad').css("display", "none");
                    $(".FrameLoad").css("display", "block");
                    $('#MenuUserImg').attr("src", loadresult.sPath);
                    $(".RobotTalk").text("欢迎归来！");

                    return false;
                }
                else if (loadresult.sState == "LoadAdmin") {
                    $LoadRegBk.css('display', 'none');
                    $UserLoadPage.css('display', 'none');
                    window.location.href = loadresult.sPath;
                    return false;
                }
                else if (loadresult.sState == "LoadOk") {
                    $LoadRegBk.css('display', 'none');
                    $UserLoadPage.css('display', 'none');
                    $('.UserLoadPageTitle').text("欢迎回来");
                    $(".RobotTalk").text("欢迎归来！");
                    $('#MenuUserImg').attr("src", loadresult.sPath);
                    $('.FrameUnLoad').css("display", "none");
                    $(".FrameLoad").css("display", "block");

                    //创建Cookie记录用户登录
                    $.cookies.set('allwithmeuser', $('#UserNameL').val().toString(), { path: "/" });
                    //alert($.cookies.get("allwithmeuser")); 
                    
                    return false;
                }
                else if (loadresult.sState == "PswdError") {
                    $('.UserLoadPageTitle').text("密码错误");
                }
                else if (loadresult.sState == "NoExist") {
                    $('.UserLoadPageTitle').text("账号不存在");
                }
            }
        });
    });

    $UserLoadCancle.click(function () {
        $LoadRegBk.css('display', 'none');
        $UserLoadPage.css('display', 'none');
        return false;
    });

    //注册页
    var $UserReg = $('.UserRegister');
    var $RegisterPage = $('.RegisterPage');

    $UserReg.click(function () {
        $LoadRegBk.css('display', 'block');
        $LoadRegBk.width(950);
        $LoadRegBk.height(nPageHeight);
        $RegisterPage.css('display', 'block');

        $RegisterPage.css('left', (vWindowWidth - 400) / 2);
        $RegisterPage.css('top', (vWindowHeight - 225) / 2);
    });

    //确定、取消按钮
    var $UserRegBut = $('.UserRegBut');
    var $UserRegCancle = $('.UserRegCancle');
    $UserRegBut.click(function () {

        var datapara = "{" + "'userpassport':'" + $('#UserNameR').val().toString() + "'," + "'userpswd':'" + $('#UserPwdR').val().toString() + "' }";
        $.ajax({
            type: "post",
            contentType: "application/json",
            url: "WebSeverice/UserLoad.asmx/UserRegister",
            data: datapara,
            dataType: 'json',
            success: function (result) {
                alert(result.d);
                if (result.d == "HasRegisted") {
                    $('.RegisterPageTitle').text("账号已注册");
                }
                else if (result.d == "RegistOk") {
                    $LoadRegBk.css('display', 'none');
                    $RegisterPage.css('display', 'none');
                    $(".RobotTalk").text("恭喜您成为我们的一员！");
                    return false;
                }
                else if (result.d == "RegistError") {
                    $LoadRegBk.css('display', 'none');
                    $RegisterPage.css('display', 'none');
                    $(".RobotTalk").text("服务器忙，请稍后再试！");
                    return false;

                }

            }

        });
    });
    $UserRegCancle.click(function () {
        $LoadRegBk.css('display', 'none');
        $RegisterPage.css('display', 'none');        
        return false;
    });

    //登陆后的页面
    var $UserZone = $('.UserZone');
    var $UserQuit = $('.UserQuit');

    $UserZone.click(function () { //我的区域

        //先跳转
        window.location.href = "./UserManager.htm";
        //加载数据
    });

    $UserQuit.click(function () { //退出
        
        var Cookpara = "{" + "'userpassport':'" + $.cookies.get('allwithmeuser') + "' }";
        
        $.ajax({
            type: "post",
            contentType: "application/json",
            url: "WebSeverice/UserLoad.asmx/UserIsOffline",
            data: Cookpara,
            dataType: 'json',
            success: function (result) {
                if (result.d == "Offline") {
                    alert("Quit");
                    $(".RobotTalk").text("退出成功！");
                    $('.FrameUnLoad').css("display", "block");
                    $(".FrameLoad").css("display", "none");
                    $('#MenuUserImg').attr("src", "./FrameImg/UserHead/HeadUser.jpg");
                    $.cookies.del('allwithmeuser');

                }
                else if (result.d == "Offlined") {
                    $(".RobotTalk").text("已下线！");
                    $('.FrameUnLoad').css("display", "block");
                    $(".FrameLoad").css("display", "none");
                    $('#MenuUserImg').attr("src", "./FrameImg/UserHead/HeadUser.jpg");
                }
            }

        });

    });
    

    //窗口的输入框
    $('.MenuUserTalk').mouseover(function () {
        $(this).css({ "border": "1px solid Blue", "background-color": "#222222","color":"Blue" });
        $('.MenuUserBut').css({ "background-color": "Blue" });
    }).mouseleave(function () {
        $(this).css({ "border": "0px solid Blue", "background-color": "#24292c", "color": "#24292c" });
        $('.MenuUserBut').css({ "background-color": "#24292c" });
    });

    $('.MenuUserBut').mouseover(function () {
        $('.MenuUserTalk').css({ "border": "1px solid Blue", "background-color": "#222222", "color": "Blue" });
        $('.MenuUserBut').css({ "background-color": "Blue" });
    }).mouseleave(function () {
        $('.MenuUserTalk').css({ "border": "0px solid Blue", "background-color": "#24292c", "color": "#24292c" });
        $('.MenuUserBut').css({ "background-color": "#24292c" });
    });

};




