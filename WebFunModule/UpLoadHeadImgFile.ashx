<%@ WebHandler Language="C#" Class="UpLoadHeadImgFile" %>

using System;
using System.Web;
using System.IO;
using System.Data;

//mysql数据库的程序集
using MySql.Data;
using MySql.Data.MySqlClient;
//json字符串库
using Newtonsoft.Json;

public class UpLoadHeadImgFile : IHttpHandler {

    public class JsonState          
    {
        public string sState;
        public string sPath;
    }
    

    static string sConn = SiteGlobelDefine.DBConnectstring;
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        string sResult = null;
        string sPathcur = null;
        if(context.Request.Files.Count>0)
        {
            HttpPostedFile file = context.Request.Files[0];
            if (!string.IsNullOrEmpty(file.FileName))
            {
                string sPassport = context.Request.Form["PName"];
                string extention = Path.GetExtension(file.FileName);
                int filesize = file.ContentLength; //获取文件大小
                string filename = sPassport + extention;
                
                if(filesize>1024*1024)
                {
                    sResult = "SizeTooLarge";
                }
                else
                {
                    string path = HttpRuntime.AppDomainAppPath + "FrameImg\\UserHead\\" + filename; //获取当前的路径
                    file.SaveAs(path);
                    
                    
                    //更新数据库
                    MySqlConnection conn = new MySqlConnection(sConn);
                    conn.Open();

                    string query = "update dballwithme.userinfo set userhead=" + "'" + filename + "'";
                    string qConditon = "where userpassport = " + "'" + sPassport + "'";
                    query = query + qConditon;
                    MySqlCommand cmd = new MySqlCommand(query, conn);

                    if (cmd.ExecuteNonQuery() > 0)
                    {
                        sResult = "UploadOk";
                        sPathcur = "FrameImg\\UserHead\\" + filename;                    
                    }
                                                                
                    conn.Close();
                    
                }
                string sEnd = JavaScriptConvert.SerializeObject(new JsonState { sState = sResult, sPath = sPathcur });
                context.Response.Write(sEnd);
                
            }
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}