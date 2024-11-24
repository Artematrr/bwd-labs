// document.addEventListener('DOMContentLoaded', function () {
const dialogElement = document.querySelector('dialog')
if (dialogElement) {
	dialogElement.addEventListener('click', closeOnBackDropClick)
}

function closeOnBackDropClick({ currentTarget, target }) {
	const dialogElement = currentTarget
	if (target === dialogElement) {
		dialogElement.close()
	}
}

if (window.HTMLDialogElement === undefined) {
	const dialogs = document.querySelectorAll('dialog')
	dialogs.forEach(dialog => dialogPolyfill.registerDialog(dialog))
}
// })
