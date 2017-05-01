$.ajax('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json').done(function(response) {
    var champions = response.data;
    console.log(champions);

    var generateMoveSpeed = function() {
        var moveSpeeds = {};

        $.each(champions, function(champName, champObj) {
            var obj = {};
            obj.imgPath = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + champName + '.png';
            obj.name = champObj.name;
            var currentSpeed = champObj.stats.movespeed;
            obj.moveSpeed = currentSpeed;
            
            if (moveSpeeds[currentSpeed] === undefined) {
                moveSpeeds[currentSpeed] = [obj];
            } else {
                moveSpeeds[currentSpeed].push(obj);
            }
            obj.xOffset = 40 + moveSpeeds[currentSpeed].length * 50;
        });
        return moveSpeeds;
    }
    moveSpeeds = generateMoveSpeed();
    console.log(moveSpeeds);

    d3.select('.graph')
        .selectAll('.speedRow')
        .data(d3.keys(moveSpeeds))
        .enter()
        .append('div').attr('class', 'speedRow').attr('data-speed', function(d) { return d; })
        .sort(function(a, b) {
            return a < b;
        })
    ;

    $('.speedRow').each(function(index, row) {
        var currentSpeed = $(row).data('speed');
        var champs = moveSpeeds[currentSpeed];
        d3.select(row)
            .selectAll('img')
            .data(champs)
            .enter()
            .append('img')
                .attr('class', 'champ-icon')
                .attr('src', function(d) { return d.imgPath; } )
                .attr('style', function(d) {
                    return 'top: ' + d.moveSpeed + 'px; left: ' + d.xOffset + 'px'
                })
                .attr('title', function(d) { return d.name });
        ;
    });

});
