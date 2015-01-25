<%@ WebHandler Language="C#" Class="UpLoadAtricleContentFile"%>

using System;
using System.Web;
using System.IO;
using System.Data;
using System.Text;
using System.Web.SessionState;

//mysql数据库的程序集
using MySql.Data;
using MySql.Data.MySqlClient;
//json字符串库
using Newtonsoft.Json;
//页面生成
using HtmlAgilityPack;

public class UpLoadAtricleContentFile : IHttpHandler, IRequiresSessionState
{

    public class JsonState
    {
        public string sState;
        public string sPath;
    }

    static string sConn = SiteGlobelDefine.DBConnectstring; 
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        string sResult = "";
        string sPathcur = "";
        //获取内容        
        try
        {
            string sTitle = context.Request.Form["ArtilceTitle"];
            string sTag = context.Request.Form["ArtilceTag"];
            string sContent = context.Request.Form["AContent"];
            string sImg = context.Request.Form["ArtilceImg"];
            string sPassport = context.Request.Form["PName"];
            //string suer = (string)(context.Session[sPassport]);
            
            if (sTitle == "")
            {
                sResult = "UpLoadArticleTitleNull";
            }
            else if (sTag == "")
            {
                sResult = "UpLoadArticleTagNull";
            }
            else if (sContent == "")
            {
                sResult = "UpLoadArticleContentNull";
            }
            else
            {
                sContent = sContent.Replace("$@$", "<");
                sContent = sContent.Replace("$#$", ">");
                //更新数据库
                MySqlConnection conn = new MySqlConnection(sConn);
                conn.Open();

                string query = "SELECT * FROM dballwithme.userinfo ";
                string qConditon = "where userpassport = " + "'" + sPassport + "'";
                query = query + qConditon;
                MySqlCommand cmd = new MySqlCommand(query, conn);
                MySqlDataReader reader = cmd.ExecuteReader();
                int nUserId = -1;
                string sUserName = "";
                while (reader.Read())
                {
                    nUserId = reader.GetInt32(0);
                    sUserName = reader.GetString(1);
                }
                reader.Close();//释放读写器
                query = "select max(articleid) from dballwithme.articleinfo";
                cmd.CommandText = query;
                MySqlDataReader Maxreader = cmd.ExecuteReader();
                int mxaid = 0;
                while (Maxreader.Read())
                {
                    mxaid = Maxreader.GetInt32(0);
                }
                Maxreader.Close();
                mxaid++;
                string sFileName = "articlecontent" + mxaid.ToString() + ".htm";
                string sTime = DateTime.Now.ToString("yyyy/MM/dd");
                int nCollect = 0;
                query = "insert into dballwithme.articleinfo values(" + mxaid.ToString() +","
                    + "'" + sTitle + "'" +","
                    + "'" + "简单说明" + "'" +","
                    + "'" + sImg + "'" +","
                    + "'" + sFileName + "'" +","
                    + "'" + sTime + "'" +","
                    + "'" + sTag + "'" +","
                    + "'" + nUserId.ToString() + "'" +","
                    + "'" + "0" + "'" +","
                    + "'" + "0" + "'" 
                    +")";
                                
                cmd.CommandText = query;
                cmd.ExecuteNonQuery();
                conn.Close();

                //生成文档
                string siteRecordfilepath = HttpRuntime.AppDomainAppPath; //获取当前的路径
                HtmlDocument hdom = new HtmlDocument();
                hdom.Load(siteRecordfilepath + "PageTemplate\\TemplateArticle.htm", Encoding.UTF8);
                HtmlNode rootNode = hdom.DocumentNode;
                //更新标题
                HtmlNode Titlenode = rootNode.SelectSingleNode("//div[@class='ArticleTitle']");
                Titlenode.InnerHtml = sTitle;
                //更新作者
                HtmlNode Authornode = rootNode.SelectSingleNode("//div[@class='ArticleAuthor']");
                Authornode.InnerHtml = "作者:" + sUserName;
                //更新tag
                HtmlNode Tagnode = rootNode.SelectSingleNode("//div[@class='ArticleTag']");
                Tagnode.InnerHtml = "标签:" + sTag;
                //更新时间
                HtmlNode Infornode = rootNode.SelectSingleNode("//div[@class='ArticleInfo']");
                Infornode.InnerHtml = sTime + "  1人阅读 评论1 收藏1";
                //更新内容
                HtmlNode Contentnode = rootNode.SelectSingleNode("//div[@class='ArticleContent']");
                Contentnode.InnerHtml = sContent;

                hdom.Save(siteRecordfilepath + "PageArticle\\" + sFileName, Encoding.UTF8);


                sResult = "UpLoadArticleOk";
            }

            
        }
        catch(Exception e)
        {
        }       
        
        string sEnd = JavaScriptConvert.SerializeObject(new JsonState { sState = sResult, sPath = sPathcur });
        context.Response.Write(sEnd);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}