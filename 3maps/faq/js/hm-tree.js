
//
// Navigation tree
//

var treeSelector;

//
// Read tree state
//

function init(store, treeSel)
{
	var value;
	
	treeSelector = treeSel;
	store.get('hm_tree', function(ok, val) {
		
		// Read expanded / collapsed nodes
		
		if(ok) {
			value = val;
			if(value) {
				$(treeSelector + " ul").each(function(i) {
					if(value[i] == 'C') {
						collapse($(this));
					} else {
						expand($(this));
					}
				});
			}
		} else {
			$(treeSelector + " ul").each(function(i) {
				expand($(this));
			});
			$(treeSelector + " li").each(function(index) {
				$(this).attr('treeId', "tree_" + (index + 1));
				$(this).attr('isselected', 'false');
			});
		}

		// Read current topic
		
		$(treeSelector + " li").each(function(index) {
			$(this).attr('treeId', "tree_" + (index + 1));
		});
		
		$(treeSelector).attr('selectedNode', 'none');
		store.get('hm_sel', function(ok, val) {
			if(ok) {
				id = val;
				$(treeSelector).attr('selectedNode', id);
				$(id).attr('isselected', 'true');
				$(treeSelector + " li").each(function() {
					$(this).attr('isselected', $(this).attr('treeId') == id ? 'true' : 'false');
				});
			}
		});
	});
}

//
// Write tree state
//

function traverse(store, selector)
{
	var out = '';

	$(selector + " ul").each(function() {
		out += $(this).attr('collapsed') == 'true' ? 'C' : 'e';
	});
	
	//console.log(out);
	store.set('hm_tree', out);
}


function setSelected(store, el)
{
	$(treeSelector).attr('selectedNode', el.attr('treeId'));
	el.attr('isselected', 'true');
	store.set('hm_sel', el.attr('treeId'));
}

function toggle(store, el, ms)
{
	if(el.attr('collapsed') != 'true') {
		el.slideUp(ms, function() {
			collapse(el);
			traverse(store, treeSelector);
		});
	} else {
		el.slideDown(ms, function() {
			expand(el);
			traverse(store, treeSelector);
		});
	}
}

function expand(el)
{
	el.css('height', 'auto');
	el.show();
	el.attr('collapsed', 'false');
}

function collapse(el)
{
	el.hide();
	el.css('height', '0');
	el.attr('collapsed', 'true');
}





























