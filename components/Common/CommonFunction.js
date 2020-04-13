
export function convertDateTimeToDate(inputString){
    return inputString.substring(8,10)+'-'+inputString.substring(5,7)+'-'+inputString.substring(0,4);
}

export function convertDateTimeToTime(inputString){
    return inputString.substring(11,13)+':'+inputString.substring(14,16);
}

export function convertDateAndTimeToDateTime(inputDate,inputTime){
    return inputDate.substring(6,10)+'-'+inputDate.substring(3,5)+'-'+inputDate.substring(0,2)+'T'+inputTime+':00.000+0000'
}
export function getApiUrl(){
    return "http://192.168.1.11:8080";
}

export function getStateName(status){
    switch (status) {
        case 'pending':
            return 'Đang đợi y tá nhận đơn';
            break;
        case 'coordinatorlostsample':
            return 'Đang đợi y tá nhận đơn';
            break;
        case 'accepted':
            return 'Đang đợi lấy mẫu';
            break;
        case 'transporting':
            return 'Đang vận chuyển mẫu';
            break;
        case 'lostsample':
            return 'Đang đợi lấy lại mẫu';
            break;
        case 'waitingforresult':
            return 'Đang đợi kết quả';
            break;
        case 'closed':
            return 'Đã xong';
            break;
        
        } 
    }


export function getAppointmentStateName(status){
    switch (status) {
        case 'pending':
            return 'Đơn đang đợi xử lý';
            break;
        case 'accepted':
            return 'Đơn đã được chấp nhận';
            break;
        case 'canceled':
            return 'Đơn đã hủy';
            break;
        
        } 
    }



export function getStateColor(status){
        switch (status) {
        case 'pending':
            return '#ffd66f';
            break;
        case 'coordinatorlostsample':
            return '#ffd66f';
            break;
        case 'accepted':
            return '#a4d57b';
            break;
        case 'transporting':
            return '#a4d57b';
            break;
        case 'lostsample':
            return '#a4d57b';
            break;
        case 'waitingforresult':
            return '#6398d6';
            break;
        case 'closed':
            return '#000';
            break;
        
        } 
    }