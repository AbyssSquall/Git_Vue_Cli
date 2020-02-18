var MSConFunList = {
    "ne":function(_List){
        var MSReturn = "";
        for(var ValueIndex in _List){
            MSReturn += " and " = _List[ValueIndex].split(",")[0] + "<>" + _List[ValueIndex].split(",")[1]
        }
        return MSReturn;
    }
}

function SelectStr(_Table,_Option){
    var MSSQL = "select";
}

function DisSelectStr(_Table,_Col,_Option){
    var MSSQL = "select distinct " + _Col + " from " + _Table + " where ";


}

function UpdateStr(_Table,_Key,_KeyValue,_Option){

}

function DeleteStr(_Table,_Key,_KeyValue,_Option){

}

module.exports = {
    SelectStr:SelectStr,
    DisSelectStr:DisSelectStr,
    UpdateStr:UpdateStr,
    DeleteStr:DeleteStr
};