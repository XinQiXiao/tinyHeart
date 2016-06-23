// 判断大鱼跟果实的碰撞
function momFruitsCollision(){
	// 大鱼能与果实碰撞是以game NO over 为前提
	if (!data.gameOver) {
		for (var i=0;i < fruit.num;i++){
			if (fruit.alive[i]) {
				// calculate length 检测大鱼跟果实之间的距离
				var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y)
				if (l < 900) {
					// fruit eaten
					fruit.dead(i)
					data.fruitNum++
					// mom body change
					mom.momBodyCount++
					if (mom.momBodyCount > 7) {
						mom.momBodyCount = 7
					}
					// 是否是blue果实
					if (fruit.fruitType[i] == 'blue') {
						data.double = 2
					}
					// wave 产生
					wave.born(fruit.x[i],fruit.y[i])
				}
			}
		}
	}
	
}
// mom baby collision
function momBabyCollision(){
	// 大鱼吃到果实的前提 
	if (data.fruitNum > 0 && !data.gameOver) {
		var l = calLength2(mom.x,mom.y,baby.x,baby.y)
		if (l < 900 ) {
			// baby recover
			baby.babyBodyCount = 0
			// mom
			mom.momBodyCount = 0
			// score update
			data.addScore()
			// draw hole
			hole.born(baby.x,baby.y)
		}
	}
}