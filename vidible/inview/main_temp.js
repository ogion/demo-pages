(function () {
    var $ = jQuery;
    amplify.request.define("aol.search", "ajax", {
        url: "http://api.5min.com/search/{search}/videos.json?sid=577&num_of_videos=50",
        dataType: "jsonp",
        method: "GET",
        cache: true
    });
    amplify.request.define("aol.videogroup", "ajax", {
        url: "http://api.5min.com/video/list//info.json?sid=577&num_of_videos=100&video_group_id={search}",
        dataType: "jsonp",
        method: "GET",
        cache: true
    });

    var searchTerm = $(".videoWidget").attr('data-title');//'Ariana Grande';
    var rankMultiplier = Number($(".videoWidget").attr('data-multiplier'));//2.6;

	var queryType = $(".videoWidget").attr('data-queryType');
	var term = $(".videoWidget").attr('data-term');  //157522;
	
    //'157522'/*'157520'*/

    amplify.request({
        resourceId: "aol."+queryType,
            data: {
                search: term
            },
            success: function(data) {
                createStub(data);
            },
            error: function(message) {
                console.log(message);
            }
        }
    );
    
        jQuery(".widgetTitle span").html(searchTerm);
    
    
/*
    function createStub(data) {

        var graphData = [];

        var date = new Date(2013, 10, 1);
        var today = new Date();
        var i = 0;
        while (i++ < 12) {

            graphData[i] = [];
        }
        ;

        $.each(data.items, function(idx, el) {
            var dt = new Date(el.pubDate.split(' ')[0]);
            //  console.log(dt,el.pubDate);
            graphData[dt.getMonth()] = graphData[dt.getMonth()] || [];
            graphData[dt.getMonth()].push(el);
        });


        var resArr = [];

        date = new Date(2013, 10, 1);
        i = 0;
        while (i++ < 12) {

            resArr.push({ date: i+'', rank: graphData[i].length, videos: graphData[i] });
        }
        ;

        drawVisualization2(resArr);
    }
    */
    function createStub(data) {

        var graphData = [];

        var minDate = new Date();
        var maxDate = new Date();
        var totalViews = 0;

        _.each(data.items, function (el) {
            totalViews += el.views;
            var ddate = new Date(el.pubDate.split(' ')[0]);
            if (minDate > ddate) {
                minDate = ddate;
            }
        });

        var date = minDate; // new Date(2013, 10, 1);
        var today = new Date();

        var xAxisType = 1;
        var maxIndex = 31;
        var text = '';
        if (date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
            //create days graph
            xAxisType = 1;
            maxIndex = 31;
        } else if (((today - date) / 86400000) <= 90) {
            //create weeks graph
            xAxisType = 2;
            maxIndex = ((today - date) / (86400000 * 7) + 1);
            text = 'week';
        } else {
            //create months graph
            xAxisType = 3;
            maxIndex = ((today - date) / (86400000 * 30) + 1);
            text = 'month';
        }

        var i = 0;

        while (i++ <= maxIndex) {

            graphData[text + i] = [];
        }
        ;

        var numOfVideos = data.items.length;

        _.each(data.items, function (el) {
            var index;
            var dt = new Date(el.pubDate.split(' ')[0]);

            switch (xAxisType) {
                case 1:
                    {//date
                        index = (dt - minDate) / 86400000;
                    }
                    break;
                case 2:
                    {//1st day of the week date
                        index = (dt - minDate) / (86400000 * 7);
                    }
                    break;
                case 3:
                    {//dec 09
                        index = (dt - minDate) / (86400000 * 30);
                    }
                    break;
            }

            index = index.toFixed();
            //  console.log(dt,el.pubDate);
            graphData[text + index] = graphData[text + index] || [];
            graphData[text + index].push(el);

            //graphData[dt.getMonth()] = graphData[dt.getMonth()] || [];
            //graphData[dt.getMonth()].push(el);
        });


        var resArr = [];

        //date = new Date(2013, 10, 1);

        for (var i = 0; i <= maxIndex; i++) {
            var viewsPerDate = 0;
            var stringDate = '';
            _.each(graphData[text + i], function (el) {
                viewsPerDate += el.views;
                if (stringDate == '') {
                    var dt = new Date(el.pubDate.split(' ')[0]);

                    stringDate = getDateRepresentation(dt, xAxisType);
                }

            });

            var calculatedRank = calcRank(viewsPerDate, totalViews, graphData[text + i].length, numOfVideos);
            resArr.push({ date: stringDate, ddate: text + i + '', rank: calculatedRank, videos: graphData[text + i] });
        }
        /*
        i = 0;
        while (i++ < 12) {

        resArr.push({ date: i + '', rank: graphData[i].length, videos: graphData[i] });
        }
        ;
        */
        console.log(graphData);
        console.log(resArr);
        drawVisualization2(resArr);
    }

    function getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }


    function getDateRepresentation(dateObj, xAxisType) {

        var stringDate = ''
        switch (xAxisType) {
            case 1:
                {//date
                    //index = (dt - minDate) / 86400000;
                    stringDate = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + (dateObj.getYear() - 100);
                }
                break;
            case 2:
                {//1st day of the week date
                    stringDate = getMonday(dateObj).getDate() + '/' + (dateObj.getMonth() + 1) + '/' + (dateObj.getYear() - 100);
                    //index = (dt - minDate) / (86400000 * 7);
                }
                break;
            case 3:
                {//dec 09
                    stringDate = getMonthName(dateObj.getMonth()) + ' ' + (dateObj.getYear() - 100);
                    //index = (dt - minDate) / (86400000 * 30);
                }
                break;
        }
        return stringDate;
    }

    function calcRank(views, totalViews, numVideos, totalVideos) {
        //return ((views / totalViews) + (numVideos));
        return (((views / totalViews) + (numVideos / totalVideos)) / 2) * 210;
    }
    function drawVisualization2(dataObject) {
     /*   var arr = [];
        arr.push(['date', 'rank']);
        _.each(dataObject, function(el) {
            arr.push([el.date, el.rank]);
        });
        */
        var sizeObj = {
            height: 210,
            width: 520
        };

        drawVisualization(dataObject, sizeObj);
        drawThumbnails(dataObject, sizeObj);
    }

    function drawThumbnails(dataObj, sizeObj) {
        var tContainer = $("#thumbnails");
        var paddingLeft = 00;
        var paddingTop = 80;
        _.each(dataObj, function (el, idx) {
            var addedClass = el.videos.length > 4 ? ' cloudly ' : '';
            var divEl = $("<div class='tContainer " + addedClass + (el.videos.length > 0 ? '' : 'hidden') + "' style='left:" + (Number(paddingLeft) + Number(idx * sizeObj.width / (dataObj.length - 1))) + "px;top:-" + (paddingTop + el.rank * rankMultiplier) + "px;' ><span class='clouds'></span></div>");
            divEl.attr('data-count', el.videos.length);
            var img = $("<img/>");
            if (el.videos.length > 0) {
                
                img.attr('src', alterThumbnail(el.videos[0].thumbnails[0].url,30,30));
            }
            var titleSpan = $("<span class='thumbTitle'>" + (el.videos.length > 0 ? el.videos[0].title:'')+ "</span>")
            divEl.append(titleSpan);
            divEl.append(img);
            tContainer.append(divEl);
            
            $(divEl).bind('click', function (e) {
                var vidObj = el.videos[0];

                var showPlayer = function() {
                    var player = new PlayerSeed("playerHolder");
                    player.playList = vidObj.id;
                    player.sid = 577;
                    player.width = 427;
                    player.height = 290;
                    //  player.autoStart = true;
                    $("#playerHolder").empty();
                    player.Load();
                    $(".closeBtn").click(function(e) {
                        $.colorbox.close();
                    })
                };
               
              
                jQuery.colorbox({ opacity:.85, onComplete: _.bind(showPlayer), html: "<div class='fiveminlb'><div class='closeBtn'>X</div><span class='ttl'>" + vidObj.title + "</span><div class='playerArea'> <div id='playerHolder'></div></div><div class='videoInfo'><span class='desc'>" + vidObj.description + "</span><span class='pubdate'>" + vidObj.pubDate + "</span></div></div>", closeButton: false });
            })
        });
    }

    function getMonthName(month) {
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return monthNames[month];
    }

   function alterThumbnail  (thumbnail, width, height) {
        if (thumbnail == null || typeof (thumbnail) == 'undefined' || thumbnail.length == 0)
            return '';
        var thumbArray = thumbnail.split(".");
        thumbArray[thumbArray.length - 2] = thumbArray[thumbArray.length - 2].split('_')[0] + '_'+thumbArray[thumbArray.length - 2].split('_')[1] + "_" + width + "_" + height;

        return thumbArray.join('.');
    }

    function drawVisualization(resArr,sizeObj) {
        // Create and populate the data table.
        var dataTable = new google.visualization.DataTable();
        //var dataTable = google.visualization.arrayToDataTable(resArr);
        dataTable.addColumn('string', 'Date');
        dataTable.addColumn('number', 'Rank');
     //   dataTable.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });

        _.each(resArr, function (el) {
            var thumbnail = el.videos.length>0 ? alterThumbnail(el.videos[0].thumbnails[0].url, 50, 50) : '';
            dataTable.addRow([el.date, el.rank]);/*, '<div style=""><img src="' + thumbnail + '"/></div>'*/
        });
        // Create and draw the visualization.
        new google.visualization.AreaChart(document.getElementById('visualization')).
            draw(dataTable, {
                    curveType: "function",
                    width: sizeObj.width,
                    height: sizeObj.height,
                    vAxis: {
                        maxValue: 10, minValue: 0,
                        gridlines: {
                            color: 'transparent'
                        }, viewWindowMode: 'explicit',
                        viewWindow: {
                            //max: 180,
                            min: 0,
                        }
                    },
                    tooltip: { isHtml: true, trigger: 'none' },/**/
                    focusTarget: 'Date',
                    backgroundColor: '#ececec',
                    chartArea: { 'width': '100%', 'height': '80%' },
                    colors: ['#0190ee'],
                    areaOpacity: 1, animation: {
                        easing: 'inAndOut',
                    },
                    series: {
                        0: { color: '#0190ee', lineWidth: 4, pointSize: 0, visibleInLegend: false }
                    }
                }
            );
        $(".tContainer").live('mouseOver',function(e) {
            $(e.target).closest('.tContainer').css({zIndex:9999})
        })
       
    }


})();