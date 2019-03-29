var position=[[0,0,0],[0,0,0],[0,0,0]];
var val=[[1,1,1],[1,1,1],[1,1,1]]; //the value of the pieces

function judge(){
	//win or lose by row
    for(var i=0;i<3;i++){
        if(position[i][0]==position[i][1]&&position[i][1]==position[i][2]&&position[i][0]!=0){
            if(position[i][0]==true){
                document.write("<img src='assets/8f3f5b93f7f2519ffb232b175559a7a3.jpeg' width=\"90%\" height=\"auto\"/>")
                window.alert("You Win!");
                setTimeout('open("https://mac1xa3.ca/u/wangx308/simpleapp.html","_self")',2000);
                return true;
            }
            else {
                document.write("<img src='assets/a51007e923e22ffecbff266ee080a71e.png' width=\"90%\" height=\"auto\"/>")
                window.alert("You Lose");
                setTimeout('open("https://mac1xa3.ca/u/wangx308/simpleapp.html","_self")',2000);
                return true;
            }
        }
    }
	//win or lose by column
    for(var i=0;i<3;i++){
        if(position[0][i]==position[1][i]&&position[1][i]==position[2][i]&&position[0][i]!=0){
            if(position[0][i]==true){
                document.write("<img src='assets/8f3f5b93f7f2519ffb232b175559a7a3.jpeg' width=\"90%\" height=\"auto\"/>")
                window.alert("You Win!");
                setTimeout('open("https://mac1xa3.ca/u/wangx308/simpleapp.html","_self")',2000);
                return true;
            }
            else {
                document.write("<img src='assets/a51007e923e22ffecbff266ee080a71e.png' width=\"90%\" height=\"auto\"/>")
                window.alert("You Lose");
                setTimeout('open("https://mac1xa3.ca/u/wangx308/simpleapp.html","_self")',2000);
                return true;
            }
        }
    }
	//win or lose by the diagonal
    if(position[0][0]==position[1][1]&&position[1][1]==position[2][2]&&position[0][0]!=0){
        if(position[0][0]==true){
            document.write("<img src='assets/8f3f5b93f7f2519ffb232b175559a7a3.jpeg' width=\"90%\" height=\"auto\"/>")
            window.alert("You Win!");
            setTimeout('open("https://mac1xa3.ca/u/wangx308/simpleapp.html","_self")',2000);
            return true;
        }
        else {
                document.write("<img src='assets/a51007e923e22ffecbff266ee080a71e.png' width=\"90%\" height=\"auto\"/>")
                window.alert("You Lose");
                setTimeout('open("https://mac1xa3.ca/u/wangx308/simpleapp.html","_self")',2000);
            return true;
        }
    }
    if(position[0][2]==position[1][1]&&position[2][0]==position[1][1]&&position[0][2]!=0){
        if(position[0][2]==true){
            document.write("<img src='assets/8f3f5b93f7f2519ffb232b175559a7a3.jpeg' width=\"90%\" height=\"auto\"/>")
            window.alert("You Win!");
            setTimeout('open("https://mac1xa3.ca/u/wangx308/simpleapp.html","_self")',2000);
            return true;
        }
        else {
			document.write("<img src='assets/a51007e923e22ffecbff266ee080a71e.png' width=\"90%\" height=\"auto\"/>")
			window.alert("You Lose");
			setTimeout('open("https://mac1xa3.ca/u/wangx308/simpleapp.html","_self")',2000);
            return true;
        }
    }
	//judge if there is no grid
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(position[i][j]==false)
                return false;
            if(i==2&&j==2)
            {window.alert("No Winners");
				setTimeout('open("https://mac1xa3.ca/u/wangx308/simpleapp.html","_self")',2000);
                return true;
            }
        }
    }
    return false;
}

function player(i,j){
	//invalid if already have pieces
    if(position[i][j]!=0){
        return 0;
    }else{
        position[i][j]=1;
        num1=(i*3+j+1)+"";
        document.getElementById(num1).value="X";
        if(judge()==true){
            return;
        }
        ai();
    }
}

function resetValue(){

    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(position[i][j]!=0)
                val[i][j]=0;
            else{
				// row and column
				// ai wins
                if(((position[0][j]+position[1][j]+position[2][j])==4)&&(position[0][j]*position[1][j]*position[2][j])==0
                    &&((position[0][j]-1)*(position[1][j]-1)*(position[2][j]-1))==-1)
                    val[i][j]=val[i][j]+100000;
                if(((position[i][0]+position[i][1]+position[i][2])==4)&&(position[i][0]*position[i][1]*position[i][2])==0
                    &&((position[i][0]-1)*(position[i][1]-1)*(position[i][2]-1))==-1)
                    val[i][j]=val[i][j]+100000;
				//prevent player wins
                if(((position[0][j]+position[1][j]+position[2][j])==2)&&(position[0][j]*position[1][j]*position[2][j])==0
                    &&((position[0][j]-1)*(position[1][j]-1)*(position[2][j]-1))==0)
                    val[i][j]=val[i][j]+10000;
                if(((position[i][0]+position[i][1]+position[i][2])==2)&&(position[i][0]*position[i][1]*position[i][2])==0
                    &&((position[i][0]-1)*(position[i][1]-1)*(position[i][2]-1))==0)
                    val[i][j]=val[i][j]+10000;
				//one "x" in a row or column
                if(((position[0][j]+position[1][j]+position[2][j])==1)&&(position[0][j]*position[1][j]*position[2][j])==0
                    &&((position[0][j]-1)*(position[1][j]-1)*(position[2][j]-1))==0)
                    val[i][j]=val[i][j]+1000;
                if(((position[i][0]+position[i][1]+position[i][2])==1)&&(position[i][0]*position[i][1]*position[i][2])==0
                    &&((position[i][0]-1)*(position[i][1]-1)*(position[i][2]-1))==0)
                    val[i][j]=val[i][j]+1000;
				//one "o" in a row or column
                if(((position[0][j]+position[1][j]+position[2][j])==2)&&(position[0][j]*position[1][j]*position[2][j])==0
                    &&((position[0][j]-1)*(position[1][j]-1)*(position[2][j]-1))==1)
                    val[i][j]=val[i][j]+100;
                if(((position[i][0]+position[i][1]+position[i][2])==2)&&(position[i][0]*position[i][1]*position[i][2])==0
                    &&((position[i][0]-1)*(position[i][1]-1)*(position[i][2]-1))==1)
                    val[i][j]=val[i][j]+100;

                if(((position[0][j]+position[1][j]+position[2][j])==0)&&(position[0][j]*position[1][j]*position[2][j])==0
                    &&((position[0][j]-1)*(position[1][j]-1)*(position[2][j]-1))==-1)
                    val[i][j]=val[i][j]+10;
                if(((position[i][0]+position[i][1]+position[i][2])==0)&&(position[i][0]*position[i][1]*position[i][2])==0
                    &&((position[i][0]-1)*(position[i][1]-1)*(position[i][2]-1))==-1)
                    val[i][j]=val[i][j]+10;

				//The diagonal
                if((i==0&&j==0)||(i==2&&j==2)||(i==1&&j==1)){
                    if(((position[0][0]+position[1][1]+position[2][2])==4)&&(position[0][0]*position[1][1]*position[2][2])==0
                        &&((position[0][0]-1)*(position[1][1]-1)*(position[2][2]-1))==-1)
                        val[i][j]=val[i][j]+100000;


                    if(((position[0][0]+position[1][1]+position[2][2])==2)&&(position[0][0]*position[1][1]*position[2][2])==0
                        &&((position[0][0]-1)*(position[1][1]-1)*(position[2][2]-1))==0)
                        val[i][j]=val[i][j]+10000;


                    if(((position[0][0]+position[1][1]+position[2][2])==1)&&(position[0][0]*position[1][1]*position[2][2])==0
                        &&((position[0][0]-1)*(position[1][1]-1)*(position[2][2]-1))==0)
                        val[i][j]=val[i][j]+1000;


                    if(((position[0][0]+position[1][1]+position[2][2])==2)&&(position[0][0]*position[1][1]*position[2][2])==0
                        &&((position[0][0]-1)*(position[1][1]-1)*(position[2][2]-1))==1)
                        val[i][j]=val[i][j]+100;


                    if(((position[0][0]+position[1][1]+position[2][2])==0)&&(position[0][0]*position[1][1]*position[2][2])==0
                        &&((position[0][0]-1)*(position[1][1]-1)*(position[2][2]-1))==-1)
                        val[i][j]=val[i][j]+10;
                }

                if((i==0&&j==2)||(i==2&&j==0)||(i==1&&j==1)){

                    if(((position[0][2]+position[1][1]+position[2][0])==4)&&(position[0][2]*position[1][1]*position[2][0])==0
                        &&((position[0][2]-1)*(position[1][1]-1)*(position[2][0]-1))==-1)
                        val[i][j]=val[i][j]+100000;

                    if(((position[0][2]+position[1][1]+position[2][0])==2)&&(position[0][2]*position[1][1]*position[2][0])==0
                        &&((position[0][2]-1)*(position[1][1]-1)*(position[2][0]-1))==0)
                        val[i][j]=val[i][j]+10000;

                    if(((position[0][2]+position[1][1]+position[2][0])==1)&&(position[0][2]*position[1][1]*position[2][0])==0
                        &&((position[0][2]-1)*(position[1][1]-1)*(position[2][0]-1))==0)
                        val[i][j]=val[i][j]+1000;

                    if(((position[0][2]+position[1][1]+position[2][0])==2)&&(position[0][2]*position[1][1]*position[2][0])==0
                        &&((position[0][2]-1)*(position[1][1]-1)*(position[2][0]-1))==1)
                        val[i][j]=val[i][j]+100;
						
                    if(((position[0][2]+position[1][1]+position[2][0])==0)&&(position[0][2]*position[1][1]*position[2][0])==0
                        &&((position[0][2]-1)*(position[1][1]-1)*(position[2][0]-1))==-1)
                        val[i][j]=val[i][j]+10;
                }
            }
        }
    }
}
function ai(){
    if(judge()==true){
        return;
    }
	//choose the max value
    resetValue();
    var ii=0,jj=0,temp=0;
    for(var i=0;i<3;i++)
        for(var j=0;j<3;j++){
            if(val[i][j]>temp){
                temp=val[i][j];
                ii=i;
                jj=j;
            }
        }
    position[ii][jj]=2;
    num1=(ii*3+jj+1)+"";
    document.getElementById(num1).value="O";
    if(judge()==true){
        return;
    }
}

function lose(){
    document.write("<img src='assets/a51007e923e22ffecbff266ee080a71e.png' width=\"90%\" height=\"auto\"/>");
	window.alert("You Lose");
	setTimeout('open("https://mac1xa3.ca/u/wangx308/simpleapp.html","_self")',2000);
}





