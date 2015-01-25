using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Xml.Linq;

/// <summary>
///SiteStatics 的摘要说明
/// </summary>
[WebService(Namespace = "http://allwithme.net/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
 [System.Web.Script.Services.ScriptService]
public class SiteStatics : System.Web.Services.WebService {

    public SiteStatics () {

        //如果使用设计的组件，请取消注释以下行 
        //InitializeComponent(); 
    }

    [WebMethod]             //访问接口
    [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
    public string SiteVistor() {

        string siteRecordfilepath = HttpRuntime.AppDomainAppPath; //获取当前的路径
        
        XDocument xdoc = XDocument.Load(siteRecordfilepath+"SiteRecord\\SiteRecord.xml");
        XElement xEle = (from node in xdoc.Element("SiteRecord").Elements("TotalVistor") select node).Single() as XElement;

        int nTotalNum  =int.Parse(xEle.Value) + 1;  //总访问记录
        xEle.Value = nTotalNum.ToString();

        //今日记录
        xEle = (from node in xdoc.Element("SiteRecord").Elements("TodayVistor") select node).Single() as XElement;

        nTotalNum = int.Parse(xEle.Value) + 1;  //今日访问记录
        xEle.Value = nTotalNum.ToString();

        xdoc.Save(siteRecordfilepath + "SiteRecord\\SiteRecord.xml");
        return "OK";
    }

    [WebMethod] //用户接口
    [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
    public string SiteRegister()
    {

        string siteRecordfilepath = HttpRuntime.AppDomainAppPath; //获取当前的路径

        XDocument xdoc = XDocument.Load(siteRecordfilepath + "SiteRecord\\SiteRecord.xml");
        XElement xEle = (from node in xdoc.Element("SiteRecord").Elements("TotalUser") select node).Single() as XElement;

        int nTotalNum = int.Parse(xEle.Value) + 1;  //总用户记录
        xEle.Value = nTotalNum.ToString();

        //今日记录
        xEle = (from node in xdoc.Element("SiteRecord").Elements("TodayRegister") select node).Single() as XElement;

        nTotalNum = int.Parse(xEle.Value) + 1;  //今日注册记录
        xEle.Value = nTotalNum.ToString();

        xdoc.Save(siteRecordfilepath + "SiteRecord\\SiteRecord.xml");
        return "OK";
    }
    
}
