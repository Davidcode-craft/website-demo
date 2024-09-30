
const calendar = document.getElementById('calendar');
const timeSlots = document.getElementById('timeSlots');
const confirmBtn = document.getElementById('confirmBtn');
const countdownDiv = document.getElementById('countdown');
let selectedDate, selectedTime, selectedType;

function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    let calendarHTML = `<table>
        <tr>
            <th colspan="7">${firstDay.toLocaleString('default', { month: 'long' })} ${year}</th>
        </tr>
        <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
        </tr><tr>`;

    for (let i = 0; i < startingDay; i++) {
        calendarHTML += '<td></td>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        if ((day + startingDay - 1) % 7 === 0 && day !== 1) {
            calendarHTML += '</tr><tr>';
        }
        calendarHTML += `<td data-date="${year}-${month+1}-${day}">${day}</td>`;
    }

    calendarHTML += '</tr></table>';
    calendar.innerHTML = calendarHTML;

    // Add event listeners to date cells
    calendar.querySelectorAll('td[data-date]').forEach(cell => {
        cell.addEventListener('click', () => selectDate(cell.dataset.date));
    });
}

function selectDate(date) {
    calendar.querySelectorAll('td').forEach(td => td.classList.remove('selected'));
    calendar.querySelector(`td[data-date="${date}"]`).classList.add('selected');
    selectedDate = date;
    generateTimeSlots();
}

function generateTimeSlots() {
    const slots = ['9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am',
                   '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm', '2:00 pm', '2:30 pm'];
    timeSlots.innerHTML = slots.map(slot => 
        `<div class="time-slot" data-time="${slot}">${slot}</div>`
    ).join('');

    timeSlots.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', () => selectTimeSlot(slot));
    });
}

function selectTimeSlot(slot) {
    timeSlots.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
    slot.classList.add('selected');
    selectedTime = slot.dataset.time;
    confirmBtn.style.display = 'block';
}

document.querySelectorAll('.appointment-type').forEach(type => {
    type.addEventListener('click', () => {
        document.querySelectorAll('.appointment-type').forEach(t => t.classList.remove('selected'));
        type.classList.add('selected');
        selectedType = type.textContent;
    });
});

confirmBtn.addEventListener('click', () => {
    if (selectedDate && selectedTime && selectedType) {
        const appointmentTime = new Date(`${selectedDate} ${selectedTime}`);
        startCountdown(appointmentTime);
        confirmBtn.style.display = 'none';
    } else {
        alert('Please select an appointment type, date, and time.');
    }
});

function startCountdown(appointmentTime) {
    function updateCountdown() {
        const now = new Date();
        const difference = appointmentTime - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            countdownDiv.textContent = `Time until your appointment: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            countdownDiv.textContent = 'Your appointment is now!';
            clearInterval(countdownInterval);
        }
    }

    updateCountdown(); // Initial call
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Initialize calendar with current month
const currentDate = new Date();
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());