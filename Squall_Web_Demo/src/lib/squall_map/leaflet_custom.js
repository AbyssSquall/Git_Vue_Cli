function LineSplit(Point,PointArray){
    console.log(Point);
    for(var ArrayIndex = 0;ArrayIndex < PointArray.length-1 ;ArrayIndex++)
    {
        console.log(PointArray[ArrayIndex],PointArray[ArrayIndex+1]);
    }
}

function squall_Guide(NowPosition,Route){
    console.log(NowPosition);
    console.log(Route);
}

export default{
    "LineSplit":LineSplit,
    "Guide":squall_Guide,
}