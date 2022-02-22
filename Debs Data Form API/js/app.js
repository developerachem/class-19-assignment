// Dom Get Data
const devs_data_add_form = document.querySelector('#devs_data_add_form');
const devs_data_edit_form = document.querySelector('#devs_data_edit_form');
const skills_list = document.querySelector('#skills');
const editSkills = document.querySelector('#editskills');
const devs_table_body = document.querySelector('.devs_table_body');
const popupTableBody = document.querySelector('#popupTableBody');

// devs_data_add_form Submit Event 
devs_data_add_form.addEventListener('submit', function (e) {
    e.preventDefault();

    let name = this.querySelector('#name');
    let email = this.querySelector('#email');
    let gender = this.querySelector('input[name="gender"]:checked');
    let skills = this.querySelector('#skills');
    let photo = this.querySelector('#photo');


    if (name.value == "" || email.value == "" || skills.value == "" || photo.value == "") {
        alert("All File Are Recuared")
    } else {

        // Axios File Post
        axios.post('http://localhost:4390/developers', {

            "id": "",
            "name": name.value,
            "email": email.value,
            "gender": gender.value,
            "skillsID": skills.value,
            "photo": photo.value


        }).then(res => {
            name.value = ""
            email.value = ""
            gender.value = ""
            skills.value = ""
            photo.value = ""

            /**debs Data Lode Function */
            debsDataLode()
        })
    }

})

/**
 * Skill Load To JSON Server
 */
skillLoad()

function skillLoad() {
    axios.get('http://localhost:4390/skills').then(res => {
        let skillSend = "";
        res.data.map((skill) => {
            skillSend += `
                <option value="${skill.id}">${skill.name}</option>
            `
        })
        skills_list.insertAdjacentHTML("beforeend", skillSend);
    })
}

/**
 * Edid Skill Fulction
 */
editSkillLoad()

function editSkillLoad() {
    axios.get('http://localhost:4390/skills').then(res => {
        let skillSend = "";
        res.data.map((skill) => {
            skillSend += `
                <option value="${skill.id}">${skill.name}</option>
            `
        })
        editSkills.insertAdjacentHTML("beforeend", skillSend);
    })
}

/**
 * Devs Delete Function
 * @param {*} id 
 */
let deleteId;

function devsDelete(id) {
    deleteId = id;
}
/**
 * Devs Delet Confirm Btn Function
 */
function dvsDeleteBtn() {
    axios.delete("http://localhost:4390/developers/" + deleteId).then(res => {
        debsDataLode()
    })
}

/**
 * Debs Data Load To JSON Server
 */
debsDataLode()

function debsDataLode() {

    axios.get("http://localhost:4390/developers").then(res => {
        let allDebs = "";
        res.data.map((data, index) => {

            allDebs += `
                <tr>
                    <td>${ index + 1 }</td>
                    <td>${ data.name }</td>
                    <td>${ data.email }</td>
                    <td>${ data.gender }</td>
                    <td>${ skillViwe(data.skillsID) }</td>
                    <td><img style="object-fit: cover; width: 50px; height: 50px;" src="${ data.photo }" alt=""></td>
                    <td>
                        <a data-bs-toggle="modal" onclick="devsViwe(${data.id})" data-toggle="tooltip" data-placement="top" title="View" class="btn btn-info" href="#devsViwe"><i class="fa fa-eye"></i></a>
                        <a data-bs-toggle="modal" onclick="devsEdit(${data.id})" data-toggle="tooltip" data-placement="top" title="Edit" class="btn btn-secondary" href="#devsEdit"><i class="fa fa-edit"></i></a>
                        <a data-bs-toggle="modal" onclick="devsDelete(${data.id})" data-toggle="tooltip" data-placement="top" title="Delete" class="btn btn-danger" href="#devsDelete"><i class="fa fa-trash-alt"></i></a>
                    </td>
                </tr>
            `
        })
        devs_table_body.innerHTML = allDebs;
    })
}

/**
 * Devs Edite Edid Show Function
 * @param {*} id 
 */
function devsEdit(id) {
    // Get Data Form Dom 
    let name = document.querySelector('#editname');
    let email = document.querySelector('#editemail');
    let skills = document.querySelector('#editskills');
    let photo = document.querySelector('#editphoto');
    let viwephoto = document.querySelector('#viwephoto');
    let heddenID = document.querySelector('#heddenID');

    // Get Data Form API
    axios.get("http://localhost:4390/developers/" + id).then(res => {

        name.value = res.data.name;
        email.value = res.data.email;
        skills.children[res.data.skillsID].setAttribute('selected' , true);
        photo.value = res.data.photo;
        heddenID.value = res.data.id;
        viwephoto.setAttribute('src', res.data.photo)
    })
}

/**
 * devs_data_edit_form Submit Event 
 */
devs_data_edit_form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get Data Form Dom 
    let name = document.querySelector('#editname');
    let email = document.querySelector('#editemail');
    let skills = document.querySelector('#editskills');
    let gender = this.querySelector('input[name="gender"]:checked');
    let photo = document.querySelector('#editphoto');
    let heddenID = document.querySelector('#heddenID');


    if (name.value == "" || email.value == "" || skills.value == "" || photo.value == "") {
        alert("All File Are Recuared")
    } else {

        // Axios File Post
        axios.patch('http://localhost:4390/developers/' + heddenID.value, {

            "name": name.value,
            "email": email.value,
            "gender": gender.value,
            "skillsID": skills.value,
            "photo": photo.value

        }).then(res => {
            /**debs Data Lode Function */
            debsDataLode()
        })
    }

})

/**
 * Devs View Function
 * @param {*} id 
 */
function devsViwe(id) {


    axios.get( 'http://localhost:4390/developers/' + id ).then(res => {
        popupTableBody.innerHTML = `
            <tr>
                <th>ID</th>
                <td>${ res.data.id }</td>
                </tr>
                <tr>
                <th>Name</th>
                <td>${ res.data.name }</td>
                </tr>
                <tr>
                <th>Gmail</th>
                <td>${ res.data.email }</td>
                </tr>
                <tr>
                <th>Gender</th>
                <td>${ res.data.gender }</td>
                </tr>
                <tr>
                <th>Skill</th>
                <td>${ skillViwe(res.data.skillsID) }</td>
            </tr>
        `
        document.querySelector('#viwe_popup_image').setAttribute('src', res.data.photo)
    })

}