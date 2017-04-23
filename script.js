$.ajax('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json').done(function(response) {
    var champions = response.data;
    console.log(champions);

    var imgPath = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Poppy.png';

    var generateMoveSpeed = function() {
        var data = [];
        var record = {};
        $.each(champions, function(champName, champObj) {
            var obj = {};
            obj.imgPath = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + champName + '.png';
            obj.moveSpeed = champObj.stats.movespeed * 10;
            
            if (record[obj.moveSpeed] === undefined) {
                record[obj.moveSpeed] = 0;
            } else {
                record[obj.moveSpeed] += 1;
            }

            obj.xOffset = record[obj.moveSpeed] * 50;

            data.push(obj);
        });
        return data;
    }
    data = generateMoveSpeed();

    d3.select('.graph')
      .selectAll('img')
      .data(data)
      .enter()
      .append('img')
        .attr('class', 'champ-icon')
        .attr('src', function(d) { return d.imgPath; } )
        .attr('style', function(d) {
            return 'bottom: ' + d.moveSpeed + 'px; left: ' + d.xOffset + 'px'
        })
        // .attr('style', function(d) { return 'bottom: ' + d.moveSpeed } )
    ;
});
