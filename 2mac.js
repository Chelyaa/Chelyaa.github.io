let links = document.querySelectorAll('.repair__item__img');
		titles = document.querySelectorAll('.repair__item__title');

for(let i = 0; i < links.length; i++) {
	console.log(links[i].href + '\n');
	console.log(titles[i].innerHTML);
	console.log('--------------------------------------------------')
}