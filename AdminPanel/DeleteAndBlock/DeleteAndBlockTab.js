    function showDeleteAndBlock(userId, userRole) {
        $("#userId").val(userId);
        $("#userRole").val(userRole);

        if (userRole === "Admin") {
            $("#adminSwitch").prop("checked", true);
        } else if (userRole === "Blocked") {
            $("#blockSwitch").prop("checked", true);
        } else if (userRole === "Terminated") {
            //Dont do anything for terminated yet
            console.log("This user is terminated");
        } else if (userRole === "ViewMode") {
            $("#viewModeSwitch").prop("checked", true);
        }
    }

    function handleChange(ele) {
        const Id = $("#userId").val();
        const userRole = $("#userRole").val();

        let adminChecked = false;
        let blockChecked = false;
        let viewModeChecked = false;
        if (ele.id === "adminSwitch" && $(ele).prop("checked")) {
            adminChecked = $(ele).prop("checked");
            $("#blockSwitch").prop("checked", false);
            $("#viewModeSwitch").prop("checked", false);
        } else if (ele.id === "blockSwitch" && $(ele).prop("checked")) {
            blockChecked = $(ele).prop("checked");
            $("#adminSwitch").prop("checked", false);
            $("#viewModeSwitch").prop("checked", false);
        } else if (ele.id === "viewModeSwitch" && $(ele).prop("checked")) {
            viewModeChecked = $(ele).prop("checked");
            $("#adminSwitch").prop("checked", false);
            $("#blockSwitch").prop("checked", false);
        }


        let role;
        if (adminChecked) {
            role = "Admin";
            console.log("Admin is checked");
        } else if (blockChecked) {
            role = "Blocked";
            console.log("block is checked");
        } else if (viewModeChecked) {
            role = "ViewMode";
            console.log("ViewMode is checked");
        } else {
            role = "User";
        }

        jQuery.ajax({
            'url': '@Url.Action("ChangeRole","User")',
            'type': 'POST',
            'data': {
                userId: Id,
                currentRole: userRole,
                roleToChangeTo: role
            },
            'success': function (data) {
                $("#role").html("Role: " + role);
                $("#userRole").val(role);
            },
            'error': function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
    }

    function handleClick() {
        const Id = $("#userId").val();
        const userRole = $("#userRole").val();
        const role = "Terminated";

        $("#adminSwitch").prop("checked", false);
        $("#blockSwitch").prop("checked", false);
        $("#viewModeSwitch").prop("checked", false);

        jQuery.ajax({
            'url': '@Url.Action("ChangeRole","User")',
            'type': 'POST',
            'data': {
                userId: Id,
                currentRole: userRole,
                roleToChangeTo: role
            },
            'success': function (data) {
                $("#role").html("Role: " + role);

                $("#userRole").val(role);
            },
            'error': function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
    }