const navbarOptionGear = document.getElementsByClassName('navbar-mobile-option-button-icon-wheel')[0];
const navbarOptionCross = document.getElementsByClassName('navbar-mobile-option-button-icon-cross')[0];

function toggleMobileOption() {
	navbarOptionGear.classList.toggle('show');
	navbarOptionCross.classList.toggle('show');
	navbarOptionGear.classList.toggle('hide');
	navbarOptionCross.classList.toggle('hide');
}
