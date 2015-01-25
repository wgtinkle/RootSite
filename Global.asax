<%@ Application Language="C#" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Xml.Linq" %>

<script runat="server">

    void Application_Start(object sender, EventArgs e) 
    {
        //在应用程序启动时运行的代码
        //int user_sessions = 0;
        //Application["user_sessions"] = 0;
        
    }
    
    void Application_End(object sender, EventArgs e) 
    {
        //在应用程序关闭时运行的代码

    }
        
    void Application_Error(object sender, EventArgs e) 
    { 
        //在出现未处理的错误时运行的代码

    }

    void Session_Start(object sender, EventArgs e) 
    {
        //在新会话启动时运行的代码
        //Application.Lock();
        //Application["user_sessions"] = (int)Application["user_sessions"] + 1;

        //XDocument xdoc = XDocument.Load("E:\\RootSite\\SiteRecord\\SiteRecord.xml");

        //XElement xEle = (from node in xdoc.Element("SiteRecord").Elements("TotalVistor") select node).Single() as XElement;
        ////xEle.Value = Application["user_sessions"].ToString();
        //int Conter = (int)Application["user_sessions"];
        //xEle.Value = Conter.ToString();

        //xdoc.Save("E:\\RootSite\\SiteRecord\\SiteRecord.xml");

        //Application.UnLock(); 

        
       
    }

    void Session_End(object sender, EventArgs e) 
    {
        //在会话结束时运行的代码。 
        // 注意: 只有在 Web.config 文件中的 sessionstate 模式设置为
        // InProc 时，才会引发 Session_End 事件。如果会话模式 
        //设置为 StateServer 或 SQLServer，则不会引发该事件。
        
        //Application.Lock();
        //Application["user_sessions"] = (int)Application["user_sessions"] + 1;
        //Application.UnLock(); 
    }
       
</script>
