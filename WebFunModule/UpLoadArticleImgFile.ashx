<%@ WebHandler Language="C#" Class="UpLoadArticleImgFile" %>

using System;
using System.Web;
using System.IO;
using System.Data;
using System.Text;
using System.Web.SessionState;

//json字符串库
using Newtonsoft.Json;

public class UpLoadArticleImgFile : IHttpHandler {

    
    public class JsonState
    {
        public string err;
        public string msg;
    }
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        JsonState sState = new JsonState();
        
        if (context.Request.Files.Count > 0)
        {
            HttpPostedFile file = context.Request.Files[0];
            if (!string.IsNullOrEmpty(file.FileName))
            {
                int filesize = file.ContentLength; //获取文件大小
                string extention = Path.GetExtension(file.FileName);
                Random rand = new Random();
                string filename = DateTime.Now.ToString("yyyyMMddhhmmss") + rand.Next(1000).ToString()+ extention; 
                if (filesize > 1024 * 1024)
                {
                    sState.err = "SizeTooLarge";
                }
                else
                {
                    string path = HttpRuntime.AppDomainAppPath + "PageArticle\\PageArticleImg\\" + filename; //获取当前的路径
                    file.SaveAs(path);
                    sState.msg = "PageArticle/PageArticleImg/" + filename;
                }
            }
        }
        string sEnd = JavaScriptConvert.SerializeObject(sState);
        context.Response.Write(sEnd);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}