dayState = 'day';

function convertToEasternArabicNumerals(num) {
    const easternArabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(digit => easternArabicNumerals[digit]).join('');
}

function updateDayCycle(hour, minute) {
    // Helper function to compare times
    const isTimeInRange = (startHour, startMinute, endHour, endMinute) => {
        const startTime = startHour * 60 + startMinute;
        const endTime = endHour * 60 + endMinute;
        const currentTime = hour * 60 + minute;
        return currentTime >= startTime && currentTime < endTime;
    };

    // Check each time range and set partOfDay and dayState
    if (isTimeInRange(5, 0, 6, 40)) {
        return ['الفجر', 'fajr']; // Dawn
    } else if (isTimeInRange(6, 40, 7, 0)) {
        return ['الشروق', 'sunrise']; // Sunrise
    } else if (isTimeInRange(7, 0, 11, 40)) {
        return ['الصباح', 'sobo7']; // Morning
    } else if (isTimeInRange(11, 40, 14, 30)) {
        return ['الظهر', 'dohor']; // Noon
    } else if (isTimeInRange(14, 30, 16, 45)) {
        return ['العصر', 'asr']; // Afternoon
    } else if (isTimeInRange(16, 45, 18, 15)) {
        return ['المغرب', 'sunset']; // Evening
    } else if (isTimeInRange(18, 15, 21, 0)) {
        return ['العشاء', 'Ishaa']; // Dinner
    }  else if (isTimeInRange(21, 0, 23, 59)) {
        return ['ليل نهاية اليوم', 'night']; // Night 1
    }  else {
        return ['ليل بداية اليوم', 'night']; // Night 2
    }
}

function updateDateTime() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const dayCycleElement = document.getElementById('dayCycle');
    const dayCycleTextElement = document.getElementById('dayCycleText');
    const dashboard = document.getElementById('dashboard');

    var hours = now.getHours();
    var minute = now.getMinutes();

    // Convert to 12-hour format without AM/PM
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Pad single digit minutes with a leading zero
    minute = minute < 10 ? '0' + minute : minute;

    // Convert to Eastern Arabic numerals
    var timeString = convertToEasternArabicNumerals(hours) + ':' + 
                    convertToEasternArabicNumerals(minute);

    // Update time and date
    // timeElement.textContent = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    timeElement.textContent = timeString;
    dateElement.textContent = now.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Update day/night cycle
    const hour = now.getHours();
    const minutes = now.getMinutes();
    
    // --------------------
    // | Test Time of day |
    // --------------------
    // dashboard.classList.remove('day');
    // dashboard.classList.add('sunrise');
    // partOfDay = 'الفجر';
    
    // dashboard.classList.remove('day');
    // dashboard.classList.add('sunset');
    // partOfDay = 'مساء'; 
    
    // dashboard.classList.add('day');
    // partOfDay = 'صباح'; // Morning
    
    // dashboard.classList.remove('day');
    // dashboard.classList.add('night');
    // partOfDay = 'ليل'; // Night

    // Update day phase
    const [partOfDay, dayState] = updateDayCycle(hour, minutes);

    dayCycleTextElement.textContent = partOfDay;

    switch (dayState) {
        case 'fajr':
            dashboard.classList.remove('night');
            dashboard.classList.remove('day');
            dashboard.classList.remove('sunrise');
            dashboard.classList.remove('sunset');
            dashboard.classList.remove('sobo7');
            dashboard.classList.remove('dohor');
            dashboard.classList.remove('asr');
            dashboard.classList.remove('Ishaa');

            dashboard.classList.add('fajr');
            break;

        case 'sunrise':
            dashboard.classList.remove('night');
            dashboard.classList.remove('day');
            dashboard.classList.remove('fajr');
            dashboard.classList.remove('sunset');
            dashboard.classList.remove('sobo7');
            dashboard.classList.remove('dohor');
            dashboard.classList.remove('asr');
            dashboard.classList.remove('Ishaa');

            dashboard.classList.add('sunrise');
            break;
        
        case 'sobo7':
            dashboard.classList.remove('night');
            dashboard.classList.remove('day');
            dashboard.classList.remove('sunrise');
            dashboard.classList.remove('sunset');
            dashboard.classList.remove('fajr');
            dashboard.classList.remove('dohor');
            dashboard.classList.remove('asr');
            dashboard.classList.remove('Ishaa');

            dashboard.classList.add('sobo7');
            break;
            
        case 'dohor':
            dashboard.classList.remove('night');
            dashboard.classList.remove('day');
            dashboard.classList.remove('sunrise');
            dashboard.classList.remove('sunset');
            dashboard.classList.remove('sobo7');
            dashboard.classList.remove('fajr');
            dashboard.classList.remove('asr');
            dashboard.classList.remove('Ishaa');

            dashboard.classList.add('dohor');
            break;
        
        case 'asr':
            dashboard.classList.remove('night');
            dashboard.classList.remove('day');
            dashboard.classList.remove('sunrise');
            dashboard.classList.remove('sunset');
            dashboard.classList.remove('sobo7');
            dashboard.classList.remove('dohor');
            dashboard.classList.remove('fajr');
            dashboard.classList.remove('Ishaa');

            dashboard.classList.add('asr');
            break;

        case 'sunset':
            dashboard.classList.remove('night');
            dashboard.classList.remove('day');
            dashboard.classList.remove('sunrise');
            dashboard.classList.remove('fajr');
            dashboard.classList.remove('sobo7');
            dashboard.classList.remove('dohor');
            dashboard.classList.remove('asr');
            dashboard.classList.remove('Ishaa');

            dashboard.classList.add('sunset');
            break;

        case 'Ishaa':
            dashboard.classList.remove('fajr');
            dashboard.classList.remove('day');
            dashboard.classList.remove('sunrise');
            dashboard.classList.remove('sunset');
            dashboard.classList.remove('sobo7');
            dashboard.classList.remove('dohor');
            dashboard.classList.remove('asr');
            dashboard.classList.remove('fajr');

            dashboard.classList.add('Ishaa');
            break;

        case 'night':
            dashboard.classList.remove('fajr');
            dashboard.classList.remove('day');
            dashboard.classList.remove('sunrise');
            dashboard.classList.remove('sunset');
            dashboard.classList.remove('sobo7');
            dashboard.classList.remove('dohor');
            dashboard.classList.remove('asr');
            dashboard.classList.remove('Ishaa');

            dashboard.classList.add('night');
            break;
        
        // Day
        case 'day':
        default:
            dashboard.classList.remove('night');
            dashboard.classList.remove('fajr');
            dashboard.classList.remove('sunrise');
            dashboard.classList.remove('sunset');
            dashboard.classList.remove('sobo7');
            dashboard.classList.remove('dohor');
            dashboard.classList.remove('asr');
            dashboard.classList.remove('Ishaa');

            dashboard.classList.add('day');
            break;
    }

    // Update every minute
    setTimeout(updateDateTime, 1000);
}

updateDateTime();
