<%@ WebHandler Language="C#" Class="UpLoadResImgFile" %>

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


public class UpLoadResImgFile : IHttpHandler {

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
                string sImgTitle = context.Request.Form["ImgTitle"];
                
                string extention = Path.GetExtension(file.FileName);
                int filesize = file.ContentLength; //获取文件大小                
                
                Random rand = new Random();
                string filename = DateTime.Now.ToString("yyyyMMddhhmmss") + rand.Next(1000).ToString() + extention; 
                

                if (filesize > 1024 * 1024)
                {
                    sResult = "SizeTooLarge";
                }
                else
                {
                    string path = HttpRuntime.AppDomainAppPath + "PageResImg\\" + filename; //获取当前的路径
                    file.SaveAs(path);

                    //更新数据库
                    MySqlConnection conn = new MySqlConnection(sConn);
                    conn.Open();

                    string query = "SELECT * from dballwithme.resimginfo inner join dballwithme.userinfo on resimginfo.resimgauthor=userinfo.UserId";
                    string qConditon = " where resimgtitle = " + "'" + sImgTitle + "'";
                    query = query + qConditon;
                    MySqlCommand cmd = new MySqlCommand(query, conn);

                    MySqlDataReader reader=null;
                    try 
                    {
                        reader = cmd.ExecuteReader();
                    }
                    catch( Exception ex)
                    {
                        int m = 0;
                    }
                    
                    
                    if (reader.HasRows)     //查询到结果
                    {
                        reader.Read();
                        string sUpdatedata = reader[2] + "," + filename;

                        reader.Close();
                        query = "SELECT * FROM dballwithme.userinfo ";
                        qConditon = "where userpassport = " + "'" + sPassport + "'";
                        cmd.CommandText = query + qConditon;
                        MySqlDataReader readerauthor = cmd.ExecuteReader();
                        string strUserId = "";
                        if (readerauthor.HasRows)     //查询到结果用户信息标号
                        {
                            while (readerauthor.Read())
                            {
                                strUserId = readerauthor[0].ToString();
                            }

                        }
                        readerauthor.Close();
                        
                        query = "update dballwithme.resimginfo set resimgimg=" + "'" + sUpdatedata + "'";
                        qConditon = " where resimgtitle = " + "'" + sImgTitle + "'" + " and resimgauthor = " + strUserId;
                        cmd.CommandText = query + qConditon;
                        cmd.ExecuteNonQuery();
                    }
                    else
                    {
                        reader.Close();
                        string sUpdatedata =  filename;
                        
                        query = "SELECT * FROM dballwithme.userinfo ";
                        qConditon = "where userpassport = " + "'" + sPassport + "'";
                        cmd.CommandText = query + qConditon;
                        MySqlDataReader readerauthor = cmd.ExecuteReader();
                        string strUserId = "";
                        if (readerauthor.HasRows)     //查询到结果用户信息标号
                        {
                            while (readerauthor.Read())
                            {
                                strUserId = readerauthor[0].ToString();
                            }
                            
                        }
                        readerauthor.Close();
                        
                        //最大序号
                        query = "select max(resimgid) from dballwithme.resimginfo";
                        cmd.CommandText = query;
                        MySqlDataReader Maxreader = cmd.ExecuteReader();
                        int mxaid = 0;
                        while (Maxreader.Read())
                        {
                            mxaid = Maxreader.GetInt32(0);
                        }
                        Maxreader.Close();
                        mxaid++;

                        query = "insert into dballwithme.resimginfo values(" + mxaid.ToString() + "," + "'" + sImgTitle + "'," + "'" + filename + "'," + "'" + DateTime.Now.ToString("yyyy/MM/dd") + "'," + "'" + "" + "'," + strUserId+ ",0,0" + ")";

                        cmd.CommandText = query;
                        cmd.ExecuteNonQuery();
                    }
                    
                    sResult = "UploadOk";
                    sPathcur = "PageResImg\\" + filename;
                    

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