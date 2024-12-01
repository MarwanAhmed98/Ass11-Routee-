var SiteNameInputs = document.getElementById("SiteName");
var SiteURLInputs = document.getElementById("SiteUrl");
var BookMarkList = [];
if (localStorage.getItem('BookMarkList') != null) {
    BookMarkList = JSON.parse(localStorage.getItem('BookMarkList'));
    DisplayIndex()
}
function submit() {
    console.log(SiteNameInputs.id);

    if (isUrlValid() && isNameValid()) {
        var BookMark = {
            siteName: SiteNameInputs.value,
            siteurl: SiteURLInputs.value,
        }
        BookMarkList.push(BookMark),
            clear(),
            localStorage.setItem('BookMarkList', JSON.stringify(BookMarkList));
        DisplayIndex();
    }
    else {
        Swal.fire({
            title: "Site Name or Url is not valid, Please follow the rules below :",
            html: `
              <div class="text-start">
        <p><i class="fa-solid fa-circle-right me-1"></i>Site name must contain at least 3 characters</p>
        <p><i class="fa-solid fa-circle-right me-1"></i>Site URL must be a valid one</p>
    </div>
            `,
            showCloseButton: true,
        });
    }
}
function clear() {
    SiteNameInputs.value = null;
    SiteURLInputs.value = null;
    SiteNameInputs.classList.remove('is-valid');
    SiteURLInputs.classList.remove('is-valid');
}
function DisplayIndex() {
    var container = '';
    for (i = 0; i < BookMarkList.length; i++) {
        container += `<tr>
                    <td>${i + 1}</td>
                    <td>${BookMarkList[i].siteName}</td>
                    <td><a  onclick="visitBtn(${i});" class="VisitBtn"><i class="fa-solid fa-eye me-2"></i>Visit</a></td>
                    <td><button onclick="DeleteProduct(${i})" class="DeleteVisit" onclick"DeleteProduct();"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
    </tr>`
    }
    document.getElementById("tbody").innerHTML = container
}
function DeleteProduct(index) {
    BookMarkList.splice(index, 1);
    localStorage.setItem('BookMarkList', JSON.stringify(BookMarkList));

    DisplayIndex()
}
var regex = {
    SiteName: /^[A-Z][a-zA-Z0-9]+( [A-Z][a-zA0-9]+)?$/,
    SiteUrl: /^(https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)$/,
};

function isNameValid() {
    if (regex.SiteName.test(SiteNameInputs.value)) {
        return true
    } else {
        return false
    }
}
SiteNameInputs.addEventListener("keyup", function () {
    if (isNameValid() == true) {
        SiteNameInputs.classList.add('is-valid');
        SiteNameInputs.classList.remove('is-invalid');
    } else {
        SiteNameInputs.classList.add('is-invalid');
        SiteNameInputs.classList.remove('is-valid');
    }
})

function isUrlValid() {
    if (regex.SiteUrl.test(SiteURLInputs.value)) {
        return true
    } else {
        return false
    }
}
SiteURLInputs.addEventListener("keyup", function () {
    if (isUrlValid() == true) {
        SiteURLInputs.classList.add('is-valid');
        SiteURLInputs.classList.remove('is-invalid');
    } else {
        SiteURLInputs.classList.add('is-invalid');
        SiteURLInputs.classList.remove('is-valid');
    }
})

function visitBtn(index) {

    var url = BookMarkList[index].siteurl;
    window.open(url, '_blank');
}