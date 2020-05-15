import XLSX from "xlsx"
import FileSaver from "file-saver"
//import "xlsx-style"

function squall_excle(Option){
    if(Option.data.length)
    {
        var data = Option.data;
        const defaultCellStyle =  { font: { name: "Verdana", sz: 11, color: "FF00FF88"}, fill: {fgColor: {rgb: "FFFFAA00"}}};
        const wopts = { bookType:'xlsx', bookSST:false, type:'binary', defaultCellStyle: defaultCellStyle, showGridLines: false};
        const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} }; 
        //let data = this.exportList;
        wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data)
        
        //创建二进制对象写入转换好的字节流
        let tmpDown =  new Blob([s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" })
        FileSaver.saveAs(tmpDown, "hello world.xls");
    }
    else
    {
        alert("请先检索!");
    }
}

//字符串转字符流
function s2ab (s) {
if (typeof ArrayBuffer !== 'undefined') {  
    var buf = new ArrayBuffer(s.length);  
    var view = new Uint8Array(buf);  
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;  
        return buf;  
    } else {  
        var buf = new Array(s.length);  
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;  
            return buf;  
    }
}

export default{
    "OutputExcle":squall_excle,
}