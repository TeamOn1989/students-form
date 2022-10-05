const STUDENTS_ARRAY = [
    {
    fullname: 'Убойный говнорез', 
    faculty: 'Убойных писек', 
    birthdate: '30.30.2020', 
    student: '02.06.2030',
    },
];

let container = document.getElementById('container');
let student;

function renderingTable() {
    let tableWrapper = document.createElement('div');
    let nameList = document.createElement('ul');
    let facultyList = document.createElement('ul');
    let byrthDayList = document.createElement('ul');
    let studiesList = document.createElement('ul');

    tableWrapper.classList.add('container-form-table');
    nameList.classList.add('table-columns');
    facultyList.classList.add('table-columns');
    byrthDayList.classList.add('table-columns');
    studiesList.classList.add('table-columns');

    let nameListHeading = document.createElement('li');
    nameListHeading.classList.add('table-item')
    nameListHeading.textContent = 'Фамилия Имя Отчество';
    nameList.append(nameListHeading);

    let facultyListHeading = document.createElement('li');
    facultyListHeading.classList.add('table-item')
    facultyListHeading.textContent = 'Факултет';
    facultyList.append(facultyListHeading);

    let byrthDayListHeading = document.createElement('li');
    byrthDayListHeading.classList.add('table-item')
    byrthDayListHeading.textContent = 'Дата рождения / возраст';
    byrthDayList.append(byrthDayListHeading);

    let studiesListHeading = document.createElement('li');
    studiesListHeading.classList.add('table-item')
    studiesListHeading.textContent = 'Дата обучения / курс';
    studiesList.append(studiesListHeading);

    for (let elem of STUDENTS_ARRAY) {
        let fullname = document.createElement('li');
        fullname.classList.add('table-item')
        fullname.textContent = elem.fullname
        nameList.append(fullname);

        let faculty = document.createElement('li');
        faculty.classList.add('table-item')
        faculty.textContent = elem.faculty;
        facultyList.append(faculty);

        let birthdate = document.createElement('li');
        birthdate.classList.add('table-item')
        birthdate.textContent = elem.birthdate;
        byrthDayList.append(birthdate);

        let studentsDate = document.createElement('li');
        studentsDate.classList.add('table-item')
        studentsDate.textContent = elem.student;
        studiesList.append(studentsDate);
    }
   
   
    tableWrapper.append(nameList, facultyList, byrthDayList, studiesList);

    container.append(tableWrapper)
};

function createStudentsAddForm() {
    let form = document.createElement('form');
    let firstnameInput = document.createElement('input');
    let secondNameInput = document.createElement('input');
    let lastNameInput = document.createElement('input');
    let birthDayInput = document.createElement('input');
    let receiptDateInput = document.createElement('input');
    let facultyInput = document.createElement('input');
    let button = document.createElement('button');

    form.classList.add('form');

    let labelForFNI = document.createElement('p')
    labelForFNI.textContent = 'Имя студента'
    labelForFNI.classList.add('label')
    firstnameInput.classList.add('input');
    firstnameInput.setAttribute('type', 'text');
    firstnameInput.setAttribute('id', 'name');
    firstnameInput.placeholder = 'Имя';

    let labelForSNI = document.createElement('p');
    labelForSNI.textContent = 'Фамилия студента'
    labelForSNI.classList.add('label');
    secondNameInput.classList.add('input');
    secondNameInput.setAttribute('type', 'text');
    secondNameInput.placeholder = 'Фамилия';

    let labelForLNI = document.createElement('p');
    labelForLNI.textContent = 'Отчество студента'
    labelForLNI.classList.add('label');
    lastNameInput.classList.add('input');
    lastNameInput.setAttribute('type', 'text');
    lastNameInput.placeholder = 'Отчество';

    let labelForBDI = document.createElement('p');
    labelForBDI.textContent = 'День рождения'
    labelForBDI.classList.add('label');
    birthDayInput.classList.add('input');   
    birthDayInput.setAttribute('type', 'date');
    
    let labelForRDI = document.createElement('p');
    labelForRDI.textContent = 'Дата зачисления'
    labelForRDI.classList.add('label');
    receiptDateInput.classList.add('input');
    receiptDateInput.setAttribute('type', 'date');

    let labelForFacNI = document.createElement('p');
    labelForFacNI.textContent = 'Факультет'
    labelForFacNI.classList.add('label');
    facultyInput.classList.add('input');
    facultyInput.setAttribute('type', 'text');
    facultyInput.placeholder = 'Факультет';

    button.textContent = 'Добавить студента'
    button.classList.add('btn');

    form.append(labelForFNI ,firstnameInput, labelForSNI, secondNameInput, labelForLNI, lastNameInput, labelForBDI, birthDayInput, labelForRDI, receiptDateInput, labelForFacNI, facultyInput, button)

    container.append(form)
    return {
        firstnameInput,
        secondNameInput,
        lastNameInput,
        birthDayInput,
        receiptDateInput,
        facultyInput,
        button,
        form,
    }
}

function addNewStudent() {
    let newStudent = createStudentsAddForm();
    newStudent.form.addEventListener('submit', function(e) {
        e.preventDefault();
    })
    
    newStudent.button.addEventListener('click', function() {

        if (newStudent.firstnameInput.value === '' || newStudent.secondNameInput.value === '' || newStudent.lastNameInput.value === '' || newStudent.facultyInput.value === '' || newStudent.birthDayInput.value === '' || newStudent.receiptDateInput.value === '') {
            showAlertMessage('Пожалуйста, заполните все необходимые поля', newStudent.button);
            newStudent.button.disabled = true
            return
        };

        let date = new Date();

        if (newStudent.birthDayInput.value.substring(0, 4) < 1900 || Date.parse(newStudent.birthDayInput.value) > Date.now()) {
            showAlertMessage('Введите корректный день рождения!', newStudent.button);
            newStudent.button.disabled = true
            return
        };

        if (newStudent.receiptDateInput.value.substring(0, 4) < 2000 || Date.parse(newStudent.receiptDateInput.value) > Date.now()) {
            showAlertMessage('Введите корректную дату зачисления!', newStudent.button);
            newStudent.button.disabled = true
            return
        };

        let age = date.getFullYear() - newStudent.birthDayInput.value.substring(0, 4);
        if (age.toString().endsWith('1')) {
            age = `${age} год`
        } else if (age.toString().endsWith('2') || age.toString().endsWith('3') || age.toString().endsWith('4')) {
            age = `${age} года`
        } else age = `${age} лет`

        let course = date.getFullYear() - newStudent.receiptDateInput.value.substring(0, 4);

        if (course == 0) {
            course = '1-й курс';
        } else if (course > 4) {
            course = 'закончил';
        } else course = `${course}-й курс`
        
        let student = {
            fullname: newStudent.firstnameInput.value.trim() + ' ' + newStudent.secondNameInput.value.trim() + ' ' + newStudent.lastNameInput.value.trim(),
            faculty: newStudent.facultyInput.value,
            birthdate: `${newStudent.birthDayInput.value} (${age})`,
            student: `${newStudent.receiptDateInput.value} (${course})`,
        }
        STUDENTS_ARRAY.push(student);
        renderingTable()
        newStudent.firstnameInput.value = '';
        newStudent.secondNameInput.value = '';
        newStudent.lastNameInput.value = '';
        newStudent.facultyInput.value = '';
        newStudent.birthDayInput.value = '';
        newStudent.receiptDateInput.value = '';
    });
    return student    
}


function showAlertMessage(message, button) {
    let alert = document.createElement('div');
    alert.classList.add('alert-container');

    let alertMessage = document.createElement('h2');
    alertMessage.classList.add('alert-message');
    alertMessage.textContent = message

    let alertButton = document.createElement('button');
    alertButton.classList.add('alert-btn');
    alertButton.textContent = 'Хорошо';
    alertButton.addEventListener('click', function() {
        document.body.removeChild(alert);
        button.disabled = false
    });

    
    alert.append(alertMessage, alertButton);

    document.body.append(alert)
};

// выпадающее меню
function createFilterList() {
    let click = 1;
    let filter = document.createElement('ul');
    let filterContainer = document.createElement('div');
    filterContainer.classList.add('filter-container');
    filterContainer.append(filter);
    let filterHeading = document.createElement('li');
    filterHeading.textContent = 'ПОИСК СТУДЕНТА'
    filter.classList.add('filter');
    filterHeading.classList.add('filter-heading');
    filterHeading.addEventListener('click', function() {
        click++
        this.classList.add('active')
        let searchFullName = document.createElement('li');
        let searchFullNameWrapper = document.createElement('div');
        let searchFullNameItem = document.createElement('input');
        let searchFullNameBTN = document.createElement('button');

        searchFullName.classList.add('menu-item');
        searchFullNameWrapper.classList.add('menu-itm-wrapper')
        searchFullNameItem.placeholder = 'Поиск по фамилии'
        searchFullNameItem.classList.add('item-input')
        searchFullNameBTN.textContent = 'Найти'
        searchFullNameBTN.classList.add('menu-btn')


        searchFullNameWrapper.append(searchFullNameItem, searchFullNameBTN);
        searchFullName.append(searchFullNameWrapper);
        filter.append(searchFullName);

        let searchFaculty = document.createElement('li');
        let searchFacultyWrapper = document.createElement('div');
        let searchFacultyItem = document.createElement('input');
        let searchFacultyBTN = document.createElement('button');

        searchFaculty.classList.add('menu-item');
        searchFacultyWrapper.classList.add('menu-itm-wrapper')
        searchFacultyItem.placeholder = 'Поиск по факультету'
        searchFacultyItem.classList.add('item-input')
        searchFacultyBTN.textContent = 'Найти'
        searchFacultyBTN.classList.add('menu-btn')


        searchFacultyWrapper.append(searchFacultyItem, searchFacultyBTN);
        searchFaculty.append(searchFacultyWrapper);
        filter.append(searchFaculty);

        let searchStartStudy = document.createElement('li');
        let searchStartStudyWrapper = document.createElement('div');
        let searchStartStudyItem = document.createElement('input');
        let searchStartStudyBTN = document.createElement('button');

        searchStartStudy.classList.add('menu-item');
        searchStartStudyWrapper.classList.add('menu-itm-wrapper')
        searchStartStudyItem.placeholder = 'Поиск по году поступления'
        searchStartStudyItem.classList.add('item-input')
        searchStartStudyBTN.textContent = 'Найти'
        searchStartStudyBTN.classList.add('menu-btn')


        searchStartStudyWrapper.append(searchStartStudyItem, searchStartStudyBTN);
        searchStartStudy.append(searchStartStudyWrapper);
        filter.append(searchStartStudy);

        let searchFinishStudy = document.createElement('li');
        let searchFinishStudyWrapper = document.createElement('div');
        let searchFinishStudyItem = document.createElement('input');
        let searchFinishStudyBTN = document.createElement('button');

        searchFinishStudy.classList.add('menu-item');
        searchFinishStudyWrapper.classList.add('menu-itm-wrapper')
        searchFinishStudyItem.placeholder = 'Поиск по году окончания'
        searchFinishStudyItem.classList.add('item-input')
        searchFinishStudyBTN.textContent = 'Найти'
        searchFinishStudyBTN.classList.add('menu-btn')


        searchFinishStudyWrapper.append(searchFinishStudyItem, searchFinishStudyBTN);
        searchFinishStudy.append(searchFinishStudyWrapper);
        filter.append(searchFinishStudy);



        if (click > 2) {
            let listItems = document.querySelectorAll('.menu-item');
            listItems.forEach(el => {el.classList.add('disabled-item')})
            this.classList.remove('active');
            click = 1;
        }
    });




    filter.append(filterHeading)
    container.append(filterContainer)
}

addNewStudent()
renderingTable()
createFilterList()

