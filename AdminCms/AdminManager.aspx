<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AdminManager.aspx.cs" Inherits="AdminManager" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body >
        <form id="form1" runat="server" style="text-align:center">        
            <div style = " margin:0 auto; top:0px; width:1000px; height:auto; position:relative">
                <asp:Panel ID="Panel1" runat="server" Direction="LeftToRight" Height="50px"
                    Width="1000px" EnableTheming="False" HorizontalAlign="Center" 
                    BorderStyle="None" BackColor="#003399" EnableViewState="False">
                    <asp:Button ID="SiteView" runat="server" Text="网站总览" BackColor="#003399" 
                        BorderStyle="None" Font-Size="Large" ForeColor="White" Height="50px" 
                        Width="100px"  onclick="SiteView_Click"/>
                    <asp:Button ID="ArticleManage" runat="server" BackColor="#003399" 
                        BorderStyle="None" Font-Size="Large" ForeColor="White" Height="50px" 
                        Text="文章管理" Width="100px" Style="margin:0" onclick="ArticleManage_Click"/>
                    <asp:Button ID="OpinionManage" runat="server" BackColor="#003399" 
                        BorderStyle="None" Font-Size="Large" ForeColor="White" Height="50px" 
                        Text="观点管理" Width="100px" onclick="OpinionManage_Click" />
                    <asp:Button ID="DataManage" runat="server" BackColor="#003399" 
                        BorderStyle="None" Font-Size="Large" ForeColor="White" Height="50px" 
                        Text="数据管理" Width="100px" onclick="DataManage_Click" />
                    <asp:Button ID="ResManage" runat="server" BackColor="#003399" 
                        BorderStyle="None" Font-Size="Large" ForeColor="White" Height="50px" 
                        Text="资源管理" Width="100px" onclick="ResManage_Click" />
                    <asp:Button ID="RelationManage" runat="server" BackColor="#003399" 
                        BorderStyle="None" Font-Size="Large" ForeColor="White" Height="50px" 
                        Text="联系管理" Width="100px" onclick="RelationManage_Click" />
                    <asp:Button ID="FlowManage" runat="server" BackColor="#003399" 
                        BorderStyle="None" Font-Size="Large" ForeColor="White" Height="50px" 
                        Text="流管理" Width="100px" onclick="FlowManage_Click" />
                    <asp:Button ID="UserManage" runat="server" BackColor="#003399" 
                        BorderStyle="None" Font-Size="Large" ForeColor="White" Height="50px" 
                        Text="用户管理" Width="100px" onclick="UserManage_Click" />
                    <asp:Button ID="FileManage" runat="server" BackColor="#003399" 
                        BorderStyle="None" Font-Size="Large" ForeColor="White" Height="50px" 
                        Text="文件管理" Width="100px" onclick="FileManage_Click" />
                </asp:Panel>
                <asp:MultiView ID="PageViewManager" runat="server">
                    <asp:View ID="FilePage" runat="server">
                    </asp:View>
                    <asp:View ID="UserPage" runat="server">
                    </asp:View>
                    <asp:View ID="FlowPage" runat="server">
                    </asp:View>
                    <asp:View ID="RelationPage" runat="server">
                    </asp:View>
                    <asp:View ID="ResPage" runat="server">
                    </asp:View>
                    <asp:View ID="DataPage" runat="server">
                    </asp:View>
                    <asp:View ID="OpinionPage" runat="server">
                    </asp:View>
                    <asp:View ID="ArticlePage" runat="server">
                    </asp:View>
                    <asp:View ID="SitePage" runat="server" >
                        <asp:Label ID="Label1" runat="server" BorderStyle="None" Height="30px" 
                            Text="总访问量：" Width="100px"
                            style=" position:absolute; margin-top:20px; left:5px; line-height:25px; ">
                        </asp:Label>
                        <asp:Label ID="LabelVisitorNum" runat="server" Height="30px" Text="1231" 
                            Width="100px" style=" position:absolute; margin-top:20px; left:105px; line-height:25px;"></asp:Label>
                        <asp:Label ID="Label2" runat="server" BorderStyle="None" Height="30px" 
                            Text="今日访客：" Width="100px"                            
                            style=" position:absolute; margin-top:20px; left:300px; line-height:25px; right: 600px;">
                        </asp:Label>
                        <asp:Label ID="LabelTodayVisitorNum" runat="server" Height="30px" Text="100" 
                            Width="100px" style=" position:absolute; margin-top:20px; left:405px; line-height:25px;"></asp:Label>
                         <asp:Label ID="Label3" runat="server" BorderStyle="None" Height="30px" 
                            Text="总用户数：" Width="100px"
                            style=" position:absolute; margin-top:20px; left:550px; line-height:25px; ">
                        </asp:Label>
                        <asp:Label ID="LabelRegsiterNum" runat="server" Height="30px" Text="1231" 
                            Width="100px" style=" position:absolute; margin-top:20px; left:650px; line-height:25px;"></asp:Label>
                        <asp:Label ID="Label4" runat="server" BorderStyle="None" Height="30px" 
                            Text="今日注册：" Width="100px"
                            style=" position:absolute; margin-top:20px; left:800px; line-height:25px; ">
                        </asp:Label>
                        <asp:Label ID="LabelTodayRegsiterNum" runat="server" Height="30px" Text="1231" 
                            Width="100px" 
                            style=" position:absolute; margin-top:20px; left:900px; line-height:25px; right: 495px;"></asp:Label>
                    </asp:View>
                </asp:MultiView>    
            </div>
            
        </form>

</body>
</html>
