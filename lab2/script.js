    const defaultGoals = [
        { id: 1, title: "Здати лабораторну", deadline: "цього тижня", tasks: ["Зверстати HTML/CSS", "Написати JavaScript"], completed: false },
        { id: 2, title: "Організувати ІТ-мітап", deadline: "наступний місяць", tasks: ["Знайти спікерів", "Забронювати локацію"], completed: false }
    ];

    let goals = JSON.parse(localStorage.getItem('focusBuddyGoals')) || defaultGoals;
    let currentFilter = 'all'; 

    function saveGoals() {
        localStorage.setItem('focusBuddyGoals', JSON.stringify(goals));
        updateMainProgress();
        drawProgressChart();


    }

    function initTheme() {
        const isDark = localStorage.getItem('focusBuddyDarkTheme') === 'true';
        if (isDark) document.body.classList.add('dark-theme');

        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.innerText = isDark ? 'Світла тема' : 'Темна тема';


            toggleBtn.addEventListener('click', () => {


                document.body.classList.toggle('dark-theme');

                const darkActive = document.body.classList.contains('dark-theme');

                localStorage.setItem('focusBuddyDarkTheme', darkActive);

                toggleBtn.innerText = darkActive ? 'Світла тема' : 'Темна тема';

                drawProgressChart(); 

            });
        }
    }

    function renderGoals() {
        const container = document.getElementById('goals-container');
        if (!container) return;

        let filteredGoals = goals;
        if (currentFilter === 'active') filteredGoals = goals.filter(g => !g.completed);


        if (currentFilter === 'completed') filteredGoals = goals.filter(g => g.completed);

        const goalsHTML = filteredGoals.map(goal => {
            const tasksHTML = goal.tasks.map(task => `<li>${task}</li>`).join('');
            const statusClass = goal.completed ? 'completed' : '';
            const btnText = goal.completed ? 'Відновити' : 'Виконано';
            const btnClass = goal.completed ? '' : 'done-btn';

            return `
                <article class="card ${statusClass}">
                    <h3>${goal.title}</h3>
                    <p><strong>Дедлайн:</strong> ${goal.deadline}</p>
                    <ul>${tasksHTML}</ul>
                    <div class="card-actions">
                        <button class="${btnClass}" onclick="toggleGoal(${goal.id})">${btnText}</button>
                        <button class="delete-btn" onclick="deleteGoal(${goal.id})">    Видалити</button>
                    </div>
                </article>
            `;


        }).join('');

        container.innerHTML = goalsHTML || '<p>Цілей не знайдено.</p>';
    }

    window.setFilter = function(filterType) {
        currentFilter = filterType;
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`filter-${filterType}`).classList.add('active');
        renderGoals();
    }

    function toggleGoal(id) {
        goals = goals.map(goal => goal.id === id ? { ...goal, completed: !goal.completed } : goal);
        saveGoals();


        renderGoals();


    }

    function deleteGoal(id) {
        if (confirm("Точно видалити цю ціль?")) {
            goals = goals.filter(goal => goal.id !== id);
            saveGoals();
            renderGoals();


        }
    }

    function updateMainProgress() {
        const fill = document.getElementById('main-progress-fill');
        const text = document.getElementById('main-progress-text');
        if (!fill || !text) return;

        if (goals.length === 0) {
            fill.style.width = '0%';
            text.innerText = '0%';
            return;
        }

        const completed = goals.filter(g => g.completed).length;
        const percentage = Math.round((completed / goals.length) * 100);
        
        fill.style.width = percentage + '%';
        text.innerText = percentage + '% (' + completed + ' з ' + goals.length + ' цілей)';
    }

    function setDynamicGreeting() {
        const greetingEl = document.getElementById('dynamic-greeting');
        if (!greetingEl) return;
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) greetingEl.innerText = "Добрий ранок! Готовий до нових звершень?";
        else if (hour >= 12 && hour < 18) greetingEl.innerText = "Продуктивного дня! Що плануєш сьогодні?";
        else greetingEl.innerText = "Добрий вечір! Час підбити підсумки.";  



    }

    function setupQuickAdd() {
        const form = document.getElementById('quick-goal-form');
        
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const title = document.getElementById('quick-goal-input').value;

            goals.push({ id: Date.now(), title, deadline: "Не вказано", tasks: ["Швидка задача"], completed: false });
            
            saveGoals();

            document.getElementById('quick-goal-input').value = ''; 
            const msg = document.getElementById('quick-add-msg');
            msg.style.display = 'block';
            setTimeout(() => { msg.style.display = 'none'; }, 3000);
        });
    }

    function setupFullAddGoal() {
        const form = document.getElementById('full-goal-form');
        if (!form) return;
        form.addEventListener('submit', function(e) {
            

            e.preventDefault(); 


            const tasksInput = document.getElementById('goal-tasks').value;
            const tasksArray = tasksInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
            goals.push({
                id: Date.now(),
                title: document.getElementById('goal-title').value,
                deadline: document.getElementById('goal-deadline').value,
                
                tasks: tasksArray.length > 0 ? tasksArray : ["Кроки не вказані"],
                completed: false


            });
            saveGoals();
            renderGoals();
            form.reset();
        });
    }

    function startTimer() {
        const timerElement = document.getElementById('motivational-timer');
        if (!timerElement) return;

        setInterval(() => {
            const now = new Date();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            const diff = endOfDay - now;
            
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            timerElement.innerText = `До кінця дня залишилось: ${hours} год ${minutes} хв ${seconds} сек. Зроби крок до своєї цілі!`;
        }, 1000);
    }

    function drawProgressChart() {
        const canvas = document.getElementById('progressCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const completedCount = goals.filter(g => g.completed).length;
        const activeCount = goals.length - completedCount;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const data = [ { label: 'Активні', value: activeCount, color: '#4a90e2' }, { label: 'Виконані', value: completedCount, color: '#2ecc71' } ];
        const maxVal = Math.max(activeCount, completedCount, 1); 

        const isDark = document.body.classList.contains('dark-theme');
        const textColor = isDark ? '#fff' : '#333';

        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const barHeight = (item.value / maxVal) * 180; 
            const x = 90 + (i * 140);
            const y = canvas.height - barHeight - 30;

            ctx.fillStyle = item.color;
            ctx.fillRect(x, y, 80, barHeight);
            ctx.fillStyle = textColor;
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(item.value, x + 40, y - 10);
            ctx.fillText(item.label, x + 40, canvas.height - 10);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        renderGoals();
        setDynamicGreeting();
        setupQuickAdd();
        setupFullAddGoal();
        updateMainProgress();
        startTimer();
        drawProgressChart();
    });