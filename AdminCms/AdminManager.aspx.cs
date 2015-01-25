using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;

public partial class AdminManager : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {        
        PageViewManager.SetActiveView(SitePage);
        //加载数据
        string siteRecordfilepath = HttpRuntime.AppDomainAppPath; //获取当前的路径
        XDocument xdoc = XDocument.Load(siteRecordfilepath + "SiteRecord\\SiteRecord.xml");
        XElement xEle = (from node in xdoc.Element("SiteRecord").Elements("TotalVistor") select node).Single() as XElement;
        LabelVisitorNum.Text = xEle.Value;
        xEle = (from node in xdoc.Element("SiteRecord").Elements("TodayVistor") select node).Single() as XElement;
        LabelTodayVisitorNum.Text = xEle.Value;
        xEle = (from node in xdoc.Element("SiteRecord").Elements("TotalUser") select node).Single() as XElement;
        LabelRegsiterNum.Text = xEle.Value;
        xEle = (from node in xdoc.Element("SiteRecord").Elements("TodayRegister") select node).Single() as XElement;
        LabelTodayRegsiterNum.Text = xEle.Value;
        xdoc.Save(siteRecordfilepath + "SiteRecord\\SiteRecord.xml");

    }
    protected void SiteView_Click(object sender, EventArgs e)
    {
        PageViewManager.SetActiveView(SitePage);
    }
    protected void ArticleManage_Click(object sender, EventArgs e)
    {
        PageViewManager.SetActiveView(ArticlePage);
    }
    protected void OpinionManage_Click(object sender, EventArgs e)
    {
        PageViewManager.SetActiveView(OpinionPage);
    }
    protected void DataManage_Click(object sender, EventArgs e)
    {
        PageViewManager.SetActiveView(DataPage);
    }
    protected void ResManage_Click(object sender, EventArgs e)
    {
        PageViewManager.SetActiveView(ResPage);
    }
    protected void RelationManage_Click(object sender, EventArgs e)
    {
        PageViewManager.SetActiveView(RelationPage);
    }
    protected void FlowManage_Click(object sender, EventArgs e)
    {
        PageViewManager.SetActiveView(FlowPage);
    }
    protected void UserManage_Click(object sender, EventArgs e)
    {
        PageViewManager.SetActiveView(UserPage);
    }
    protected void FileManage_Click(object sender, EventArgs e)
    {
        PageViewManager.SetActiveView(FilePage);
    }
}