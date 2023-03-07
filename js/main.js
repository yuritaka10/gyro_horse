// ジャイロセンサーが使用可能だったら
if(window.DeviceOrientationEvent){
    // ユーザーにアクセスの許可を求める関数があったら（iOS13以降の対応）
    if(DeviceOrientationEvent.requestPermission){
      $(".btn").on("click", function(){
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
    // X軸（-90~270までの値）
    $(".beta span").text(beta);
    // Y軸（-90~90までの値）
    $(".gamma span").text(gamma);
    // Z軸（0~360までの値）
    $(".alpha span").text(alpha);
    // 傾きアニメーション
    $(".img > span").css({transform: 'perspective(1200px) rotateX(' + beta + 'deg) rotateY(' + gamma + 'deg) rotateZ(' + alpha + 'deg)'});
    // スマホの向き
    if(beta < 10) {
      $(".roll span").text("横");
    }else{
      $(".roll span").text("縦");
    }
  }