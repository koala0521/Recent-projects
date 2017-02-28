(function(){   // 音乐播放器
	
	var oAudio = $("#audio"),
	
		mPlayer = $(".musicPlayer").eq(0),
	
		toPlay = $(".musicPlayer span.toPlay").eq(0),
		
		playPage = $(".musicPlayer .palyerPage").eq(0),
		
		backList = $(".palyerPage span.backMlist").eq(0),
		
		menu = $(".appContent .menu").eq(0),
		
		song = $(".palyerPage .song").eq(0),
		
		singer = $(".palyerPage .singer").eq(0),
		
		currentIndex = 0,
	
		num1,
		
		num2,
		
		num3,
		
		num4,

		timer = null,
		
		timer1 = null;
				
		oAudio[0].addEventListener("progress",function(){
//			
//			console.log( this.buffered , this.readyState);
			
		},false);
		
		oAudio[0].addEventListener("canplay",function(){
//			
//			alert( "可以播放");
			
		},false);
		

	function randerTime(){
		
		clearInterval( timer1 );
		
		timer1 = setInterval(function(){
			
			if( oAudio[0].currentTime === 0 ){

				oAudio[0].load();
				
				oAudio[0].play();
				
				return;
			}

			num3 =  Math.floor( parseInt(oAudio[0].currentTime) / 60);
			
			num4 = parseInt(oAudio[0].currentTime) % 60;
			
			num3 = num3 < 10 ? "0" + num3 : "" + num3; 
			
			num4 = num4 < 10 ? "0" + num4 : "" + num4; 
			
			$(".palyerPage .times .currentTime").text( num3 + ":" + num4 );
			
		},1000);
		
	}

	function turnSong(){
		
		song.text( musicData[currentIndex].song );
		
		singer.text( musicData[currentIndex].singer );
		
		$(".palyerPage .songImg img")[0].src = musicData[currentIndex].imgSrc;		
		
		oAudio.attr( "src" , musicData[currentIndex].songSrc );
		
		playPage.css( "background-image" , musicData[currentIndex].bg );
		
		$(".times .allTime").eq(0).text( musicData[currentIndex].duration );

	}
	
	//初始化
	turnSong();	
		
		
	//转到播放页面
	toPlay.on("touchstart",function(){
		
		$(this).css("color","#aaa");
		
	})
	
	function fn1(){
		
		playPage.css("transform","translateX(0)");

		menu.hide();
		
	}
	
	function fn2(){
		
		$(this).css("color","#fff");
	}
	
	function backFn(){
		
		playPage.css("transform","translateX(100%)");
		
		menu.show();
	}
	
	function clearShadow(){
		
		$(this).removeClass("shadow");
	}
	
	new Touchup(toPlay[0],fn1,fn2);
	
	//返回列表页面
	backList.on("touchstart",function(){
		
		$(this).css("color","#aaa");
		
	})
	
	new Touchup(backList[0],backFn,fn2);
	
	//歌曲列表事件代理
	$(".mList .musicList").eq(0).on("touchstart",function(ev){
		
		var tar = ev.target;

		if( $(tar).hasClass("button") ){

			return;
		}
		
		if(  tar.nodeName === "LI"){

			$(tar).addClass("touched");
			
			return;
		}

		if( $(tar).parents().filter("li").length ){
			
			$(tar).parents().filter("li").addClass("touched");
		}
		
	});
	
	
	function touchList1(ev){
		
		var tar = ev.target;

		
		if( $(tar).hasClass("button") ){
			
			return;
		}
		
		if(  tar.nodeName === "LI"){
			
			if( !$(tar).hasClass("active") ){
				
				$(this).find("li").removeClass("active");
				
				$(tar).addClass("active");
				
				currentIndex = $(tar).index();

				turnSong();	
				
			}

			isPlay();
	
			playPage.css("transform","translateX(0)");
			
			menu.hide();
			
			return;
		}

		if( $(tar).parents().filter("li").length ){			
			
			if( !$(tar).parents().filter("li").eq(0).hasClass("active") ){
				
				$(this).find("li").removeClass("active");
				
				$(tar).parents().filter("li").addClass("active");
				
				currentIndex = $(tar).parents().filter("li").eq(0).index();

				turnSong();				
				
			}
			
			isPlay();

			playPage.css("transform","translateX(0)");
			
			menu.hide();
			
		}		

	}
	
	function touchList2(ev){
		
		var tar = ev.target;

		if( $(tar).hasClass("button") ){
			
			return;
		}
		
		if(  tar.nodeName === "LI"){

			$(tar).removeClass("touched");
			
			return;
		}

		if( $(tar).parents().filter("li").length ){
			
			$(tar).parents().filter("li").removeClass("touched");
		}
		
	}
		
	new Touchup($(".mList .musicList")[0],touchList1,touchList2);
	
	// 暂停/播放功能	
	
	var mOnoff = $(".ctrl .onoff span").eq(0);
	
	mOnoff.on("touchstart",function(){
		
		$(this).addClass("shadow");
	})
	
	function isPlay(){

		if( oAudio[0].paused ){
			
			oAudio[0].play();
			
			randerTime();
			
			mOnoff.removeClass("glyphicon-play");
			
			mOnoff.addClass("glyphicon-pause");
			
			$(".palyerPage .mPlay img").eq(0).addClass("active");
				
			$(".palyerPage .songImg .bg").addClass("rotate");
			
		} else {
			
			oAudio[0].pause();
			
			mOnoff.removeClass("glyphicon-pause");
			
			mOnoff.addClass("glyphicon-play");
			
			$(".palyerPage .mPlay img").eq(0).removeClass("active");
				
			$(".palyerPage .songImg .bg").removeClass("rotate");
		}
	}
	
	new Touchup(mOnoff[0],isPlay,clearShadow);
	
})()