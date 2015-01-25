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
///PageResChange 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
[System.Web.Script.Services.ScriptService]
public class PageResChange : System.Web.Services.WebService {

    public class JsonState
    {
        public string sState; //状态
        public string sdata; //数据
    }

    static string sConn = SiteGlobelDefine.DBConnectstring;

    [WebMethod(EnableSession = true)]
    [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
    public string PageResChangeData(string sType, int nItemNum)
    {

        string sResult = null;
        string sdatas = null;

        MySqlConnection conn = new MySqlConnection(sConn);
        conn.Open();

        string query = "SELECT * from dballwithme.resimginfo ";
        string qConditon = " where resimgtag = " + "'" + sType + "'";
        query = query + qConditon;
        MySqlCommand cmd = new MySqlCommand(query, conn);

        MySqlDataReader reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

        ArrayList dataarry = new ArrayList();
        ArrayList Resultdataarry = new ArrayList();
        try
        {
            if (reader.HasRows)     //查询到结果
            {
                while (reader.Read())
                {
                    string str = reader[1].ToString() + "#"; //title
                    str = str + reader[2].ToString(); //img
                    dataarry.Add(str);
                }
                for (int i = nItemNum; i < dataarry.Count; i++)
                {
                    if (i <= nItemNum + 5)
                    {
                        Resultdataarry.Add(dataarry[i]);
                    }
                    else
                    {
                        break;
                    }
                }

                if (Resultdataarry.Count <= 0)
                {
                    sResult = "LoadAll!";
                    sdatas = JavaScriptConvert.SerializeObject(Resultdataarry);
                }
                else
                {
                    sResult = "LoadOk!";
                    sdatas = JavaScriptConvert.SerializeObject(Resultdataarry);
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
        return JavaScriptConvert.SerializeObject(new JsonState { sState = sResult, sdata = sdatas });
    }
    
}
