/*
 *	游戏规则
 *  保持活着的果实数量为15个
 *
 */

var fruitObj = function(){
	this.alive = []	// bool
	this.x = []
	this.y = []
	this.aneNum = []
	this.l = []	// 图片长度
	this.speed = [] // 成长速度和移动速度
	this.fruitType = []
	this.orange = new Image()
	this.blue = new Image()
}
fruitObj.prototype.num = 20
fruitObj.prototype.init = function(){
	for (var i=0;i<this.num;i++){
		this.alive[i] = true
		this.x[i] = 0
		this.y[i] = 0
		this.aneNum[i] = 0
		this.speed[i] = Math.random()*0.012+0.003	// [0.003,0.015)
		this.fruitType[i] = ''
		// this.born(i)
	}
	this.orange.src = 'src/fruit.png'
	this.blue.src = 'src/blue.png'
}
fruitObj.prototype.draw = function(){
	for (var i=0;i<this.num;i++){
		// draw
		// find an ane,grow,fly up
		// 当果实或者时
		if (this.alive[i]) {
			// 判断果实类型
			var pic
			if (this.fruitType[i] == 'blue') {
				pic = this.blue
			} else {
				pic = this.orange
			}
			// 当每个果实长度小于14时成长
			if (this.l[i]<14) {
				this.x[i] = ane.headx[this.aneNum[i]]
				this.y[i] = ane.heady[this.aneNum[i]]
				this.l[i] += this.speed[i] * deltaTime
			} else {
				this.y[i] -= this.speed[i] * 7 * deltaTime;
			}
			ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i])
			if (this.y[i]<10) {
				this.alive[i] = false
			}
		}
		
	}
}
fruitObj.prototype.born = function(i){
	// var aneID = Math.floor(Math.random()*ane.num)
	// this.x[i] = ane.headx[aneID]
	// this.y[i] = ane.heady[aneID]
	this.aneNum[i] = Math.floor(Math.random()*ane.num)
	this.l[i] = 0
	this.alive[i] = true
	var ran = Math.random()
	if (ran<0.2) {
		this.fruitType[i] = 'blue'
	} else {
		this.fruitType[i] = 'orange'
	}
}
fruitObj.prototype.dead = function(i){
	this.alive[i] = false
}
// 果实数量监测
function fruitMonitor(){
	var num = 0
	for (var i=0; i<fruit.num;i++)
	{
		if (fruit.alive[i]) num++;
	}	
	if (num<15) {
		// send fruit
		sendFruit()
		return
	}
}
function sendFruit(){
	for (var i=0;i < fruit.num;i++){
		if (!fruit.alive[i]) {
			fruit.born(i)
			return
		}
	}
}


