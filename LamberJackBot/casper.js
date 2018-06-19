var casper = require('casper').create();

casper.viewportSize = {
    width: 720,
    height: 1280
}

casper.start('https://tbot.xyz/lumber/#eyJ1IjoyODQ2OTMyNDAsIm4iOiJWbGFkaXNsYXYgU2V2ZXJpbiIsImciOiJMdW1iZXJKYWNrIiwiY2kiOiI0MjMxOTQyMjE1NDI2MzczNzA5IiwiaSI6IkFnQUFBRkVOQUFBQ3BCMGQtajNjaGRHSXFBayJ9YTljMzBjYjY5ZDk1Yjg3MjY0NjE5NDJjMzAwMmNhNTc=&tgShareScoreUrl=tg%3A%2F%2Fshare_game_score%3Fhash%3DpivECmQA5jD0jdGcv-Vdaf8QX69Ev56KZnyECSHXiDA', function() {

    // casper.evaluate(function() {
    //     document.getElementById('button_left').click();
    // });

    console.log('data:image/png;base64,' + this.captureBase64('png', 'canvas'));
    // clipRect capture
    // console.log(this.captureBase64('png', {
    //     top: 0,
    //     left: 0,
    //     width: 320,
    //     height: 200
    // }));
    // whole page capture
    // console.log(this.captureBase64('png'));
});

casper.run();