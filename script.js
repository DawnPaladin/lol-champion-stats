$.ajax('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json').done(function(response) {
    var champions = response.data;
    console.log(champions);

    var imgPath = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Poppy.png';

    var generateMoveSpeed = function() {
        var moveSpeed = [];
        $.each(champions, function(champName, champObj) {
            var obj = {};
            obj.imgPath = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + champName + '.png';
            obj.moveSpeed = champObj.stats.movespeed * 10;
            moveSpeed.push(obj);
        });
        return moveSpeed;
    }
    moveSpeed = generateMoveSpeed();

    d3.select('.graph')
      .selectAll('img')
      .data(moveSpeed)
      .enter()
      .append('img')
        .attr('class', 'champ-icon')
        .attr('src', function(d) { return d.imgPath } )
        .attr('style', function(d) { return 'top: ' + (5000 - d.moveSpeed); } )
    ;
});
