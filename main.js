// 10秒後に動画を再生
$(function() {
  $('#play-btn').click(function() {
    alert("十秒後に再生されますので、画面の向きのロックを解除して横画面にしてください。");
    setTimeout(function() {
      $('#video')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }, 10000); // 10秒待機
  });
});


// ジャイロセンサーが使用可能だったら
if(window.DeviceOrientationEvent){
    // ユーザーにアクセスの許可を求める関数があったら（iOS13以降の対応）
    if(DeviceOrientationEvent.requestPermission){
      $(".gyro").on("click", function(){
        // ジャイロセンサーへのアクセス許可を申請する
        DeviceOrientationEvent.requestPermission().then(function(response){
          // リクエストが許可されたら
          if(response === "granted"){
          // 回転や傾きの変化を検知する「deviceorientation」を使い、「gyro()」を実行
          $(window).on("deviceorientation", gyro);
          }
        });
      });
      // アクセスの許可を求める関数がなかったら
    }else{
      // 許可したアラート出す
      $(".gyro").on("click", function(){
      alert("ジャイロセンサーの使用が許可されました");
      })
      // 回転や傾きの変化を検知する「deviceorientation」を使い、「gyro()」を実行
      $(window).on("deviceorientation", gyro);
    }
  }
  
// 値の処理
    function gyro(){
    // それぞれの値の小数点以下を切り捨てて格納
    var beta = Math.floor(event.beta);
    var gamma = Math.floor(event.gamma);
    var alpha = Math.floor(event.alpha);
    // 値を表示
    // X軸（-90~270までの値）X軸は画面横の
    $(".beta span").text(beta);
    // Y軸（-90~90までの値）
    $(".gamma span").text(gamma);
    // Z軸（0~360までの値）
    $(".alpha span").text(alpha);

    

//ジャイロ可視化

//X軸（左）
  if (beta > -4) {
    $(".left").css({
      position: "fixed",
      width: "80px",
      height: "100%",
      background: "transparent"
    });

  } else if (beta >= -8 && beta <= -5) {
    $(".left").css({
      position: "fixed",
      width: "80px",
      height: "100%",
      background: "linear-gradient(to right, rgba(127,255,0,1), rgba(127,255,0,0))"
    });

  } else if (beta >= -14 && beta <= -9) {
    $(".left").css({
      position: "fixed",
      width: "80px",
      height: "100%",
      background: "linear-gradient(to right, rgba(255,215,0,1), rgba(255,215,0,0))"
    });

  } else if (beta <= -15) {
  $(".left").css({
    position: "fixed",
    width: "80px",
    height: "100%",
    background: "linear-gradient(to right, rgba(255,87,51,1), rgba(255,87,51,0))"
  });
}


  //X軸（右）
  if (beta < 4) {
      $(".right").css({
        position: "fixed",
        width: "80px",
        height: "100%",
        right: "0",
        background: "transparent"
      });
  } else if (beta >= 5 && beta <= 8) {
      $(".right").css({
        position: "fixed",
        width: "80px",
        height: "100%",
        right: "0",
        background: "linear-gradient(to left, rgba(127,255,0,1), rgba(127,255,0,0))"
      });
  } else if (beta >= 9 && beta <= 14) {
      $(".right").css({
        position: "fixed",
        width: "80px",
        height: "100%",
        right: "0",
        background: "linear-gradient(to left, rgba(255,215,0,1), rgba(255,215,0,0))"
      });
  } else if (beta >= 15) {
    $(".right").css({
      position: "fixed",
      width: "80px",
      height: "100%",
      right: "0",
      background: "linear-gradient(to left, rgba(255,87,51,1), rgba(255,87,51,0))"
    });
    }

// Y軸（上）
if (gamma >= 85 && gamma <= 89) {
  $(".top").css({
    position: "fixed",
    width: "100%",
    height: "80px",
    background: "transparent"
  });

} else if (gamma >= 81 && gamma <= 84) {
  $(".top").css({
    position: "fixed",
    width: "100%",
    height: "80px",
    background: "linear-gradient(to bottom, rgba(127,255,0,1), rgba(127,255,0,0))"
  });

} else if (gamma >= 75 && gamma <= 80) {
  $(".top").css({
    position: "fixed",
    width: "100%",
    height: "80px",
    background: "linear-gradient(to bottom, rgba(255,215,0,1), rgba(255,215,0,0))"
  });

} else if (gamma >= 74) {
  $(".top").css({
    position: "fixed",
    width: "100%",
    height: "80px",
    background: "linear-gradient(to bottom, rgba(255,87,51,1), rgba(255,87,51,0))"
  });
}

// Y軸（下）
if (gamma >= -89 && gamma <= -85) {
  $(".bottom").css({
    position: "fixed",
    width: "100%",
    height: "80px",
    bottom: "0",
    background: "transparent"
  });
} else if (gamma >= -84 && gamma <= -81) {
  $(".bottom").css({
    position: "fixed",
    width: "100%",
    height: "80px",
    bottom: "0",
    background: "linear-gradient(to top, rgba(127,255,0,1), rgba(127,255,0,0))"
  });

} else if (gamma >= -80 && gamma <= -75) {
  $(".bottom").css({
    position: "fixed",
    width: "100%",
    height: "80px",
    bottom: "0",
    background: "linear-gradient(to top, rgba(255,215,0,1), rgba(255,215,0,0))"
  });

} else if (gamma >= -74 && gamma <=0) {
  $(".bottom").css({
    position: "fixed",
    width: "100%",
    height: "80px", 
    bottom: "0",
    background: "linear-gradient(to top, rgba(255,87,51,1), rgba(255,87,51,0))"
  });
}
    }
  




// 画面縦横切り替え

   $(window).resize(function() 
   {
     timer = setTimeout(function() 
     {
       width_display();
     }, 200);
   });

   $(document).ready(function()
   {
     width_display();
   });

   function width_display()
   {
     if (window.innerWidth < window.innerHeight)
     {
       console.log("縦画面");
       $(".tate_ui").css("display", "block");
       $(".yoko_ui").css("display", "none");

     }
     else if (window.innerWidth > window.innerHeight)
     {
       console.log("横画面");
       $(".yoko_ui").css("display", "block");
       $(".tate_ui").css("display", "none");

     }
   }


