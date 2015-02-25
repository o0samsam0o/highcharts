/**
 * @author Sandy
 */
    var dateValue;
    var data1 = null;
    var data2 = null;
    var data3 = null;
    var data4 = null;
    var data5 = null;
    var data6 = null;
    
    var completeData = null;
    var chart = null;
    var renderer;
    
    var plotleft;
    var plottop;
    var plotwidth;
    var plotheight;
    
       
    var width;
    var height;
    
    var plotcellWidth;
    var plotcellHeight;
    
    var cellWidth;
    var cellHeight;
    var dist = 10;
    var arrowLength = 15;
    var arrowWidth = 8;
  
    var sortedData = null;
    
    var rendererPaths = [];
    var rendererCounter = 0;
    
    var pageURL = document.URL;
    var projectID = getQueryStringParams('id',pageURL);  
    
    
    function getQueryStringParams(sParam,sPageURL)
    {
          var sURLVariables = sPageURL.split('&');
          for (var i = 0; i < sURLVariables.length; i++)
          {
                  
                  var sParameterName = sURLVariables[i].split('=');
                  if (sParameterName[0] == sParam)
                          {
                                  return  sParameterName[1];
                          }
          }

    }
  
    function myfunction(){
      //alert('hide');
      jQuery( "#container" ).remove();     
      renderer = null;
      /**jQuery.each(rendererPaths, function(idx, path) {
        alert('hi');
        path.element.remove();
});*/
      
      /**for(var i=0;i<rendererPaths.length;i++){
        var rendPath = rendererPaths[i];
        alert('rendPath is '+rendPath);
        rendPath.element.remove();
}*/
      
      //document.getElementById('container').style.display = 'none';
      //alert('hided');
        dateValue = document.getElementById('datePick').value;
      var url;
      if(dateValue == ''){
        //alert('not selected');
       url = 'RiskHeatmapData.jsp?id='+projectID; 
      }else{
        url = 'RiskHeatmapData.jsp?id='+projectID+ '&dateValue='+dateValue; 
      }
      // var info = 'No Date selected. Default Last Assessment Date is'+dateValue;
      //document.getElementById('infoDiv').innerHTML = info;
            var divEle = '<div id="container" style="float:left; width: 1100px; height: 1100px; margin: 0 auto"></div>';
      jQuery(divEle).appendTo("#mainDiv");
      //document.getElementById('container').style.display = 'block';
        var options = {
        chart: {
            renderTo: 'container',
            type: 'bubble',
            plotBorderWidth: 1,            
            zoomType: 'xy',
            //reflow: true,
            plotBackgroundImage: '/niku/custom/cx/GDB_Risk_Heatmap.jpg',
         
            //width: 650,
            //height: 650,
            marginRight: 450,
            events: {
                        load: Highcharts.drawTable
                          //plotBackgroundImage: '/niku/custom/cx/GDB_Risk_Heatmap.jpg'
            }
        },
       title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        legend:{
            x: -180,
            y: -450
        },
        exporting: {
          /**buttons: {
                  printButton: {
                          symbol: 'circle'
                  },
                  exportButton: {
                    enabled: true
                  }    
            }*/
            enabled: true
        },
        /**navigation: {
            buttonOptions: {
                height: 40,
                width: 48,
                symbolSize: 24,
                symbolX: 23,
                symbolY: 21,
                symbolStrokeWidth: 2
            }
        },*/        
        xAxis: {
            gridLineWidth: 0,
            tickWidth: 0,
            min: 0,
            max: 10,  
            floor: 0,
            ceiling: 10,
            title: {
                text: 'Risk Impact',
                offset: 60
            },
            labels: {
              enabled: false
              //align: 'center'
              //type: 'category',
              //categories: ['very low', 'low', 'medium', 'high', 'very high'] 
            },
            //type: 'category',
            //categories: ['very low', 'low', 'medium', 'high', 'very high'] 
            //tickmarkPlacement: 'on',
            //showLastLabel: false,
            //endOnTick: true
        },
        yAxis: {
            min: 0,
            max: 10,           
            labels: {
              //rotation: -90,
              //align: 'center'
                enabled: false
            },
            title: {
                text: 'Risk Probability',
                rotation: 270,
                offset: 40
                
            },
            gridLineWidth: 0,
            //type: 'category',
            //categories: ['very low', 'low', 'medium', 'high', 'very high']        
        },
        plotOptions: {
            bubble: {
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    style: { textShadow: 'none' },
                    formatter: function() {
                        return this.point.name;
                    }
                },
                minSize: 30,
                maxSize: 30,
                events: {
                    legendItemClick: function () {
                        return false; 
                    }
                }
            }
        },  
     /**labels: {
            items : [{
                //html : 'Center Me!<br>Row2',
                style : {
                left : '250px',
                top : '50px',
                fontSize : '20px'
                }
            }]
        },*/
        
        series: [
            {
                name: 'Risk',
                color: '#000000',
                marker: {
                    fillColor: 'white',
                    fillOpacity: 1.5
                }
            },
            {
                name: 'New Risk',
                color: '#000000',
                marker: {
                    fillColor: '#00BFFF',
                    //fillColor: 'rgba(47,226,216,0.5)',
                    fillOpacity: 1.5
                }
            },
            {
                name: 'Resolved Risk',
                //color: '#FF8C00',
                color: '#000000',
                marker: {
                    fillColor: 'rgba(255,140,0,0.5)',
                    fillOpacity: 1.5
                }
            },
            {
                name: 'Program relevant',
                color: '#000000',
                marker: {
                    fillColor: '#FFFFFF',
                    lineWidth: 3,
                    fillOpacity: 1.5
                }
            },
            {                  
                color: '#000000',
                marker: {
                    fillColor: '#00BFFF',
                    //fillColor: 'rgba(47,226,216,0.5)',
                    fillOpacity: 1.5,
                    lineWidth: 3
                }
            },
            {                 
                color: '#000000',
                marker: {
                    fillColor: 'rgba(255,140,0,0.5)',
                    fillOpacity: 1.5,
                    lineWidth: 3
                }
            }
        ],
        tooltip: {
            formatter: function() {return ' ' +
                'RiskName: ' + this.point.riskName + '<br />' +
                'RiskID: ' + this.point.name ;
            }
        }      
    }
        
        getData(options, url);   
      
    }
        
    function drawArrow(startX, startY, startRadius, endX, endY, endRadius, width,renderer) {
      rendererCounter = rendererCounter + 1;
        var startX_i = startX;
        var startY_i = startY;
        var endX_i = endX;
        var endY_i = endY;
      
        var angle = Math.PI + Math.atan((endX - startX) / (endY - startY)),
            arrowLength = 3 * width,
            arrowWidth = 1.5 * width,
            path = [],
            startArrowX,
            startArrowY,
            margin = 5;
        if (endY >= startY) {
          //alert('more');
            //correct for circle radius
          /**startX -= ((startRadius + margin) * Math.sin(angle));
            startY -= ((startRadius + margin) * Math.cos(angle));
            endX += ((endRadius + margin) * Math.sin(angle));
        endY += ((endRadius + margin) * Math.cos(angle));*/
            
          
            endX += ((endRadius) * Math.sin(angle));
            endY += ((endRadius) * Math.cos(angle));

            //correct for arrow head length
          //endX += (arrowLength * Math.sin(angle));
          //endY += (arrowLength * Math.cos(angle));

            //draw arrow head
            path.push('M', endX, endY);
            path.push(
                'L',
            endX - arrowWidth * Math.cos(angle),
            endY + arrowWidth * Math.sin(angle));
            path.push(
            endX - arrowLength * Math.sin(angle),
            endY - arrowLength * Math.cos(angle));
            path.push(
            endX + arrowWidth * Math.cos(angle),
            endY - arrowWidth * Math.sin(angle), 'Z');
        } else {
          //alert('less');
            //correct for circle radius
          /**startX += ((startRadius + margin) * Math.sin(angle));
            startY += ((startRadius + margin) * Math.cos(angle));
            endX -= ((endRadius + margin) * Math.sin(angle));
            endY -= ((endRadius + margin) * Math.cos(angle));*/
          
            endX -= ((endRadius+ margin) * Math.sin(angle));
            endY -= ((endRadius+ margin) * Math.cos(angle));
          
                       
            //correct for arrow head length
          //endX -= (arrowLength * Math.sin(angle));
          //endY -= (arrowLength * Math.cos(angle));
          
            //draw arrow head
            path.push('M', endX, endY);
            path.push(
                'L',
            endX + arrowWidth * Math.cos(angle),
            endY - arrowWidth * Math.sin(angle));
            path.push(
            endX + arrowLength * Math.sin(angle),
            endY + arrowLength * Math.cos(angle));
            path.push(
            endX - arrowWidth * Math.cos(angle),
            endY + arrowWidth * Math.sin(angle), 'Z');
        }
      //alert(startX + ':' + startY + ':' + endX + ':' + endY+':'+startX_i + ':'+endX_i+'renderer is'+renderer)
    var path_arr =renderer.path(path)
            .attr({
            'stroke-width': 1,
            stroke: '#989898',
            fill: 'black'
        }).add();
        rendererPaths[rendererCounter] = path_arr;
        var path_len = renderer.path(['M', startX_i, startY_i, 'L', endX_i, endY_i])
            .attr({
            'stroke-width': 1,
            stroke: 'black',
            dashstyle: 'Dash'
        }).add();
        rendererCounter = rendererCounter+1;
        rendererPaths[rendererCounter] = path_len;
    }
    
    function loadRendererData(sortedData){
            dist = 10;
        jQuery.each(sortedData, function(idx, obj) {
              //jQuery.each(obj1, function(idx, obj) {
                              //alert('load');
            dist = dist + 20;
                        var riskID = obj.name;
            var riskMoved = obj.riskMoved;
            var riskName = obj.riskName;
                        var riskType = obj.type;
                        var quadrant = obj.quadrant;
            var previousImpact = obj.previousImpact;
            var previousProbability = 10-obj.previousProbability;
            var impact = obj.x;
            var probability = 10-obj.y;
            var point = obj;
            var x1Value = (previousImpact*plotcellWidth)+plotleft;
            var y1Value = (previousProbability*plotcellHeight)+plottop;
            var x2Value = (impact*plotcellWidth)+plotleft;
            var y2Value = (probability*plotcellHeight)+plottop;
                                
                    
            if(riskMoved == true)
            {       
                drawArrow(x1Value, y1Value, 30, x2Value, y2Value, 30, 5,renderer);
            }
                                
                                
            if(riskType == 'risk'){
                renderer.circle(700, dist, 15).attr({fill: 'white','stroke-width': 1,stroke: 'black',}).add();          
            }else if(riskType == 'new'){
                renderer.circle(700, dist, 15).attr({fill: '#00BFFF','stroke-width': 1,stroke: 'black',}).add();                            
            }else if(riskType == 'resolved'){
                renderer.circle(700, dist, 15).attr({fill: '#FF8C00','stroke-width': 1,stroke: 'black',}).add();                            
            }else if(riskType == 'program'){
                renderer.circle(700, dist, 15).attr({fill: 'white','stroke-width': 2,stroke: 'black',}).add();                            
            }else if(riskType == 'newProgram'){
                renderer.circle(700, dist, 15).attr({fill: '#00BFFF','stroke-width': 2,stroke: 'black',}).add();                            
            }else if(riskType == 'resolvedProgram'){
                renderer.circle(700, dist, 15).attr({fill: '#FF8C00','stroke-width': 2,stroke: 'black',}).add();                            
            }
            
            var riskIDText = '<span style="font-size:8px;vertical-align:bottom">'+riskID+'</span>';
            renderer.text(riskIDText, 695, dist).attr({fontSize: '10px'}).add();
            var bgColor;
            if(quadrant == 1){
                bgColor = 'white';
            }else if(quadrant == 2){
                bgColor = '#FFFF99';
            }else if(quadrant == 3){
                bgColor = '#ffd700';
            }else if(quadrant == 4){
                bgColor = '#ff8c00';
            }else if(quadrant == 5){
                bgColor = '#ff4500';
            }
                                
                              
            var textname = '<div style="width: 350px;font-size:10px;overflow:hidden;padding-left: 2px;border: 1px solid black; border-left: 0;background-color:'+bgColor+'">'+riskName+'</div>';
            renderer.text(textname, 715, dist+5).attr({color: 'red'}).add();
        });
        //});  
    }
    
  
    Highcharts.drawTable = function() {
        var chart = this;
        var renderer = chart.renderer;
        dist = 10;
            
            chart.plotBackgroundImage = '/niku/custom/cx/GDB_Risk_Heatmap.jpg';             
          
        if(sortedData!=null){
            jQuery.each(sortedData, function(idx, obj) {          
             //jQuery.each(obj1, function(idx, obj) {
                                  
                dist = dist + 20;
                var riskID = obj.name;
                var riskMoved = obj.riskMoved;
                var riskName = obj.riskName;
                var riskType = obj.type;
                var quadrant = obj.quadrant;
                var previousImpact = obj.previousImpact;
                var previousProbability = 10-obj.previousProbability;
                var impact = obj.x;
                var probability = 10-obj.y;
                var point = obj;
                var x1Value = (previousImpact*plotcellWidth)+plotleft;
                var y1Value = (previousProbability*plotcellHeight)+plottop;
                var x2Value = (impact*plotcellWidth)+plotleft;
                var y2Value = (probability*plotcellHeight)+plottop;
                                    
                        
                if(riskMoved == true)
                {       
                  //alert('hi ' + riskMoved+'x1Value: '+x1Value+'y1Value: '+y1Value+'x2Value: '+x2Value+'y2Value: '+y2Value);
                    drawArrow(x1Value, y1Value, 30, x2Value, y2Value, 30, 5,renderer);                     
                                  //alert('drawn arrow');
                }
                                    
                                    
                if(riskType == 'risk'){
                    renderer.circle(700, dist, 15).attr({fill: 'white','stroke-width': 1,stroke: 'black',}).add();                  
                }else if(riskType == 'new'){
                    renderer.circle(700, dist, 15).attr({fill: '#00BFFF','stroke-width': 1,stroke: 'black',}).add();                            
                }else if(riskType == 'resolved'){
                    renderer.circle(700, dist, 15).attr({fill: '#FF8C00','stroke-width': 1,stroke: 'black',}).add();                            
                }else if(riskType == 'program'){
                    renderer.circle(700, dist, 15).attr({fill: 'white','stroke-width': 2,stroke: 'black',}).add();                            
                }else if(riskType == 'newProgram'){
                    renderer.circle(700, dist, 15).attr({fill: '#00BFFF','stroke-width': 2,stroke: 'black',}).add();                            
                }else if(riskType == 'resolvedProgram'){
                    renderer.circle(700, dist, 15).attr({fill: '#FF8C00','stroke-width': 2,stroke: 'black',}).add();                            
                }
                var riskIDText = '<span style="font-size:8px;vertical-align:bottom">'+riskID+'</span>';
                renderer.text(riskIDText, 695, dist).attr({fontSize: '10px'}).add();
                var bgColor;
                if(quadrant == 1){
                    bgColor = 'white';
                }else if(quadrant == 2){
                    bgColor = '#FFFF99';
                }else if(quadrant == 3){
                    bgColor = '#ffd700';
                }else if(quadrant == 4){
                    bgColor = '#ff8c00';
                }else if(quadrant == 5){
                    bgColor = '#ff4500';
                }
                    
                                  
                var textname = '<div style="width: 350px;font-size:10px;overflow:hidden;padding-left: 2px;border: 1px solid black; border-left: 0;background-color:'+bgColor+'">'+riskName+'</div>';
                renderer.text(textname, 715, dist+5).attr({color: 'red'}).add();
            });
             //}); 
                  
                  var text11 = '1-2';
                var text12 = '3-4';
                var text13 = '5-6';
                var text14 = '7-8';
                var text15 = '9-10';
                  
                var text21 = 'very low';
                var text22 = 'low';
                var text23 = 'medium';
                var text24 = 'high';
                var text25 = 'very high';
                  
                renderer.text(text11, plotleft+30, 540).attr({color: 'red'}).add();
                renderer.text(text12, plotleft+(cellWidth*1.6)+10, 540).attr({color: 'red'}).add();
                renderer.text(text13, plotleft+(cellWidth*2.6)+20, 540).attr({color: 'red'}).add();
                renderer.text(text14, plotleft+(cellWidth*3.6)+20, 540).attr({color: 'red'}).add();
                renderer.text(text15, plotleft+(cellWidth*4.6)+30, 540).attr({color: 'red'}).add();
          
                renderer.text(text21, plotleft+20, 555).attr({color: 'red'}).add();
                renderer.text(text22, plotleft+(cellWidth*1.6)+10, 555).attr({color: 'red'}).add();
                renderer.text(text23, plotleft+(cellWidth*2.6)+10, 555).attr({color: 'red'}).add();
                renderer.text(text24, plotleft+(cellWidth*3.6)+20, 555).attr({color: 'red'}).add();
                renderer.text(text25, plotleft+(cellWidth*4.6)+20, 555).attr({color: 'red'}).add();
          
                renderer.text(text11, plotleft - 25, (cellWidth*4.7)).attr({color: 'red', rotation: 270}).add();
                renderer.text(text12, plotleft - 25, (cellWidth*3.7)).attr({color: 'red', rotation: 270}).add();
                renderer.text(text13, plotleft - 25, (cellWidth*2.7)).attr({color: 'red', rotation: 270}).add();
                renderer.text(text14, plotleft - 25, (cellWidth*1.7)).attr({color: 'red', rotation: 270}).add();
                renderer.text(text15, plotleft - 25, (cellWidth*0.7)).attr({color: 'red', rotation: 270}).add();
          
                renderer.text(text21, plotleft - 12, (cellWidth*4.7)+10).attr({color: 'red', rotation: 270}).add();
                renderer.text(text22, plotleft - 12, (cellWidth*3.7)).attr({color: 'red', rotation: 270}).add();
                renderer.text(text23, plotleft - 12, (cellWidth*2.7)+5).attr({color: 'red', rotation: 270}).add();
        renderer.text(text24, plotleft - 12, (cellWidth*1.7)).attr({color: 'red', rotation: 270}).add();
        renderer.text(text25, plotleft - 12, (cellWidth*0.7)+10).attr({color: 'red', rotation: 270}).add();
        }    
    } 
    
    function getData(options,url){ 
        
        //url = url + '&dateValue='+dateValue;
        jQuery.getJSON(url).done(function(data) {
          //alert('inside data');
            data1 = data[0];
            data2 = data[1];
            data3 = data[2];
            data4 = data[3];
            data5 = data[4];
            data6 = data[5];   
            completeData = data;
            options.series[0].data = data1; 
            options.series[1].data = data2; 
            options.series[2].data = data3; 
            options.series[3].data = data4; 
            options.series[4].data = data5; 
            options.series[5].data = data6; 
            
            options.series[4].showInLegend = false;
            options.series[5].showInLegend = false;
            
            chart = new Highcharts.Chart(options); 
            renderer = chart.renderer; 
          
            plotleft = chart.plotLeft;
            plottop = chart.plotTop;
            plotwidth = chart.plotWidth;
            plotheight = chart.plotHeight;
            
               
            width = chart.chartWidth;
            height = chart.chartHeight;
            
                plotcellWidth = plotwidth/10;
            plotcellHeight = plotheight/10;
            
            cellWidth = width/10;
            cellHeight = height/10;
        
            var legendItem = chart.legend.legendSymbol;
            var path1 = null;
            sortedData = [];
            var counterArray = 0;
            jQuery.each(completeData, function(idx1, obj1) {          
                jQuery.each(obj1, function(idx, obj) {
                    sortedData[counterArray]= obj;
                    counterArray = counterArray + 1;
                });
            });     
          //alert('leb '+sortedData.length);
                
            sortedData = sortedData.sort(function(a, b) {
                                    return b.quadrant - a.quadrant || b.y - a.y || b.x - a.x;
                                });
                 
                loadRendererData(sortedData);
          //drawTable(completeData);    
          //alert('removing');
          //path.element.remove();  
                    var text11 = '1-2';
                var text12 = '3-4';
                var text13 = '5-6';
                var text14 = '7-8';
                var text15 = '9-10';
                  
                var text21 = 'very low';
                var text22 = 'low';
                var text23 = 'medium';
                var text24 = 'high';
                var text25 = 'very high';
                  
                renderer.text(text11, plotleft+30, 540).attr({color: 'red'}).add();
                renderer.text(text12, plotleft+(cellWidth*1.6)+10, 540).attr({color: 'red'}).add();
                renderer.text(text13, plotleft+(cellWidth*2.6)+20, 540).attr({color: 'red'}).add();
                renderer.text(text14, plotleft+(cellWidth*3.6)+20, 540).attr({color: 'red'}).add();
                renderer.text(text15, plotleft+(cellWidth*4.6)+30, 540).attr({color: 'red'}).add();
          
                renderer.text(text21, plotleft+20, 555).attr({color: 'red'}).add();
                renderer.text(text22, plotleft+(cellWidth*1.6)+10, 555).attr({color: 'red'}).add();
                renderer.text(text23, plotleft+(cellWidth*2.6)+10, 555).attr({color: 'red'}).add();
                renderer.text(text24, plotleft+(cellWidth*3.6)+20, 555).attr({color: 'red'}).add();
                renderer.text(text25, plotleft+(cellWidth*4.6)+20, 555).attr({color: 'red'}).add();
          
                renderer.text(text11, plotleft - 25, (cellWidth*4.7)).attr({color: 'red', rotation: 270}).add();
                renderer.text(text12, plotleft - 25, (cellWidth*3.7)).attr({color: 'red', rotation: 270}).add();
                renderer.text(text13, plotleft - 25, (cellWidth*2.7)).attr({color: 'red', rotation: 270}).add();
                renderer.text(text14, plotleft - 25, (cellWidth*1.7)).attr({color: 'red', rotation: 270}).add();
                renderer.text(text15, plotleft - 25, (cellWidth*0.7)).attr({color: 'red', rotation: 270}).add();
          
                renderer.text(text21, plotleft - 12, (cellWidth*4.7)+10).attr({color: 'red', rotation: 270}).add();
                renderer.text(text22, plotleft - 12, (cellWidth*3.7)).attr({color: 'red', rotation: 270}).add();
                renderer.text(text23, plotleft - 12, (cellWidth*2.7)+5).attr({color: 'red', rotation: 270}).add();
        renderer.text(text24, plotleft - 12, (cellWidth*1.7)).attr({color: 'red', rotation: 270}).add();
        renderer.text(text25, plotleft - 12, (cellWidth*0.7)+10).attr({color: 'red', rotation: 270}).add();
      
        }); 
    }  
  
    jQuery(document).ready(function () {
        /**    
        var chart1 = new Highcharts.Chart({
        chart: {
            renderTo: 'testContainer'
         }
       });
        */      
    });  
