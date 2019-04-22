function LineSplit(Point,PointArray){
    // x = (  B*B*x0  -  A*B*y0  -  A*C  ) / ( A*A + B*B );

    // y  =  ( -A*B*x0 + A*A*y0 - B*C  ) / ( A*A + B*B );

    //d = ( Ax0 + By0 + C ) / sqrt ( A*A + B*B );

    var squall_ReturnPoint = [0,0];
    var squall_Distance = 100000000;

    //console.log(Point);
    //console.log(PointArray.length);
    for(var ArrayIndex = 0;ArrayIndex < PointArray.length;ArrayIndex++)
    {
        if(PointArray[ArrayIndex][0][0]-PointArray[ArrayIndex][1][0]!=0)
        {
            var squall_K = (PointArray[ArrayIndex][0][1]-PointArray[ArrayIndex][1][1])/(PointArray[ArrayIndex][0][0]-PointArray[ArrayIndex][1][0])
            var squall_B = PointArray[ArrayIndex][0][1] - squall_K*PointArray[ArrayIndex][0][0];

            if(squall_B == PointArray[ArrayIndex][1][1] - squall_K*PointArray[ArrayIndex][1][0])
                console.log("K=" + squall_K + ",B=" + squall_B);
            else
                console.log("wrong answer!",squall_K,squall_B);

            //console.log((-squall_K) * Point.lat);
            var squall_TempDistance = ( (-squall_K) * Point.lat + Point.lng - squall_B )*( (-squall_K) * Point.lat + Point.lng - squall_B ) / (squall_K * squall_K + 1);
            console.log(squall_TempDistance);
            if(squall_Distance>squall_TempDistance)
            {
                squall_Distance = squall_TempDistance;
                squall_ReturnPoint[0] = ( Point.lat + squall_K*Point.lng - squall_K*squall_B ) / ( squall_K*squall_K + 1 );
                squall_ReturnPoint[1] = ( squall_K*Point.lat + squall_K*squall_K*Point.lng + squall_B ) / (squall_K*squall_K + 1 );
            }
        }
        else
        {
            squall_ReturnPoint = [PointArray[ArrayIndex][0][0],Point.lng];
        } 
    }
    return squall_ReturnPoint;
}

function squall_Guide(NowPosition,Route){
    console.log(NowPosition);
    console.log(Route);
}

export default{
    "LineSplit":LineSplit,
    "Guide":squall_Guide,
}