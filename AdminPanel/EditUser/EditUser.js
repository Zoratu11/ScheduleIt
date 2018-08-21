    function editDetails() {
        //Make so clicking on the edit icon nothing happens until the details are saved in handleSaveChanges()
        const editDetailsIcon = document.getElementById("editDetailsIcon");
        editDetailsIcon.onclick = null;


        const tLeft = document.getElementById("detailsTableLeft");
        const tdCollectionLeft = tLeft.getElementsByTagName("td");
        const tRight = document.getElementById("detailsTableRight");
        const tdCollectionRight = tRight.getElementsByTagName("td");

        const tdArrayRight = Array.from(tdCollectionRight);
        const tdArrayLeft = Array.from(tdCollectionLeft);
        let tdArray = tdArrayLeft.concat(tdArrayRight);

        //Remove elements that are just titles
        tdArray = tdArray.filter(function (el) {
            if (!(el.classList.contains("index-title")) && el.id !== "checkboxParent") {
                return el;
            }
        });

        //Change the outerHTML of the elements to make them into inputs
        for (let i = 0; i < tdArray.length; i++) {
            //Add id to every input element so it is easy to access all of them later
            tdArray[i].outerHTML = "<input id='" + i + "' type='text' value='" + tdArray[i].innerHTML + "'>";
        }

        //Let checkbox be editable
        const editCheckbox = document.getElementsByClassName("check-box");
        editCheckbox[0].disabled = false;

        document.getElementById("saveChangesButton").style.display = "block";
    }

    function handleSaveChanges() {
        let detailsArray = [];
        //There are 16 inputs and we will get data from them in order
        for (let i = 0; i < 16; i++) {
            detailsArray.push(document.getElementById(i));
        }

        const userId = document.getElementById("detailsUserId").value;
        jQuery.ajax({
            'url': '@Url.Action("Edit","User")',
            'type': 'POST',
            'data': {
                Id: userId,
                FirstName: detailsArray[0].value,
                MiddleName: detailsArray[1].value,
                LastName: detailsArray[2].value,
                Department: detailsArray[3].value,
                Position: detailsArray[4].value,
                HireDate: detailsArray[5].value,
                EndDate: detailsArray[6].value,
                LoginName: detailsArray[7].value,
                BirthDate: detailsArray[8].value,
                WorkEmail: detailsArray[9].value,
                AlternateEmail: detailsArray[10].value,
                WorkPhone: detailsArray[11].value,
                HomePhone: detailsArray[12].value,
                MobilePhone: detailsArray[13].value,
                Address: detailsArray[14].value,
                HourlyPayRate: detailsArray[15].value,
                FullTime: document.getElementsByClassName("check-box")[0].checked
            },
            'success': function (data) {
                data = (data === "true");
                if (data) {
                    //details-btn-item.Id is the firstname plus lastname
                    document.getElementById("details-btn-" + userId).innerHTML = detailsArray[0].value + " " + detailsArray[2].value;

                    for (let i = 0; i < detailsArray.length; i++) {
                        detailsArray[i].outerHTML = "<td>" + detailsArray[i].value + "</td>"
                    }
                    const editCheckbox = document.getElementsByClassName("check-box");
                    editCheckbox[0].disabled = true;

                    document.getElementById("saveChangesButton").style.display = "none";
                    document.getElementById("editDetailsIcon").onclick = editDetails;

                } else {
                    alert("The User could not be updated please contact your administrator!");
                }

            },
            'error': function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });

    }