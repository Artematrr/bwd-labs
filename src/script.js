document.addEventListener('DOMContentLoaded', function () {
	const menuCheckbox = document.querySelectorAll('.js-menu-checkbox');
	const menuExpand = document.querySelector('.header__menu-expand');

	menuCheckbox.forEach(function (checkbox) {
		checkbox.addEventListener('change', function () {
			if (checkbox.checked) {
				menuExpand.classList.add('open');
				menuCheckbox.forEach(cb => (cb.checked = true));
			} else {
				menuExpand.classList.remove('open');
				menuCheckbox.forEach(cb => (cb.checked = false));
			}
		});
	});

	document.addEventListener('click', function (e) {
		if (
			!menuExpand.contains(e.target) &&
			!e.target.classList.contains('js-menu-checkbox')
		) {
			menuCheckbox.forEach(cb => (cb.checked = false));
			menuExpand.classList.remove('open');
		}
	});

	const dialogElement = document.querySelector('dialog');
	if (dialogElement) {
		dialogElement.addEventListener('click', closeOnBackDropClick);
	}

	function closeOnBackDropClick({ currentTarget, target }) {
		const dialogElement = currentTarget;
		if (target === dialogElement) {
			dialogElement.close();
		}
	}

	if (window.HTMLDialogElement === undefined) {
		const dialogs = document.querySelectorAll('dialog');
		dialogs.forEach(dialog => dialogPolyfill.registerDialog(dialog));
	}
});