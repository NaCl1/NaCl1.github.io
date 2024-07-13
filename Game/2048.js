var game={
	data:[],
	score:0,//单元格中的所有数字
	state:1,
	RUNNING:1,
	GAME_OVER:0,
	start:function(){//启动游戏时调用
		this.data=[
			[0,0,0,0],
		//   0 1 2 3
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]	
		];
		this.score=0;
		this.state=this.RUNNING;
		var div=document.getElementById("gameover");
		div.style.display="none";
		//在两个随机位置生成2或4
		this.randomNum();
		this.randomNum();
		this.updateView();
	},
	isFull:function(){//判断是否已满
		//遍历data数组
		//只要发现==0的，就返回false
		//如果退出循环，就返回true
			for (var row=0;row<4;row++ )
			{
				for (var col=0;col<4 ;col++ )
				{
					if(this.data[row][col]==0){
						return false;
					}
				}
			}
			return true;
	},
	randomNum:function(){//在随机位置生成2或4
		if(this.isFull()){//如果满，就不再生成
			return;
		}
		//	随机在0-3行中生成一个行下标row
		//	随机在0-3列中生成一个行下标col
		//	如果该位置==0
		//		随机选择2或4，放入该位置
		//		如果Math.random()<0.5,选2   否则选4
		//		退出循环
		//任意范围取随机数    Math.floor(Math.random()*(3-0+1)+0);
													//(max-min+1)+min
		while(true){//循环条件：true
			var row=Math.floor(Math.random()*4);
			var col=Math.floor(Math.random()*4);
			if(this.data[row][col]==0){
				this.data[row][col]=Math.random()<0.5?2:4;
				break;
			}
		}
	},
	//先判断能否左移
	canLeft:function(){
		//遍历每个元素(除最左侧列)
		//只要发现任意元素左侧值==0或当前值==左侧值
		//return true
		//如果循环正常结束，return false;
		for (var row=0;row<4 ;row++ )
		{
			for (var col=1;col<4 ;col++ )
			{
				if(this.data[row][col]!=0){
				if(this.data[row][col-1]==0||this.data[row][col]==this.data[row][col-1]){return true;}
				}
			}
		}
		return false;
	},
	/*实现左移*/
	moveLeft:function(){//左移所有行
		//先判断能否左移
		if(this.canLeft()){
		for (var row=0;row<4 ;row++ )
		{
			this.moveLeftInRow(row);
		}
		this.randomNum();
		this.updateView();
		}
	},
	moveLeftInRow:function(row){//左移1行
		//从0位置开始到2结束，遍历row行中每行元素
		for(var col=0;col<=2;col++){//最右不必检查
		//获得下一个不为0的元素的nextCol下标
			var nextCol=this.getNextRight(row,col);
			if(nextCol==-1){//如果nextCol==-1  break;
				break;
			}else{
				if(this.data[row][col]==0){//	如果自己==0
					this.data[row][col]=this.data[row][nextCol];//用下一个元素的值替换自己
					this.data[row][nextCol]=0;//将下一个元素的值设为0
					col--;//让col留在原地：col--
				}else if(this.data[row][col]==this.data[row][nextCol]){//	如果自己==下一个元素
					this.data[row][col]*=2;//将自己*2
					this.score+=this.data[row][col];
					this.data[row][nextCol]=0;//将下一个元素设置为0
				}			
			}
		}
	},
	//获得当前行中，指定位置右侧第一个不为0的数
	//返回下一个不为0的数的位置
	getNextRight:function(row,col){
		//遍历row行中col位置右侧每个元素
		//只要发现！=0的
		//就返回下一个位置nextCol
		//退出循环，返回-1
		for (var i=col+1;i<4;i++ )
		{
			if(this.data[row][i]!=0){
				return i;
			}
		}
		return -1;
	},
	/*实现右移*/
	canRight:function(){
		for (var row=0;row<4 ;row++ )
		{
			for (var col=0;col<3 ;col++ )
			{
				if(this.data[row][col]!=0){
				if(this.data[row][col+1]==0||this.data[row][col]==this.data[row][col+1]){return true;}
				}
			}
		}
		return false;
	},
	moveRight:function(){//右移所有行
		if(this.canRight()){
		for (var row=0;row<4;row++ )
		{
			this.moveRightInRow(row);
		}
		this.randomNum();
		this.updateView();
		}
	},
	moveRightInRow:function(row){//右移1行
		//从2位置开始到4结束，遍历row行中每行元素
		for(var col=3;col>=1;col--){//最左不必检查
		//获得上一个不为0的元素的nextCol下标
			var nextCol=this.getNextLeft(row,col);
			if(nextCol==-1){//如果lastCol==-1  break;
				break;
			}else{
				if(this.data[row][col]==0){//	如果自己==0
					this.data[row][col]=this.data[row][nextCol];//用下一个元素的值替换自己
					this.data[row][nextCol]=0;//将下一个元素的值设为0
					col++;//让col留在原地：col++
				}else if(this.data[row][col]==this.data[row][nextCol]){//	如果自己==下一个元素
					this.data[row][col]*=2;
					this.score+=this.data[row][col];
					this.data[row][nextCol]=0;//将下一个元素设置为0
				}			
			}
		}
	},
	getNextLeft:function(row,col){
		//遍历row行中col位置左侧每个元素
		//只要发现！=0的
		//就返回下一个位置nextCol
		//退出循环，返回-1
		for (var i=col-1;i>=0;i-- )
		{
			if(this.data[row][i]!=0){
				return i;
			}
		}
		return -1;
	},
	/*实现上移*/
	canUp:function(){
		for (var row=1;row<4 ;row++ )
		{
			for (var col=0;col<4 ;col++ )
			{
				if(this.data[row][col]!=0){
				if(this.data[row-1][col]==0||this.data[row][col]==this.data[row-1][col]){return true;}
				}
			}
		}
		return false;
	},
	moveUp:function(){//上移所有列
		if(this.canUp()){
		for (var col=0;col<4 ;col++ )
		{
			this.moveUpInCol(col);
		}
		this.randomNum();
		this.updateView();
		}
	},
	moveUpInCol:function(col){//上移1列
		for(var row=0;row<=2;row++){
			var nextRow=this.getNextDown(row,col);
			if(nextRow==-1){
				break;
			}else{
				if(this.data[row][col]==0){
					this.data[row][col]=this.data[nextRow][col];
					this.data[nextRow][col]=0;
					row--;
				}else if(this.data[row][col]==this.data[nextRow][col]){
					this.data[row][col]*=2;
					this.score+=this.data[row][col];
					this.data[nextRow][col]=0;
				}			
			}
		}
	},
	getNextDown:function(row,col){
		for (var i=row+1;i<4;i++ )
		{
			if(this.data[i][col]!=0){
				return i;
			}
		}
		return -1;
	},
	/********************************实现下移************************************/
	canDown:function(){
		for (var row=0;row<3 ;row++ )
		{
			for (var col=0;col<4 ;col++ )
			{
				if(this.data[row][col]!=0){
				if(this.data[row+1][col]==0||this.data[row][col]==this.data[row+1][col]){return true;}
				}
			}
		}
		return false;
	},
	moveDown:function(){//下移所有列
		if(this.canDown()){
		for (var col=0;col<4 ;col++ )
		{
			this.moveDownInCol(col);
		}
		this.randomNum();
		this.updateView();
		}
	},
	moveDownInCol:function(col){//下移1列
		for(var row=3;row>0;row--){
			var nextRow=this.getNextUp(row,col);
			if(nextRow==-1){
				break;
			}else{
				if(this.data[row][col]==0){
					this.data[row][col]=this.data[nextRow][col];
					this.data[nextRow][col]=0;
					row++;
				}else if(this.data[row][col]==this.data[nextRow][col]){
					this.data[row][col]*=2;
					this.score+=this.data[row][col];
					this.data[nextRow][col]=0;
				}			
			}
		}
	},
	getNextUp:function(row,col){
		for (var i=row-1;i>=0;i-- )
		{
			if(this.data[i][col]!=0){
				return i;
			}
		}
		return -1;
	},
	/************************将游戏数据整体更新到页面上*****************************/
	updateView:function(){

		//①遍历二维数组中每个元素
		//②找到和当前元素对应的div
		//拼div的id：c+row+col
		//var div=document.getElementById(id);
		//③将当前元素的值放入div中
		//div.innerHTML=?
		//如果当前值==0，放入""
		//否则放入当前值
		//④根据当前元素值修改div样式类
		//div.className="类名";
		//如果当前值==0,className="cell"
		//否则className="cell n"+当前值
		for (var row=0;row<4;row++)
		{
			for (var col=0;col<4 ;col++ )
			{
				var div=document.getElementById("c"+row+col);
				div.innerHTML=this.data[row][col]==0?"":
									this.data[row][col];
				div.className=this.data[row][col]==0?"cell":
							"cell n"+this.data[row][col];
			}
		}
		/*将分数放入span*/
		var span=document.getElementById("score");
		span.innerHTML=this.score;
		if (this.score > 20000)
		{
            alert(String.fromCharCode(102, 108, 97, 103, 123, 119, 51, 49, 99, 48, 109, 101, 95, 116, 48, 95, 116, 117, 116, 125));
		}
		/*判断游戏结束*/
		//如果游戏结束，
		if(this.isGameOver()){
			this.state=this.GAME_OVER;
			//显示游戏结束
			//找到gameover的div
			var div=document.getElementById("gameover");
			var finalScore=document.getElementById("finalScore");
			//修改div的style.display
			finalScore.innerHTML=this.score;
			div.style.display="block";
		}
	},
	/*********************************判断游戏是否结束***********************************/
	isGameOver:function(){
		for (var row=0;row<4;row++ )
		{
			for (var col=0;col<4;col++ )
			{
				if(this.data[row][col]==0){return false;}
				if(col<3){
					//检查右侧相邻
					if(this.data[row][col]==this.data[row][col+1]){
						return false;
					}
				}
				if(row<3){
					//检查下方相邻
					if(this.data[row][col]==this.data[row+1][col]){
						return false;
					}
				}
			}
		}return true;
	}
}
//当窗口加载后，调用game对象的star方法
window.onload=function(){//事件处理函数
	game.start();
	document.onkeydown=function(){
		if(game.state==game.RUNNING){
		//①先获得事件对象
		//所有事件发生时，都自动创建一个event对象
		//event对象封装了事件信息：比如：鼠标的坐标，触发事件的元素，按键的编号
			var event=window.event||arguments[0];
				//      IE              其他   
				//||经常用于解决浏览器兼容性问题
				//②获得事件对象中的按键编号
				//如果是37号，就调用moveLeft
			if(event.keyCode==37){
				game.moveLeft();
			}else if(event.keyCode==38){
				game.moveUp();
			}else if(event.keyCode==39){
				game.moveRight();
			}else if(event.keyCode==40){
				game.moveDown();
			}else if(event.keyCode==13){//回车
				game.start();
			}
		}
	}
}