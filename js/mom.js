var momObj = function(){
	this.x
	this.y
	this.angle		// 角度
	// this.bigEye = new Image()
	// this.bigBody = new Image()
	// this.bigTail = new Image()

	// 尾巴控制
	this.momTailTimer = 0
	this.momTailCount = 0
	// eye
	this.momEyeTimer = 0
	this.momEyeCount = 0
	this.momEyeInterval = 1000	// 持续的时间间隔
	// body
	this.momBodyTimer = 0
	this.momBodyCount = 0
}
momObj.prototype.init = function(){
	this.x = canWidth * 0.5
	this.y = canHeight * 0.5
	this.angle = 0
	// this.bigEye.src = './src/bigEye0.png'
	// this.bigBody.src = './src/bigSwim0.png'
	// this.bigTail.src = './src/bigTail0.png'
}
momObj.prototype.draw = function(){

	// lerp x,y(使得一个值趋向目标值) 大鱼的坐标趋向于鼠标的坐标
	this.x = lerpDistance(mx,this.x,0.98)
	this.y = lerpDistance(my,this.y,0.98)

	// delta angle 大鱼的角度
	// Math.atan2(y,x) 反正切
	// 大鱼跟鼠标的位移差
	var deltaY = my - this.y
	var deltaX = mx - this.x
	// 
	var beta = Math.atan2(deltaY,deltaX) + Math.PI	// -PI,PI
	// lerp angle 大鱼的角度趋向于鼠标的角度
	this.angle = lerpAngle(beta,this.angle,0.6)

	// mom tail count
	this.momTailTimer += deltaTime
	if (this.momTailTimer > 50 ) {
		this.momTailCount = (this.momTailCount + 1) % 8
		this.momTailTimer %= 50
	}
	// mom eye count
	this.momEyeTimer += deltaTime
	if (this.momEyeTimer > this.momEyeInterval ) {
		this.momEyeCount = (this.momEyeCount + 1) % 2
		this.momEyeTimer %= this.momEyeInterval

		// 睁眼时间随机，闭眼时间固定
		if (this.momEyeCount == 0) {
			this.momEyeInterval = Math.random() * 1500 + 2000	// [2000,3500)
		} else {
			this.momEyeInterval = 200
		}
	}

	ctx1.save()
	ctx1.translate(this.x,this.y)
	ctx1.rotate(this.angle)

	var momTailCount = this.momTailCount
	var momEyeCount = this.momEyeCount
	var momBodyCount = this.momBodyCount
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width * 0.5+30,-momTail[momTailCount].height * 0.5)
	// 判断是否为blue果实
	if (data.double == 1) {
		ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width * 0.5,-momBodyOra[momBodyCount].height * 0.5)
	} else {
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width * 0.5,-momBodyBlue[momBodyCount].height * 0.5)

	}
	
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width * 0.5,-momEye[momEyeCount].height * 0.5)
	
	ctx1.restore()
}