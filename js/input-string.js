angular.module("input-string", [])
    .directive("ngStringFormat", function ($browser, $filter) {
        return {
            restrict: 'A',
            require:'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                    var options = scope[attrs.ngStringFormat];
                    var formatInput = function () {
                        if (element.val() != null && element.val() != '') {
                            var value = element.val();
                            for(key in options){
                                if(key == 'allUpperCase' && options[key] == true){
                                    element.val(value.toUpperCase());
                                }
                                if(key == 'allLowerCase' && options[key] == true){
                                    element.val(value.toLowerCase());
                                }
                                if(key == 'firstLetterUpperCase' && options[key] == true){
                                    var valArr = value.split(" ");
                                    var converted = '';
                                    for(var i in valArr){
                                        for(var j in valArr[i]){
                                            if(j == 0){
                                                converted = converted + valArr[i][j].toUpperCase();
                                            }else{
                                                converted = converted + valArr[i][j];
                                            }
                                        }
                                        converted = converted + " ";
                                    }
                                    value = converted.trim();
                                    element.val(value);
                                }

                                if(key == 'notAllowedChars' && options[key] != '') {
                                    var spChars = options[key];
                                    var converted = '';
                                    for (var j in value) {
                                        var notToBeAdded = '';
                                        for (var i in spChars) {
                                            var char = spChars[i];
                                            if (value[j] == char) {
                                                notToBeAdded = value[j];
                                            }
                                        }
                                        if (notToBeAdded == '') {
                                            converted = converted + value[j];
                                        }
                                    }
                                    value = converted.trim();
                                    element.val(value);
                                }
                            }
                        }
                    }
                    ngModelCtrl.$parsers.push(function(viewValue) {
                        var value = viewValue;
                        for(var key in options){
                            if(key == 'allUpperCase' && options[key] == true){
                                value = viewValue.toUpperCase();
                            }
                            if(key == 'allLowerCase' && options[key] == true){
                                value = viewValue.toLowerCase();
                            }
                            if(key == 'firstLetterUpperCase' && options[key] == true){
                                var valArr = value.split(" ");
                                var converted = '';
                                for(var i in valArr){
                                    for(var j in valArr[i]){
                                        if(j == 0){
                                            converted = converted + valArr[i][j].toUpperCase();
                                        }else{
                                            converted = converted + valArr[i][j];
                                        }
                                    }
                                    converted = converted + " ";
                                }
                                value = converted.trim();
                            }
                            if(key == 'notAllowedChars' && options[key] != ''){
                                var spChars = options[key];
                                var converted = '';
                                for(var j in value){
                                    var notToBeAdded = '';
                                    for(var i in spChars){
                                        var char = spChars[i];
                                        if(value[j] == char){
                                            notToBeAdded = value[j];
                                        }
                                    }
                                    if(notToBeAdded == ''){
                                        converted = converted + value[j];
                                    }
                                }
                                value = converted.trim();
                            }
                        }
                        return value;
                    });
                    element.bind("change", formatInput);
                    element.bind("keyup", function(event){
                        if(event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 32){
                            var val = element.val();
                            console.log();
                            var caretPosition = val.slice(0, element[0].selectionStart).length;
                            formatInput();
                            setCaretPosition(element[0], caretPosition);
                        }
                    });
                    element.bind("copy paste", function () {
                        $browser.defer(formatInput);
                    });

            }
        }
    })


function setCaretPosition(elem, caretPos) {
    var range;

    if (elem.createTextRange) {
        range = elem.createTextRange();
        range.move('character', caretPos);
        range.select();
    } else {
        elem.focus();
        if (elem.selectionStart !== undefined) {
            elem.setSelectionRange(caretPos, caretPos);
        }
    }
}