    function handleSubmit() {
        if ($("#startAllDayCheckbox").prop("checked") && $("#endAllDayCheckbox").prop("checked")) {
            let startValue = $("#Start").val();
            let endValue = $("#End").val();

            startValue += " 12:01 AM";
            endValue += " 11:59 PM";

            $("#Start").val(startValue);
            $("#End").val(endValue);
        } else if ($("#startAllDayCheckbox").prop("checked") || $("#endAllDayCheckbox").prop("checked")) {
            let startValue = $("#Start").val();
            let endValue = $("#End").val();

            //This if statement removes the time from either of the values if startValue and endValue are the
            //same day so that we can insert the correct time.
            if (startValue.substr(0, startValue.indexOf(" ")) === endValue || endValue.substr(0, endValue.indexOf(" ")) === startValue) {
                if (startValue.indexOf(" ") >= 0) {
                    startValue = startValue.substr(0, startValue.indexOf(" "));
                } else if (endValue.indexOf(" ") >= 0) {
                    endValue = endValue.substr(0, endValue.indexOf(" "));
                }
            }

            startValue += " 12:01 AM";
            endValue += " 11:59 PM";

            $("#Start").val(startValue);
            $("#End").val(endValue);
        }
        return true;
    }

    function handleCheckbox(ele) {
        if (ele.id === "startAllDayCheckbox") {
            $("#Start").val("");
            if ($(ele).prop("checked")) {
                $("#Start").datetimepicker("destroy");
                $("#Start").datepicker({
                    dateFormat: 'dd-M-yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-5:+5",
                    controlType: "select",
                    onClose: function (date, inst) {
                        $("#End").datetimepicker("change", { minDate: date })
                    }
                });
            } else if (!($(ele).prop("checked"))) {
                $("#Start").datepicker("destroy");
                $("#Start").datetimepicker({
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-5:+5",
                    dateFormat: 'dd-M-yy',
                    controlType: 'select',
                    timeFormat: 'hh:mm TT',
                    onClose: function (dateTime, inst) {
                        $('#End').datepicker("change", { minDate: dateTime });
                    }
                });
            }
        } else if (ele.id === "endAllDayCheckbox") {
            
            $("#End").val("");
            if ($(ele).prop("checked")) {
                $("#End").datetimepicker("destroy");
                $("#End").datepicker({
                    dateFormat: 'dd-M-yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-5:+5",
                    controlType: "select",
                    onClose: function (date, inst) {
                        $("#Start").datetimepicker("change", { maxDate: date })
                    }
                });
            } else if (!($(ele).prop("checked"))) {
                $("#End").datepicker("destroy");
                $("#End").datetimepicker({
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-5:+5",
                    dateFormat: 'dd-M-yy',
                    controlType: 'select',
                    timeFormat: 'hh:mm TT',
                    onClose: function (dateTime, inst) {
                        $('#Start').datepicker("change", { maxDate: dateTime });
                    }
                });
            }
        }
    };