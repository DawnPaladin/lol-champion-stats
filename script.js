$.ajax('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json').done(function(response) {
    var champions = response.data;
    console.log(champions);

    var imgPath = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Poppy.png';

    var yScale = d3.scaleLinear()
        .domain([325, 355])
        .range([7 * 50, 0]);

    var generateMoveSpeed = function() {
        var data = [];
        var record = {};

        $.each(champions, function(champName, champObj) {

            var obj = {};
            obj.imgPath = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + champName + '.png';
            obj.moveSpeed = yScale(champObj.stats.movespeed);
            
            if (record[obj.moveSpeed] === undefined) {
                record[obj.moveSpeed] = 0;
            } else {
                record[obj.moveSpeed] += 1;
            }
            obj.xOffset = 40 + record[obj.moveSpeed] * 50;

            data.push(obj);
        });
        return data;
    }
    data = generateMoveSpeed();

    var yAxis = d3.axisRight(yScale);

    d3.select('.graph')
      .selectAll('img')
      .data(data)
      .enter()
      .append('img')
        .attr('class', 'champ-icon')
        .attr('src', function(d) { return d.imgPath; } )
        .attr('style', function(d) {
            return 'top: ' + d.moveSpeed + 'px; left: ' + d.xOffset + 'px'
        })
    ;
    d3.select('.graph').append('svg')
      .attr('width', 500)
      .attr('height', 500)
      .append('g')
      .call(yAxis);
});
