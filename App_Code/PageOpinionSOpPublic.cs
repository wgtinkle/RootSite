using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Data;
using System.Collections;

//mysql数据库的程序集
using MySql.Data;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

/// <summary>
///PageOpinionSOpPublic 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
[System.Web.Script.Services.ScriptService]
public class PageOpinionSOpPublic : System.Web.Services.WebService {

    public class JsonState
    {
        public string sState; //状态
        public string sdata; //数据
    }

    static string sConn = SiteGlobelDefine.DBConnectstring;

    [WebMethod(EnableSession = true)]
    [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
    public string PageOpinionSOp(int id,string sContent, string passport)
    {
        string sResult = null;
        string sdatas = null;

        MySqlConnection conn = new MySqlConnection(sConn);
        conn.Open();

        string query = "SELECT * from dballwithme.opinioninfo ";
        string qConditon = " where opinionid = " + id.ToString();
        query = query + qConditon;
        MySqlCommand cmd = new MySqlCommand(query, conn);

        MySqlDataReader reader = cmd.ExecuteReader();

        try
        {
            if (reader.HasRows)     //查询到结果
            {
                string strOldContent = "";
                while (reader.Read())
                {
                    strOldContent = reader[9].ToString();
                }
                reader.Close();
                //查询用户信息
            query = "SELECT * FROM dballwithme.userinfo ";
            qConditon = "where userpassport = " + "'" + passport + "'";
            query = query + qConditon;
            cmd.CommandText = query;

            MySqlDataReader readerUser = cmd.ExecuteReader();

            string strUserinfo = "";
            while (readerUser.Read())
            {
                strUserinfo = strUserinfo + readerUser[0].ToString() +"@";
                strUserinfo = strUserinfo + readerUser[1].ToString() + "@";
                strUserinfo = strUserinfo + readerUser[5].ToString() + "@";
            }
            strUserinfo = strUserinfo + sContent + "@";
            strUserinfo = strUserinfo + "0" + "@";
            strUserinfo = strUserinfo + "0";

            string strNew = strOldContent + "," + strUserinfo;

            readerUser.Close();

            query = "update dballwithme.opinioninfo set opinioncontent=" + "'" + strNew + "'";
            qConditon = " where opinionid = " + "'" + id.ToString() + "'";
            query = query + qConditon;

            cmd.CommandText = query;
           
            cmd.ExecuteNonQuery();
           

            sResult = "PublicOK!";

            }
        }
        catch (System.Exception ex)
        {
            reader.Close();
            conn.Close();
        }
        //reader.Close();
        conn.Close();
        return JavaScriptConvert.SerializeObject(new JsonState { sState = sResult, sdata = sdatas });
    }
    
}
