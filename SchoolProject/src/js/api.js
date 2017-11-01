function API(host) {
	this.host = host;
}

//
// GroupController
//
API.prototype.createGroup = function(group) {
	return new Promise((resolve, reject) => {
		http('POST', false, this.host+'/group', {'jsonData': JSON.stringify(group)})
			.then(resolve);
	});
}

API.prototype.updateGroup = function(group) {
	return new Promise((resolve, reject) => {
		http('PUT', false, this.host+'/group', {'jsonData': JSON.stringify(group)})
			.then(resolve);
	}); 
}

API.prototype.getOneGroup = function(groupName) {
	return new Promise((resolve, reject) => {
		http('GET', true, this.host+'/group/get-group', {'groupName': groupName})
			.then(resolve);
	}); 
}

API.prototype.getAllGroups = function(groupName) {
	return new Promise((resolve, reject) => {
		http('GET', true, this.host+'/group/get-all', {})
			.then(resolve);
	}); 
}

API.prototype.getGroupListByCourse = function(course) {
	return new Promise((resolve, reject) => {
		http('GET', true, this.host+'/group/get-group-list-by-course', {'course': course})
			.then(resolve);
	});
}

API.prototype.deleteGroup = function(groupName) {
	return new Promise((resolve, reject) => {
		http('DELETE', true, this.host+'/group', {'groupName': groupName})
			.then(resolve);
	});
}

//
// LessonController
//
API.prototype.createLesson = function(lesson) {
	return new Promise((resolve, reject) => {
		http('POST', false, this.host+'/lesson', {'jsonData': lesson})
			.then(resolve);
	});
}

API.prototype.updateLesson = function(lesson) {
	return new Promise((resolve, reject) => {
		http('PUT', false, this.host+'/lesson', {'jsonData': lesson})
			.then(resolve);
	});
}

API.prototype.getLesson = function(lessonId) {
	return new Promise((resolve, reject) => {
		http('GET', true, this.host+'/lesson/lesson-one-by-id', {'lessonId': lessonId})
			.then(resolve);
	});
}

API.prototype.getAllLessons = function() {
	return new Promise((resolve, reject) => {
		http('GET', true, this.host+'/lesson/get-all', {})
			.then(resolve);
	});
}

API.prototype.deleteLesson = function(lessonId) {
	return new Promise((resolve, reject) => {
		http('DELETE', true, this.host+'/lesson', {'lessonId': lessonId})
			.then(resolve);
	});
}

API.prototype.getLessonsByTeacherAndStartTime = function(teacher, startTime) {
	return new Promise((resolve, reject) => {
		http('GET', false, this.host+'/lesson/lessons-by-teacher-and-time', {'teacher': teacher, 'startTime': startTime})
			.then(resolve);
	});
}

API.prototype.getLessonsByGroupAndStartTime = function(group, startTime) {
	return new Promise((resolve, reject) => {
		http('GET', false, this.host+'/lesson/lessons-by-group-and-time', {'group': group, 'startTime': startTime})
			.then(resolve);
	});
}

API.prototype.getLessonsByGroupAndPeriod = function(group, period, length) {
	return new Promise((resolve, reject) => {
		http('GET', false, this.host+'/lesson/lessons-by-group-and-period', {'group': group, 'period': period, 'length': length})
			.then(resolve);
	});
}

API.prototype.getLessonsByCourseAndPeriod = function(course, period, length) {
	return new Promise((resolve, reject) => {
		http('GET', false, this.host+'/lesson/lessons-by-course-and-period', {'course': course, 'period': period, 'length': length})
			.then(resolve);
	});
}

API.prototype.getLessonsByTeacherAndPeriod = function(teacher, period, length) {
	return new Promise((resolve, reject) => {
		http('GET', false, this.host+'/lesson/lessons-by-teacher-and-period', {'teacher': teacher, 'period': period, 'length': length})
			.then(resolve);
	});
}

//
// StudentController
//
API.prototype.createStudent = function(student) {
	return new Promise((resolve, reject) => {
		http('POST', false, this.host+'/student', {'jsonData': student})
			.then(resolve);
	});
}

API.prototype.updateStudent = function(student) {
	return new Promise((resolve, reject) => {
		http('PUT', false, this.host+'/student', {'jsonData': student})
			.then(resolve);
	});
}

API.prototype.getStudent = function(studentLogin) {
	return new Promise((resolve, reject) => {
		http('GET', false, this.host+'/student/get-one-student-by-login', {'studentLogin': studentLogin})
			.then(resolve);
	});
}

API.prototype.getAllStudents = function(studentLogin) {
	return new Promise((resolve, reject) => {
		http('GET', false, this.host+'/student/get-all', {})
			.then(resolve);
	});
}

API.prototype.deleteStudent = function(login) {
	return new Promise((resolve, reject) => {
		http('DELETE', true, this.host+'/student', {'login': login})
			.then(resolve);
	});
}

API.prototype.getStudentsByGroup = function(group) {
	return new Promise((resolve, reject) => {
		http('GET', false, this.host+'/student/get-students-by-group', {'group': group})
			.then(resolve);
	});
}

API.prototype.getStudentsByCourse = function(course) {
	return new Promise((resolve, reject) => {
		http('GET', false, this.host+'/student/get-students-by-course', {'course':course})
			.then(resolve);
	});
}

//
// TeacherController
//
API.prototype.createTeacher = function(teacher) {
	return new Promise((resolve, reject) => {
		http('POST', false, this.host+'/teacher', {'jsonData': teacher})
			.then(resolve);
	});
}

API.prototype.updateTeacher = function(teacher) {
	return new Promise((resolve, reject) => {
		http('PUT', false, this.host+'/teacher', {'jsonData': teacher})
			.then(resolve);
	});
}

API.prototype.deleteTeacher = function(login) {
	return new Promise((resolve, reject) => {
		http('DELETE', true, this.host+'/teacher', {'login': login})
			.then(resolve);
	});
}

API.prototype.getTeacher = function(teacherLogin) {
	return new Promise((resolve, reject) => {
		http('GET', true, this.host+'/teacher/get-one-teacher-by-login', {'teacherLogin': teacherLogin})
			.then(resolve);
	});
}

API.prototype.getAllTeachers = function(teacherLogin) {
	return new Promise((resolve, reject) => {
		http('GET', true, this.host+'/teacher/get-all', {})
			.then(resolve);
	});
}