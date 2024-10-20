// Select Elements
const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');

// Local storage key for habits
const HABITS_KEY = 'habits';

// Load habits from local storage on page load
document.addEventListener('DOMContentLoaded', loadHabits);

// Add habit event listener
addHabitBtn.addEventListener('click', addHabit);

// Function to add a habit
function addHabit() {
    const habitText = habitInput.value.trim();
    if (habitText === '') return;

    const habits = getHabits();
    const habit = {
        text: habitText,
        completedDays: 0,
        timesPerDay: 0 // Track number of times completed per day
    };
    habits.push(habit);
    saveHabits(habits);

    habitInput.value = '';
    displayHabits();
}

// Function to display habits
function displayHabits() {
    const habits = getHabits();
    habitList.innerHTML = '';
    habits.forEach((habit, index) => {
        const li = document.createElement('li');
        
        const habitText = document.createElement('span');
        habitText.textContent = habit.text;

        // Display for completed days and times per day
        const completedInfo = document.createElement('span');
        completedInfo.innerHTML = `
            <strong>Days:</strong> ${habit.completedDays} | 
            <strong>Times Today:</strong> ${habit.timesPerDay}
        `;
        completedInfo.classList.add('completed-info');

        // Button to mark a day as completed
        const completeDayBtn = document.createElement('button');
        completeDayBtn.textContent = 'Mark Day Completed';
        completeDayBtn.classList.add('complete-btn');
        completeDayBtn.addEventListener('click', () => markDayCompleted(index));

        // Button to add a time completed for the day
        const addTimeBtn = document.createElement('button');
        addTimeBtn.textContent = 'Add Time Today';
        addTimeBtn.classList.add('add-time-btn');
        addTimeBtn.addEventListener('click', () => addTimeForDay(index));

        // Clear button to reset both days and times per day
        const clearBtn = document.createElement('button');
        clearBtn.textContent = 'Clear';
        clearBtn.classList.add('clear-btn');
        clearBtn.addEventListener('click', () => clearHabit(index));

        // Habit actions container
        const actions = document.createElement('div');
        actions.classList.add('habit-actions');
        actions.appendChild(completeDayBtn);
        actions.appendChild(addTimeBtn);
        actions.appendChild(clearBtn);

        // Append elements to list item
        li.appendChild(habitText);
        li.appendChild(completedInfo);
        li.appendChild(actions);

        habitList.appendChild(li);
    });
}

// Function to mark a day as completed
function markDayCompleted(index) {
    const habits = getHabits();
    habits[index].completedDays++;
    habits[index].timesPerDay = 0; // Reset times per day when a new day starts
    saveHabits(habits);
    displayHabits();
}

// Function to add time for the current day
function addTimeForDay(index) {
    const habits = getHabits();
    habits[index].timesPerDay++;
    saveHabits(habits);
    displayHabits();
}

// Function to clear habit tally (reset both days and times per day)
function clearHabit(index) {
    const habits = getHabits();
    habits[index].timesPerDay = 0;
    habits[index].completedDays = 0;
    saveHabits(habits);
    displayHabits();
}

// Helper function to get habits from local storage
function getHabits() {
    const habits = localStorage.getItem(HABITS_KEY);
    return habits ? JSON.parse(habits) : [];
}

// Helper function to save habits to local storage
function saveHabits(habits) {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
}

// Load and display habits when the page is loaded
function loadHabits() {
    displayHabits();
}
