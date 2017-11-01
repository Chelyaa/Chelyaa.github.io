'use strict';

let api = new API('localhost');

renderSection('lessons');

$(document).ready(function() {
	$('.modal').hide();
	$('.modal .underground').on('click', function() {
		hideModal(this.parentElement.id);
	});

	$('#edit-group button').on('click', function() {
		let newCourse = $('#edit-group--course').val();
		let name = this.parentElement.parentElement.dataset.name;

		api.updateGroup({NAME: name, COURSE: newCourse})
			.then(function() {
				hideModal('edit-group');
			});
	});

	$('#add-group button').on('click', function() {
		let name = $('#add-group--name')[0].value;
		let course = this.parentElement.parentElement.dataset.course;

		api.createGroup({'name': name, 'course': course})
			.then(function() {
				hideModal('add-group');
				let list = $('.groups #course-' + course + ' .list')[0];

				let li = document.createElement('li');
				li.className = 'clearfix';
				li.dataset.name = name;
				list.insertBefore(li, list.children[1]);

				let p = document.createElement('p');
				p.className = 'clearfix';
				p.innerHTML = name;
				li.appendChild(p);

				let buttEdit = document.createElement('button');
				buttEdit.className = 'clearfix edit';
				buttEdit.innerHTML = 'edit';
				li.appendChild(buttEdit);

				let buttDelete = document.createElement('button');
				buttDelete.className = 'clearfix delete';
				buttDelete.innerHTML = 'delete';
				li.appendChild(buttDelete);
			});
	});

	$('#edit-lesson button').on('click', function() {
		let id = this.parentElement.parentElement.dataset.id;
		let startTime = $('#edit-lesson--startTime').val();
		let length = $('#edit-lesson--length').val();
		let teacher = $('#edit-lesson--teacher').val();
		let groupName = $('#edit-lesson--groupName').val();
		let room = $('#edit-lesson--room').val();
		let subject = $('#edit-lesson--subject').val();
		let description = $('#edit-lesson--description').val();

		api.updateLesson({ID: id, START_TIME: startTime, LENGTH: length, TEACHER: teacher, GROUP: groupName, ROOM: room, SUBJECT: subject, DESCRIPTION: description})
			.then(function() {
				hideModal('edit-lesson');
				return api.getAllLessons();
			}).then(function(lessons) {
				renderLessonsList(lessons);
			});
	});

	$('#add-lesson button').on('click', function() {
		let id = this.parentElement.parentElement.dataset.id;
		let startTime = $('#edit-lesson--startTime').val();
		let length = $('#edit-lesson--length').val();
		let teacher = $('#edit-lesson--teacher').val();
		let groupName = $('#edit-lesson--groupName').val();
		let room = $('#edit-lesson--room').val();
		let subject = $('#edit-lesson--subject').val();
		let description = $('#edit-lesson--description').val();

		api.createLesson({ID: id, START_TIME: startTime, LENGTH: length, TEACHER: teacher, GROUP: groupName, ROOM: room, SUBJECT: subject, DESCRIPTION: description})
			.then(function() {
				hideModal('add-lesson');
				return api.getAllLessons();
			}).then(function(lessons) {
				renderLessonsList(lessons);
			});
	});

	$('.sidebar .nav a').on('click', function() {
		$('.sidebar .nav .active').toggleClass('active');
		$(this).toggleClass('active');
		renderSection(this.href.split('#')[1]);
	});

	$('.groups .nav a').on('click', function() {
		$('.main-content .groups .nav .groups-active').toggleClass('groups-active');
		$(this).toggleClass('groups-active');
		renderGroupSection(this.href.split('#')[1]);
	});

	$('.groups .add').on('click', function() {
		let course = this.parentElement.parentElement.id.split('-')[1];
		$('#add-group')[0].dataset.course = course;
		showModal('add-group');
	});

	$('.groups .delete').on('click', function() {
		let name = this.parentElement.dataset.name;
		let butt = this;
		
		api.deleteGroup(name)
			.then(function() {
				butt.parentElement.remove();
			});
	});

	$('.groups .edit').on('click', function() {
		let name = this.parentElement.dataset.name;
		let butt = this;

		api.getOneGroup(name)
			.then(function(group) {
				group = {COURSE: 1};

				$('#edit-group--course').val(group.COURSE);
				$('#edit-group')[0].dataset.name = name;
				showModal('edit-group');
			});
	});

	$('.lessons select').on('change', lessonsFiltersChange);
	$('.lessons input').on('input', lessonsFiltersChange);

	$('.lessons .add').on('click', function() {
		showModal('add-lesson');
	});

	$('.lessons .delete').on('click', function() {
		let id= this.parentElement.dataset.id;
		let butt = this;
		
		api.deleteLesson(id)
			.then(function() {
				butt.parentElement.parentElement.remove();
			});
	});

	$('.lessons .edit').on('click', function() {
		let id = this.parentElement.dataset.id;
		let butt = this;

		api.getLesson(id)
			.then(function(lesson) {
				lesson = {ID: 1, TEACHER: '1', GROUP: '1', COURSE: '1', START_TIME: new Date().getTime(), LENGTH: '1', DESCRIPTION: '1', ROOM: '1', SUBJECT: '1'};

				$('#edit-lesson--startTime').val(timeConverter(lesson.START_TIME));
				$('#edit-lesson--length').val(lesson.LENGTH);
				$('#edit-lesson--teacher').val(lesson.TEACHER);
				$('#edit-lesson--groupName').val(lesson.GROUP);
				$('#edit-lesson--room').val(lesson.ROOM);
				$('#edit-lesson--subject').val(lesson.SUBJECT);
				$('#edit-lesson--description').val(lesson.DESCRIPTION);
				$('#edit-lesson')[0].dataset.id = id;
				showModal('edit-lesson');
			});
	});
});

function lessonsFiltersChange() {console.log("A");
	let teacher = $('#teacher').val();
	let group = $('#group').val();
	let course = $('#course').val();
	let startTime = new Date($('#startTime').val().split('-').join('/')).getTime();
	let endTime = new Date($('#endTime').val().split('-').join('/')).getTime();

	api.getAllLessons()
		.then(function(lessons) {
			renderLessonsList(lessons, teacher, group, course, startTime, endTime);
		});
}

function renderSection(secName) {
	switch(secName) {
		case 'groups':
			renderGroupSection('course-1');

			break;
		case 'lessons':
			renderLessonsSection();

			break;
	}
}

function renderGroupSection(courseId) {
	let id = courseId.split('-')[1];
	$('.groups .table ' + courseId + ' .list').empty();
	api.getGroupListByCourse(id)
		.then(function(res) {
			res = JSON.parse(res);

			let list = $('.groups .table ' + courseId + ' .list');
			list.innerHTML = `
				<li class="clearfix add">
					<button>add</button>
				</li>
			`;

			for(let i = 0; i < res.length; i++) {
				list.innerHTML += `
					<li class="clearfix" data-name="${res[i].GROUP_NAME}">
						<p class="clearfix">${res[i].GROUP_NAME}</p>
						<button class="clearfix edit">edit</button>
						<button class="clearfix delete">delete</button>
					</li>
				`;
			}
		});
}

function renderLessonsSection(listOptions = []) {
	api.getAllLessons()
		.then(function(lessons) {
			renderLessonsFilters();
			renderLessonsList(lessons, ...listOptions);
		});
}

function renderLessonsList(lessons, teacher = 'none', group = 'none', course = 'none', startTime = 'none', endTime = 'none') {
	$('.lessons .list').empty();
	
	lessons = [
		{ID: 1, TEACHER: '1', GROUP: '1', COURSE: '1', START_TIME: '1', LENGTH: '1', DESCRIPTION: '1', ROOM: '1', SUBJECT: '1'},
		{ID: 2, TEACHER: '1', GROUP: '1', COURSE: '1', START_TIME: '1', LENGTH: '1', DESCRIPTION: '1', ROOM: '1', SUBJECT: '1'},
		{ID: 3, TEACHER: '1', GROUP: '1', COURSE: '1', START_TIME: '1', LENGTH: '1', DESCRIPTION: '1', ROOM: '1', SUBJECT: '1'},
	];

	lessons.filter(function(lesson) {
		if(teacher !== 'none' && lesson.TEACHER !== teacher)
			return false;
		if(group !== 'none' && lesson.GROUP !== group)
			return false;
		if(course !== 'none' && lesson.COURSE !== course)
			return false;
		if(endTime !== 'none' && lesson.START_TIME < startTime || lesson.START_TIME > endTime)
			return false;
		if(startTime !== 'none' && lesson.START_TIME !== startTime)
			return false;

		return true;
	});

	let list = $('.lessons .list')[0];
	list.innerHTML = `
			<li class="clearfix add">
				<button>add</button>
			</li>`;
	for(let i = 0; i < lessons.length; i++) {
		let li = document.createElement('li');
		list.appendChild(li);
		li.dataset.id = lessons[i].ID;

		li.innerHTML = ` 
			<details>
			  <summary class="clearfix">
			  	<p class="clearfix">${lessons[i].SUBJECT}</p>
			  	<button class="clearfix list-btn edit">edit</button>
					<button class="clearfix list-btn delete">delete</button>
			  </summary>
			  <div class="content">
			  	<ul>
			  		<li>Start time: <span>${lessons[i].START_TIME}</span></li>
			  		<li>Length: <span>${lessons[i].LENGTH}</span></li>
			  		<li>Teacher: <span>${lessons[i].TEACHER}</span></li>
			  		<li>Group name: <span>${lessons[i].GROUP}</span></li>
			  		<li>Room: <span>${lessons[i].ROOM}</span></li>
			  		<li>Subject: <span>${lessons[i].SUBJECT}</span></li>
			  		<li>Description: <span>${lessons[i].DESCRIPTION}</span></li>
			  	</ul>
			  </div>
		  </details>
		`;
	}
}

function renderLessonsFilters() {
	$('.lessons .filters').empty();
	api.getAllTeachers()
		.then(function(teachers) {
			api.getAllGroups()
				.then(function(groups) {
					teachers = [
						{FULL_NAME: 'Marya Ivanovna'},
						{FULL_NAME: 'Marya Ivanovna1'},
						{FULL_NAME: 'Marya Ivanovna2'}
					];
					groups = [
						{GROUP_NAME: 'Marya Ivanovna3'},
						{GROUP_NAME: 'Marya Ivanovna4'},
						{GROUP_NAME: 'Marya Ivanovna5'}
					];

					let filters = $('.lessons .filters')[0];

					let teacherSelect = document.createElement('select');
					filters.appendChild(teacherSelect);
					teacherSelect.id = 'teacher';
					teacherSelect.name = 'teacher';
					for(let i = 0; i < teachers.length; i++) {
						let option = document.createElement('option');
						teacherSelect.appendChild(option);

						option.value = teachers[i].FULL_NAME;
						option.innerHTML = teachers[i].FULL_NAME;
					}


					let groupSelect = document.createElement('select');
					filters.appendChild(groupSelect);
					groupSelect.id = 'group';
					groupSelect.name = 'group';
					for(let i = 0; i < groups.length; i++) {
						let option = document.createElement('option');
						groupSelect.appendChild(option);
						
						option.value = groups[i].GROUP_NAME;
						option.innerHTML = groups[i].GROUP_NAME;
					}


					let courseSelect = document.createElement('select');
					filters.appendChild(courseSelect);
					courseSelect.id = 'course';
					courseSelect.name = 'course';
					for(let i = 0; i < 4; i++) {
						let option = document.createElement('option');
						courseSelect.appendChild(option);
						
						option.value = i;
						option.innerHTML = 'Course #' + (i+1);
					}

					filters.appendChild(document.createElement('br'));

					let labelStartTime = document.createElement('label');
					filters.appendChild(labelStartTime);
					labelStartTime.for = 'startTime';
					labelStartTime.innerHTML = 'Start time: ';

					let startTime = document.createElement('input');
					filters.appendChild(startTime);
					startTime.type = 'date';
					startTime.name = 'startTime';
					startTime.id = 'startTime';

					let labelEndTime = document.createElement('label');
					filters.appendChild(labelEndTime);
					labelEndTime.for = 'endTime';
					labelEndTime.innerHTML = 'End time: ';

					let endTime = document.createElement('input');
					filters.appendChild(endTime);
					endTime.type = 'date';
					endTime.name = 'endTime';
					endTime.id = 'endTime';
				});
		})
}