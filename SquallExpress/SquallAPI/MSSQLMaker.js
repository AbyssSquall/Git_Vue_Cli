var MSConFunList = {
    ne:function(_List){
        var MSReturn = "(1=1 ";

        for(var ValueIndex in _List){
            MSReturn += " and " + _List[ValueIndex].split(",")[0] + "<>'" + _List[ValueIndex].split(",")[1] + "'"
        }

        MSReturn += ")";

        return MSReturn;
    },
    eq:function(_List){
        var MSReturn = "(1=1 ";

        for(var ValueIndex in _List){
            MSReturn += " and " + _List[ValueIndex].split(",")[0] + "='" + _List[ValueIndex].split(",")[1] + "'"
        }

        MSReturn += ")";

        return MSReturn;
    },
    like:function(_List){
        var MSReturn = "(1=1 ";

        for(var ValueIndex in _List){
            MSReturn += " and " + _List[ValueIndex].split(",")[0] + " like '%" + _List[ValueIndex].split(",")[1] + "%'"
        }

        MSReturn += ")";

        return MSReturn;
    },
    nlike:function(_List){
        var MSReturn = "(1=1 ";

        for(var ValueIndex in _List){
            MSReturn += " and " + _List[ValueIndex].split(",")[0] + " not like '%" + _List[ValueIndex].split(",")[1] + "%'"
        }

        MSReturn += ")";

        return MSReturn;
    },
    and:function(_Option){
        if(!CheckRule(_Option))
            return false;

        var MSReturn = " and (";

        for(var ModeIndex in _Option){
            MSReturn += MSConFunList[ModeIndex](_Option[ModeIndex])
        }

        MSReturn += ")";

        return MSReturn;
        
    },
    or:function(_Option){
        if(!CheckRule(_Option))
            return false;

        var MSReturn = " or (";

        for(var ModeIndex in _Option){
            MSReturn += MSConFunList[ModeIndex](_Option[ModeIndex])
        }

        MSReturn += ")";

        return MSReturn;
    }
}

function SelectStr(_Table,_Option){
    if(!CheckRule(_Option))
        return false;

    var MSSQL = "select * from `" + _Table + "` where ";

    for(var ModeIndex in _Option){
        if(MSConFunList[ModeIndex](_Option[ModeIndex]))
            MSSQL += MSConFunList[ModeIndex](_Option[ModeIndex])
        else
            return false
    }

    if(MSSQL == "select * from `" + _Table + "` where ")
        MSSQL = MSSQL.substr(0,MSSQL.length-6);

    console.log(MSSQL);
    return MSSQL;
}

function DisSelectStr(_Table,_Col,_Option){
    if(!CheckRule(_Option))
        return false;
        
    var MSSQL = "select distinct " + _Col + " from `" + _Table + "` where";

    for(var ModeIndex in _Option){
        if(MSConFunList[ModeIndex](_Option[ModeIndex]))
            MSSQL += MSConFunList[ModeIndex](_Option[ModeIndex])
        else
            return false
    }

    return MSSQL
}

function InsertStr(_Table,_Option){
    if(!CheckRule(_Option))
        return false;
        
    var MSSQL = "insert into `" + _Table + "` ";

    var MS_Col = "(";
    var MS_Value = " values (";

    for(var ModeIndex in _Option){
        if(_Option[ModeIndex]!=undefined){
            MS_Col += ModeIndex + ",";
            MS_Value += "'" + _Option[ModeIndex] + "',";
        }
        else
            return false;
    }

    MS_Col = MS_Col.substr(0,MS_Col.length-1) + ")";
    MS_Value = MS_Value.substr(0,MS_Value.length-1) + ")";

    MSSQL = MSSQL + MS_Col + MS_Value;

    return MSSQL
}

function UpdateStr(_Table,_Key,_KeyValue,_Option){
    if(!CheckRule(_Option))
        return false;
        
    var MSSQL = "update `" + _Table + "` set ";

    for(var ModeIndex in _Option){
        if(_Option[ModeIndex]!=undefined)
            MSSQL += ModeIndex + "='" + _Option[ModeIndex] + "' ,";
        else
            return false;
    }

    MSSQL = MSSQL.substr(0,MSSQL.length-1);
    MSSQL += " where " + _Key + "='" + _KeyValue + "'";

    return MSSQL
}

function DeleteStr(_Table,_Key,_KeyValue,_Option){
    if(!CheckRule(_Option))
        return false;
        
    var MSSQL = "Delete from `" + _Table + "` where " + _Key + "='" + decodeURIComponent(_KeyValue) + "'";

    return MSSQL

}

function MultiTableSelectStr(_TableList,_Option){
    
}

function CheckRule(_Option){
    var IndexFlag = 0;
    for(var Index in _Option){
        if(IndexFlag==0&&((Index == "and")||(Index == "or"))){
            return false;
        }
        IndexFlag++;
    }
    return true;
}

module.exports = {
    SelectStr:SelectStr,
    DisSelectStr:DisSelectStr,
    InsertStr:InsertStr,
    UpdateStr:UpdateStr,
    DeleteStr:DeleteStr,
    MultiTableSelectStr:MultiTableSelectStr
};