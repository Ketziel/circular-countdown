/*------------------------------
	Richard Wills - @_Ketziel
------------------------------*/
				

Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}
 
Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}
 
window.onload = function () {

		var startDate = new Date("November 22 , 2013 00:00:00");
		var endDate = new Date("December 30, 2013 23:59:59");
		
		if(startDate >= endDate ){endDate.setDate(endDate.getDate() + 1);}    

		var totalDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime())/(24*60*60*1000)));
		
		var scale = 100;
		var halfScale = scale/2;
		var timerScale = halfScale - 10;
		var stroke = 7;
		var fontSize =Math.round(scale*0.1133);
		
		var backgroundOpacity = 0.8;
		
		
		$(".countdown").css('font-size',(fontSize + 'px'));
		
			var seconds = 0;
			var minutes = 0;
			var hours = 0;
			var days = 0;

			var secondsColour = "#FEDF60";
			var minutesColour = "#9FDB83";
			var hoursColour = "#4090FF";
			var daysColour = "#FF6C65";
		
		

		function calcArc (xloc, yloc, value, total, R) {
						var alpha = 360 / total * value,
										a = (90 - alpha) * Math.PI / 180,
										x = xloc + R * Math.cos(a),
										y = yloc - R * Math.sin(a),
										path;
						if (total == value) {
										path = [
														["M", xloc, yloc - R],
														["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
										];
						} else {
										path = [
														["M", xloc, yloc - R],
														["A", R, R, 0, +(alpha > 180), 1, x, y]
										];
						}
						return {
										path: path
						};
		};



		// Custom Arc Attribute, position x&y, value portion of total, total value, Radius
		var sec = Raphael("seconds", scale, scale);
		sec.customAttributes.arc = calcArc;
		
		var min = Raphael("minutes", scale, scale);
		min.customAttributes.arc = calcArc;                                                        
		
		var hrs = Raphael("hours", scale, scale);
		hrs.customAttributes.arc = calcArc;
		
		var dys = Raphael("days", scale, scale);
		dys.customAttributes.arc = calcArc;

		//make an arc at 50,50 with a radius of 30 that grows from 0 to 40 of 100 with a bounce
		var sec_arc = sec.path().attr({
						"stroke": secondsColour,
						"stroke-width": stroke,
						arc: [halfScale, halfScale, seconds, 60, timerScale]
		});

		var sec_arc_back = sec.path().attr({
						"stroke": "#000",
						"stroke-opacity": backgroundOpacity,
						"stroke-width": (stroke + 2),
						arc: [halfScale, halfScale, 100, 100, timerScale]
		});
		
		var sec_center = sec.circle(halfScale,halfScale,(halfScale - 20));
		sec_center.attr({fill: "#000","opacity": backgroundOpacity});
		
		
		//make an arc at 50,50 with a radius of 30 that grows from 0 to 40 of 100 with a bounce
		var min_arc = min.path().attr({
						"stroke": minutesColour,
						"stroke-width": stroke,
						arc: [halfScale, halfScale, minutes, 60, timerScale]
		});
		
		var min_arc_back = min.path().attr({
						"stroke": "#000",
						"stroke-opacity": backgroundOpacity,
						"stroke-width": (stroke + 2),
						arc: [halfScale, halfScale, 100, 100, timerScale]
		});
		
		
		var min_center = min.circle(halfScale,halfScale,(halfScale - 20));
		min_center.attr({fill: "#000","opacity": backgroundOpacity});
		
		//make an arc at 50,50 with a radius of 30 that grows from 0 to 40 of 100 with a bounce
		var hrs_arc = hrs.path().attr({
						"stroke": hoursColour,
						"stroke-width": stroke,
						arc: [halfScale, halfScale, hours, 24, timerScale]
		});                                                           
		
		var hrs_arc_back = hrs.path().attr({
						"stroke": "#000",
						"stroke-opacity": backgroundOpacity,
						"stroke-width": (stroke + 2),
						arc: [halfScale, halfScale, 100, 100, timerScale]
		});
		

		var hrs_center = hrs.circle(halfScale,halfScale,(halfScale - 20));
		hrs_center.attr({fill: "#000","opacity": backgroundOpacity});
		
		
		//make an arc at 50,50 with a radius of 30 that grows from 0 to 40 of 100 with a bounce
		var dys_arc = dys.path().attr({
						"stroke": daysColour,
						"stroke-width": stroke,
						arc: [halfScale, halfScale, days, totalDays, timerScale]
		});
		
		var dys_arc_back = dys.path().attr({
						"stroke": "#000",
						"stroke-opacity": backgroundOpacity,
						"stroke-width": (stroke + 2),
						arc: [halfScale, halfScale, 100, 100, timerScale]
		});
		
		
		var dys_center = dys.circle(halfScale,halfScale,(halfScale - 20));
		dys_center.attr({fill: "#000","opacity": backgroundOpacity});
		
		sec_arc_back.toBack();
		min_arc_back.toBack();
		hrs_arc_back.toBack();
		dys_arc_back.toBack();
		
								 
						countdown();
														
	function countdown() {
		var now = new Date();
		if (now.dst()){ var timeZone = now.getTimezoneOffset() + 60;
			} else {var timeZone = now.getTimezoneOffset();}
		
		var timeDiff = endDate.getTime() - now.getTime()  - (timeZone * 60 * 1000);

		if (timeDiff <= 0) {
			$('#countdown-container').hide();
			clearTimeout(timer);
		}
		var seconds = Math.floor(timeDiff / 1000);
		var minutes = Math.floor(seconds / 60);
		var hours = Math.floor(minutes / 60);
		var days = Math.floor(hours / 24);
		hours %= 24;
		minutes %= 60;
		seconds %= 60;
		document.getElementById("daysBox").innerHTML = days;
		document.getElementById("hoursBox").innerHTML = hours;
		document.getElementById("minsBox").innerHTML = minutes;
		document.getElementById("secsBox").innerHTML = seconds;

		sec_arc.attr({arc: [halfScale, halfScale, seconds, 60, timerScale]});
		min_arc.attr({arc: [halfScale, halfScale, minutes, 60, timerScale]});
		hrs_arc.attr({arc: [halfScale, halfScale, hours, 24, timerScale]});
		dys_arc.attr({arc: [halfScale, halfScale, days, totalDays, timerScale]});
		var timer = setTimeout(arguments.callee,1000);
		}
													
		function ticTimers(){

		var secondsValue = 1.666666666666667;
		
		secondsPlace -= secondsValue;
		if (secondsPlace < 0) {secondsPlace = 100;}
		if (secondsPlace < 0.009){secondsPlace = 0;}
		
		sec_arc.attr({arc: [halfScale, halfScale, secondsPlace, 100, timerScale]});
	 
	 }                           
};
