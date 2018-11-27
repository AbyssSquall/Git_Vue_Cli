const colorListLength = 20;

function getRandColor () {
    var tem = Math.round(Math.random() * colorListLength)
    return colorList[tem]
}

//GUID生成
function show_onuse() {
    alert("onuse!!!");
}

export default
{
    show_onuse,
    colorListLength,
    getRandColor,
}