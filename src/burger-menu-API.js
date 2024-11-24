// document.addEventListener('DOMContentLoaded', function () {
const menuCheckbox = document.querySelectorAll('.js-menu-checkbox')
const menuExpand = document.querySelector('.header__menu-expand')

menuCheckbox.forEach(function (checkbox) {
	checkbox.addEventListener('change', function () {
		if (checkbox.checked) {
			menuExpand.classList.add('open')
			menuCheckbox.forEach(cb => (cb.checked = true))
		} else {
			menuExpand.classList.remove('open')
			menuCheckbox.forEach(cb => (cb.checked = false))
		}
	})
})

document.addEventListener('click', function (event) {
	if (
		!menuExpand.contains(event.target) &&
		!event.target.classList.contains('js-menu-checkbox')
	) {
		menuCheckbox.forEach(cb => (cb.checked = false))
		menuExpand.classList.remove('open')
	}
})
// })
