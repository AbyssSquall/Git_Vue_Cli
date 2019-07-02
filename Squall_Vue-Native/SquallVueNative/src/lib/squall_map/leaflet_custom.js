function LineSplit(Point,PointArray){

    var squall_ReturnPoint = [0,0];
    var squall_ReturnArray = [];
    var squall_Distance = 100000000;

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

            var squall_TempDistance = ( (-squall_K) * Point.lat + Point.lng - squall_B )*( (-squall_K) * Point.lat + Point.lng - squall_B ) / (squall_K * squall_K + 1);
            if(squall_Distance>squall_TempDistance)
            {
                squall_Distance = squall_TempDistance;
                squall_ReturnPoint[0] = ( Point.lat + squall_K*Point.lng - squall_K*squall_B ) / ( squall_K*squall_K + 1 );
                squall_ReturnPoint[1] = ( squall_K*Point.lat + squall_K*squall_K*Point.lng + squall_B ) / (squall_K*squall_K + 1 );

                squall_ReturnArray = [[PointArray[ArrayIndex][0],squall_ReturnPoint],[squall_ReturnPoint,PointArray[ArrayIndex][1]]];
            }
        }
        else
        {
            var squall_TempDistance = PointArray[ArrayIndex][0][0] - Point.lat;
            if(squall_TempDistance<0)
                squall_TempDistance = -squall_TempDistance;

            if(squall_Distance>squall_TempDistance)
            {
                squall_Distance = squall_TempDistance;
                squall_ReturnPoint = [PointArray[ArrayIndex][0][0],Point.lng];

                squall_ReturnArray = [[PointArray[ArrayIndex][0],squall_ReturnPoint],[squall_ReturnPoint,PointArray[ArrayIndex][1]]];
            }
        } 
    }
    return squall_ReturnArray;
}

export default{
    "LineSplit":LineSplit,
}