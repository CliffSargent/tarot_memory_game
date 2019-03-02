
"use strict";


	//////////////////		Duplicate fix for game bug	///////////////////
	
	//////////////////		Duplicate 2	fix for click dead card///////////////////
	
	//////////////////		Duplicate 3	to b paired with html2	 Flip animation///////////////////

// when the document loads the following happens
$(document).ready(function () {
    
    //
    $(".startButton").on("click", function () {

        let sec = 60;
        let min = 0;
        let delay = sec - 2;
        let name1;
        let nameId;
        let score = 0;
		let isWin = false;
		let repeat = [];

        let numOfCards = 0;

        let boardLock = false;

        let imgName = ["chariot.png", "hangedman.png", "heirophant.png", "empress.png", "hermit.png", "highpriestess.png", "magician.png", "moon.png"];

        let img = randImages(imgName);

        // Reset button resetting
        $(".resetButton").on("click", function () {
            score = 0;
			isWin = false;
			boardLock = true;
			$(".shift").css("transform", "rotateY(0deg)");
			
			setTimeout(function () {
			
				img = randImages(imgName);
				$(".shift").css("opacity", "1");
				sec = 60;
				boardLock = false;

				$(".death").css("opacity", "1");
				$('.deathMessage').css("display", "none");
				$('.deathMessage').css("color", "white");

				$(".life").css("opacity", "1");
				$('.lifeMessage').css("display", "none");
				$('.lifeMessage').css("color", "white");
				repeat = [];
			
			}, 1500);
			
        });

                                                                        /// finish reset button
        let x = setInterval(function () {
            sec = sec - 1;
            $(".Timer").html(sec);
            if (sec <= 0) {
                sec = 1;
				if(!isWin){
					boardLock = true;
					$(".death").css("opacity", "0.2");
					$('.deathMessage').css("display", "block");
					$('.deathMessage').css("color", "white");
				}
            }
            //console.log(sec);
        }, 1000);
		
		
		//Checks to exclude clicks on opaque cards
		function checkRepeat(check){			
			for(let i = 0; i < repeat.length; i++){
				if(check == repeat[i]){
					return false;
				}
			}
			for(let j = 0; j < repeat.length; j++){
				console.log(repeat[j]);
			}
			return true;
		}
		

        // On Click, Cards Flip to Random Images
        $(".back").on("click", function (e) {
			
            if (boardLock) return;
			
			let currentId = (e.target.id).slice(4, e.target.id.length);
			$("#"+currentId).attr("src", "Tarot Cards/" + img[Number(currentId)]);
			$(".shift"+currentId).css("transform", "rotateY(180deg)");
			
			if((numOfCards < 1|| nameId != currentId) && checkRepeat(currentId)){
				numOfCards++;
				if (numOfCards == 1) {
					name1 = img[Number(currentId)];
					nameId = currentId;
				}
			}

            if (numOfCards == 2) {
                boardLock = true;
				if (name1 == img[Number(currentId)]) {
					score++;				
					if(score == 8){
						isWin = true;
						$(".life").css("opacity", "0.2");
						$('.lifeMessage').css("display", "block");
						$('.lifeMessage').css("color", "white");

					}
					
				}
				
				numOfCards = 0;

                setTimeout(function () {
                    if (name1 == img[Number(currentId)]) {
                        $(".shift" + nameId).css("opacity", "0");
                        $(".shift" + currentId).css("opacity", "0");
						
						repeat.push(nameId);
						repeat.push(currentId);

                    }
					
						$(".shift"+nameId).css("transform", "rotateY(0deg)");
						$(".shift"+currentId).css("transform", "rotateY(0deg)");
						
						boardLock = false;
                }, 1500);
				
            }
			
        });
		
    });
	 
// window.onkeyup = function(e) {
//    var key = e.keyCode ? e.keyCode : e.which;

//    if (key == 65) {
//        $(".shift").css("transform", "rotateY(180deg)");
//    }else{
// 	   $(".shift").css("transform", "rotateY(0deg)");
//    }
// }

});


function randImages(arr) {
    let img = new Array(16);
    let idx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let j;

    for (let i = 0; i < 8; i++) {

        j = Math.floor(Math.random() * idx.length);
        img[idx[j]] = arr[i];
        idx.splice(j, 1);

        j = Math.floor(Math.random() * idx.length);
        img[idx[j]] = arr[i];
        idx.splice(j, 1);

    }
	
	//$(".back").attr("src", "tarotBack.png");

    for (let i = 0; i < img.length; i++) {
		$("#"+i).attr("src", "Tarot Cards/" + img[i]);
	}

    return img;

}




