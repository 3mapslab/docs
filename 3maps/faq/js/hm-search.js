/*
 * HelpMaker Search
 */

function search(frm, div_id, srchval, str_fmt, str_notfound, str_close)
{
	// Start
	
	var contents = '';
	contents += '<h2>' + str_fmt + '"' + srchval + '"</h2>';
	contents += '<div class="hm-results">';

	// Look up text in topics
	
	txt = removeAccentsUnicode(frm.srchval.value.toLowerCase()).split(' ');
	fnd = new Array();
	var found = false;
	for(i = 0; i < item.length; i++) {	// 'item' variable declared in search_items.js
		fnd[i] = 0;
		order = new Array(1, 2);		// Search order
		for(j = 0; j < order.length; j++) {
			for(k = 0; k < txt.length; k++) {
				if(item[i][order[j]].toLowerCase().indexOf(txt[k]) > -1 && txt[k] != '') {
					fnd[i] += (j + 1);
					found = true;
				}
			}
		}
	}

	// List topics
	
	if(found) {
		contents += '<ol>';
		for(i = 0; i < fnd.length; i++) {
			n = 0;
			which = -1;
			for(j = 0; j < fnd.length; j++) {
				if(fnd[j] > n) {
					n = fnd[j];
					which = j;
				}
			}
			if(which > -1) {
				contents += '<li><a href="' + item[which][0] + '">'
					+ item[which][1] + '</a></li>';
			}
			fnd[which] = 0;
		}
		contents += '</ol>';
	} else {
		contents += '<p>' + str_notfound + '</p>';
	}
	
	// Add close button
	
	contents += '<form autocomplete="off" method="get" action="javascript:void(0)" onsubmit="location.reload(); return false;">';
	contents += '<input type="submit" value="' + str_close + '">';
	contents += "</form>";
	
	// End
	
	contents += "</div>";
	$(div_id)[0].innerHTML = contents;
}

function removeAccentsUnicode(inputStr)
{
	var str = inputStr;
	var map = {
		a : /[\xE0-\xE6]/g,
		A : /[\xC0-\xC6]/g,
		e : /[\xE8-\xEB]/g,
		E : /[\xC8-\xCB]/g,
		i : /[\xEC-\xEF]/g,
		I : /[\xCC-\xCF]/g,
		o : /[\xF2-\xF6]/g,
		O : /[\xD2-\xD6]/g,
		u : /[\xF9-\xFC]/g,
		U : /[\xD9-\xDC]/g,
		c : /\xE7/g,
		C : /\xC7/g,
		n : /\xF1/g,
		N : /\xD1/g,
	};

	for(var chr in map) {
		var regex = map[chr];
		str = str.replace(regex, chr);
	}

	return str;
}
