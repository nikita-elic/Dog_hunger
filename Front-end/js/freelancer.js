let vocabulary = {};
(function ($) {
  "use strict";

  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };


  navbarCollapse();

  $(window).scroll(navbarCollapse);

  $('.portfolio-item').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#username',
    modal: true
  });
  $(document).on('click', '.portfolio-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  $(function () {
    $("body").on("input propertychange", ".floating-label-form-group", function (e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function () {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function () {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

})(jQuery);

function showRegisterForm() {
  $('.loginBox').fadeOut('fast', function () {
    $('.registerBox').fadeIn('fast');
    $('.login-footer').fadeOut('fast', function () {
      $('.register-footer').fadeIn('fast');
    });
    document.getElementsByClassName("btn-register")[0].value = vocabulary["createAcc"][JSON.parse(localStorage.getItem('language'))];
    document.getElementById("loginBtn").innerHTML = vocabulary["Login"][JSON.parse(localStorage.getItem('language'))];
    document.getElementById("questionTwo").innerHTML = vocabulary["questionTwo"][JSON.parse(localStorage.getItem('language'))];
    $("#emailREG").prop('placeholder', vocabulary["email"][JSON.parse(localStorage.getItem('language'))]);
    $("#passwordREG").prop('placeholder', vocabulary["pass"][JSON.parse(localStorage.getItem('language'))]);
    $("#name").prop('placeholder', vocabulary["name"][JSON.parse(localStorage.getItem('language'))]);
    $("#surname").prop('placeholder', vocabulary["surname"][JSON.parse(localStorage.getItem('language'))]);
    $("#password_confirmation").prop('placeholder', vocabulary["confPass"][JSON.parse(localStorage.getItem('language'))]);
    $('.modal-title').html(vocabulary["Register"][JSON.parse(localStorage.getItem('language'))]);
  });
  $('.error').removeClass('alert alert-danger').html('');
}

function showLoginForm() {
  $('#loginModal .registerBox').fadeOut('fast', function () {
    $('.loginBox').fadeIn('fast');
    $('.register-footer').fadeOut('fast', function () {
      $('.login-footer').fadeIn('fast');
    });
    document.getElementsByClassName("btn-login")[0].value = vocabulary["Login"][JSON.parse(localStorage.getItem('language'))];
    document.getElementById("questionOne").innerHTML = vocabulary["questionOne"][JSON.parse(localStorage.getItem('language'))];
    document.getElementById("creteBtn").innerHTML = vocabulary["create"][JSON.parse(localStorage.getItem('language'))];
    $("#email").prop('placeholder', vocabulary["email"][JSON.parse(localStorage.getItem('language'))]);
    $("#password").prop('placeholder', vocabulary["pass"][JSON.parse(localStorage.getItem('language'))]);
    $('.modal-title').html(vocabulary["Login"][JSON.parse(localStorage.getItem('language'))]);
  });
  $('.error').removeClass('alert alert-danger').html('');
}

function signOut() {
  let lang = JSON.parse(localStorage.getItem('language'));
  localStorage.clear();
  setLocalStorage(lang, "language");
  document.getElementById("loginBtnA").innerText = vocabulary["Login"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("loginBtnA").onclick = function () { openLoginModal(); };
  document.location.href = "./index.html";
}

function setLocalStorage(objData, name) {
  let forLS = JSON.stringify(objData);
  localStorage.setItem(name, forLS);
}

function openLoginModal() {
  showLoginForm();
  setTimeout(function () {
    $('#loginModal').modal('show');
  }, 230);

}

function openRegisterModal() {
  showRegisterForm();
  setTimeout(function () {
    $('#loginModal').modal('show');
  }, 230);

}

function shakeModal(text, bool) {
  $('#loginModal .modal-dialog').addClass('shake');
  $('.notification').removeClass('alert alert-danger').html("")
  if (bool)
    $('.notification').addClass('alert alert-success').html(text);
  else
    $('.notification').addClass('alert alert-danger').html(text);
  setTimeout(function () {
    $('#loginModal .modal-dialog').removeClass('shake');
  }, 1000);
}

async function registration() {
  if (document.getElementById("emailREG").value == "" || document.getElementById("passwordREG").value == ""
    || document.getElementById("name").value == "" || document.getElementById("surname").value == ""
    || document.getElementById("passwordREG").value != document.getElementById("password_confirmation").value) {
    shakeModal(vocabulary["invalidDataOne"][JSON.parse(localStorage.getItem('language'))], false);
    return;
  }
  else {
    let userRegistrationInfo = {
      "data": {
        "name": document.getElementById("name").value,
        "surname": document.getElementById("surname").value,
        "email": document.getElementById("emailREG").value,
        "password": document.getElementById("passwordREG").value
      }
    }
    if (await registrationFunc(userRegistrationInfo)) {
      shakeModal(vocabulary["rgstrSuccess"][JSON.parse(localStorage.getItem('language'))], true);
      setTimeout(function () { openLoginModal(); $('.notification').removeClass('alert alert-success').html("") }, 1000);
    }
    else { shakeModal(vocabulary["invalidDataTwo"][JSON.parse(localStorage.getItem('language'))], false); }
  }
}

async function login() {
  if (document.getElementById("email").value == "" || document.getElementById("password").value == "") {
    shakeModal(vocabulary["invalidDataTwo"][JSON.parse(localStorage.getItem('language'))], false);
    return;
  }
  else {
    let userLoginInfo = {
      "data": {
        "email": document.getElementById("email").value,
        "password": document.getElementById("password").value
      }
    }
    if (await loginFunc(userLoginInfo)) {
      $("#dogListLi").prop('hidden', false);
      $("#profileLi").prop('hidden', false);
      shakeModal(vocabulary["lgnSuccess"][JSON.parse(localStorage.getItem('language'))], true);
      document.getElementById("loginBtnA").innerText = vocabulary["Logout"][JSON.parse(localStorage.getItem('language'))];
      document.getElementById("loginBtnA").onclick = function () { signOut(); };
      setTimeout(function () { $('#loginModal').modal('hide'); $('.notification').removeClass('alert alert-success').html("") }, 1000);
    }
    else {
      $('input[type="password"]').val('');
      $('input[type="email"]').val('');
      shakeModal(vocabulary["invalidDataTwo"][JSON.parse(localStorage.getItem('language'))], false);
    }
  }
}

async function selectLanguage(lang) {
  setLocalStorage(lang, "language");
  window.location.reload();
}

async function mainPageLoad() {
  Object.assign(vocabulary, (await langFunc()).lang);
  document.getElementsByClassName("lead")[0].innerHTML = vocabulary["purposeOne"][JSON.parse(localStorage.getItem('language'))];
  document.getElementsByClassName("lead")[1].innerHTML = vocabulary["purposeTwo"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("selectLang").innerHTML = vocabulary["selectLang"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("web").innerHTML = vocabulary["web"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("location").innerHTML = vocabulary["location"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("download").innerHTML = vocabulary["download"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("dogListPage").innerHTML = vocabulary["Dog list"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("profilePage").innerHTML = vocabulary["Profile"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("loginBtnA").innerText = vocabulary["Login"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("tagline").innerHTML = vocabulary["tagline"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("userFeedback").innerHTML = vocabulary["userFeedback"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("feedbackLink").innerHTML = vocabulary["feedback"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("contactMe").innerHTML = vocabulary["contactMe"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("contactLink").innerHTML = vocabulary["contact"][JSON.parse(localStorage.getItem('language'))];
  for (let i = 0; i < 2; i++) {
    document.getElementsByClassName("aboutLink")[i].innerHTML = vocabulary["about"][JSON.parse(localStorage.getItem('language'))];
  }
  if (localStorage.length > 1) {
    document.getElementById("loginBtnA").onclick = function () { signOut(); };
    $("#dogListLi").prop('hidden', false);
    $("#profileLi").prop('hidden', false);
  }
  else if (localStorage.length == 1) {
    document.getElementById("loginBtnA").onclick = function () { openLoginModal(); };
    $("#dogListLi").prop('hidden', true);
    $("#profileLi").prop('hidden', true);
  }
  else {
    document.getElementsByClassName("lead")[0].innerHTML = vocabulary["purposeOne"]["en"];
    document.getElementsByClassName("lead")[1].innerHTML = vocabulary["purposeTwo"]["en"];
    document.getElementById("selectLang").innerHTML = vocabulary["selectLang"]["en"];
    document.getElementById("web").innerHTML = vocabulary["web"]["en"];
    document.getElementById("location").innerHTML = vocabulary["location"]["en"];
    document.getElementById("download").innerHTML = vocabulary["download"]["en"];
    document.getElementById("dogListPage").innerHTML = vocabulary["Dog list"]["en"];
    document.getElementById("profilePage").innerHTML = vocabulary["Profile"]["en"];
    document.getElementById("loginBtnA").innerText = vocabulary["Login"]["en"];
    document.getElementById("tagline").innerHTML = vocabulary["tagline"]["en"];
    document.getElementById("userFeedback").innerHTML = vocabulary["userFeedback"]["en"];
    document.getElementById("feedbackLink").innerHTML = vocabulary["feedback"]["en"];
    document.getElementById("contactMe").innerHTML = vocabulary["contactMe"]["en"];
    document.getElementById("contactLink").innerHTML = vocabulary["contact"]["en"];
    for (let i = 0; i < 2; i++) {
      document.getElementsByClassName("aboutLink")[i].innerHTML = vocabulary["about"]["en"];
    }
    document.getElementById("loginBtnA").onclick = function () { openLoginModal(); };
    $("#dogListLi").prop('hidden', true);
    $("#profileLi").prop('hidden', true);
  }
}

var imageURL = "";

async function readURL(input, index) {
  if (input.files && input.files[0]) {
    $('#progress' + index).addClass('progress');
    $('#progressBarLoad' + index).addClass('progress-bar-striped progress-bar-animated');
    $("#editSaveBtn" + index).attr("disabled", "disabled");
    document.getElementById("labelImg" + index).innerText = "Uploading file...";
    var reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    for (let i = 0; i <= 50; ++i) {
      await new Promise(resolve => {
        setTimeout(function () { $("#progressBarLoad" + index).css('width', i + '%'); document.getElementById("progressBarLoad" + index).innerHTML = "<big>" + i + '%' + "</big>"; resolve(); }, 40);
      })
    }
    var x = reader.result.slice(reader.result.indexOf(",") + 1, reader.result.length);
    $.ajax({
      url: "https://api.imgbb.com/1/upload?key=80c91b27aa2d2f7fc0a915c43841b228",
      type: "POST",
      datatype: "json",
      data: { "image": x },
      success: async function (data) {
        imageURL = data.data.url;
        for (let i = 50; i <= 100; ++i) {
          await new Promise(resolve => {
            setTimeout(function () { $("#progressBarLoad" + index).css('width', i + '%'); document.getElementById("progressBarLoad" + index).innerHTML = "<big>" + i + '%' + "</big>"; resolve(); }, 40);
          })
        }
        $('#progressBarLoad' + index).removeClass('progress-bar-striped progress-bar-animated');
        $('#progressBarLoad' + index).addClass('bg-success');
        document.getElementById("progressBarLoad" + index).innerHTML = "<big>Downloaded!</big>";
        $("#editSaveBtn" + index).removeAttr("disabled");
        document.getElementById("labelImg" + index).innerText = "File uploaded successfully. Save your changes.";
        await new Promise(resolve => {
          setTimeout(function () {
            $('#progress' + index).removeClass('progress'); $('#progressBarLoad' + index).removeClass('bg-success');
            $("#progressBarLoad" + index).css('width', '0%'); document.getElementById("progressBarLoad" + index).innerHTML = ""; resolve();
          }, 2000);
        })
      },
      error: function (data) {
        console.log(data);
      }
    });
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}

async function addDog() {
  let dogInfo;
  if (document.getElementById("addDogName").value == "" || document.getElementById("addDogInfo").value == "" || document.getElementById("dogWeightAdd").value == "") {
    shakeModal(vocabulary["invalidDataThree"][JSON.parse(localStorage.getItem('language'))], false);
    return;
  }
  else if (isNaN(document.getElementById("dogWeightAdd").value)) {
    shakeModal(vocabulary["invalidDataFour"][JSON.parse(localStorage.getItem('language'))], false);
    return;
  }
  else {
    if (imageURL.length != "") {
      dogInfo = {
        "data": {
          "name": document.getElementById("addDogName").value,
          "info": document.getElementById("addDogInfo").value,
          "img": imageURL,
          "size": document.getElementById("dogSizeAdd").value,
          "weight": document.getElementById("dogWeightAdd").value,
          "userId": JSON.parse(localStorage.getItem('userID'))
        }
      }
    }
    else {
      dogInfo = {
        "data": {
          "name": document.getElementById("addDogName").value,
          "info": document.getElementById("addDogInfo").value,
          "img": "./img/imageNotAvailable.jpg",
          "size": document.getElementById("dogSizeAdd").value,
          "weight": document.getElementById("dogWeightAdd").value,
          "userId": JSON.parse(localStorage.getItem('userID'))
        }
      }
    }
    if (await addDogFunc(dogInfo)) {
      await dogList();
      imageURL = "";
      shakeModal(vocabulary["dogAddSuccess"][JSON.parse(localStorage.getItem('language'))], true);
      setTimeout(function () { $('#addDog').modal('hide'); $('.notification').removeClass('alert alert-success').html(""); $('input[id="addDogName"]').val(''); document.getElementById("addDogInfo").value = ""; document.getElementById("imgFileAdd").value = ""; }, 2000);
    }
    else { shakeModal(vocabulary["invalidDataFive"][JSON.parse(localStorage.getItem('language'))], false); }
  }
}

async function dogList() {
  Object.assign(vocabulary, (await langFunc()).lang);
  let dogListInfo = {
    "data": {
      "userId": JSON.parse(localStorage.getItem('userID'))
    }
  }
  let dogList = await dogListFunc(dogListInfo);
  let rowInfo = "";
  for (let i = 0; i < dogList.length; ++i) {
    rowInfo += "<div class=\"col-md-6 col-lg-4\">" +
      "<div class=\"card\" style=\"width: 18rem; margin-bottom: 1rem; margin-left: auto; margin-right: auto;\">" +
      "<img id=\"dogImg" + i + "\" class=\"img-fluid\" src=\"" + dogList[i].dogImg + "\" style=\"height: 205px; object-fit: cover; display: block; border-radius: .25rem .25rem 0 0;\" alt=\"\">" +
      "<div class=\"card-body\" >" +
      "<h5 class=\"card-title\">" + dogList[i].dogName + "</h5>" +
      "<p class=\"card-text\" style=\"height: 72px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;\">" + dogList[i].dogInfo + "</p>" +
      "<button id=\"modalInfoInsert" + i + "\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#dogModalInfo\" onclick=\"modalInfoInsert(\'" + dogList[i].dogName + "\', \'" + dogList[i].dogInfo + "\', \'" + dogList[i].dogImg + "\', \'" + dogList[i].dogSize + "\', " + dogList[i].dogWeight + ", " + dogList[i].dogId + ", " + i + ")\">" + vocabulary["moreInfoClick"][JSON.parse(localStorage.getItem('language'))] + "</button>" +
      "<button class=\"btn btn-danger\" type=\"button\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"" + vocabulary["deleteDog"][JSON.parse(localStorage.getItem('language'))] + "\" style=\"float: right;\" onclick=\"deleteDogFromList(" + dogList[i].dogId + ")\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></button>" +
      "</div>" +
      "</div>" +
      "</div>";
  }
  rowInfo += "<div class=\"col-md-6 col-lg-4\">" +
    "<div class=\"card\" style=\"width: 18rem; margin-bottom: 1rem; margin-left: auto; margin-right: auto;\">" +
    "<img class=\"img-fluid\" src=\"./img/addImageIcon.jpg\" style=\"height: 205px; object-fit: cover; display: block; border-radius: .25rem .25rem 0 0;\" alt=\"\">" +
    "<div class=\"card-body\">" +
    "<h5 class=\"card-title\">" + vocabulary["addDog"][JSON.parse(localStorage.getItem('language'))] + "</h5>" +
    "<p class=\"card-text\">" + vocabulary["addDogInfo"][JSON.parse(localStorage.getItem('language'))] + "</p>" +
    "<a href=\"#\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#addDog\">" + vocabulary["addDogClick"][JSON.parse(localStorage.getItem('language'))] + "</a>" +
    "</div>" +
    "</div>" +
    "</div>";
  document.getElementById("dogListBody").innerHTML = rowInfo;
  document.getElementById("vocDogList").innerHTML = vocabulary["list"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("vocAddNewDog").innerHTML = vocabulary["addDog"][JSON.parse(localStorage.getItem('language'))];
  $("#addDogName").prop('placeholder', vocabulary["dogName"][JSON.parse(localStorage.getItem('language'))]);
  $("#dogName").prop('placeholder', vocabulary["dogName"][JSON.parse(localStorage.getItem('language'))]);
  $("#dogInfo").prop('placeholder', vocabulary["dogInfo"][JSON.parse(localStorage.getItem('language'))]);
  $("#addDogInfo").prop('placeholder', vocabulary["dogInfo"][JSON.parse(localStorage.getItem('language'))]);
  document.getElementById("dogImgIns").innerHTML = vocabulary["dogImg"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("ntnssr").innerHTML = vocabulary["ntnssr"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("rplInsPic").innerHTML = vocabulary["rplInsPic"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("stat").innerHTML = vocabulary["stat"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("statSelect").innerHTML = vocabulary["statSelect"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("select").innerHTML = vocabulary["select"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("editSaveBtnAdd").innerHTML = vocabulary["add"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("editSaveBtnEdit").innerHTML = vocabulary["edit"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("dogInfoLabel").innerHTML = vocabulary["dogInfoLabel"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("dailyStat").innerHTML = vocabulary["dailyStat"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("weeklyStat").innerHTML = vocabulary["weeklyStat"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("getNutrition").innerHTML = vocabulary["getNutrition"][JSON.parse(localStorage.getItem('language'))];
  for (let i = 0; i < 2; i++) {
    document.getElementsByClassName("dogName")[i].innerHTML = vocabulary["dogName"][JSON.parse(localStorage.getItem('language'))];
    document.getElementsByClassName("dogSize")[i].innerHTML = vocabulary["dogSize"][JSON.parse(localStorage.getItem('language'))];
    document.getElementsByClassName("size")[i].innerHTML = vocabulary["size"][JSON.parse(localStorage.getItem('language'))];
    document.getElementsByClassName("dogWeight")[i].innerHTML = vocabulary["dogWeight"][JSON.parse(localStorage.getItem('language'))];
    document.getElementsByClassName("weight")[i].innerHTML = vocabulary["weight"][JSON.parse(localStorage.getItem('language'))];
    document.getElementsByClassName("kilos")[i].innerHTML = vocabulary["kilos"][JSON.parse(localStorage.getItem('language'))];
    document.getElementsByClassName("dogInfo")[i].innerHTML = vocabulary["dogInfo"][JSON.parse(localStorage.getItem('language'))];
    document.getElementsByClassName("chooseImg")[i].innerHTML = vocabulary["chooseImg"][JSON.parse(localStorage.getItem('language'))];
    document.getElementsByClassName("closeBtn")[i].innerHTML = vocabulary["close"][JSON.parse(localStorage.getItem('language'))];
    document.getElementsByClassName("closeBtn")[i].innerHTML = vocabulary["close"][JSON.parse(localStorage.getItem('language'))];
  }
  document.getElementById("mainPage").innerHTML = vocabulary["Main"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("dogListPage").innerHTML = vocabulary["Dog list"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("profilePage").innerHTML = vocabulary["Profile"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("loginBtnA").innerText = vocabulary["Logout"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("selectLang").innerHTML = vocabulary["selectLang"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("web").innerHTML = vocabulary["web"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("location").innerHTML = vocabulary["location"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("loginBtnA").onclick = function () { signOut(); };
  $('[data-toggle="tooltip"]').tooltip();
}

async function modalInfoInsert(dogName, dogInfo, dogImg, dogSize, dogWeight, dogId, index) {
  $("#dogLogo").css('background-image', 'url(' + dogImg + ')');
  $('input[id="dogName"]').val(dogName);
  $('textarea[id="dogInfo"]').val(dogInfo);
  $('input[id="dogWeight"]').val(dogWeight);
  if (dogSize == "Small")
    $("#1").attr("selected", "selected");
  else if (dogSize == "Average")
    $("#2").attr("selected", "selected");
  else
    $("#3").attr("selected", "selected");
  document.getElementById("editSaveBtnEdit").setAttribute("onClick", "editDogInfo(" + dogId + ", \'" + dogImg + "\', " + index + ")");
  await getDailyStatistic(dogId);
  await getWeeklyStatistic();
  await getNutrition(dogId, dogSize, dogWeight);
}

async function deleteDogFromList(index) {
  let dogDeleteInfo = {
    "data": {
      "dogId": index
    }
  }
  if (await deleteDogFromListFunc(dogDeleteInfo)) {
    $('[data-toggle="tooltip"]').tooltip('hide')
    await dogList();
    alert(vocabulary["infoDltSuccess"][JSON.parse(localStorage.getItem('language'))]);
  }
  else
    alert(vocabulary["invalidDataFive"][JSON.parse(localStorage.getItem('language'))]);
}

function editDogInfo(dogId, dogImg, index) {
  $("#dogName").prop('readonly', false);
  $("#dogWeight").prop('readonly', false);
  $("#dogSize").removeAttr("disabled");
  $("#dogInfo").prop('readonly', false);
  $("#imgFile").removeAttr("disabled");
  document.getElementById("editSaveBtnEdit").innerText = vocabulary["save"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("editSaveBtnEdit").setAttribute("onClick", "saveDogInfo(" + dogId + ", \'" + dogImg + "\', " + index + ")");
}

async function saveDogInfo(dogId, dogImg, index) {
  let dogUpdateInfo;
  if (imageURL != "") {
    dogUpdateInfo = {
      "data": {
        "dogId": dogId,
        "dogImg": imageURL,
        "dogName": document.getElementById("dogName").value.replace("\'", "\'\'"),
        "dogSize": document.getElementById("dogSize").value,
        "dogWeight": document.getElementById("dogWeight").value,
        "dogInfo": document.getElementById("dogInfo").value.replace("\'", "\'\'")
      }
    }
  }
  else {
    dogUpdateInfo = {
      "data": {
        "dogId": dogId,
        "dogImg": dogImg,
        "dogName": document.getElementById("dogName").value.replace("\'", "\'\'"),
        "dogSize": document.getElementById("dogSize").value,
        "dogWeight": document.getElementById("dogWeight").value,
        "dogInfo": document.getElementById("dogInfo").value.replace("\'", "\'\'")
      }
    }
  }
  imageURL = "";
  if (await saveDogInfoFunc(dogUpdateInfo)) {
    document.getElementById("editSaveBtnEdit").setAttribute("onClick", "editDogInfo(" + dogId + ", \'" + dogUpdateInfo.data.dogImg + "\', " + index + ")");
    document.getElementById("editSaveBtnEdit").innerText = vocabulary["edit"][JSON.parse(localStorage.getItem('language'))];
    document.getElementById("imgFile").value = "";
    document.getElementById("labelImgEdit").innerText = "Choose a photo of your dog";
    $("#imgFile").attr("disabled", "disabled");
    document.getElementsByClassName("card-title")[index].innerText = dogUpdateInfo.data.dogName.replace("\'\'", "\'");
    document.getElementsByClassName("card-text")[index].innerText = dogUpdateInfo.data.dogInfo.replace("\'\'", "\'");
    document.getElementById("dogName").innerText = dogUpdateInfo.data.dogName.replace("\'\'", "\'");
    document.getElementById("dogInfo").innerText = dogUpdateInfo.data.dogInfo.replace("\'\'", "\'");
    document.getElementById("dogWeight").innerText = dogUpdateInfo.data.dogWeight;
    document.getElementById("modalInfoInsert" + index).setAttribute("onClick", "modalInfoInsert(\'" + dogUpdateInfo.data.dogName.replace("\'\'", "\'") + "\', \'" + dogUpdateInfo.data.dogInfo.replace("\'\'", "\'") + "\', \'" + dogUpdateInfo.data.dogImg + "\', \'" + dogUpdateInfo.data.dogSize + "\'," + dogUpdateInfo.data.dogWeight + "," + dogId + ", " + index + ")");
    $("#dogName").prop('readonly', true);
    $("#dogInfo").prop('readonly', true);
    $("#dogWeight").prop('readonly', true);
    $("#dogImg" + index).attr("src", dogUpdateInfo.data.dogImg);
    $("#dogSize").attr("disabled", "disabled");
    $("#dogLogo").css('background-image', 'url(' + dogUpdateInfo.data.dogImg + ')');
    shakeModal(vocabulary["infoUpdSuccess"][JSON.parse(localStorage.getItem('language'))], true);
    setTimeout(function () { $('.notification').removeClass('alert alert-success').html("") }, 2000);
  }
  else
    alert(vocabulary["invalidDataFive"][JSON.parse(localStorage.getItem('language'))]);
}

function profileLoad() {
  document.getElementById("first_name").value = JSON.parse(localStorage.getItem('name'));
  document.getElementById("last_name").value = JSON.parse(localStorage.getItem('surname'));
  document.getElementById("emailProfile").value = JSON.parse(localStorage.getItem('email'));
  document.getElementById("passwordProfile").value = JSON.parse(localStorage.getItem('password'));
}

function clearModal() {
  document.getElementById("editSaveBtnEdit").innerText = vocabulary["edit"][JSON.parse(localStorage.getItem('language'))];
  document.getElementById("imgFile").value = "";
  document.getElementById("labelImgEdit").innerText = vocabulary["chooseImg"][JSON.parse(localStorage.getItem('language'))];
  $("#imgFile").attr("disabled", "disabled");
  $("#dogName").prop('readonly', true);
  $("#dogInfo").prop('readonly', true);
  $("#dogWeight").prop('readonly', true);
  $("#dogSize").attr("disabled", "disabled");
  dailyChart.destroy();
  weeklyChart.destroy();
  for (let i = 1; i < 4; i++) {
    $("#" + i).removeAttr("selected");
  }
}

let statisticArray;
var dailyChart;
var weeklyChart;
async function getDailyStatistic(dogId) {
  dogStatInfo = {
    "data": {
      "dogId": dogId
    }
  }
  statisticArray = await getStatisticFunc(dogStatInfo);
  let dateList = [];
  let statisticDate = [];
  let statisticTemp = [];
  let statisticHeartbeat = [];
  let statisticSystolicPressure = [];
  let statisticDiastolicPressure = [];
  let optionsString;
  for (let i = 0; i < statisticArray.length; i++) {
    let date = new Date(Date.parse(statisticArray[i].statDateTime));
    date.setUTCHours(date.getUTCHours() + date.getTimezoneOffset() / 60);
    if (dateList.length == 0)
      dateList.push(date.toLocaleString().split(',')[0]);
    else if (dateList[dateList.length - 1] == date.toLocaleString().split(',')[0])
      continue;
    else
      dateList.push(date.toLocaleString().split(',')[0]);
  }
  for (let i = 0; i < dateList.length; i++) {
    optionsString += "<option>" + dateList[i] + "</option>";
  }
  document.getElementById("dogDailyStat").innerHTML = optionsString;
  for (let i = 0; i < statisticArray.length; i++) {
    let date = new Date(Date.parse(statisticArray[i].statDateTime));
    date.setUTCHours(date.getUTCHours() - 3);
    if (statisticDate.length == 0 && statisticTemp.length == 0 && statisticHeartbeat.length == 0 && statisticSystolicPressure.length == 0 && statisticDiastolicPressure.length == 0) {
      statisticDate.push(statisticArray[i].statDateTime);
      statisticTemp.push(statisticArray[i].statTemp);
      statisticHeartbeat.push(statisticArray[i].statHeartbeat);
      statisticSystolicPressure.push(statisticArray[i].statBloodPre.split('x')[0]);
      statisticDiastolicPressure.push(statisticArray[i].statBloodPre.split('x')[1]);
    }
    else if (dateList[0] == date.toLocaleString().split(',')[0]) {
      statisticDate.push(statisticArray[i].statDateTime);
      statisticTemp.push(statisticArray[i].statTemp);
      statisticHeartbeat.push(statisticArray[i].statHeartbeat);
      statisticSystolicPressure.push(statisticArray[i].statBloodPre.split('x')[0]);
      statisticDiastolicPressure.push(statisticArray[i].statBloodPre.split('x')[1]);
    }
    else
      break;
  }
  var options = {
    annotations: {
      /*yaxis: [{
        y: 8200,
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396',
          },
          text: 'Support',
        }
      }, {
        y: 8600,
        y2: 9000,
        borderColor: '#000',
        fillColor: '#FEB019',
        opacity: 0.2,
        label: {
          borderColor: '#333',
          style: {
            fontSize: '10px',
            color: '#333',
            background: '#FEB019',
          },
          text: 'Y-axis range',
        }
      }],*/
      xaxis: [{
        x: new Date(statisticDate[Math.round((statisticDate.length) / 3)]).getTime(),
        strokeDashArray: 0,
        borderColor: '#775DD0',
        label: {
          borderColor: '#775DD0',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: vocabulary["dogAte"][JSON.parse(localStorage.getItem('language'))],
        }
      }, {
        x: new Date(statisticDate[Math.round((statisticDate.length) / 2)]).getTime(),
        strokeDashArray: 0,
        borderColor: '#775DD0',
        label: {
          borderColor: '#775DD0',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: vocabulary["dogAte"][JSON.parse(localStorage.getItem('language'))],
        }
      }, {
        x: new Date(statisticDate[Math.round((statisticDate.length) / 1.5)]).getTime(),
        strokeDashArray: 0,
        borderColor: '#775DD0',
        label: {
          borderColor: '#775DD0',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: vocabulary["dogAte"][JSON.parse(localStorage.getItem('language'))],
        }
      }]/*, {
        x: new Date('26 Nov 2017').getTime(),
        x2: new Date('28 Nov 2017').getTime(),
        fillColor: '#B3F7CA',
        opacity: 0.4,
        label: {
          borderColor: '#B3F7CA',
          style: {
            fontSize: '10px',
            color: '#fff',
            background: '#00E396',
          },
          offsetY: -10,
          text: 'X-axis range',
        }
      }],
      points: [{
        x: new Date('01 Dec 2017').getTime(),
        y: 8607.55,
        marker: {
          size: 8,
          fillColor: '#fff',
          strokeColor: 'red',
          radius: 2,
          cssClass: 'apexcharts-custom-class'
        },
        label: {
          borderColor: '#FF4560',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#FF4560',
          },
          text: 'Point Annotation',
        }
      }]*/
    },
    chart: {
      height: 600,
      type: 'line',
      id: 'areachart-2'
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    grid: {
      padding: {
        right: 10,
        left: 5
      }
    },
    markers: {
      size: 6
    },
    series: [{
      name: vocabulary["temp"][JSON.parse(localStorage.getItem('language'))],
      data: statisticTemp
    },
    {
      name: vocabulary["hrtBeat"][JSON.parse(localStorage.getItem('language'))],
      data: statisticHeartbeat
    },
    {
      name: vocabulary["sysPres"][JSON.parse(localStorage.getItem('language'))],
      data: statisticSystolicPressure
    },
    {
      name: vocabulary["diasPres"][JSON.parse(localStorage.getItem('language'))],
      data: statisticDiastolicPressure
    }],
    title: {
      text: vocabulary["hrlStat"][JSON.parse(localStorage.getItem('language'))],
      align: 'left'
    },
    labels: statisticDate,
    xaxis: {
      type: 'datetime',
      title: {
        text: vocabulary["dateTime"][JSON.parse(localStorage.getItem('language'))]
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -8
    }
  }

  dailyChart = new ApexCharts(document.querySelector("#dailyChart"), options);
  dailyChart.render();
}

let theFirstDayOfTheWeek = []
async function getWeeklyStatistic() {
  let dateList = [];
  let statisticDate = [];
  let statisticTemp = [];
  let statisticTempAvr = 0;
  let statisticHeartbeat = [];
  let statisticHeartbeatAvr = 0;
  let statisticSystolicPressure = [];
  let statisticSystolicPressureAvr = 0;
  let statisticDiastolicPressure = [];
  let statisticDiastolicPressureAvr = 0;
  let optionsString = "";
  let count = 1;
  let lastDay = 32;
  let lastDays = 0;
  let firstDay = 0;
  for (let i = 0; i < statisticArray.length; i++) {
    let date = new Date(Date.parse(statisticArray[i].statDateTime));
    date.setUTCHours(date.getUTCHours() + date.getTimezoneOffset() / 60);
    if (firstDay != date.getUTCDate() && date.getUTCDay() == 1 || firstDay != date.getUTCDate() && date.getUTCDate() == 1) {
      theFirstDayOfTheWeek.push(date.getUTCDate());
      firstDay = date.getUTCDate();
    }
    if (date.getUTCDay() == 0 && lastDay != date.getUTCDate()) {
      dateList.push(count++);
      lastDay = date.getUTCDate();
    }
    else if (i == statisticArray.length - 1 && date.getUTCDay() != 0) {
      dateList.push(count++);
      theFirstDayOfTheWeek.push(date.getUTCDate() + 1);
    }
    else
      continue;
  }
  for (let i = 0; i < dateList.length; i++) {
    optionsString += "<option>" + dateList[i] + "</option>";
  }
  document.getElementById("dogWeeklyStat").innerHTML = optionsString;
  for (let i = 0; i < statisticArray.length; i++) {
    let date = new Date(Date.parse(statisticArray[i].statDateTime));
    date.setUTCHours(date.getUTCHours() - 3);
    if (statisticDate.length == 0 && statisticTemp.length == 0 && statisticHeartbeat.length == 0 && statisticSystolicPressure.length == 0 && statisticDiastolicPressure.length == 0) {
      statisticDate.push(statisticArray[0].statDateTime.split('T')[0]);
      statisticTempAvr += statisticArray[0].statTemp;
      statisticHeartbeatAvr += statisticArray[0].statHeartbeat;
      statisticSystolicPressureAvr += parseInt(statisticArray[0].statBloodPre.split('x')[0], 10);
      statisticDiastolicPressureAvr += parseInt(statisticArray[0].statBloodPre.split('x')[1], 10);
      lastDays = statisticArray[0].statDateTime.split('T')[0];
    }
    else if (date.getUTCDate() != theFirstDayOfTheWeek[document.getElementById("dogWeeklyStat").value]) {
      if (statisticArray[i].statDateTime.split('T')[0] == lastDays) {
        statisticTempAvr += statisticArray[i].statTemp;
        statisticHeartbeatAvr += statisticArray[i].statHeartbeat;
        statisticSystolicPressureAvr += parseInt(statisticArray[i].statBloodPre.split('x')[0], 10);
        statisticDiastolicPressureAvr += parseInt(statisticArray[i].statBloodPre.split('x')[1], 10);
      }
      else {
        statisticTemp.push(Math.round(statisticTempAvr / 24));
        statisticHeartbeat.push(Math.round(statisticHeartbeatAvr / 24));
        statisticSystolicPressure.push(Math.round(statisticSystolicPressureAvr / 24));
        statisticDiastolicPressure.push(Math.round(statisticDiastolicPressureAvr / 24));
        statisticTempAvr = 0;
        statisticHeartbeatAvr = 0;
        statisticSystolicPressureAvr = 0;
        statisticDiastolicPressureAvr = 0;
        statisticDate.push(statisticArray[i].statDateTime.split('T')[0]);
        lastDays = statisticArray[i].statDateTime.split('T')[0];
      }
    }
    else
      break;
  }
  statisticDate.pop();
  var options = {
    annotations: {
      /*yaxis: [{
        y: 8200,
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396',
          },
          text: 'Support',
        }
      }, {
        y: 8600,
        y2: 9000,
        borderColor: '#000',
        fillColor: '#FEB019',
        opacity: 0.2,
        label: {
          borderColor: '#333',
          style: {
            fontSize: '10px',
            color: '#333',
            background: '#FEB019',
          },
          text: 'Y-axis range',
        }
      }],
      xaxis: [{
        x: new Date(statisticDate[Math.round((statisticDate.length) / 3)]).getTime(),
        strokeDashArray: 0,
        borderColor: '#775DD0',
        label: {
          borderColor: '#775DD0',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: vocabulary["dogAte"][JSON.parse(localStorage.getItem('language'))],
        }
      }, {
        x: new Date(statisticDate[Math.round((statisticDate.length) / 2)]).getTime(),
        strokeDashArray: 0,
        borderColor: '#775DD0',
        label: {
          borderColor: '#775DD0',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: vocabulary["dogAte"][JSON.parse(localStorage.getItem('language'))],
        }
      }, {
        x: new Date(statisticDate[Math.round((statisticDate.length) / 1.5)]).getTime(),
        strokeDashArray: 0,
        borderColor: '#775DD0',
        label: {
          borderColor: '#775DD0',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: vocabulary["dogAte"][JSON.parse(localStorage.getItem('language'))],
        }
      }], {
    x: new Date('26 Nov 2017').getTime(),
    x2: new Date('28 Nov 2017').getTime(),
    fillColor: '#B3F7CA',
    opacity: 0.4,
    label: {
      borderColor: '#B3F7CA',
      style: {
        fontSize: '10px',
        color: '#fff',
        background: '#00E396',
      },
      offsetY: -10,
      text: 'X-axis range',
    }
  }],
  points: [{
    x: new Date('01 Dec 2017').getTime(),
    y: 8607.55,
    marker: {
      size: 8,
      fillColor: '#fff',
      strokeColor: 'red',
      radius: 2,
      cssClass: 'apexcharts-custom-class'
    },
    label: {
      borderColor: '#FF4560',
      offsetY: 0,
      style: {
        color: '#fff',
        background: '#FF4560',
      },
      text: 'Point Annotation',
    }
  }]*/
    },
    chart: {
      height: 600,
      type: 'line',
      id: 'areachart-2'
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    grid: {
      padding: {
        right: 10,
        left: 5
      }
    },
    markers: {
      size: 6
    },
    series: [{
      name: vocabulary["temp"][JSON.parse(localStorage.getItem('language'))],
      data: statisticTemp
    },
    {
      name: vocabulary["hrtBeat"][JSON.parse(localStorage.getItem('language'))],
      data: statisticHeartbeat
    },
    {
      name: vocabulary["sysPres"][JSON.parse(localStorage.getItem('language'))],
      data: statisticSystolicPressure
    },
    {
      name: vocabulary["diasPres"][JSON.parse(localStorage.getItem('language'))],
      data: statisticDiastolicPressure
    }],
    title: {
      text: "Daily statistics",
      align: 'left'
    },
    labels: statisticDate,
    xaxis: {
      type: 'datetime',
      title: {
        text: vocabulary["dateTime"][JSON.parse(localStorage.getItem('language'))]
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -8
    }
  }

  weeklyChart = new ApexCharts(document.querySelector("#weeklyChart"), options);
  weeklyChart.render();
}

async function redrawDogDailyStat() {
  let statisticDate = [];
  let statisticTemp = [];
  let statisticHeartbeat = [];
  let statisticSystolicPressure = [];
  let statisticDiastolicPressure = [];
  for (let i = 0; i < statisticArray.length; i++) {
    let date = new Date(Date.parse(statisticArray[i].statDateTime));
    date.setUTCHours(date.getUTCHours() - 3);
    if (document.getElementById("dogDailyStat").value == date.toLocaleString().split(',')[0]) {
      statisticDate.push(statisticArray[i].statDateTime);
      statisticTemp.push(statisticArray[i].statTemp);
      statisticHeartbeat.push(statisticArray[i].statHeartbeat);
      statisticSystolicPressure.push(statisticArray[i].statBloodPre.split('x')[0]);
      statisticDiastolicPressure.push(statisticArray[i].statBloodPre.split('x')[1]);
    }
    else
      continue;
  }
  var options = {
    annotations: {
      /*yaxis: [{
        y: 8200,
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396',
          },
          text: 'Support',
        }
      }, {
        y: 8600,
        y2: 9000,
        borderColor: '#000',
        fillColor: '#FEB019',
        opacity: 0.2,
        label: {
          borderColor: '#333',
          style: {
            fontSize: '10px',
            color: '#333',
            background: '#FEB019',
          },
          text: 'Y-axis range',
        }
      }],*/
      xaxis: [{
        x: new Date(statisticDate[Math.round((statisticDate.length) / 3)]).getTime(),
        strokeDashArray: 0,
        borderColor: '#775DD0',
        label: {
          borderColor: '#775DD0',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: vocabulary["dogAte"][JSON.parse(localStorage.getItem('language'))],
        }
      }, {
        x: new Date(statisticDate[Math.round((statisticDate.length) / 2)]).getTime(),
        strokeDashArray: 0,
        borderColor: '#775DD0',
        label: {
          borderColor: '#775DD0',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: vocabulary["dogAte"][JSON.parse(localStorage.getItem('language'))],
        }
      }, {
        x: new Date(statisticDate[Math.round((statisticDate.length) / 1.5)]).getTime(),
        strokeDashArray: 0,
        borderColor: '#775DD0',
        label: {
          borderColor: '#775DD0',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: vocabulary["dogAte"][JSON.parse(localStorage.getItem('language'))],
        }
      }]/*, {
        x: new Date('26 Nov 2017').getTime(),
        x2: new Date('28 Nov 2017').getTime(),
        fillColor: '#B3F7CA',
        opacity: 0.4,
        label: {
          borderColor: '#B3F7CA',
          style: {
            fontSize: '10px',
            color: '#fff',
            background: '#00E396',
          },
          offsetY: -10,
          text: 'X-axis range',
        }
      }],
      points: [{
        x: new Date('01 Dec 2017').getTime(),
        y: 8607.55,
        marker: {
          size: 8,
          fillColor: '#fff',
          strokeColor: 'red',
          radius: 2,
          cssClass: 'apexcharts-custom-class'
        },
        label: {
          borderColor: '#FF4560',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#FF4560',
          },
          text: 'Point Annotation',
        }
      }]*/
    },
    chart: {
      height: 600,
      type: 'line',
      id: 'areachart-2'
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    grid: {
      padding: {
        right: 10,
        left: 5
      }
    },
    markers: {
      size: 6
    },
    series: [{
      name: vocabulary["temp"][JSON.parse(localStorage.getItem('language'))],
      data: statisticTemp
    },
    {
      name: vocabulary["hrtBeat"][JSON.parse(localStorage.getItem('language'))],
      data: statisticHeartbeat
    },
    {
      name: vocabulary["sysPres"][JSON.parse(localStorage.getItem('language'))],
      data: statisticSystolicPressure
    },
    {
      name: vocabulary["diasPres"][JSON.parse(localStorage.getItem('language'))],
      data: statisticDiastolicPressure
    }],
    title: {
      text: vocabulary["hrlStat"][JSON.parse(localStorage.getItem('language'))],
      align: 'left'
    },
    labels: statisticDate,
    xaxis: {
      type: 'datetime',
      title: {
        text: vocabulary["dateTime"][JSON.parse(localStorage.getItem('language'))]
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -8
    }
  }
  dailyChart.destroy();
  dailyChart = new ApexCharts(document.querySelector("#dailyChart"), options);
  dailyChart.render();
}

async function redrawDogWeeklyStat() {
  let statisticDate = [];
  let statisticTemp = [];
  let statisticTempAvr = 0;
  let statisticHeartbeat = [];
  let statisticHeartbeatAvr = 0;
  let statisticSystolicPressure = [];
  let statisticSystolicPressureAvr = 0;
  let statisticDiastolicPressure = [];
  let statisticDiastolicPressureAvr = 0;
  for (let i = 0; i < statisticArray.length; i++) {
    let date = new Date(Date.parse(statisticArray[i].statDateTime));
    date.setUTCHours(date.getUTCHours() - 3);
    if (date.getUTCDate() >= theFirstDayOfTheWeek[document.getElementById("dogWeeklyStat").value - 1] && date.getUTCDate() < theFirstDayOfTheWeek[document.getElementById("dogWeeklyStat").value]) {
      if (statisticDate.length == 0 && statisticTemp.length == 0 && statisticHeartbeat.length == 0 && statisticSystolicPressure.length == 0 && statisticDiastolicPressure.length == 0) {
        statisticDate.push(statisticArray[i].statDateTime.split('T')[0]);
        statisticTempAvr += statisticArray[i].statTemp;
        statisticHeartbeatAvr += statisticArray[i].statHeartbeat;
        statisticSystolicPressureAvr += parseInt(statisticArray[i].statBloodPre.split('x')[0], 10);
        statisticDiastolicPressureAvr += parseInt(statisticArray[i].statBloodPre.split('x')[1], 10);
        lastDays = statisticArray[i].statDateTime.split('T')[0];
      }
      if (statisticArray[i].statDateTime.split('T')[0] == lastDays) {
        statisticTempAvr += statisticArray[i].statTemp;
        statisticHeartbeatAvr += statisticArray[i].statHeartbeat;
        statisticSystolicPressureAvr += parseInt(statisticArray[i].statBloodPre.split('x')[0], 10);
        statisticDiastolicPressureAvr += parseInt(statisticArray[i].statBloodPre.split('x')[1], 10);
      }
      else {
        statisticTemp.push(Math.round(statisticTempAvr / 24));
        statisticHeartbeat.push(Math.round(statisticHeartbeatAvr / 24));
        statisticSystolicPressure.push(Math.round(statisticSystolicPressureAvr / 24));
        statisticDiastolicPressure.push(Math.round(statisticDiastolicPressureAvr / 24));
        statisticTempAvr = 0;
        statisticHeartbeatAvr = 0;
        statisticSystolicPressureAvr = 0;
        statisticDiastolicPressureAvr = 0;
        statisticDate.push(statisticArray[i].statDateTime.split('T')[0]);
        lastDays = statisticArray[i].statDateTime.split('T')[0];
      }
    }
    else
      continue;
  }
  statisticDate.pop();
  var options = {
    annotations: {
      /*yaxis: [{
        y: 8200,
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396',
          },
          text: 'Support',
        }
      }, {
        y: 8600,
        y2: 9000,
        borderColor: '#000',
        fillColor: '#FEB019',
        opacity: 0.2,
        label: {
          borderColor: '#333',
          style: {
            fontSize: '10px',
            color: '#333',
            background: '#FEB019',
          },
          text: 'Y-axis range',
        }
      }],
      xaxis: [{
        x: new Date(statisticDate[Math.round((statisticDate.length) / 3)]).getTime(),
        strokeDashArray: 0,
        borderColor: '#775DD0',
        label: {
          borderColor: '#775DD0',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: vocabulary["dogAte"][JSON.parse(localStorage.getItem('language'))],
        }
      }, {
        x: new Date(statisticDate[Math.round((statisticDate.length) / 2)]).getTime(),
        strokeDashArray: 0,
        borderColor: '#775DD0',
        label: {
          borderColor: '#775DD0',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: vocabulary["dogAte"][JSON.parse(localStorage.getItem('language'))],
        }
      }, {
        x: new Date(statisticDate[Math.round((statisticDate.length) / 1.5)]).getTime(),
        strokeDashArray: 0,
        borderColor: '#775DD0',
        label: {
          borderColor: '#775DD0',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: vocabulary["dogAte"][JSON.parse(localStorage.getItem('language'))],
        }
      }], {
        x: new Date('26 Nov 2017').getTime(),
        x2: new Date('28 Nov 2017').getTime(),
        fillColor: '#B3F7CA',
        opacity: 0.4,
        label: {
          borderColor: '#B3F7CA',
          style: {
            fontSize: '10px',
            color: '#fff',
            background: '#00E396',
          },
          offsetY: -10,
          text: 'X-axis range',
        }
      }],
      points: [{
        x: new Date('01 Dec 2017').getTime(),
        y: 8607.55,
        marker: {
          size: 8,
          fillColor: '#fff',
          strokeColor: 'red',
          radius: 2,
          cssClass: 'apexcharts-custom-class'
        },
        label: {
          borderColor: '#FF4560',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#FF4560',
          },
          text: 'Point Annotation',
        }
      }]*/
    },
    chart: {
      height: 600,
      type: 'line',
      id: 'areachart-2'
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    grid: {
      padding: {
        right: 10,
        left: 5
      }
    },
    markers: {
      size: 6
    },
    series: [{
      name: vocabulary["temp"][JSON.parse(localStorage.getItem('language'))],
      data: statisticTemp
    },
    {
      name: vocabulary["hrtBeat"][JSON.parse(localStorage.getItem('language'))],
      data: statisticHeartbeat
    },
    {
      name: vocabulary["sysPres"][JSON.parse(localStorage.getItem('language'))],
      data: statisticSystolicPressure
    },
    {
      name: vocabulary["diasPres"][JSON.parse(localStorage.getItem('language'))],
      data: statisticDiastolicPressure
    }],
    title: {
      text: vocabulary["hrlStat"][JSON.parse(localStorage.getItem('language'))],
      align: 'left'
    },
    labels: statisticDate,
    xaxis: {
      type: 'datetime',
      title: {
        text: vocabulary["dateTime"][JSON.parse(localStorage.getItem('language'))]
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -8
    }
  }
  weeklyChart.destroy();
  weeklyChart = new ApexCharts(document.querySelector("#weeklyChart"), options);
  weeklyChart.render();
}

async function getNutrition(dogId, dogSize, dogWeight) {
  dogStatInfo = {
    "data": {
      "dogId": dogId
    }
  }
  let statisticTempAvr = 0;
  let statisticHeartbeatAvr = 0;
  let statisticSystolicPressureAvr = 0;
  let statisticDiastolicPressureAvr = 0;
  let getMinMaxValues = await getNutritionFunc(dogStatInfo);
  for (let i = 0; i < statisticArray.length; i++) {
    statisticTempAvr += statisticArray[i].statTemp;
    statisticHeartbeatAvr += statisticArray[i].statHeartbeat;
    statisticSystolicPressureAvr += parseInt(statisticArray[i].statBloodPre.split('x')[0], 10);
    statisticDiastolicPressureAvr += parseInt(statisticArray[i].statBloodPre.split('x')[1], 10);
  }
  statisticTempAvr = (statisticTempAvr / statisticArray.length).toFixed(1);
  statisticHeartbeatAvr = Math.round(statisticHeartbeatAvr / statisticArray.length);
  statisticSystolicPressureAvr = Math.round(statisticSystolicPressureAvr / statisticArray.length);
  statisticDiastolicPressureAvr = Math.round(statisticDiastolicPressureAvr / statisticArray.length);
  $('input[id="avrHeartInput"]').val(statisticHeartbeatAvr);
  $('input[id="minHeartInput"]').val(getMinMaxValues[0].SmallestHeartbeat);
  $('input[id="maxHeartInput"]').val(getMinMaxValues[0].LargestHeartbeat);
  $('input[id="avrTempInput"]').val(statisticTempAvr);
  $('input[id="minTempInput"]').val(getMinMaxValues[0].SmallestTemp);
  $('input[id="maxTempInput"]').val(getMinMaxValues[0].LargestTemp);
  $('input[id="avrSysPreInput"]').val(statisticSystolicPressureAvr);
  $('input[id="avrDiasPreInput"]').val(statisticDiastolicPressureAvr);
  if (dogSize == "Small" && dogWeight >= 5 && dogWeight <= 15) {
    $('textarea[id="nutritionRecommendations"]').val("Your dog is fine. The interval between feeding is not more than 4 hours." +
      " Food should be full and fresh. The heart rate falls within the permissible limits of 80-120 beats per minute, while your pet has " + statisticHeartbeatAvr
      + " beats per minute. The puppy should not be overfed, but he should eat enough to feed. Your pet's weight is within the normal range." +
      "Normal temperature in dogs ranges from 37.8 to 39.2 C. Your pet’s average temperature is " + statisticTempAvr + " degrees Celsius, which is normal.");
  }
  else if (dogSize == "Small" && dogWeight < 5) {
    $('textarea[id="nutritionRecommendations"]').val("Your dog is starving! It is necessary to increase the amount of feed and increase the number of meals per day!" +
      "Your dog weighs " + dogWeight + " kg, while it should weigh from 5 to 15 kg, given its complexion.");
  }
  else if (dogSize == "Small" && dogWeight > 15) {
    $('textarea[id="nutritionRecommendations"]').val("Your dog is overeating! You need to reduce the amount of food and reduce the number of meals per day!" +
      " Your dog weighs " + dogWeight + " kg, while it should weigh from 5 to 15 kg, given its complexion.");
  }
  if (dogSize == "Average" && dogWeight >= 15 && dogWeight <= 25) {
    $('textarea[id="nutritionRecommendations"]').val("Your dog is fine. The interval between feeding is not more than 4 hours." +
      " Food should be full and fresh. The heart rate falls within the permissible limits of 60-120 beats per minute, while your pet has " + statisticHeartbeatAvr
      + " beats per minute. The puppy should not be overfed, but he should eat enough to feed. Your pet's weight is within the normal range." +
      "Normal temperature in dogs ranges from 37.8 to 39.2 C. Your pet’s average temperature is " + statisticTempAvr + " degrees Celsius, which is normal.");
  }
  else if (dogSize == "Average" && dogWeight < 15) {
    $('textarea[id="nutritionRecommendations"]').val("Your dog is starving! It is necessary to increase the amount of feed and increase the number of meals per day!" +
      "Your dog weighs " + dogWeight + " kg, while it should weigh from 15 to 25 kg, given its complexion.");
  }
  else if (dogSize == "Average" && dogWeight > 25) {
    $('textarea[id="nutritionRecommendations"]').val("Your dog is overeating! You need to reduce the amount of food and reduce the number of meals per day!" +
      " Your dog weighs " + dogWeight + " kg, while it should weigh from 5 to 15 kg, given its complexion.");
  }
  if (dogSize == "Large" && dogWeight >= 25 && dogWeight <= 35) {
    $('textarea[id="nutritionRecommendations"]').val("Your dog is fine. The interval between feeding is not more than 4 hours." +
      " Food should be full and fresh. The heart rate falls within the permissible limits of 60-110 beats per minute, while your pet has " + statisticHeartbeatAvr
      + " beats per minute. The puppy should not be overfed, but he should eat enough to feed. Your pet's weight is within the normal range." +
      "Normal temperature in dogs ranges from 37.8 to 39.2 C. Your pet’s average temperature is " + statisticTempAvr + " degrees Celsius, which is normal.");
  }
  else if (dogSize == "Large" && dogWeight < 25) {
    $('textarea[id="nutritionRecommendations"]').val("Your dog is starving! It is necessary to increase the amount of feed and increase the number of meals per day!" +
      "Your dog weighs " + dogWeight + " kg, while it should weigh from 25 to 35 kg, given its complexion.");
  }
  else if (dogSize == "Large" && dogWeight > 35) {
    $('textarea[id="nutritionRecommendations"]').val("Your dog is overeating! You need to reduce the amount of food and reduce the number of meals per day!" +
      " Your dog weighs " + dogWeight + " kg, while it should weigh from 5 to 15 kg, given its complexion.");
  }
}

async function getNutritionFunc(dogStatInfo) {
  let result;
  await new Promise(resolve => {
    $.ajax({
      method: "POST",
      url: connect + "user/dog/nutrition",
      headers: {
        "Content-Type": "application/json",
        "token": JSON.parse(localStorage.getItem('token'))
      },
      data: JSON.stringify(dogStatInfo),
      success: function (data) {
        result = data;
        resolve();
      },
      error: function (err) {
        console.log(err);
        result = false;
        resolve();
      }
    });
  });
  return result;
}

async function addDogFunc(dogInfo) {
  let result;
  await new Promise(resolve => {
    $.ajax({
      method: "POST",
      url: connect + "user/dog/add",
      headers: {
        "Content-Type": "application/json",
        "token": JSON.parse(localStorage.getItem('token'))
      },
      data: JSON.stringify(dogInfo),
      success: function (data) {
        result = true;
        resolve();
      },
      error: function (err) {
        console.log(err);
        result = false;
        resolve();
      }
    });
  });
  return result;
}

async function deleteDogFromListFunc(dogDeleteInfo) {
  let result;
  await new Promise(resolve => {
    $.ajax({
      method: "POST",
      url: connect + "user/dog/delete",
      headers: {
        "Content-Type": "application/json",
        "token": JSON.parse(localStorage.getItem('token'))
      },
      data: JSON.stringify(dogDeleteInfo),
      success: function (data) {
        result = true;
        resolve();
      },
      error: function (err) {
        console.log(err);
        result = false;
        resolve();
      }
    });
  });
  return result;
}

async function saveDogInfoFunc(dogUpdateInfo) {
  let result;
  await new Promise(resolve => {
    $.ajax({
      method: "POST",
      url: connect + "user/dog/update",
      headers: {
        "Content-Type": "application/json",
        "token": JSON.parse(localStorage.getItem('token'))
      },
      data: JSON.stringify(dogUpdateInfo),
      success: function (data) {
        result = true;
        resolve();
      },
      error: function (err) {
        console.log(err);
        result = false;
        resolve();
      }
    });
  });
  return result;
}

async function registrationFunc(userRegistrationInfo) {
  let result;
  await new Promise(resolve => {
    $.ajax({
      method: "POST",
      url: connect + "user/registration",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(userRegistrationInfo),
      success: function (data) {
        console.log(data);
        result = true;
        resolve();
      },
      error: function (err) {
        console.log(err);
        result = false;
        resolve();
      }
    });
  });
  return result;
}

async function loginFunc(userLoginInfo) {
  let result;
  await new Promise(resolve => {
    $.ajax({
      method: "POST",
      url: connect + "user/authorization",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(userLoginInfo),
      success: function (data) {
        if (localStorage.length == 0)
          setLocalStorage("en", "language");
        setLocalStorage(data.id, 'userID');
        setLocalStorage(data.name, 'name');
        setLocalStorage(data.token, 'token');
        setLocalStorage(data.surname, 'surname');
        setLocalStorage(document.getElementById("email").value, 'email');
        setLocalStorage(document.getElementById("password").value, 'password');
        result = true;
        resolve();
      },
      error: function (err) {
        console.log(err);
        result = false;
        resolve();
      }
    });
  });
  return result;
}

async function dogListFunc(dogListInfo) {
  let result;
  await new Promise(resolve => {
    $.ajax({
      method: "POST",
      url: connect + "user/dog/list",
      headers: {
        "Content-Type": "application/json",
        "token": JSON.parse(localStorage.getItem('token'))
      },
      data: JSON.stringify(dogListInfo),
      success: function (data) {
        result = data;
        resolve();
      },
      error: function (err) {
        console.log(err);
        result = false;
        resolve();
      }
    });
  });
  return result;
}

async function getStatisticFunc(dogStatInfo) {
  let result;
  await new Promise(resolve => {
    $.ajax({
      method: "POST",
      url: connect + "user/dog/statistic",
      headers: {
        "Content-Type": "application/json",
        "token": JSON.parse(localStorage.getItem('token'))
      },
      data: JSON.stringify(dogStatInfo),
      success: function (data) {
        result = data;
        resolve();
      },
      error: function (err) {
        console.log(err);
        result = false;
        resolve();
      }
    });
  });
  return result;
}

async function langFunc() {
  let result;
  await new Promise(resolve => {
    $.ajax({
      method: "POST",
      url: connect + "interface/lang",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(),
      success: function (data) {
        result = data;
        resolve();
      },
      error: function (err) {
        console.log(err);
        result = false;
        resolve();
      }
    });
  });
  return result;
}