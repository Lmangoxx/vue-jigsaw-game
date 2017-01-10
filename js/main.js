/*!
 * 拼图小游戏
 * Author   : Lmango <277040350@qq.com>
 * Github   : https://github.com/Lmangoxx/vue-jigsaw-game
 * Created  : 10/1/2017
 * 初学者，有问题或者好的改进可以联系我！
 */
'use strict';
var jigsaw = new Vue({
	el: '#app',
	data: { 
		title: 'vue拼图小游戏',
		width: 600, // 拼图大小
		num: 9, // 拼图有多少快（可选择，默认为9个）
		img: 'images/1.jpg', // 拼图图片（可选择，默认为图片1）
		lists: [],
		score: 0, // 走了多少步，默认为0
		moveing: false, // 当前是否有拼图在移动，默认为false
		gameOver: false // 拼图是否完成，默认为false
	},
	watch : { // 监听难度跟图片，改变时初始化重新渲染dome
		num : function(val, oldVal){
			this.init();
		},
		img : function(val, oldVal){
			this.init();
		}
	},
	created (){ // created后，初始化，绑定按键事件
		var vm = this;
		vm.init();
		document.onkeyup = function (event) {
			var e = event || window.event;
    		var keyCode = e.keyCode || e.which;
			switch(keyCode){
				case 37 : if(!vm.moveing) vm.move(1); //向左移动
						  break;
				case 38 : if(!vm.moveing) vm.move(vm.bulk.num); //向上移动
						  break;
				case 39 : if(!vm.moveing) vm.move(-1); //向右移动
						  break;
				case 40 : if(!vm.moveing) vm.move(-vm.bulk.num); //向下移动
						  break;		  		  
			}
		}
	},
	methods: {
		init (){ // 初始化
			var _num   = Math.sqrt(this.num), // 计算每行每列拼图数量
				_width = this.width / _num; // 计算每块拼图的宽高值
			this.lists = [];
			this.score = 0;
			this.moveing = false;
			this.gameOver = false;
			this.bulk =  {
				num  : _num,
				width: _width
			};
			for(var i = 0; i < this.num; i++){
				this.lists[i] = i;
			}
		},
		reset (){ // 打乱拼图并重新开始游戏
			this.score = 0;
			this.moveing = false;
			this.gameOver = false;
			this.lists = _.shuffle(this.lists); // 打乱lists数组
		},
		move (g){ // 移动拼图
			var index = this.lists.indexOf(0), // 获取空白拼图块的索引
				_index = index + g, // 要移动的拼图块索引
				z; 
			if(_index < 0 || _index > this.num-1){ // 判断该拼图块是否可以移动
				return;
			}else if( g == 1 && _index % this.bulk.num == 0){
				return;
			}else if( g == -1 && _index % this.bulk.num == (this.bulk.num - 1) ){
				return;
			}else {
				this.moveing = true; // 如果可以移动，把移动状态改为true，防止频繁操作
			}
			
			var z = this.lists[index]; // 交换lists中index跟_index的值达到移动效果
			this.$set(this.lists, index, this.lists[_index]); 
			this.$set(this.lists, _index, z);

			this.score += 1; // 步数+1
			this.over(); // 判断是否拼图成功
		},
		over (){ // 判断是否拼图成功
			var vm = this,
				o = 0;
			vm.lists.forEach(function(index, val) {
				if(val === index) o += 1;
			});
			if(o === vm.lists.length){
				vm.gameOver = true;
				setTimeout(function(){
					alert('你用了' + vm.score + '步完成该拼图！');
				},550);
			}else {
				vm.moveing = false;
			}
		}
	}
});