/**
 * Created by Mani on 30-04-2016.
 */
define(['../coreModule'], function (coreModule) {
    return coreModule.service('GenericService', ['$filter',function ($filter) {
        var genericService = {};
        
        genericService.getScheduleString=function(schedule) {
            var schedulesStr=[];
            console.log(JSON.stringify(schedule));
            angular.forEach(schedule,function (timeSpec) {
                var scheduleStr="";
                switch(timeSpec.recurringType){
                    case 'Once':
                        scheduleStr+=$filter('date')(timeSpec.startDate,'dd-MMM-yyyy')+" ";
                        break;          
                    case 'Daily':
                        if(timeSpec.terminator.endDate!=null)
                            scheduleStr+="From "  +  $filter('date')(timeSpec.startDate,'dd-MMM-yyyy')+" to " +$filter('date')(timeSpec.terminator.endDate,'dd-MMM-yyyy')+" ";
                        else
                            scheduleStr+="From " + $filter('date')(timeSpec.startDate,'dd-MMM-yyyy') + " onwards, ";
                        scheduleStr+="everyday ";
                        break;
                    case 'Weekly':
                        scheduleStr+="Weekly on "+JSON.stringify(genericService.getRepeatIntervalString(timeSpec.repeatIntervals));
                        break;
                    case 'Monthly' :
                        scheduleStr+="Weekly on "+JSON.stringify(genericService.getRepeatIntervalString(timeSpec.repeatIntervals));
                        break;
                    case 'WeeklyMonthly':
                        scheduleStr+="Weekly on "+JSON.stringify(genericService.getRepeatIntervalString(timeSpec.repeatIntervals));
                        break;
                }
                var count=0;
                 angular.forEach(timeSpec.timeSlots,function (timeslot) {
                    if(count == 0)
                        scheduleStr+= timeslot.sTime + "-" + timeslot.eTime;
                    else
                        scheduleStr+= " and " + timeslot.sTime + "-" + timeslot.eTime;
                    count++;
                })
                       
                console.log(scheduleStr);
                schedulesStr.push(scheduleStr);
            })
            return schedulesStr;
        };
        genericService.getScheduleFromBusiness=function (bSchedule) {
            var resultSchedule=[];
            angular.forEach(bSchedule,function (schedule) {
                var newSchedule={};
                newSchedule.recurringType=schedule.recurringType;
                newSchedule.repeatIntervals=schedule.repeatIntervals;
                newSchedule.startDate=$filter('date')(schedule.startDate,"yyyy-MM-dd");
                newSchedule.terminator={};
                newSchedule.terminator.noOfOccurances=schedule.noOfOccurances;
                if(schedule.endDate!=null)
                    newSchedule.terminator.endDate=$filter('date')(schedule.endDate,"yyyy-MM-dd");
                newSchedule.timeSlots=schedule.timeSlots;
                resultSchedule.push(newSchedule);
            })
            return resultSchedule;
        };
        genericService.getRepeatIntervalString=function (rptIntervals) {
            var days=[];
            angular.forEach(rptIntervals,function (selIndex) {
                if(!isNaN(selIndex))
                    selIndex=""+selIndex;
                switch(selIndex){
                    case "1" : days.push("Sun");break;
                    case "2" : days.push("Mon");break;
                    case "3" : days.push("Tue");break;
                    case "4" : days.push("Wed");break;
                    case "5" : days.push("Thu");break;
                    case "6" : days.push("Fri");break;
                    case "7" : days.push("Sat");break;
                }
            });
            return days.toString(); 
        };
        genericService.getOperators=function (type) {
            if(type=='Date')
                return [{"name":"eq","value":"eq"},{"name":"neq","value":"neq"},{"name":"ge","value":"ge"},{"name":"le","value":"le"}];
            return [{"name":"eq","value":"eq"},{"name":"neq","value":"neq"},{"name":"like","value":"like"}];
        };
        genericService.getList=function (value) {
            if(value=='timePeriod')
                return ["Today","Week","Month"];
            if(value=='doctor')
                return ["Manikandan","Leonora","Nithesh"]
            return ["no result"]; 
        };
        return genericService;
    }])
});