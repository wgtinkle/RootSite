using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Data;




//mysql数据库的程序集
using MySql.Data;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

/// <summary>
///UserLoad 的摘要说明
/// </summary>
[WebService(Namespace = "http://allwithme.net/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
 [System.Web.Script.Services.ScriptService]
public class UserLoad : System.Web.Services.WebService
{

    public class JsonState
    {
        public string sState;
        public string sPath;
    }
    static string sConn = SiteGlobelDefine.DBConnectstring; 

    [WebMethod(EnableSession = true)]
    [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
    public string UserLoadVerify(string userpassport, string userpswd)
    {
        string sResult = null;
        string sPathcur = null;

        //先判在线
        string str = (string)(HttpContext.Current.Session[userpassport]);
        if (userpassport == str)
        {
            sResult = "Online";

            MySqlConnection conn = new MySqlConnection(sConn);
            conn.Open();

            string query = "SELECT * FROM dballwithme.userinfo ";
            string qConditon = "where userpassport = " + "'" + userpassport + "'";
            query = query + qConditon;
            MySqlCommand cmd = new MySqlCommand(query, conn);

            MySqlDataReader reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            
            try
            {
                if (reader.HasRows)     //查询到结果
                {
                    while (reader.Read())
                    {
                        string shead = reader.GetString(5);
                        sPathcur = "./FrameImg/UserHead/" + shead;
                    }
                    
                }
            }
            catch (System.Exception ex)
            {
                reader.Close();
                conn.Close();
            }

            

            reader.Close();
            conn.Close();
        }
        else
        {
            //查询数据库
            
            MySqlConnection conn = new MySqlConnection(sConn);
            conn.Open();
            
            string query = "SELECT * FROM dballwithme.userinfo ";
            string qConditon = "where userpassport = " + "'" + userpassport + "'";
            query = query + qConditon;
            MySqlCommand cmd = new MySqlCommand(query, conn);

            MySqlDataReader reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            if (reader.HasRows)     //查询到结果
            {
                string sPswd = "";
                while (reader.Read())
                {
                    sPswd = reader[3].ToString();
                }

                if (sPswd == userpswd)
                {
                    if (userpassport == "wgtinkle")
                    {
                        sResult = "LoadAdmin";
                        sPathcur = "./AdminCms/AdminManager.aspx";
                    }
                    else
                    {
                        HttpContext.Current.Session[userpassport] = userpassport;
                        string shead = reader[5].ToString();
                        sResult = "LoadOk";
                        sPathcur = "./FrameImg/UserHead/" + shead;
                        
                    }
                }
                else
                {
                    sResult = "PswdError";
                }
                
            }
            else            //账号不存在
            {
                sResult = "NoExist";
            }

            reader.Close();
            conn.Close();
            
        }

        return JavaScriptConvert.SerializeObject(new JsonState {sState = sResult, sPath = sPathcur });
    }
    
    [WebMethod(EnableSession = true)] //验证在线
    [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
    public string UserIsOnline(string userpassport)
    {
        string sResult = null;
        string sPathcur = null;

        string str = (string)(HttpContext.Current.Session[userpassport]);
        if (userpassport == str)
        {
            sResult = "Online"; 

            MySqlConnection conn = new MySqlConnection(sConn);
            conn.Open();
            
            string query = "SELECT * FROM dballwithme.userinfo ";
            string qConditon = "where userpassport = " + "'" + userpassport + "'";
            query = query + qConditon;
            MySqlCommand cmd = new MySqlCommand(query, conn);


            MySqlDataReader reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            if (reader.HasRows)     //查询到结果
            {
                while (reader.Read())
                {
                    string shead = reader[5].ToString();
                    sPathcur = "./FrameImg/UserHead/" + shead;
                }
                
            }

            reader.Close();
            conn.Close();


        }
        else if (str == null)
        {
            sResult = "Offlined";
        }

        return JavaScriptConvert.SerializeObject(new JsonState { sState = sResult, sPath = sPathcur });
    }

    public class JsonUserInfo
    {
        public string sName;
        public string sId;
        public string sAge;
        public string sTag;
        public string sHead;
    };


    [WebMethod(EnableSession = true)] //拉取用户管理页面数据
    [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
    public string UserZone(string userpassport)
    {
        JsonUserInfo userinfo = new JsonUserInfo();

        MySqlConnection conn = new MySqlConnection(sConn);
        conn.Open();

        string query = "SELECT * FROM dballwithme.userinfo ";
        string qConditon = "where userpassport = " + "'" + userpassport + "'";
        query = query + qConditon;
        MySqlCommand cmd = new MySqlCommand(query, conn);


        MySqlDataReader reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

        if (reader.HasRows)     //查询到结果
        {
            while (reader.Read())
            {
                userinfo.sId = reader.GetInt32(0).ToString();
                userinfo.sName = reader.GetString(1);
                userinfo.sAge = reader.GetString(6);
                userinfo.sHead = reader.GetString(5);
                userinfo.sTag = reader.GetString(7);
            }

        }

        reader.Close();
        conn.Close();
        return JavaScriptConvert.SerializeObject(userinfo); 
    }


    [WebMethod(EnableSession = true)] //下线
    [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
    public string UserIsOffline(string userpassport)
    {
        string sResult = "Null";
        string str = (string)(HttpContext.Current.Session[userpassport]);
        if (userpassport == str)
        {
            sResult = "Offline";
            HttpContext.Current.Session.Remove(userpassport);

        }
        else if (str == null)
        {
            sResult = "Offlined";
        }
        
        return sResult;
    }

    [WebMethod(EnableSession = true)] //注册
    [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
    public string UserRegister(string userpassport, string userpswd)
    {
        string sResult = "Null";
        
        //查询数据库
        
        MySqlConnection conn = new MySqlConnection(sConn);
        conn.Open();
            
        string query = "SELECT * FROM dballwithme.userinfo ";
        string qConditon = "where userpassport = " + "'" + userpassport + "'";
        query = query + qConditon;
        MySqlCommand cmd = new MySqlCommand(query, conn);

        MySqlDataReader reader = cmd.ExecuteReader();

        if (reader.HasRows)     //查询到结果
        {
            sResult = "HasRegisted";
            reader.Close();
        }
        else
        {
            reader.Close();  //释放读写器，以便于新的读写
            //创建新用户
            //创建用户ID，即数据库中最大值
            query = "select max(UserId) from dballwithme.userinfo";            
            cmd.CommandText = query;
            MySqlDataReader Maxreader = cmd.ExecuteReader();
            int mxaid = 0;
            while (Maxreader.Read())
            {
                mxaid = Maxreader.GetInt32(0);
            }
            Maxreader.Close();
            mxaid++;

            query = "insert into dballwithme.userinfo values("+mxaid.ToString() + ",'nametemp','user','" + userpswd + "','" + userpassport + "','HeadUser.jpg'" + ")";
            cmd.CommandText = query;
            if (cmd.ExecuteNonQuery() > 0)
            {
                sResult = "RegistOk";
            }
            else{
                sResult = "RegistError";
            }

            Maxreader.Close();
        }

        conn.Close();

        return sResult;
    }
}
