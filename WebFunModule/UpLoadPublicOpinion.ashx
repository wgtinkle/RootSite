<%@ WebHandler Language="C#" Class="UpLoadPublicOpinion" %>

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


public class UpLoadPublicOpinion : IHttpHandler {

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
        
        if (context.Request.Files.Count > 0)
        {
            HttpPostedFile file = context.Request.Files[0];
            if (!string.IsNullOrEmpty(file.FileName))
            {
                string sPassport = context.Request.Form["PName"];
                string sOpinionT = context.Request.Form["STitle"];
                string sOpinionC = context.Request.Form["SContent"];
                string sType = context.Request.Form["STypeTag"];
                
                int filesize = file.ContentLength; //获取文件大小
                string extention = Path.GetExtension(file.FileName);

                
                if (filesize > 1024 * 1024)
                {
                    sResult = "SizeTooLarge";
                }
                else
                {
                    //更新数据库
                    MySqlConnection conn = new MySqlConnection(sConn);
                    conn.Open();

                    //获取最大id
                    string query = "select max(opinionid) from dballwithme.opinioninfo";
                    MySqlCommand cmd = new MySqlCommand(query, conn);                    
                    MySqlDataReader Maxreader = cmd.ExecuteReader();
                    Maxreader.Read();
                    int MaxId = Maxreader.GetInt32(0);
                    MaxId++;
                    Maxreader.Close();

                    string filename = "opinionimg" + MaxId.ToString() + extention;
                    string path = HttpRuntime.AppDomainAppPath + "PageOpinion\\" + filename; //获取当前的路径
                    file.SaveAs(path);
                    //查询用户Id
                    query = "SELECT * FROM dballwithme.userinfo ";
                    string qConditon = "where userpassport = " + "'" + sPassport + "'";
                    query = query + qConditon;
                    cmd.CommandText = query;
                    MySqlDataReader Userreader = cmd.ExecuteReader();
                    Userreader.Read();
                    int UserId = Userreader.GetInt32(0);
                    Userreader.Close();
                    //插入数据
                    query = "insert into dballwithme.opinioninfo values(" + MaxId.ToString() + "," 
                        + "'" + sOpinionT + "'," 
                        + "'" + sOpinionC + "'," 
                        + "'" + filename + "',"
                        + "'" + DateTime.Now.ToString("yyyy/MM/dd") + "',"
                        + "'" + sType + "',"
                        + "'" + UserId.ToString() + "',"
                        + "0,0,''" 
                        + ")";
                    cmd.CommandText = query;
                    cmd.ExecuteNonQuery();

                    sResult = "PublishOK!";
                    conn.Close();
                }
            }
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