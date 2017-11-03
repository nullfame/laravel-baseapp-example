(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// Initalize the baseapp namespace
window.baseapp = {};

// Require component JavaScripts
require("./widgets/lib.js");
require("./widgets/menu.js");
require("./widgets/debugbar.js");
require("./widgets/schemable.js");

},{"./widgets/debugbar.js":2,"./widgets/lib.js":3,"./widgets/menu.js":4,"./widgets/schemable.js":5}],2:[function(require,module,exports){
'use strict';

$(document).ready(function () {
    // Show debug bar when open is clicked
    $('#baseapp-debugbar-open').click(function (event) {
        $('body').toggleClass('debugClosed'); // Set body.debugClosed to remove the top padding
        baseapp.eraseCookie('debugClosed'); // Clear the cookie telling BaseApp to default closed
        event.preventDefault();
    });

    // Hide debug bar when collapse is clicked
    $('#baseapp-debugbar-collapse').click(function (event) {
        $('body').toggleClass('debugClosed');
        baseapp.createCookie('debugClosed', true);
        event.preventDefault();
    });
});

},{}],3:[function(require,module,exports){
"use strict";

// http://www.quirksmode.org/js/cookies.html

window.baseapp.createCookie = function (name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
};

window.baseapp.readCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

window.baseapp.eraseCookie = function (name) {
    baseapp.createCookie(name, "", -1);
};

},{}],4:[function(require,module,exports){
'use strict';

$(document).ready(function () {
    $('#navToggle').click(function () {
        $('nav#navigation').toggle();
    });
});

},{}],5:[function(require,module,exports){
'use strict';

// Currently only handles "new" case.  Need to improve it to handle "edit" case.  Perhaps check for presence of schemable_data variable

window.baseapp.createSchemableFields = function () {
	//alert('createSchemableFields is firing');
	//if ($('#schema_template_id').val().length !== 0) {
	if ($('#schema_template_id').length > 0 && $('#schema_template_id').val().length) {
		//alert('createdSchemableFields is actually doing something');
		// TODO: Be craftier in the future, think about only striking out fields that aren't present in the newly selected schema template
		$('div#schemable').empty();
		$.getJSON('/api/v1/fetchActiveSchema/' + $('#schema_template_id').val(), function (data) {

			// Is this a readonly (view) form?
			var readonlyView = $('#main form').first().hasClass('readonly');
			var readonlyAttr = '';
			var disabledAttr = '';
			var requiredClass = 'required';
			if (readonlyView) {
				readonlyAttr = ' readonly';
				disabledAttr = ' disabled';
				requiredClass = '';
			}

			$.each(data.display, function (rowkey, row) {
				$.each(row, function (colkey, col) {
					var fieldname = col.key;
					var label = col.label;
					var type = data.fields[fieldname].type;
					var required = data.fields[fieldname].required;
					var value = data.fields[fieldname].value;
					if (required) {
						required = 'required="required"';
					} else {
						required = '';
						requiredClass = '';
					}

					var $newFieldset = $('<fieldset class="form-group"></fieldset>');

					$newFieldset.append('<label for="schemable__' + fieldname + '" class="' + requiredClass + '">' + label + '</label>');
					switch (type) {
						case 'text':
							$newFieldset.append('<input ' + required + ' name="schemable__' + fieldname + '" type="text" class="form-control"' + readonlyAttr + '>');
							break;
						case 'date':
							$newFieldset.append('<div class="input-group"><input ' + required + ' name="schemable__' + fieldname + '" type="text" class="form-control schemableDatepicker"' + readonlyAttr + '><span class="input-group-addon datepicker-icon schemableDatepicker-icon"><i class="fa fa-calendar"></i></span></div><script>$(".schemableDatepicker").datepicker(); $(".schemableDatepicker-icon").click(function() {$(this).closest("div.input-group").find(".schemableDatepicker").datepicker("show");});</script>');
							break;
						case 'textarea':
							// <textarea name="data" cols="50" rows="10" id="data"></textarea>
							$newFieldset.append('<textarea ' + required + ' name="schemable__' + fieldname + '" class="form-control"' + readonlyAttr + '></textarea>');
							break;
						case 'select':
							var $newSelect = $('<select ' + required + ' name="schemable__' + fieldname + '" class="form-control"' + disabledAttr + '></select>');
							// TODO: handle setting placeholder at top?
							$.each(data.fields[fieldname]['values'], function (optionkey, optionlabel) {
								// TODO: handle setting one of the options as selected
								$('<option value="' + optionkey + '">' + optionlabel + '</option>').appendTo($newSelect);
							});
							$newFieldset.append($newSelect);
							break;
						case 'radio':
							// To include radio buttons in the label we need to reset $newFieldset
							$newFieldset = $('<fieldset class="radio"></fieldset>');
							$newFieldset.append('<label class="heading ' + requiredClass + '">' + label + '</label>');
							$.each(data.fields[fieldname]['values'], function (radiokey, radiolabel) {
								$newFieldset.append('<label><input ' + required + ' type=' + '"radio" name="schemable__' + fieldname + '" value="' + radiokey + '"' + disabledAttr + '> ' + radiolabel + '</label>');
							});
							break;
						case 'checkbox':
							// To include checkbox in the label we need to reset $newFieldset
							$newFieldset = $('<fieldset class="checkbox"></fieldset>');
							$newFieldset.append('<label class="' + requiredClass + '"><input ' + required + ' name="schemable__' + fieldname + '" type="checkbox" value="' + value + '"' + disabledAttr + '>' + label + '</label>');
							break;
						case 'multicheckbox':
							// To include radio buttons in the label we need to reset $newFieldset
							$newFieldset = $('<fieldset class="checkbox"></fieldset>');
							$newFieldset.append('<label class="heading ' + requiredClass + '">' + label + '</label>');
							$.each(data.fields[fieldname]['values'], function (radiokey, radiolabel) {
								$newFieldset.append('<label><input ' + required + ' type=' + '"checkbox"  name="schemable__' + fieldname + '_' + radiokey + '" ' + disabledAttr + '> ' + radiolabel + '</label>');
							});
							break;
						case 'multifiscal':
						case 'multiyear':
							$newFieldset = $('<fieldset class="form-group"></fieldset>');
							var yearLabel = "year";
							if (type == 'multifiscal') yearLabel = 'Fiscal Year';

							// Let the year options go back and forth 20 years with the current year as the default
							var today = new Date();
							var currentYear = today.getFullYear();
							if (type == 'multifiscal' && today.getMonth() >= 9) currentYear++;
							var yearOptions = "";
							for (var year = currentYear - 25; year < currentYear + 26; year++) {
								var selected = year == currentYear ? " selected" : "";
								yearOptions += "<option" + selected + ">" + year + "</option>";
							}

							$newFieldset.append('\n\t\t\t\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t\t\t\t<div class="col-lg-8">\n\t\t\t\t\t\t\t\t\t\t<table id="schemable__' + fieldname + '" schemable="' + type + '" class="addremove">\n\t\t\t\t\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<th style="white-space: nowrap; padding-right: 1em;"><label class="' + requiredClass + '">' + yearLabel + '</label></th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<th width="100%"><label class="' + requiredClass + '">' + label + '</label></th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<th class="addremove-action">&nbsp;</th>\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<select name="schemable_multiyear__' + fieldname + '__year__0" class="form-control" ' + disabledAttr + ' ' + required + '>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t' + yearOptions + '\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="text" name="schemable_multiyear__' + fieldname + '__value__0" class="form-control"  ' + disabledAttr + ' ' + required + '>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td class="addremove-action"><a href="#" class="link-button-remove" tabindex="-1"><i class="fa fa-remove"></i></a></td>\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t<p class="addremove-action"><a href="#" class="link-button-plus" tabindex="-1"><i class="fa fa-plus"></i> Add ' + label + '</a></p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t');
							break;
					}
					// Remove add/remove actions when this is read-only
					if (readonlyAttr) {
						$newFieldset.find(".addremove-action").remove();
					} else {
						// Otherwise attach events to them
						$newFieldset.find(".addremove-action .link-button-remove").click(window.baseapp.removeRow);
						$newFieldset.find(".addremove-action .link-button-plus").click(window.baseapp.addRow);
					}

					$('div#schemable').append($newFieldset);
				});
			});
			// this data population occurs once UI has updated due to setTimeout putting populateSchemableData() on the event loop
			setTimeout(function () {
				baseapp.populateSchemableData();
			}, 0);
		});
	}
};

window.baseapp.populateSchemableData = function () {
	if (typeof schemable_data !== 'undefined') {
		//alert('latest change');
		$.each(schemable_data, function (fieldname, fieldvalue) {
			//alert ('field: ' + fieldname + ' fieldvalue:' + fieldvalue);
			var element = $('div#schemable [name=' + fieldname + ']');
			//console.log(element);
			if (element.is('input[type=text]')) {
				// make sure isn't already set
				element.val(fieldvalue);
				//alert('is textinput');
			} else if (element.is('input[type=radio]')) {
				element.filter('[value="' + fieldvalue + '"]').prop('checked', true);
			} else if (element.is('input[type=checkbox]')) {
				element.prop('checked', true);
			} else if (element.is('textarea')) {
				element.val(fieldvalue);
				//alert('is textarea');
			} else if (element.is('input')) {
				//alert('is input');
			} else if (element.is('select')) {
				//alert('is select');
				element.val(fieldvalue);
			} else {
				// See if this is a multiyear/multifiscal field (or another general multi-row table)
				var schemableTable = $('div#schemable table#' + fieldname);
				var type = schemableTable.attr("schemable");
				if (!schemableTable || !type) return;
				var schemableBody = schemableTable.children("tbody").first();
				switch (type) {
					case 'multifiscal':
					case 'multiyear':
						// Loop through the values in fieldvalue.  Create a new row for each of them.  First row is a special case
						var lastRow = null;
						Object.keys(fieldvalue).sort().forEach(function (year, index) {
							// Figure out which row to work on
							// Either it's the first row or we clone the last row
							var currentRow;
							if (!lastRow) {
								currentRow = schemableBody.children("tr").last();
							} else {
								currentRow = lastRow.clone();
								schemableBody.append(currentRow);
							}

							// Update values and names:

							// Being naive about finding fields since we only have one select and one input
							var currentSelect = currentRow.find("select");
							currentSelect.val(year);
							var currentInput = currentRow.find("input");
							currentInput.val(fieldvalue[year]);

							// If this is not the first row we need to increment the index in the names
							if (lastRow) {
								window.baseapp.updateNameIndex(currentSelect);
								window.baseapp.updateNameIndex(currentInput);
								currentRow.find(".addremove-action .link-button-remove").click(window.baseapp.removeRow);
							}

							// Update the last row
							lastRow = currentRow;
						});
						break;
					default:
					//console.log('Found schemable table with unsupported type: "'+ type +'"');
				}
			}
		});
	}
};

window.baseapp.addRow = function (event) {
	var $table = $(event.target).closest("div").find("table").first();
	var $lastRow = $table.find("tr").last();
	var $newRow = $lastRow.clone();

	// Increment the year but leave the contents
	$newRow.find("select").val(parseInt($lastRow.find("select").val()) + 1);
	window.baseapp.updateNameIndex($newRow.find("select"));
	window.baseapp.updateNameIndex($newRow.find("input"));
	$newRow.find(".addremove-action .link-button-remove").click(window.baseapp.removeRow);

	$table.children("tbody").append($newRow);
	event.preventDefault();
};

window.baseapp.removeRow = function (event) {
	// Don't remove the last row
	if ($(event.target).closest("tbody").find("tr").length > 1) {
		$(event.target).closest("tr").remove();
	}
	event.preventDefault();
};

window.baseapp.updateNameIndex = function (element) {
	var results = /^(.+__)(\d+)$/.exec(element.attr("name"));
	var prefix = results[1];
	var index = parseInt(results[2]);
	element.attr("name", prefix + (index + 1));
};

$(document).ready(function () {
	baseapp.createSchemableFields(); // run initially, in case schema_template_id is already set to something

	$('#schema_template_id').change(baseapp.createSchemableFields);
});

},{}]},{},[1]);

//# sourceMappingURL=app.js.map
