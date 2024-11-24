document.addEventListener('DOMContentLoaded', function () {
	const upcomingList = document.getElementById('upcomingList')
	const inProgressList = document.getElementById('inProgressList')
	const completedList = document.getElementById('completedList')

	const taskInput = document.getElementById('taskName')
	const taskDialog = document.getElementById('taskDialog')
	const taskStatusCheckbox = document.getElementById('taskStatus')

	const taskForm = document.getElementById('taskForm')
	const sortButtons = document.querySelectorAll('.sort__button')

	// создаём новый либо гетаем
	const storageName = 'tasksData'
	let tasks = JSON.parse(localStorage.getItem(storageName)) || {
		upcoming: [],
		inProgress: [],
		completed: [],
	}

	// 1 загрузка из ls в колонки
	function reloadFromLS() {
		upcomingList.innerHTML = ''
		inProgressList.innerHTML = ''
		completedList.innerHTML = ''

		tasks.upcoming.forEach(task =>
			upcomingList.appendChild(createTask(task, 'upcoming'))
		)
		tasks.inProgress.forEach(task =>
			inProgressList.appendChild(createTask(task, 'inProgress'))
		)
		tasks.completed.forEach(task =>
			completedList.appendChild(createTask(task, 'completed', true))
		)
	}

	function saveToLS() {
		// stringify - перевод js в json
		localStorage.setItem(storageName, JSON.stringify(tasks))
	}

	// 2 вёрстка
	function createTask(task, status, checkboxChecked = false) {
		// status =-= колонка

		const listItem = document.createElement('li')
		listItem.className = 'tasks__item'
		listItem.setAttribute('data-id', task.id)
		listItem.setAttribute('data-text', task.text)

		const checkbox = document.createElement('input')
		checkbox.type = 'checkbox'
		checkbox.className = 'tasks__item-checkbox'
		checkbox.checked = checkboxChecked

		const textSpan = document.createElement('span')
		textSpan.className = 'tasks__item-text'
		textSpan.textContent = task.text

		const deleteButton = document.createElement('a')
		deleteButton.href = 'javascript:void(0)'
		deleteButton.className = 'tasks__item-close'

		listItem.appendChild(checkbox)
		listItem.appendChild(textSpan)
		listItem.appendChild(deleteButton)

		// addEventListener на

		checkbox.addEventListener('change', function () {
			// есть возможность отменить выполнение
			if (status === 'completed') {
				moveTask(task.id, status, 'inProgress')
			} else {
				moveTask(task.id, status)
			}
		})

		deleteButton.addEventListener('click', function () {
			deleteTask(task.id, status)
		})

		return listItem
	}

	function genId() {
		return Math.random().toString().slice(2)
	}

	function addTask(taskText, addToCompleted = false) {
		if (taskText === '') return // проверка на пустой ввод

		const task = {
			id: genId(),
			text: taskText,
		}

		if (addToCompleted) {
			tasks.completed.push(task)
		} else {
			tasks.upcoming.push(task)
		}

		saveToLS()
		reloadFromLS()

		// очистка формы
		taskInput.value = ''
		taskStatusCheckbox.checked = false

		taskDialog.close()
	}

	function deleteTask(taskId, status) {
		// Из выбранной колонки по id
		tasks[status] = tasks[status].filter(
			// условие фильтрации
			task => task.id !== taskId
		)

		saveToLS()
		reloadFromLS()
	}

	// moveTask при изменении состояния чекбокса
	function moveTask(taskId, currStatus, nextStatus = null) {
		const statusOrder = ['upcoming', 'inProgress', 'completed']

		// определяем, если не указали
		if (!nextStatus) {
			const currentIndex = statusOrder.indexOf(currStatus)
			const nextIndex = currentIndex + 1

			if (nextIndex < statusOrder.length) {
				nextStatus = statusOrder[nextIndex]
			}
		}

		const taskIndex = tasks[currStatus].findIndex(task => task.id === taskId)

		if (taskIndex !== -1) {
			const currTask = tasks[currStatus][taskIndex]

			deleteTask(taskId, currStatus)
			tasks[nextStatus].push(currTask)

			saveToLS()
			reloadFromLS()
		}
	}

	// Обработка submit'а
	taskForm.addEventListener('submit', function (event) {
		event.preventDefault()

		const toCompleted = taskStatusCheckbox.checked

		// форма прочекана - задача летит в выполненные, иначе в план
		addTask(taskInput.value, toCompleted)
	})

	// 3 Индивидуальное задание - сортировка
	function sortTasks(status, condition) {
		// https://ru.hexlet.io/qna/javascript/questions/kak-sdelat-sortirovku-massiva-po-alfavitu-js
		// сортировка по дата тексту
		tasks[status].sort((task_a, task_b) => {
			if (condition === 'asc') {
				return task_a.text.localeCompare(task_b.text)
			}
			if (condition === 'desc') {
				return task_b.text.localeCompare(task_a.text)
			}
		})

		saveToLS()
		reloadFromLS()
	}

	sortButtons.forEach(button => {
		// https://qna.habr.com/q/494783z

		button.addEventListener('click', function () {
			const status = button.dataset.status // upcoming, inProgress, completed
			const condition = button.dataset.condition // asc, desc

			sortTasks(status, condition)
		})
	})

	reloadFromLS()
})
