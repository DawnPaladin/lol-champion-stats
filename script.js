$.ajax('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json').done(function(response) {
    var champions = response.data;
    console.log(champions);

    var spaceBetweenRows = 10;
    var iconHeight = 50;
    var numberOfRows = 7;

    var yScale = d3.scaleLinear()
        .domain([325, 355])
        .range([(iconHeight + spaceBetweenRows) * (numberOfRows) , 0]);

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
    var svg = d3.select('svg');
    var g = svg.append('g');
    var margin = { top: 20, right: 0, bottom: 20, left: 0};
    var width = svg.attr('width');
    var formatNumber = d3.format('.1f');

    var yAxis = d3.axisRight(yScale);
    yAxis.tickSize(width);
    

    function customYAxis(g) { // numbers on y-axis
        g.call(yAxis);
        g.select('.domain').remove();
        g.selectAll('.tick:not(:first-of-type) line').attr('stroke', '#777').attr('stroke-dasharray', '2,2');
        g.selectAll('.tick text').attr('x', 4).attr('dy', -4);        
    }

    g.append('g').call(customYAxis);


});
